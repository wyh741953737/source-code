export interface OptionData {
  value: string;
  key: string;
}

export interface OptionsType {
  id: string;
  name: string;
}

// 类目树
export interface AllCategories {
  id: string;
  nameEn: string;
  nameVal: string;
  pid: string;
  children: AllCategories[];
}
// 地区type
export interface CountryType {
  /** 地区中文名 */
  areaCn: string;
  /** 地区中文名 */
  areaEn: string;
  /** 地区英文 */
  areaId: string;
  /** 地区中文名 */
  countryCode: string;
  /** 地区中文名 */
  nameEn: string;
}
