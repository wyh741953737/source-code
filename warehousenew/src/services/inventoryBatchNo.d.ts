import { Paging } from './common.d';

export declare namespace GetList {
  interface Data {
    /**仓库Id */
    storehouseId?: string;
    /**盘点单号 */
    checkNum?: string;
    /**盘点批次号 */
    batchNum: string;
    /**1：待领取，2：已领取，3：已完成 */
    status: number;
    /**创建人 */
    createBy: string;
    /**盘点人 */
    updateBy: string;
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

export declare namespace PrintBatch {
  export interface Request {
    /**批次号 */
    batches: Array<string>;
  }

  export interface Response {
    success?: boolean;
    code?: number;
    messageEn?: string;
    messageCn?: string;
    data?: string;
  }
}
