import type { UserDetailsForForm, UpdateUserFormValues } from "../types";

export function getUpdateUserDefaultValues(user?: UserDetailsForForm): UpdateUserFormValues {
  return {
    name: user?.name ?? "",
    mobileNumber: user?.mobileNumber !== undefined ? String(user.mobileNumber) : "",
    countryCode: user?.countryCode !== undefined ? String(user.countryCode) : "",
    status: user?.status ?? "Active",
  };
}
