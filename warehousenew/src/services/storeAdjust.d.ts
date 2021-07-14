import { Paging, PagingRequest } from './common.d';

export declare namespace GetList {
  export interface Request
    extends PagingRequest<{
      /**
       * 变体sku
       */
      variantSku: string;
      /**
       * 仓库id
       */
      storehouseId: string;
      /**
       * 库位名称
       */
      locationName: string;
      /**
       * 状态：1待处理，2已调整，3已放弃
       */
      status: number;
      /**
       * 创建人名称
       */
      createBy: string;
      /**
       * 调整人
       */
      updateBy: string;
      /**
       * 调整单号集合
       */
      alterCodes: string[];
    }> {
    /**
     * 调整起始时间
     */
    secondBeginDate?: string;
    /**
     * 调整结束时间
     */
    secondEndDate?: string;
  }
  export type Response = Paging;
}
export declare namespace GiveUp {
  export interface Request {
    inventoryAlterDTOS: { id: string | number }[];
  }
}
export declare namespace Adjust {
  export interface Request {
    inventoryAlterDTOS: { id: string | number }[];
  }
}
export declare namespace Add {
  export interface Request {
    /**
     * to目标数量（调整数量）
     */
    alterQuantity: number;
    /**
     * 调整原因（备注）
     */
    remark: string;
    /**
     * 库存明细批次表主键id
     */
    id: string;

    /**指定抵扣订单 */
    orderInfo: string;
  }
}

export declare namespace PrintProductCode {
  export interface Request {
    /**
     * 主键id
     */
    storehouseInventoryInfoId: number;
    /**
     * 数量
     */
    quantity: number;
  }
}
