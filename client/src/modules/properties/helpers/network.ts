import { uploadImageHelper } from "@/modules/file-upload/helpers";
import { CreatePropertyFormValues } from ".";

export const uploadPropertyImages = async function (media: CreatePropertyFormValues["media"]) {
  const { primaryImage, coverImage, gallery } = media || {};

  const uploadMap: Record<string, Promise<any>> = {};

  if (primaryImage) {
    uploadMap.primaryImage = uploadImageHelper(primaryImage, {
      resource: "property/media",
    });
  }

  if (coverImage) {
    uploadMap.coverImage = uploadImageHelper(coverImage, {
      resource: "property/media",
    });
  }

  if (gallery?.length) {
    uploadMap.gallery = Promise.all(
      gallery.map((img: any) =>
        uploadImageHelper(img, { resource: "property/media" })
      )
    );
  }

  const keys = Object.keys(uploadMap);
  const responses = await Promise.all(Object.values(uploadMap));

  return keys.reduce((acc, key, index) => {
    acc[key] = responses[index];
    return acc;
  }, {} as Record<string, any>);
};