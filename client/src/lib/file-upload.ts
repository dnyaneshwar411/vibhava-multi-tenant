"use server"
import api from "@/network/client"

export const fileUpload = async function (payload: FormData) {
  try {

    const response = await api.post("/api/v1/files/image", {
      body: payload,
      headers: {
        // "Content-Type": "multipart/form-data"
        Accept: "application/json"
      }
    })
    if (response.code !== 200) throw new Error(response.message);
    return {
      success: true,
      data: response.data
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong!"
    }
  }
}