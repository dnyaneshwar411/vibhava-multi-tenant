export interface ImagePayload {
  private: boolean;
  key: string;
}

export interface GalleryImagePayload extends ImagePayload {
  caption?: string;
  altText?: string;
  sortOrder?: number;
  uploadedAt?: Date;
}

export interface CreatePropertyInput {
  name: string;
  propertyType: "Multi-Family" | "Single-Family" | "Commercial" | "Mixed-Use" | "Industrial";
  status: "Active" | "Under Maintenance" | "Archived" | "Sold" | "Deleted";
  address: {
    street1: string;
    street2: string | null;
    city: string;
    state: string;
    zipCode: string;
    country: "India";
    location: {
      type: "Point";
      coordinates: number[] | null;
    };
  };
  amenities: ("Gym" | "Pool" | "Underground Parking" | "EV Chargers")[];
  media: {
    primaryImage: ImagePayload;
    coverImage: ImagePayload;
    gallery: GalleryImagePayload[];
  };
  finance: {
    currency: "INR" | null;
    defaultLateFeeAmount: number;
    defaultGracePeriodDays: number;
  };
}
