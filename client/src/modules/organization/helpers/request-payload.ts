import { uploadImageHelper } from "@/modules/file-upload/helpers";
import { OrganizationInput } from "../schemas";

export const buildOrganizationRequestPayload = async function (data: OrganizationInput) {
  const branding = data.branding || {};
  const imageFields = ["logo", "darkLogo", "favicon", "banner"] as const;

  const updatedBranding = { ...branding };

  const uploadPromises = imageFields.map(async (field) => {
    const fileData = branding[field];
    if (fileData instanceof File) {
      const res = await uploadImageHelper(fileData, {
        resource: "organization/branding",
        private: false,
      });
      if (!res.success || !res.data) {
        throw new Error(res.message || `Failed to upload ${field}`);
      }

      updatedBranding[field] = {
        private: res.data.private ?? false,
        key: res.data.key ?? res.data.url ?? "",
      };
    } else {
      delete updatedBranding[field];
    }
  });

  await Promise.all(uploadPromises);

  return {
    ...data,
    branding: updatedBranding,
  };
}