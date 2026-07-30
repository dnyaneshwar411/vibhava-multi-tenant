import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl as getS3SignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "../../../config/envVars.js";

export default class S3 {
  private static s3Client = new S3Client({
    region: env.AWS_S3_REGION,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    }
  });

  private static getBucket(isPrivate: boolean): string {
    return isPrivate ? env.AWS_S3_PRIVATE_BUCKET : env.AWS_S3_PUBLIC_BUCKET;
  }

  static async getObjectUrl({ isPrivate = false, key }: { isPrivate?: boolean; key: string }): Promise<string> {
    if (isPrivate) {
      return await this.getSignedUrl(key, true);
    }
    return this.getPublicUrl(key);
  }

  static async getSignedUrl(key: string, isPrivate: boolean = true): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.getBucket(isPrivate),
      Key: key,
    });
    return await getS3SignedUrl(this.s3Client, command, { expiresIn: 3600 });
  }

  static getPublicUrl(key: string): string {
    return `https://${env.AWS_S3_PUBLIC_BUCKET}.s3.${env.AWS_S3_REGION}.amazonaws.com/${key}`;
  }

  static async putObject({
    isPrivate = false,
    key,
    body,
  }: {
    isPrivate?: boolean;
    key: string;
    body: Buffer | Uint8Array | Blob | string;
  }): Promise<any> {
    const command = new PutObjectCommand({
      Bucket: this.getBucket(isPrivate),
      Key: key,
      Body: body,
    });
    return await this.s3Client.send(command);
  }
}