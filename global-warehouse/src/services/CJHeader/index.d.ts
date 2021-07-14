type flg = 0 | 1;

interface CountryObj {
  /** 国家代号 */
  ID: string;
  /** 国家中文名 */
  NAME: string;
  /** 国家英文名 */
  NAME_EN: string;
  /** 货币 */
  currency: string;
}

interface SymbolObj {
  /** 货币名称 */
  NAME: string;
  /** 货币英文代号 */
  currency: string;
  /** 货币符号 */
  symbol: string;
}

/** 获取国家信息 */
export declare namespace GetCurrency {
  /** 获取国家列表，货币，当前IP国家，币种符号， 对应字段为0时接口不返回该字段 */
  interface Request {
    /** 国家列表 */
    countryList?: flg;
    /** 货币 */
    currency?: flg;
    /** 当前IP国家 */
    currentCountry?: flg;
    /** 币种符号 */
    symbol?: flg;
  }
  /** 响应数据 */
  interface Response {
    /** 国家列表 */
    countryList?: Array<CountryObj>;
    /** 货币 */
    currency?: string;
    /** 当前国家 */
    currentCountry?: {
      /** 国家代号 */
      ID: string;
      /** 国家中文名 */
      NAME: string;
      /** 国家英文名 */
      NAME_EN: string;
      /** 货币 */
      currency: string;
    }; // 当前IP国家
    /** 带货币符号的国家列表 */
    symbol?: SymbolObj[];
  }
}

interface CountryItem {
  areaEn: string;
}

/** 获取国家列表 */
export declare namespace GetCountryList {
  /** 请求参数 */
  interface Request {
    /** 语言 */
    language: string;
  }
  /** 响应数据 */
  type Response = Array<CountryItem>;
}

interface WarehouseItem {
  en: string;
  value: string;
}
/** 获取仓库列表 */
export declare namespace GetWareHouseWorlds {
  /** 请求参数 */
  interface Request {
    /** 语言 */
    language: string;
  }
  /** 响应数据 */
  type Response = Array<WarehouseItem>;
}

interface AllMenuItem {
  /** 菜单链接 */
  href: string;
  [name: string]: any;
}

/** CJWEB所有菜单 */
export declare namespace GetAllMenu {
  type Response = Array<AllMenuItem>;
}

interface UserMenusItem {
  /** 菜单链接 */
  href: string;
  [name: string]: any;
}

/** 用户授权的菜单 */
export declare namespace UserMenus {
  type Response = Array<UserMenusItem>;
}

/** 获取供应商评价数量 */
export declare namespace SupplierCount {
  interface Response {
    /** 供应商评价数量 */
    count: number;
  }
}
