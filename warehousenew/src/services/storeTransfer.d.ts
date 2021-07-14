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
       * 状态：1待处理，2已完成，3已放弃
       */
      status: number;
      /**
       * 创建人名称
       */
      createBy: string;
      /**
       * 转移人
       */
      updateBy: string;
      /**
       * 转移单号
       */
      transferCodes: string[];
    }> {
    /**
     * 转移起始时间
     */
    secondBeginDate?: string;
    /**
     * 转移结束时间
     */
    secondEndDate?: string;
  }
  export type Response = Paging;
}
export declare namespace GiveUp {
  export interface Request {
    inventoryTransferDTOS: { id: number | string }[];
  }
}
export declare namespace Transfer {
  export interface Request {
    inventoryTransferDTOS: { id: number | string }[];
  }
}
export declare namespace Abnormal {
  export interface Request {
    inventoryTransferDTOS: { id: number | string }[];
  }
}
export declare namespace Add {
  export interface Request {
    /**
     * 库存明细主键id
     */
    id: number;
    /**
     * 货主编号
     */
    cjNumber: string;
    /**
     * 库存类型转移：1正品，2残品
     */
    inventoryType: number;
    /**
     * 转移数量
     */
    quantity: number;

    /**
     * 备注
     */
    remark?: string;

    /**指定抵扣订单 */
    orderInfo: string;
  }
}
