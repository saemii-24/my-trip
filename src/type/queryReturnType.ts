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

export interface TravelAdvisoryItemGetType {
  continent_cd: string;
  continent_eng_nm: string;
  continent_nm: string;
  country_eng_nm: string;
  country_iso_alp2: string;
  country_nm: string;
  ctgy_nm: string;
  file_download_url: string;
  file_path: string | null;
  other_country_cnt: number;
  other_country_iso_alp2: string | null;
  sfty_notice_id: string;
  sfty_notice_lv: number;
  sfty_notice_origin_id: number;
  title: string;
  txt_origin_cn: string;
  wrt_dt: string;
}
