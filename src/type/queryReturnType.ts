export type CountryBasicInfo = Record<string, string>;

export type CountryInfoGetType = {
  basic: CountryBasicInfo;
  continent: string;
  countryEnName: string;
  countryName: string;
  id: string;
  imgUrl: string;
  wrtDt: string;
};

export type CountryFlagGetType = {
  content_ty: string | null;
  country_eng_nm: string;
  country_iso_alp2: string;
  country_nm: string;
  download_url: string;
  origin_file_nm: string;
};
