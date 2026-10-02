import "dotenv/config";
import mongoose from "mongoose";
import MaintenanceTicket from "../models/maintenanceTicket.model.js";

// ---------------------------------------------------------------------------
// Inline port of MaintenanceRepository.generateKeyBetween so this script has
// zero runtime dependency on the full repository (and its transitive imports).
// ---------------------------------------------------------------------------
const PUNCTUATION = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function generateKeyBetween(
  prevKey: string | null | undefined,
  nextKey: string | null | undefined,
  middleChar = "V"
): string {
  const safePrev = prevKey ?? "";
  const safeNext = nextKey ?? "";

  if (!safePrev && !safeNext) return "V";

  if (!safePrev) {
    const firstChar = safeNext.charAt(0);
    if (!firstChar) return middleChar;
    const index = PUNCTUATION.indexOf(firstChar);
    if (index > 0) return PUNCTUATION.charAt(index - 1);
    return safeNext + middleChar;
  }

  if (!safeNext) {
    const lastChar = safePrev.charAt(safePrev.length - 1);
    if (!lastChar) return middleChar;
    const index = PUNCTUATION.indexOf(lastChar);
    if (index < PUNCTUATION.length - 1 && index !== -1) {
      return safePrev.slice(0, -1) + PUNCTUATION.charAt(index + 1);
    }
    return safePrev + middleChar;
  }

  let p = 0,
    n = 0;
  let result = "";

  while (p < safePrev.length || n < safeNext.length) {
    const prevChar = safePrev.charAt(p);
    const nextChar = safeNext.charAt(n);

    const pc =
      p < safePrev.length && prevChar ? PUNCTUATION.indexOf(prevChar) : 0;
    const nc =
      n < safeNext.length && nextChar
        ? PUNCTUATION.indexOf(nextChar)
        : PUNCTUATION.length - 1;

    if (pc === nc) {
      result += PUNCTUATION.charAt(pc) || middleChar;
      p++;
      n++;
    } else {
      const mid = Math.floor((pc + nc) / 2);
      if (mid > pc) {
        result += PUNCTUATION.charAt(mid) || middleChar;
        return result;
      } else {
        result += PUNCTUATION.charAt(pc) || middleChar;
        p++;
      }
    }
  }

  return result + middleChar;
}

// ---------------------------------------------------------------------------
// Migration
// ---------------------------------------------------------------------------

async function migrate() {
  const connectionString = process.env.MONGOOSE_DB_URL;
  if (!connectionString) throw new Error("MONGOOSE_DB_URL is required");

  await mongoose.connect(connectionString);
  console.log("Connected to MongoDB.");

  // Find every distinct organization that has at least one maintenance ticket
  // which is missing the kanbanRank field.
  const organizationIds: mongoose.Types.ObjectId[] =
    await MaintenanceTicket.distinct("organization", {
      kanbanRank: { $exists: false },
    });

  if (organizationIds.length === 0) {
    console.log("No tickets missing kanbanRank. Nothing to do.");
    await mongoose.disconnect();
    return;
  }

  console.log(
    `Found ${organizationIds.length} organization(s) with tickets that need kanbanRank.`
  );

  let totalUpdated = 0;

  for (const organizationId of organizationIds) {
    // Fetch all tickets for this org that are missing kanbanRank,
    // ordered by createdAt (ascending) so the rank assignment is deterministic.
    const tickets = await MaintenanceTicket.find(
      { organization: organizationId, kanbanRank: { $exists: false } },
      { _id: 1 }
    )
      .sort({ createdAt: 1, _id: 1 })
      .lean();

    if (tickets.length === 0) continue;

    // Generate chained lexicographic ranks: each ticket gets a rank that is
    // greater than the previous one (prevRank -> null means "append to end").
    const bulkOps: mongoose.mongo.AnyBulkWriteOperation[] = [];
    let prevRank: string | null = null;

    for (const ticket of tickets) {
      const kanbanRank = generateKeyBetween(prevRank, null);
      bulkOps.push({
        updateOne: {
          filter: { _id: ticket._id },
          update: { $set: { kanbanRank } },
        },
      });
      prevRank = kanbanRank;
    }

    const result = await MaintenanceTicket.bulkWrite(bulkOps, {
      ordered: false,
    });

    console.log(
      `  Organization ${organizationId}: assigned kanbanRank to ${result.modifiedCount} ticket(s).`
    );
    totalUpdated += result.modifiedCount;
  }

  console.log(`\nMigration complete. Total tickets updated: ${totalUpdated}`);
  await mongoose.disconnect();
}

migrate().catch(async (error) => {
  console.error("Migration failed:", error);
  await mongoose.disconnect();
  process.exitCode = 1;
});
