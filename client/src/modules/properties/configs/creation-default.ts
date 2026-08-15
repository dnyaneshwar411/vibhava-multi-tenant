import { CreatePropertyFormValues } from "../helpers";

export const createPropertyDefaultValue: CreatePropertyFormValues = {
  name: "",
  propertyType: "Multi-Family",
  status: "Active",
  address: {
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    location: {
      type: "Point",
      coordinates: [0, 0],
    },
  },
  amenities: [],
  media: {
    primaryImage: undefined as unknown as File,
    coverImage: undefined as unknown as File,
    gallery: [],
  },
  finance: {
    currency: "INR",
    defaultLateFeeAmount: "0",
    defaultGracePeriodDays: "15",
  },
}