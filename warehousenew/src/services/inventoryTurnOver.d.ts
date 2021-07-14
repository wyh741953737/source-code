import { PagingRequest, Paging } from './common.d';
export declare namespace GetList {
  export type Request = PagingRequest<{
    /**仓库id */
    storehouseId: string;

    /**变体ID */
    variantId: string;

    /**sku */
    sku: string;

    /**短码 */
    shortCode: string;

    /**折扣天数 */
    notDeductionDay: number;

    /**最近抵扣时间 */
    lastDeductionAt: string;

    /**货主姓名 */
    customerName: string;

    /**库存量（上限） */
    startAvailableQuantity: number;

    /**库存量（下限） */
    endAvailableQuantity: number;

    /**周出库量 */
    weekOutQuantity: number;

    /**近一个月出库量 */
    monthOutQuantity: number;

    /**近三个月出库量 */
    threeMonthOutQuantity: number;

    /**周库存周转天数（上限） */
    startWeekTurnoverDay: number;

    /**周库存周转天数（下限） */
    endWeekTurnoverDay: number;

    /**近一个月库存周转天数（上限） */
    startMonthTurnoverDay: number;

    /**近一个月周库存周转天数（下限） */
    endMonthTurnoverDay: number;

    /**近三个月周库存周转天数（上限） */
    startThreeMonthTurnoverDay: number;

    /**近三个月周库存周转天数（下限） */
    endThreeMonthTurnoverDay: number;
  }>;
  export type Response = Paging<{
    /**ID */
    id: string;

    /**图片 */
    image: string;

    /**商品id */
    productId: string;

    /**变体sku */
    sku: string;

    /**短码 */
    shortCode: string;

    /**货主名称 */
    customerName: string;

    /**仓库id */
    storehouseId: string;

    /**属性 */
    variantKeyMap: string;

    /**库存量 */
    availableQuantity: string;

    /**最近抵扣时间 */
    lastDeductionAt: string;

    /**无抵扣天数 */
    notDeductionDay: number;

    /**近一周出库量 */
    weekOutQuantity: number;

    /**近一月出库量 */
    monthOutQuantity: number;

    /**近三月出库量 */
    threeMonthOutQuantity: number;

    /**近一周库存周转天数 */
    weekTurnoverDay: number;

    /**近一月库存周转天数 */
    monthTurnoverDay: number;

    /**近三月库存周转天数 */
    threeMonthTurnoverDay: number;
  }>;
}

/**获取理货详情 */
export declare namespace GetTurnoverDetailPage {
  export type Request = {
    /**skuid */
    skuIds?: Array<{
      id: string;
    }>;

    /**商品id */
    productIds?: Array<{
      id: string;
    }>;

    /**库存类型 1：正品，2：次品	*/
    type: number;

    /**原库区 */
    reservoirArea: string;

    /**sku */
    variantSku: string;

    /**库存量（上限） */
    startQuantity: number;

    /**库存量（下限） */
    endQuantity: number;

    /**sku 或 短码 */
    skuOrCode: string;
  };
  export type ResponseItem = {
    /**可用库存 */
    availableQuantity: number;

    /**货主名称 */
    customerName: string;

    /**货主编号 */
    customerNum: string;

    /**容器名称 */
    containerNum: string;

    /**服务商品 1：否，2：是	*/
    isServiceGoods: number;

    /**短码 */
    shortCode: string;

    /**仓库名称 */
    storageName: string;

    /**仓库id */
    storehouseId: string;

    /**理货量 */
    tallyVolume: number;

    /**库存类型 1：正品，2：次品，3：异常品，4：少货	*/
    type: number;

    /**变体id */
    variantId: string;

    /**原库位 */
    locationId: string;

    /**原库位 */
    locationName: string;

    /**目标库位 */
    toLocationName: string;

    /**三级库存id */
    id: string;
  };
  export type Response = Array<ResponseItem>;
}

/**生成理货 */
export declare namespace AddStorehouseTally {
  export type Request = {
    storehouseTallyVariantDTOList: Array<{
      /**可用库存 */
      availableQuantity: string;

      /**三级库存id */
      id: string;

      /**货主名称 */
      customerName: string;

      /**货主编号 */
      customerNum: string;

      /**容器名称 */
      containerNum: string;

      /**服务商品 1：否，2：是	*/
      isServiceGoods: string;

      /**短码 */
      shortCode: string;

      /**仓库名称 */
      storageName: string;

      /**仓库id */
      storehouseId: string;

      /**理货量 */
      tallyVolume: string;

      /**库存类型 1：正品，2：次品，3：异常品，4：少货*/
      type: string;

      /**变体id */
      variantId: string;

      /**原库位id */
      locationId: string;

      /**原库位 */
      locationName: string;

      /**目标库位id */
      toLocationId: string;

      /**目标库位 */
      toLocationName: string;
    }>;
  };

  export type Response = boolean;
}
