import api from "@/network/client";

export const uploadImageHelper = async function (
  file: File,
  optionsDefault: { resource: string; private?: boolean }
) {
  try {
    const { private: isPrivate = false, ...options } = optionsDefault;
    const payload = new FormData()
    payload.append("file", file);
    payload.append("resource", options.resource);
    payload.append("private", String(isPrivate));
    const response = await api.post("/api/v1/files/image", {
      body: payload,
      headers: {
        Accept: "application/json"
      },
      multiPartRequest: true
    })
    return { success: true, data: response.data, message: response.message || "Successfull" }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong"
    }
  }
}