import { Paging } from './common.d';

export declare namespace GetList {
  export interface Request {
    /**
     * 0 -待处理 1-已放弃 2-已处理 3-已完成
     */
    status: number;
    /**
     * 异常单号
     */
    exceptionNum?: string;
    /**
     * 创建时间开始
     */
    startCreateDate?: number;
    /**
     * 创建时间结束
     */
    endCreateDate?: number;
    /**
     * 异常单据
     */
    exceptionSource?: number;
    /**
     * 异常类型：1：多货、2：少货、3：异常
     */
    type?: number;
    /**
     * sku
     */
    sku?: string;
    /**
     * 短码
     */
    shortNum?: string;
    /**
     * 入库编号
     */
    putStorageNumber?: string;
    /**
     * 创建人
     */
    createBy?: string;
    /**
     * 物流追踪号
     */
    logisticsTrackingNumber?: string;
    /**
     * 批次号
     */
    batchNumber?: string;
    page: number;
    size: number;
  }
  export type Response = Paging;
}

interface DealCom {
  /**
   * 处理方式
   */
  processType: number;
  /**
   * 新增还是修改 （0 新增  ， 1 修改）
   */
  addOrUpdate: number;
  /**
   * 创建人
   */
  createBy?: string;
  /**
   * 入库异常记录ID
   */
  receiptExceptionRecordId: number;
  /**
   * 采购异常id
   */
  purchaseExceptionRecordId: number;
}

export declare namespace DealReissue {
  export interface Request extends DealCom {
    /**
     * 物流公司
     */
    logisticsCompany: string;
    /**
     * 物流追踪号
     */
    logisticsTrackingNumber: string;
  }
}
export declare namespace DealRefund {
  export interface Request extends DealCom {
    /**
     * 退款金额
     */
    refundAmount: number;
    /**
     * 退款凭证，格式数组
     */
    refundCertificate?: Array<any>;
  }
}
export declare namespace DealReturnAndRefund {
  export interface Request extends DealCom {
    /**
     * 物流公司
     */
    logisticsCompany?: string;
    /**
     * 退货追踪号
     */
    returnTrackingNumber?: string;
    /**
     * 联系方式
     */
    phone?: string;
    /**
     * 收货人
     */
    consignee?: string;
    /**
     * 退货数量
     */
    returnNum?: number;
    /**
     * 退货地址
     */
    returnAddress?: string;
    /**
     * 备注
     */
    remark?: string;
  }
}
export declare namespace DealPartsReissue {
  export interface Request extends DealCom {
    /**
     * 物流公司
     */
    logisticsCompany: string;
    /**
     * 物流追踪号
     */
    logisticsTrackingNumber: string;
  }
}
export declare namespace DealReturnAndChange {
  export interface Request extends DealCom {
    /**
     * 物流公司
     */
    logisticsCompany?: string;
    /**
     * 退货追踪号
     */
    returnTrackingNumber?: string;
    /**
     * 联系方式
     */
    phone?: string;
    /**
     * 收货人
     */
    consignee?: string;
    /**
     * 退货数量
     */
    returnNum?: number;
    /**
     * 退货地址
     */
    returnAddress?: string;
    /**
     * 备注
     */
    remark?: string;
    /**
     * 换货物流公司
     */
    changeLogisticsCompany?: string;
    /**
     * 换货物流追踪号
     */
    changeLogisticsTrackingNumber?: string;
  }
}
export declare namespace DealQualified {
  export interface Request extends DealCom {
    /**
     * 备注
     */
    remark?: string;
  }
}
export declare namespace DealSKUChange {
  export interface Request extends DealCom {
    /**
     * 更改后的sku
     */
    sku: string;
    /**
     * 备注
     */
    remark: string;
  }
}
export declare namespace DealSignPart {
  export interface Request extends DealCom {
    /**
     * 物流公司
     */
    logisticsCompany: string;
    /**
     * 物流追踪号
     */
    logisticsTrackingNumber: string;
  }
}

export declare namespace DetailForDeal {
  export interface Request {
    /**
     * 异常单号
     */
    exceptionNum: string;
  }
}

export declare namespace Confirm {
  export interface Request {
    /**
     * id 集合
     */
    purchaseExceptionRecordIdList: Array<number>;
    /**
     * 状态 0 -待处理 1-处理中 2-已处理 3-已放弃 4-已完成
     */
    status: number;
    /**
     * 备注
     */
    remark: string;
  }
}

export declare namespace ValidateSku {
  export interface Request {
    /**
     * id 集合
     */
    ids: Array<string>;
  }
}
