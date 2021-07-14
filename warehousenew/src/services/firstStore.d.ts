import { Paging } from './common.d';

export declare namespace GetList {
  interface Data {
    /**
     * 仓库Id
     */
    storehouseId?: string;
    /**
     * 库存类型1：正品，2：次品，2：异常品
     */
    type?: number;
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
  export type Response = Paging<{
    /**
     * 仓库ID
     */
    storehouseId: string;
    /**
     * 仓库名称
     */
    storageName: string;
    /**
     * 仓库类型
     */
    type: number;
    /**
     * 实物库存
     */
    realityQuantity: number;
    /**
     * 可用库存
     */
    availableQuantity: number;
    /**
     * 占用库存
     */
    useQuantity: number;
    /**
     * 冻结库存
     */
    frozenQuantity: number;
    /**
     * 总sku库存
     */
    allSkuQuantity: number;
    /**
     * 正品库存
     */
    oneSkuQuantity: number;
    /**
     * 残品库存
     */
    twoSkuQuantity: number;
    /**
     * 异常库存
     */
    threeSkuQuantity: number;
  }>;
}
