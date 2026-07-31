import { model, Schema } from "mongoose";
import type { InferRawDocTypeFromSchema } from "mongoose";

const scopeSchema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization"
  },
  actor: {
    type: Schema.Types.ObjectId,
    refPath: "actorModel",
    required: true
  },
  actorModel: {
    type: String,
    enum: ["Tenant", "Vendor", "User", "Operator"],
    required: true
  },
  scopeMap: {
    type: Map,
    of: Boolean,
  },
}, {
  timestamps: true
});

scopeSchema.index({ organization: 1, actor: 1, actorModel: 1 }, { unique: true });

const Scope = model("Scope", scopeSchema);

export default Scope;
export type IScope = InferRawDocTypeFromSchema<typeof scopeSchema>;
