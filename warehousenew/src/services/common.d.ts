export interface PagingRequest<T = {}> {
  data?: T;
  pageNum: number;
  pageSize: number;
  beginDate?: string;
  endDate?: string;
}
export interface Paging<T = {}> {
  /**
   * 请求条数
   */
  pageSize: number;
  /**
   * 当前页面
   */
  pageNumber: number;
  /**
   * 总记录数
   */
  totalRecords: number;
  /**
   * 记录列表
   */
  content: Array<T>;
}
export declare namespace GetWarehouse {
  export interface Request {
    /**
     * 区域id
     */
    areaId?: number;
    /**
     * 仓库类型 0测试 1真实 2虚拟 3SAAS仓
     */
    useStorageType?: number;
    /**
     * 供应商是否可以发货到该仓库(0、否，1、是)
     */
    suppliersWillBeAbleToDeliver?: number;
    /**
     * 该仓库是否有采购权限(0、否，1、是)
     */
    purchasingAuthority?: number;
    /**
     * 是否需要VIP才能购买私有库存(0、否，1、是)
     */
    vipPrivateStockToBuy?: number;
    /**
     * 是否允许放服务商品 0 否 1是
     */
    placeServerProduct?: number;
    /**
     * 是否允许放私有商品 0否 1是
     */
    placePrivateProduct?: number;
    /**
     * 仓库状态(0,删除，1、禁用，2 启用)
     */
    isDelete?: number;
  }
  export interface Response {
    /**
     * 仓库id
     */
    id: string;
    /**
     * 仓库名称
     */
    storageName: string;
  }
}
export declare namespace CategoryApply {
  export interface Response {
    /**
     * 类目id
     */
    id: string;
    /**
     * 名称
     */
    name: string;
  }
}
export declare namespace GetAreaById {
  export interface Request {
    /**
     * 仓库ID
     */
    storehouseId: string;
  }
  export type Response = Array<{
    /**
     * id
     */
    id: number;
    /**
     * 库区名称
     */
    areaName: string;
  }>;
}
export declare namespace GetLog {
  export interface Request {
    /**
     * 订单号/包裹入库序号
     */
    ids: Array<any>;
  }

  export interface Response {
    /**
     * 主键ID
     */
    id?: number;
    /**
     * 订单id
     */
    orderId?: string;
    /**
     * 操作人ID
     */
    operateId?: string;
    /**
     * 操作人名字
     */
    operateName?: string;
    /**
     * 操作时间
     */
    operateTime?: string;
    /**
     * 操作描述
     */
    description?: string;
    /**
     * 批次号
     */
    batchNum?: string;
    /**
     * 1签收 2分表。。。。
     */
    type?: string;
  }
}

// 扫描容器
export declare namespace ScanContainer {
  export interface Request {
    containerNum: string; //容器编号
    statusType: number; //状态类型
    isOnShelf: number; //是否生成上架单：0:不需要生成上架单;1:需要生成上架单
    storehouseId: string; //仓库id
    flag: boolean; //识别该容器是否释放还是绑定
  }

  export type Response = {
    /**
     * 返回是否正确 true || false
     */
    success: boolean;
    /**
     * 操作结果
     */
    data: string;
    /**
     * 返回的code
     */
    code: number;
    /**
     * 返回的错误信息说明
     */
    message: string;
  };
}

export declare namespace SearchCustomer {
  export interface Request {
    /**
     * 客户id
     */
    id?: string;
    /**
     * 客户名称
     */
    name?: string;
  }
  export type Response = Array<{
    /**
     * 客户id
     */
    oldId: string;
    /**
     * 客户姓名
     */
    name: string;
    /**
     * 客户登录名
     */
    loginName: string;
    /**
     * 客户编号
     */
    number: string;
  }>;
}
export declare namespace SearchLogistics {
  export interface Request {
    /**
     * 物流id
     */
    id?: string;
    /**
     * 物流名称
     */
    name?: string;
  }
  export type Response = Array<{
    /**
     * 渠道id
     */
    id: number;
    /**
     * 渠道中文名
     */
    cnName: string;
    /**
     * 渠道英文名
     */
    enName: string;
  }>;
}
