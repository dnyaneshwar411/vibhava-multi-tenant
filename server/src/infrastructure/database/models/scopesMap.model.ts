import { model, Schema } from "mongoose";
import type { InferRawDocTypeFromSchema } from "mongoose";

const scopeSchema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    require: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  tenant: {
    type: Schema.Types.ObjectId,
    ref: "Tenant",
  },
  scopeMap: {
    type: Map,
    of: Boolean,
  },
});

const Scope = model("Scope", scopeSchema);

export default Scope;

export type IScope = InferRawDocTypeFromSchema<typeof scopeSchema>;
