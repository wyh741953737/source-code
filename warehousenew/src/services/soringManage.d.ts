import { PagingRequest, Paging } from './common.d';

export declare namespace GetList {
  export type Request = PagingRequest<{
    /**仓库id */
    storehouseId?: string;

    /**批次 */
    batchId?: string;

    /**变体短码 */
    variantNum?: string;

    /**变体sku */
    variantSku?: string;

    /**拣货容器编号 */
    containerNum?: string;

    /**分拣人 */
    sortedBy?: string;

    /**分拣状态：0.待分拣，1.已分拣 */
    sortingStatus?: string;
    /**分拣容器 */
    sortedContainer: string;
  }>;
  export type Response = Paging;
}

export declare namespace GetDetail {
  export type Request = {
    id: string;
  };

  export type Response = Array<{
    /**出库单号 */
    outboundOrder: string;

    /**已分拣数 */
    sortedQuantity: number;

    /**商品数量 */
    outputQuantity: number;

    /**单据类型 出库单类型 1 代发单 2 直发单 3 调拨出库单 */
    type: number;

    sortedSkuDTOS: Array<{
      /**出库单详情id */
      id: string;

      /**变体短码 */
      variantNum: string;

      /**变体sku */
      variantSku: string;

      /**变体图片 */
      variantImg: string;

      /**商品数量  等于出库单的数量*/
      quantity: number;

      /**已分拣数 */
      sortedSkuQuantity: number;
    }>;
  }>;
}
