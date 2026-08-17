import { ImageSchema } from "@/validation-schemas/common.schema";

export type Organization = {
  name: string;
  subdomain?: string;
  meta: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
    ogTitle: string;
    ogDescription: string;
    twitterCardType: "summary" | "summary_large_image";
    twitterHandle: string;
    canonicalUrl: string;
    noIndex: boolean;
  };
  branding: {
    banner: string | ImageSchema;
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      darkBackground: string;
    };
    darkLogo: string | ImageSchema;
    emailFooterText: string;
    favicon: string | ImageSchema;
    logo: string | ImageSchema;
    supportEmail: string;
    supportPhone: string;
  };
  status: string;
  owner?: string | any;
  subscription?: string;
  createdAt?: string;
}