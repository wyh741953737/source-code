import { PagingRequest, Paging } from './common.d';

export declare namespace GetList {
  export type Request = {
    data: {
      /**SKU */
      variantSku?: string;

      /**商品SKU */
      productSku?: string;

      /**变体短码 */
      variantNum?: string;

      /**仓库 */
      storehouseId?: string;

      /**上架人 */
      createBy?: string;

      /**上架位置 */
      locationName: string;

      /**批次号 */
      batchNumber: string;
    };

    /**上架时间开始 */
    beginDate?: string;

    /**上架时间结束 */
    endDate?: string;
    pageNum: number;

    pageSize: number;
  };
  export type Response = Paging<{
    /**变体图片 */
    variantImg: string;
    /**变体sku */
    variantSku: string;
    /**变体短码 */
    variantNum: string;
    /**
     * 变体属性
     */
    variantKeyMap: string;
    /**
     * 批次号
     */
    batchNumber: string;
    /**仓库名称 */
    storageName: string;
    /**仓库id */
    storehouseId: string;
    /**入库数量 */
    quantity: number;
    /**
     * 库位名称
     */
    locationName: string;
    /**货主名称 */
    customerName: string;
    /**
     * 是否服务商品: 1.否，2.是
     */
    isServiceGoods: number;
    /**上架单号 */
    onShelfNum: string;
    /**
     * 上架人
     */
    createBy: string;
    /**上架车 */
    containerNum: string;
    /**上架时间 */
    createAt: string;
    /**剩余可用库存 */
    remainQuantity: string;
  }>;
}
