import { Paging } from './common.d';
// 理货管理查询列表
export declare namespace GetList {
  interface Data {
    /**理货单号 */
    tallyNum?: string;

    /**类型：1：日常理货，2：商品下架理货 */
    type?: number;

    /**仓库ID */
    storehouseId?: string;

    /**状态：1：待处理，2：处理中，3：已完成，4：已放弃 */
    status?: number;

    /**创建人 */
    createBy?: string;

    /**理货来源1：手动创建，2：外部同步 */
    tallySource?: number;
  }
  export interface Request {
    data: Data;
    pageNum: number;
    pageSize: number;
    beginDate: string | undefined;
    endDate: string | undefined;
  }

  interface Detail {
    /**主键ID */
    id?: number;

    /**SKU */
    sku?: string;

    /**短码 */
    shortCode?: string;

    /**理货数量 */
    quantity?: number;

    /**货主名称 */
    customerName?: string;

    /**货主编号 */
    customerNum?: string;

    /**库位名称 */
    locationName?: string;

    /**目标库位名称 */
    toLocationName?: string;

    /**库存类型 1：正品，2次品 */
    type?: number;

    /**1：否，2：是(是否服务商品) */
    isServiceGoods?: string;

    /**实际理货数量 */
    realQuantity?: string;
  }
  export type Response = Paging<{
    /**主键ID */
    id?: number;

    /**理货单号 */
    tallyNum?: string;

    /**1：日常理货，2：商品下架理货 */
    type?: number;

    /**仓库ID */
    storehouseId?: string;

    /**仓库名称 */
    storehouseName?: string;

    /**1：待处理，2：处理中，3：已完成，4：已放弃 */
    status?: number;

    /**创建人 */
    createBy?: string;

    /**创建时间 */
    createAt?: string;

    /**理货来源1：手动创建，2：外部同步 */
    tallySource?: number;

    /**理货明细 */
    storehouseTallyVariantDTOList: Array<Detail>;
  }>;
}

// 理货放弃
export declare namespace GiveUp {
  export interface Request {
    /** 主键id集合*/
    ids?: Array<number | string>;
  }
  export type Response = boolean;
}

// 批量导入理货单明细
export declare namespace BatchImportTallyDetail {
  interface Data {
    /**sku */
    sku: string;

    /**理货数量 */
    quantity: number;

    /**货主编号 */
    customerNum: string;

    /**库位名称 */
    locationName: string;

    /**目标库位名称 */
    toLocationName: string;

    /**仓库名称 */
    storehouseName: string;

    /**库存类型：1：正品，2次品 */
    type: number;
  }
  export interface Request {
    storehouseTallyVariantDTOList: Array<Data>;
  }
  export type Response = {
    /** 成功数*/
    successNum: number;

    /** 失败数*/
    failuresNum: number;

    /**失败变体明细 */
    tallyVariantErrorLogVOS: Array<{
      /**主键ID */
      id: number;

      /**SKU */
      sku: string;

      /**短码 */
      shortCode: string;

      /**理货数量 */
      quantity: number;

      /**1：正品，2次品 */
      type: number;

      /**货主ID */
      customerId: string;

      /**货主名称 */
      customerName: string;

      /**货主编号 */
      customerNum: string;

      /**库位名称 */
      locationName: string;

      /**目标库位名称 */
      toLocationName: string;

      /**仓库名称 */
      storehouseName: string;

      /**失败原因 */
      failureCause: string;
    }>;
  };
}

// 新增理货单库存查询
export declare namespace AddTallySearch {
  export interface Request {
    /**仓库ID */
    storehouseId: string;

    /**sku/短码 */
    skuOrShort: string;

    /**库位 */
    location: string;
  }
  export type Response = {
    /**明细主键id*/
    id: number;

    /**变体ID*/
    variantId: string;

    /**变体sku */
    sku: string;

    /**库存类型：1：正品，2：次品，3：异常品，4：少货*/
    type: number;

    /**货主ID*/
    customerId: string;

    /**库位名称*/
    locationName: string;

    /**1：否，2：是*/
    isServiceGoods: number;

    /**实物数量*/
    realityQuantity: number;

    /**可用数量*/
    availableQuantity: number;

    /**冻结数量*/
    frozenQuantity: number;

    /**占用数量*/
    useQuantity: number;

    /**仓库名称*/
    storageName: string;

    /**短码*/
    shortCode: string;

    /**货主编号*/
    customerNum: string;
  };
}

// 新增理货单
export declare namespace AddTally {
  export interface Data {
    /**主键ID */
    id: number;

    /**理货数量 */
    quantity: number;

    /**目标库位名称 */
    toLocationName: string;
  }
  export interface Request {
    storehouseTallyVariantDTOList: Array<Data>;
    storehouseId: string;
  }
  export type Response = boolean;
}

/**生成批次 */
export declare namespace CreateBatchNumber {
  export interface Request {
    id: string | number;
  }
  export type Response = boolean;
}
