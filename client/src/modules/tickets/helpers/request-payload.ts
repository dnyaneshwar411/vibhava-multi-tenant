import { uploadImageHelper } from "@/modules/file-upload/helpers";
import { TicketCreationInput } from "../schema/creation";

export const buildTicketRequestPayload = async function (data: TicketCreationInput) {
  const attachments = data.attachments || [];

  const uploadPromises = attachments.map(async (item: any) => {
    if (item instanceof File) {
      const res = await uploadImageHelper(item, {
        resource: "tickets",
        private: false,
      });

      if (!res.success || !res.data) {
        throw new Error(res.message || "Failed to upload image attachment");
      }

      return {
        key: res.data.key ?? res.data.url ?? "",
        private: res.data.private ?? false,
      };
    }

    if (typeof item === "object" && item !== null && "key" in item) {
      return {
        key: item.key,
        private: item.private ?? false,
      };
    }

    return null;
  });

  const resolvedAttachments = (await Promise.all(uploadPromises)).filter(Boolean);

  return {
    ...data,
    attachments: resolvedAttachments,
  };
};