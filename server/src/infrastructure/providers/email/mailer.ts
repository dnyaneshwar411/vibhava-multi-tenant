import nodemailer from "nodemailer"
import { env } from "../../../config/envVars.js";
import { MailOptions } from "nodemailer/lib/sendmail-transport/index.js";

const transporter = nodemailer.createTransport({
  service: env.EMAIL,
  secure: true,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASSWORD,
  },
  host: env.EMAIL_HOST,
});

type SendMailType = (payload: MailOptions) => Promise<{ success: boolean; error?: any }>;

export const sendMail: SendMailType = async function (options: MailOptions) {
  try {
    await transporter.sendMail(options);
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}