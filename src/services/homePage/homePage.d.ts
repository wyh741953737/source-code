/** 基础入参 */
export declare namespace Ibase {
  export interface Request {
    /**
     * 请求参数
     */
    data?: object;
    /**
     * 页码数
     */
    pageNum?: number;
    /**
     * 每页条数
     */
    pageSize?: number;
  }

  /** 基础出参 */
  export interface Response {
    /**
     * 返回参数
     */
    data: any;
    /**
     * 返回状态
     */
    success: boolean;
    /**
     * 返回信息
     */
    message: string;
    /**
     * 状态码
     */
    code: number;
  }
}

/** banner图列表 */
export declare namespace BannerList {
  export interface Request extends Ibase.Request {
    /** 仓库标志 */
    warehouse: string;
  }
  export interface Response {
    list: BannerType[];
  }
}
export interface BannerType {
  id: string;
  /** 图片链接 */
  image: string;
  /** 标题 */
  title: string;
  /** 仓库标志 */
  warehouse: string;
}

/** 全球仓搜索 */
export declare namespace SearchList {
  export interface Request extends Ibase.Request {
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
  export interface Response {
    content: ContentType[];
    pageSize: number;
    pageNumber: number;
    totalRecords: number;
    totalPages: number;
  }
}

export interface ContentType {
  /** 商品列表 */
  productList: ProductList[];
  /** 商品类型列表 */
  categoryList: any[];
  /** 关联类目-三级类目 */
  relatedCategoryList: ThirdCategoriesList[];
  /** 仓库列表 */
  storeList: any[];
}
export interface ProductList {
  /** 商品id */
  id: string;
  /** 商品名称 */
  nameEn: string;
  /** 是否收藏 0-未收藏 1-已收藏 */
  isCollect: string;
  /** 刊登数 */
  listedNum: string;
  /** 默认图片 */
  bigImage: string;
  /** 售卖价 */
  sellPrice: string;
  /** 当前价格 */
  nowPrice: string;
  /** 是否包邮 0-否 1-是 */
  addMarkStatus: number;
  /** 是否视频商品 */
  isVedio: number;
  /** 是否永久私有 1 是 0 否 */
  isAut: string;
  /** 商品类型 ：0正常商品  1服务商品  3包装商品  4供应商商品   5供应商自发货商品  6虚拟商品   7个性商品   */
  productType: string;
}
export interface ThirdCategoriesList {
  id: string;
  name: string;
}
/** 查询热门分类（最多六个商品） */
export declare namespace CategoriesList {
  export interface Request {
    /** 仓库 */
    warehouse: string;
  }
  export interface Response {
    /** 热门分类一级类目列表 */
    list: CateList[];
  }
}
export interface CateList {
  id: string;
  dspId: string; // dsp id 保持和cj 一致用的 传参用这个
  code: string;
  name: Language[];
  nameLanguageJson: Language[];
  currentLevel: number;
}
interface Language {
  name: string;
  language: string;
}
/** 获取类目树 */
export declare namespace CategoriesTree {
  export interface Request {
    pid: string;
  }
  export type Response = string;
}
/** 首页其他信息 */
export declare namespace HomePageInfo {
  export interface Request {
    warehouse: string;
  }
  interface Response {
    id: string;
    warehouse: string; // 仓库标志（国家id即二级域名前边的部分，例如：US）
    title: string; // 标题
    subtitle: string; // 副标题
    webTitle: string; // 网站标题
    seoKeyword: string; // seo关键字
    seoDescription: string; // seo描述
  }
}
/** 查询推荐商品 */
export declare namespace RecommendList {
  export interface Request {
    warehouse: string;
  }
  export interface Response {
    list: RecommendListType[];
  }
}
export interface RecommendListType {
  id: string;
  nameEn: string;
  bigImage: string; // 图片链接
}

/** 获取下拉仓库的列表 国家标志 地区 id */

export declare namespace GetCountryArr {
  export type Response = CountryType[];
}
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
