import { PagingRequest, Paging } from './common.d';

export declare namespace GetList {
  export type Request = PagingRequest<{
    /**商品SKU */
    variantSku?: string;

    /**变体短码 */
    variantNum?: string;

    /**批次号 */
    batchId: string;

    /**仓库 */
    storehouseId?: string;

    /**打包人 */
    createBy: string;

    /**订单号 */
    orderId: string;

    /**运单号 */
    trackingNumber: string;

    /**抵扣库位 */
    locationName: string;

    /**打包时间开始 */
    sTime?: string;

    /**打包时间结束 */
    eTime?: string;
  }>;
  export type Response = Paging<{
    /**变体图片 */
    image: string;
    /**主键id*/
    id?: string;
    /**仓库打包记录表ID*/
    storehousePackId?: string;
    /**包裹编号*/
    packCode?: string;
    /**订单编号*/
    orderId?: string;
    /**变体ID*/
    variantId?: string;
    /**变体sku*/
    variantSku?: string;
    /**变体短码*/
    variantNum?: string;
    /**变体图片*/
    variantImg?: string;
    /**分拣商品数量*/
    orderQuantity?: string;
    /**已验单数量*/
    processedQuantity?: string;
    /**仓库ID*/
    storehouseId?: string;
    /**创建人id*/
    createId?: string;
    /**创建人名称*/
    createBy?: string;
    /**创建时间*/
    createAt?: string;
    /**重量（当前SKU对应的总重量）*/
    weight?: string;
    /**商品名称*/
    productName?: string;
    /**海关编码*/
    entryCode?: string;
    /**商品中文名*/
    cjProductNameCn?: string;
    /**商品英文名*/
    cjProductNameEn?: string;
    /**规格*/
    standard?: string;
    /**属性*/
    property?: string;
    /**折扣价*/
    discountPrice?: string;
    /**出库单详情id*/
    orderDetailId?: string;
    /**分拣容器*/
    sortedContainer?: string;
    /**变体属性*/
    variantKeyMap?: string;
    /**追踪号*/
    trackingNumber?: string;
    /**批次号*/
    batchId?: string;
    /**抵扣库位*/
    locationName?: string;
    /**货主信息*/
    customerInfo?: string;

    /**是否服务商品  1否 2是*/
    isServerProduct: number;
  }>;
}
