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
