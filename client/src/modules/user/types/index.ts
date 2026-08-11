export type UserDetailsForForm = {
  _id: string;
  name?: string;
  email?: string;
  mobileNumber?: string | number;
  countryCode?: string | number;
  status?: string;
  avatar?: { private?: boolean; key?: string } | string;
};

export type UpdateUserFormValues = {
  name: string;
  mobileNumber: string;
  countryCode: string;
  status: string;
};
