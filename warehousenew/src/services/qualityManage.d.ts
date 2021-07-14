import { Paging } from './common.d';
interface Params {
  /**
   *  1.批次号。2.入库单号。3.变体sku
   */
  queryType?: string;
  /**
   * type对应的搜索值
   */
  queryTypeValue?: string;
  /**
   * type对应的搜索值
   */
  status?: string;
  /**
   *   开始时间
   */
  beginDate?: string;
  /**
   * 结束时间
   */
  endDate?: string;

  // 仓库id
  storageId: string;

  containerNum: string;
}
export declare namespace GetList {
  export interface Request {
    /**
     * 每页条数
     */
    pageSize: number;
    /**
     * 当前页码
     */
    pageNum: number;
    data: Params;
  }

  export type Response = Paging;
}

export declare namespace GetInspectDetails {
  export interface Request {
    batchNumber: number;
    containerNum: string; //容器编号

    /**是否二次质检 */
    secondInspection?: number;
  }

  export type Response = Paging;
}

// 质检补打
export declare namespace QualityMakeup {
  export interface Request {
    /**
     * 补打数量
     */
    subStandardQuantity: string;
    /**
     * 批次号
     */
    batchNumber: string;
    /**
     * sku
     */
    sku: string;
    /**
     * 短码
     */
    shotNum: string;
    /**
     * 商品属性
     */
    variantKeyMap: string;
  }

  export type Response = string;
}

// 质检确认
export declare namespace QualityConfirm {
  export interface Request {
    /**
     * 质检id
     */
    id: string;
    /**
     * 容器编号
     */
    containerNum: string;
    /**
     * 质检数量
     */
    inspectionQuantity: number;
    /**
     * 合格数量
     */
    qualifiedQuantity: number;
    /**
     * 是否生成称重单，0生成称重单，1不生成
     */
    isCreateWeigh: string;
    /**
     * 质检人
     */
    updateBy: string;
    /**
     * 入库单号
     */
    putStorageNumber: string;

    /**是否二次质检 */
    secondInspection?: number;
  }

  export type Response = string;
}

// 质检采购单打印
export declare namespace PrintOrder {
  export interface Request {
    /**
     * 订单号/包裹入库序号
     */
    orderNumber: string;
  }

  export type Response = string;
}

// 质检异常新增
export declare namespace AddException {
  export interface Request {
    relatedId: number; //关联主键i
    productId: string; //商品id
    variantId: string; //变体id
    sku: string; //变体sku
    batchNumber: string; //批次号
    image: string; //sku图片
    putStoragNumber: string; //入库编号
    type: number; //0：签收异常，1：分标异常，2：质检异常，4：称重异常，5：上架异常
    quantity: number; //异常数量=实际数量-合格数量
    unexceptionQuantity: number; //无异常数量或合格数量
    expectQuantity: number; //预计到货数量
    realQuantity: number; //实际数量
    colorNum: number; //颜色问题数量
    colorRemark: string; //颜色问题备注
    sizeNum: number; //尺寸问题数量
    sizeRemark: string; //尺寸问题备注
    abnormalPartsNum: number; //异常件数量
    abnormalPartsRemark: string; //异常件备注
    storageId: string; //仓库ID
    usedContainerNum: string; //容器ID
  }

  export type Response = string;
}

// 质检次品、多货打印
export declare namespace MakeUpByReceiptInspect {
  export interface Request {
    /**
     * 数量
     */
    subStandardQuantity: number;
    /**
     * sku
     */
    sku: string;
    /**
     * 短码
     */
    shotNum: string;
    /**批次类型 3, 质检次品,4,质检多货 */
    batchNumberType: number;
    /**变体ID */
    variantId: string;
    /**入库单号 */
    putStorageNumber: string;
    variantKeyMap: string;
  }

  export type Response = string;
}

// 打印批次号
export declare namespace PrintBatchNumber {
  export interface Request {
    /**
     * 数量
     */
    subStandardQuantity: number;

    /**批次号 */
    batchNumber: string;
  }

  export type Response = string;
}

// 越库批次号打印
export declare namespace GetSkipOrderBatchPrintByBatchNum {
  export interface Request {
    /**
     * 越库批次号
     */
    ids: Array<string>;
  }

  export type Response = string;
}
