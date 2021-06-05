// 热门分类数据
export interface HotKinds {
  id: string;
  type: string;
  name: string;
  code?: string;
  dspId: string;
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
export interface OptionData {
  value: string;
  key: string;
}

export interface SearchParams {
  /** 当前页 */
  page: number;
  /** 当前条数 */
  size: number;
  /** 关键词 */
  keyWord?: string;
  /** 分类id */
  categoryId?: string;
  /** 仓库国家地区短码 */
  countryCode?: string;
  /** 商品类型 4-供应商商品  10-视频商品 */
  productType?: string;
  /** 售卖价格起始值 */
  startSellPrice?: string;
  /** 售卖价格结束值 */
  endSellPrice?: string;
  /** 0-不包邮 1-包邮 */
  addMarkStatus?: string;
  /** 排序字段 */
  sortByParam?: {
    /** 0-最匹配 1-刊登  2-价格 3-最新的 */
    feildType?: string;
    /** 0-降序 1-升序 */
    isAsc?: string;
  };
}
export interface BaseInfo {
  id?: string;
  /** 仓库标志（国家id即二级域名前边的部分，例如：US） */
  warehouse?: string;
  /** 标题 */
  title?: string;
  /** 图片链接 */
  image?: string;
  /** 副标题 */
  subtitle?: string;
  /** 网页标题 */
  webTitle?: string;
  /** seo关键字 */
  seoKeyword?: string;
  /** seo描述 */
  seoDescription?: string;
}
