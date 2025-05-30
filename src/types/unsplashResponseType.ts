export interface UnsplashResponseType {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at: string | null;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  asset_type: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    small_s3: string;
    thumb: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  likes: number;
  liked_by_user: boolean;
  user: {
    id: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string;
    for_hire: boolean;
    location: string;
    bio: string;
    portfolio_url: string;
    instagram_username: string;
    twitter_username: string | null;
    total_photos: number;
    total_likes: number;
    total_collections: number;
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
    social: {
      instagram_username: string;
      twitter_username: string | null;
      portfolio_url: string;
      paypal_email: string | null;
    };
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
      portfolio: string;
    };
    accepted_tos: boolean;
    updated_at: string;
    total_illustrations: number;
    total_promoted_illustrations: number;
    total_promoted_photos: number;
  };
  exif: {
    make: string;
    model: string;
    name: string;
    exposure_time: string;
    aperture: string;
    focal_length: string;
    iso: number;
  };
  location: {
    city: string;
    country: string;
    name: string;
    position: {
      latitude: number;
      longitude: number;
    };
  };
  downloads: number;
  views: number;
  topic_submissions: Record<string, unknown>;
  current_user_collections: any[];
  alternative_slugs: {
    [lang: string]: string;
  };
  slug: string;
}
