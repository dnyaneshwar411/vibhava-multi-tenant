import nodemailer from "nodemailer"
import { env } from "../../../config/envVars.js";

const transporter = nodemailer.createTransport({
  service: env.EMAIL,
  secure: true,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASSWORD,
  },
  host: env.EMAIL_HOST,
});

type SendMailType = (payload: Record<string, any>) => Promise<{ success: boolean; error?: any }>;

export const sendMail: SendMailType = async function (options: Record<string, any>) {
  try {
    const response = await transporter.sendMail(options);
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}