import { UpdateUserInput } from "../helpers/update-schema";
import type { UserDetailsForForm, UpdateUserFormValues } from "../types";

export function getUpdateUserDefaultValues(user?: UserDetailsForForm): UpdateUserInput {
  return {
    name: user?.name ?? "",
    email: user?.email ?? "",
    mobileNumber: user?.mobileNumber !== undefined ? String(user.mobileNumber) : "",
    countryCode: user?.countryCode !== undefined ? String(user.countryCode) : "",
    status: user?.status ?? "Active",
    avatar: null
  };
}
