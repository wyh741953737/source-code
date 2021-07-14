import { Paging } from './common.d';

export declare namespace GetList {
  interface Data {
    /**
     * SKU_ID
     */
    sku?: string;
    /**
     * 短码
     */
    shortCode?: string;
    /**
     * 仓库Id
     */
    storehouseId?: string;
    /**
     * 货主编号
     */
    customerId?: string;
    /**
     * 货主名称
     */
    customerName?: string;
    /**
     * 容器编号
     */
    containerNum?: string;
    /**
     * 库存类型1：正品，2：次品，2：异常品
     */
    type?: number;
    /**
     * 批次
     */
    batchNumber?: string;
    /**
     * 库区
     */
    field_4?: string;

    /**
     * 商品sku
     */
    productSku: string;
  }

  export interface Request {
    data: Data;
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

export declare namespace GetDetail {
  export interface Request {
    /**
     * 库存Id
     */
    id: string;
  }

  export interface Response {
    /**
     *  批次
     */
    batchReturnDTOS: Array<{
      /**
       * 商品
       */
      sku: string;
      /**
       * 批次号
       */
      batchNumber: string;
      /**
       * 可用数
       */
      availableQuantity: string;
      /**
       * 冻结数
       */
      frozenQuantity: string;
      /**
       * 占用数
       */
      useQuantity: string;
    }>;
    /**
     * 订单占用
     */
    batchUseReturnDTOS: Array<{
      /**
       * 订单号
       */
      useNumber: string;
      /**
       * sku
       */
      sku: string;
      /**
       * 占用数量
       */
      useQuantity: string;
      /**
       * 占用时间
       */
      createAt: string;
    }>;
  }
}

export declare namespace CommonExport {
  type Request = {
    /**
     * SKU_ID
     */
    sku?: string;
    /**
     * 短码
     */
    shortCode?: string;
    /**
     * 仓库Id
     */
    storehouseId?: string;
    /**
     * 货主编号
     */
    customerId?: string;
    /**
     * 货主名称
     */
    customerName?: string;
    /**
     * 容器编号
     */
    containerNum?: string;
    /**
     * 库存类型1：正品，2：次品，2：异常品
     */
    type?: number;
    /**
     * 批次
     */
    batchNumber?: string;
    /**
     * 库区
     */
    field_4?: string;

    /**
     * 商品sku
     */
    productSku: string;
  };
}
