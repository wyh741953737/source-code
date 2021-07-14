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
   *  0：待称重，1：已称重 / 不传值默认查所有
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
}
export declare namespace GetList {
  export interface Request {
    data: Params;

    /**
     * 每页条数
     */
    pageSize: number;
    /**
     * 当前页码
     */
    pageNum: number;
  }

  export type Response = Paging;
}

export declare namespace GetWeightDetails {
  export interface Request {
    batchNumber: number;
    containerNum: string; //容器编号
  }

  export type Response = Paging;
}

// 称重补打
export declare namespace WeightMakeup {
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
     * 变体属性
     */
    variantKeyMap: string;
  }

  export type Response = string;
}

// 称重确认
export declare namespace WeightConfirm {
  export interface Request {
    /**
     * 称重id
     */
    id: number;
    /**
     * 容器编号
     */
    containerNum: string;
    /**
     * 称重数量
     */
    weighQuantity: number;
    /**
     * 合格数量
     */
    qualifiedQuantity: number;
    /**
     * 实际重量
     */
    realityWeight: number;
    /**
     * 长
     */
    length: number;
    /**
     * 宽
     */
    width: number;
    /**
     * 高
     */
    height: number;
    /**
     * 称重人
     */
    updateBy: string;
    /**
     * 上架单号
     */
    onShelfNum: string;
    /**
     * 入库单号
     */
    putStorageNumber: string;
  }

  export type Response = string;
}

// 称重异常新增
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
    containerNum: string; //容器编号
  }

  export type Response = string;
}

// 称重扫描容器
export declare namespace ScanContainer {
  export interface Request {
    containerNum: string; //容器编号
    statusType: number; //状态类型
    isOnShelf: number; //是否生成上架单：0:不需要生成上架单;1:需要生成上架单
    onShelfNum: string; //上架单号
    storehouseId: string; //仓库id
    flag: boolean; //识别该容器是否释放还是绑定
  }

  export type Response = string;
}

// 称重修改重量
export declare namespace UpRealityWeight {
  export interface Request {
    realityWeight: string; //称重di
    systemPackingWeight?: string; //修改重量
    systemWeight?: string; //系统重量
    variantId: string; //变体ID
    productId: string; //商品ID
    batchNumber: string; //批次号
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
