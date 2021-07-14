import { Paging } from './common.d';

// 已签收代签收列表
export declare namespace GetParcelList {
  export interface Request {
    /**
     * 入库编号
     */
    putStorageNumber?: string;
    /**
     * 入库单物流单号id
     */
    id?: number;
    /**
     * 创建人
     */
    createBy?: string;
    /**
     * 供货商
     */
    supplier?: string;
    /**
     * 物流追踪号
     */
    logisticsTrackingNumber?: string; //
    /**
     * 变体sku
     */
    sku?: string; //
    /**
     * 创建时间开始
     */
    startCreateDate?: string; //
    /**
     * 创建时间结束
     */

    endCreateDate?: string; //
    /**
     * 签收类型
     */
    signInType: string; //
    /**
     * 代签收 or 已签收 (0 代签收 ， 1 已签收)
     */
    signInStatus?: string;
    /**
     *  仓库ID
     */
    storageId: string;
    page: number;
    size: number;

    batchNumber: string;
    /**
     * 采购单号
     */
    orderNumber: string;
  }

  export type Response = Paging;
}

// 包裹签收操作
export declare namespace GetReceiptList {
  export interface Request {
    /**
     * 物流追踪号
     */
    logisticsTrackingNumber?: string;
    /**
     * 仓库id
     */
    storageId?: number;
  }
  // 普通商品签收
  interface ReceiptList {
    /**商品id */
    productId?: string;

    /**变体id */
    variantId?: string;

    /**变体sku */
    sku?: string;

    /**预计到货数量 */
    quantity?: number;

    /**0：在途，1：部分入库,3：已入库,4：异常	 */
    status?: number;

    /**入库编号 */
    putStorageNumber?: string;

    /**商品图片 */
    image?: string;

    /**短码 */
    shotNum?: string;

    /**仓库id */
    storageId?: string;

    /**仓库名称 */
    storageName?: string;

    /**1：采购入库，2：调货入库，3：客户退回入库，4：货代退回入库，5：服务商品入库，6：供应商商品入库 */
    type?: number;

    /**包裹类型：0-普通包裹，1-个，2-包，3-供，4-包 */
    packageType?: number;

    /**订单号 */
    orderNumber?: string;

    /**供货商 */
    supplier?: string;

    /**备注 */
    remark?: string;

    /**采购人 */
    purchaser?: string;

    /**货主 */
    ownerGoods?: string;

    /**采购类型：0：非1688API，1：1688API，2：淘宝，3：天猫，4：线下 */
    purchaserType?: number;

    /**物流追中号 */
    logisticsTrackingNumber?: string;
  }

  // 服务商品

  interface Detail {
    /**入库单详情信息id */
    id?: number;

    // 图片
    image: string;
    /**变体sku */
    sku?: string;

    /**预计到货数量 */
    quantity?: number;

    /**损坏数量 （服务商品使用） */
    damagedQuantity?: number;
  }
  interface PackageList {
    /**商品名称 */
    productName?: string;

    /**仓库名称 */
    storageName?: string;

    /**批次号 */
    batchNumber?: string;

    /**物流追踪号 */
    logisticsTrackingNumber?: string;

    /**数量 */
    quantity?: number;

    /**业务员姓名 */
    salesmanName?: string;

    /**客户名称 */
    customerName?: string;

    /**发货时间 */
    deliveryTime?: string;

    /**粘贴费 */
    pasteFee?: string;

    /**质检费 */
    inspectionFee?: string;

    /**清点费 */
    countingFee?: string;

    /**处理费 */
    processingFee?: string;

    /**滞留费 */
    detentionFee?: string;

    /**装卸费 */
    loadingFee?: string;

    detailsList?: Array<Detail>;
  }

  export type Response = {
    receiptProductList: Array<ReceiptList>;
    packageResult: PackageList;
  };
}

// 打印运单号
export declare namespace PrintOrder {
  export interface Request {
    /**
     * 订单号/包裹入库序号
     */
    orderNumber: string;
  }

  export type Response = string;
}

// 服务商品确认

export declare namespace ServiceProductConfirm {
  interface detailsDTOS {
    /**入库单详情信息id */
    id: number;

    /**预计到货数量 */
    quantity: number;

    /**损坏数量 （服务商品使用） */
    damagedQuantity: number;
  }
  export type Request = {
    /** 1 签收 or 2 拒绝 */
    type: number;

    /**入库编号 */
    logisticsTrackingNumber: string;

    /**仓库di */
    storageId: string;

    detailsDTOS: Array<detailsDTOS>;
  };

  export type Response = boolean;
}

// 获取最新物流信息

export declare namespace GetNewLogisticInfo {
  export type Request = {
    /**订单编号 */
    orderNumber: number;
  };

  export type Response = boolean;
}
