import { Paging } from './common.d';
// 查询列表
export declare namespace GetList {
  interface Data {
    /**
     * 理货单号
     */
    tallyNum?: string;
    /**
     * 仓库id
     */
    storehouseId?: string;
    /**
     * 理货批次号
     */
    batchNum?: number;
    /**
     * 状态：1：待领取，2：已领取，3：已完成
     */
    status?: number;
    /**
     * 创建人
     */
    createBy?: string;
    /**
     * 理货人
     */
    updateBy?: string;
  }
  export interface Request {
    data: Data;
    pageNum: number;
    pageSize: number;
    beginDate?: string;
    endDate?: string;
    secondBeginDate?: string;
    secondEndDate?: string;
  }
  export type Response = Paging<{
    /** 主键ID*/
    id: number;

    /** 理货单号*/

    tallyNum: string;

    /** 理货批次号*/

    batchNum: string;

    /** 仓库id */
    storehouseId: number;

    /** 状态 */

    status: number;

    /** 理货任务数 */

    quantity: number;

    /** 启用禁用 */

    isDelete: number;

    /** 创建人*/

    createBy: string;

    /** 创建时间*/

    createAt: string;

    /** 理货人 */

    updateBy: string;

    /** 修新时间*/

    updateAt: string;

    /** 理货容器*/

    containerNum: string;
  }>;
}
// 查询理货明细
export declare namespace GetDetail {
  interface Data {
    /**
     * 理货批次号
     */
    tallyBatchId: number;
  }
  export interface Request {
    data: Data;
    pageNum: number;
    pageSize: number;
  }
  export type Response = Paging<{
    /** 主键ID*/
    id: number;
    /** 理货批次主键ID */
    tallyBatchId: number;

    /** 理货编号*/

    tallyNum: string;

    /** 仓库id*/

    storehouseId: string;

    /** sku */

    sku: string;

    /** 短码 */

    shortCode: string;

    /** 变体id */

    variantId: string;

    /** 数量*/

    quantity: number;

    /** 类型 */

    type: number;

    /** 创建人*/

    createBy: string;

    /** 创建时间*/

    createAt: string;

    /** 理货人*/

    updateBy: string;

    /** 理货时间*/

    updateAt: string;

    /** 图片*/

    image: string;
    /** 货主ID */
    customerId: string;
    /** 货主名称 */
    customerName: string;
    /** 货主编号 */
    customerNum: string;
    /** 库位ID */
    locationId: string;
    /** 库位名称 */
    locationName: string;
    /** 目标库位ID */
    toLocationId: string;
    /** 下位库区 */
    toLocationName: string;
    /** 商品名称 */
    goodsName: string;
    /* 理货批次号 */
    batchNum: string;
    /** 实际理货数量 */
    realQuantity: string;
    /** 状态 */
    status: number;
    /** 批次信息 */
    batchInfo: string;
  }>;
}

export declare namespace Print {
  /**
   * 需要打印的id列表
   */
  export type Request = Array<string>;
}
