import { ObjectIdQueryTypeCasting } from "mongoose";
import { UpdateOrganizationInput } from "../../../api/schemas/organization.schema.js";
import { flattenObjectMongooseUpdatePayload } from "../../../api/utils/mongoose.js";
import S3 from "../../providers/aws/s3.js";
import Organization from "../models/organization.model.js";
import { CONSTANTS_TYPE } from "../../../common/types/index.js";

export default class OrganizationRepository {
  private static model = Organization;

  private static async getImageUrl(image: { key?: string, private?: boolean } | null | undefined) {
    if (!image || !image.key) return image;
    return await S3.getObjectUrl({
      isPrivate: image.private || false,
      key: image.key
    });
  };
  
static async findById(organizationId: string) {
    const organization: any = await this.model
      .findById(organizationId)
      .select("-updatedAt -subscription")
      .populate("owner", "name email mobileNumber countryCode avatar")
      .lean();

    if (!organization) return { success: false, message: "Organization Not found!" };

    if (organization.branding) {
      const [avatar, logoUrl, darkLogoUrl, faviconUrl, bannerUrl] = await Promise.all([
        this.getImageUrl(organization.owner?.avatar),
        this.getImageUrl(organization.branding.logo),
        this.getImageUrl(organization.branding.darkLogo),
        this.getImageUrl(organization.branding.favicon),
        this.getImageUrl(organization.branding.banner)
      ]);

      organization.owner.avatar = avatar;
      organization.branding.logo = logoUrl;
      organization.branding.darkLogo = darkLogoUrl;
      organization.branding.favicon = faviconUrl;
      organization.branding.banner = bannerUrl;
    }

    return { success: true, data: organization };
  }

  static updateById: (
    organizationId: ObjectIdQueryTypeCasting,
    payload: UpdateOrganizationInput |
    { status: CONSTANTS_TYPE["ORGANIZATION_STATUS"] }
  ) => Promise<
    { success: false, message: string } |
    { success: true, message?: never }
  > = async (organizationId, payload) => {
    const updatePayload = flattenObjectMongooseUpdatePayload(payload)
    const organizationDoc = await this.model.findByIdAndUpdate(organizationId, {
      $set: updatePayload
    }, { returnDocument: "after" })
    if (!organizationDoc) return { success: false, message: "Invalid Request" }
    return { success: true }
  }
}