import { Paging } from './common.d';
interface Params {
  /**
   * type对应的搜索值
   */
  queryType?: string;
  /**
   * 查询类型对应的值 1:入库单号；2:供货公司；3:包裹入库序号；4:追踪号；5:变体sku
   */
  queryTypeValue?: string;
  /**
   * 分标状态
   */
  subStandardStatus?: string;
  /**
   * 分标开始时间
   */
  beginDate?: string;
  /**
   * 分标结束时间
   */
  endDate?: string;

  // 仓库id
  storageId: string;
}
export declare namespace GetSubPage {
  export interface Request {
    pageNum: number;
    pageSize: number;
    data: Params;
  }

  export type Response = Paging;
}

export declare namespace GetDetail {
  export interface Request {
    /**
     * 入库单号
     */
    packageNumber: string;
    containerNum: string; //容器编号
  }

  export type Response = Paging<{
    /**
     * 图片链接/商品图片
     */
    image: string;

    /**
     * 商品sku
     */

    sku: string;
    /**
     * 采购类型/签收类型
     */

    purchaserType: number;
    /**
     * 签收仓库
     */

    storageName: string;
    /**
     * 预计到货数量
     */

    quantity: number;
    /**
     * 分标数量/实际数量
     */

    subStandardQuantity: number;
    /**
     * 合格数量
     */

    qualifiedQuantity: number;

    /**
     * 异常数量
     */

    num: number;
    /**
     * 0：多货，1：少货，2：颜色，3：尺寸，4：异常键
     */

    exceptionType: number;
    /**
     * 系统重量
     */

    systemWeight: string;
    /**
     * 抛货：0：否，1：是
     */

    isLarge: string;
    /**
     * 长
     */

    length: string;
    /**
     * 宽
     */

    width: string;
    /**
     * 高
     */

    height: string;
    /**
     * 分标表主键ID
     */

    id: string;
  }>;
}

// 分标确认
export declare namespace MinuteMarkConfirm {
  export interface Request {
    /**
     * 质检id
     */
    id: string;
    /**
     * 分标数量/实际数量
     */
    subStandardQuantity: number;
    /**
     * 合格数量
     */
    qualifiedQuantity: number;
    /**
     * 容器编号
     */
    containerNum: string;
    /**
     * 入库单号、运单号
     */
    packageNumber: string;
    /**
     * 入库单号
     */
    putStorageNumber: string;
    /**次品数量 */
    defectiveQuantity: number;
    /**多货数量 */
    multipleQuantity: number;
  }

  export type Response = string;
}

// 采购单打印
export declare namespace PrintOrder {
  export interface Request {
    /**
     * 订单号/包裹入库序号
     */
    orderNumber: string;
  }

  export type Response = string;
}

// sku打印
export declare namespace PrintSku {
  export interface Request {
    /**
     * 主键ID
     */
    id: string;
    /**1正品,2, 分标多货,3, 质检次品,4,质检多货，5称重多货,6分标次品 */
    batchNumberType: number; //打印批次类型
  }

  export type Response = string;
}

// 分标异常新增
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

// 补打sku
export declare namespace SupplementPrint {
  export interface Request {
    id: string; //关联主键i
    quantity: number; //商品id
  }

  export type Response = string;
}

/**分标新确认 */
export declare namespace MinuteMarkNewConfirm {
  interface confirmSubDTOSItem {
    /**分标表主键id */
    id: number;

    /**分标数量/实际数量	 */
    subStandardQuantity: number;

    /**合格数量 */
    qualifiedQuantity: number;

    /**次品数量defective  products*/
    defectiveQuantity: number;

    /**多货数量 */
    multipleQuantity: number;
  }

  interface getExceptionInfoDTOSItem {
    /**分标表  质检 称重表对应的主键id	*/
    relatedId: number;

    /**异常数量 */
    quantity: number;

    /**颜色问题数量 */
    colorNum: number;

    /**颜色问题备注 */
    colorRemark: string;

    /**尺寸问题数量 */
    sizeNum: number;

    /**尺寸问题备注 */
    sizeRemark: string;

    /**异常件数量 */
    abnormalPartsNum: number;

    /**异常件备注 */
    abnormalPartsRemark: string;
  }

  export type Request = {
    confirmSubDTOS: Array<confirmSubDTOSItem>;
    getExceptionInfoDTOS: Array<getExceptionInfoDTOSItem>;
    /**容器编号 */
    containerNum: string;

    /**仓库id */
    storageId: string;
  };

  export type Response = boolean;
}

/**分标单次确认-生成批次号 */
export declare namespace ConfirmSingleSub {
  type Request = {
    /**分标表主键id*/
    id: string;

    /**分标数量/实际数量*/
    subStandardQuantity: string;

    /**合格数量*/
    qualifiedQuantity: string;

    /**次品数量defective products*/
    defectiveQuantity: string;

    /**仓库id*/
    storageId: string | any;

    /**容器编号*/
    containerNum: string;
  };

  type Response = boolean;
}

/**撤回分标 */
export declare namespace RecallSub {
  type Request = {
    id: string;
  };

  type Response = boolean;
}

// 分标数据
interface ReceiptSubStandardDTO {
  id: string; //分标主键id
  putStorageNumber: string; //入库编号
  image: string; //商品图片
  sku: string; //商品sku
  storageId: string; //仓库id
  quantity: number; //预计到货数量
  qualifiedQuantity: number; //合格数量
  systemWeight: number; //系统重量
  length: number; //长
  width: number; //宽
  height: number; //高
  isLarge: number; //抛货：0：否，1：是
  productId: string; //商品id
  variantId: string; //变体id
  shotNum: string; //商品短码
  subStandardStatus: number; //0:待分标，1：已分标
  containerNum: string; //容器编号
  packageType: string; //包裹类型：0-普通包裹，1-个，2-包，3-供，4-包
  variantKeyMap: string; //变体属性
}
// pod订单数据
interface PodOrderList {
  id: string; //主键ID
  orderId: string; //订单号
  storehouseId: string; //仓库ID
  remarks: string; // 备注
  properties: string; // 个性化信息
  message: string; // 客户留言
  status: string; // 处理状态 0未处理 1 已处理
  podSku: string; //新生成的P开头短码
  putStorageNumber: string; // 入库编号
  customDesign: string; // SY订单导图包信息
  quantity: number; // 预计到货数量/到货数量
  qualifiedNum: number; // 合格数量
  defectiveNum: number; // 次品数量
  lackNum: number; // 缺少数量
}

// pod扫描包裹
export declare namespace PodOrderList {
  type Request = {
    number: string; // 包裹号
    storageId: string; // 仓库id
  };

  type Response = {
    receiptSubStandardDTO: Array<ReceiptSubStandardDTO>;
    podOrderList: Array<PodOrderList>;
  };
}

// 确定分标

export declare namespace SubmitPodOrder {
  type Request = {
    id: number; // 主键id
    subId: number; //分标id
    qualifiedNum: string; //合格数量
    defectiveNum: string; //次品数量
    lackNum: string; //少货数量
    onShelfNum: string; //上架单号
    containerNum: string; //容器编号
    // type: number; //1.定制商品确认，2.包装商品确认
    arrivalQuantity: number; //到货数量
    moreQuantity: number; //多货数量
    colourQuantity: number; // 颜色问题数量
    colourRemark: string; //颜色问题备注
    sizeQuantity: number; //尺寸问题数量
    sizeRemark: string; //尺寸问题备注
    abnormalQuantity: number; //异常件数量
    abnormalRemark: string; //异常件备注
  };

  type Response = {};
}

// 打印
export declare namespace PrintRequest {
  type Request = {
    id: string; // 主键id
    quantity?: number; //数量
  };
  type Response = {};
}
