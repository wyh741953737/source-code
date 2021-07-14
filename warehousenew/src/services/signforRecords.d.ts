import { PagingRequest, Paging } from './common.d';

export declare namespace GetList {
  export interface RequestData {
    /**入库单号 */
    putStorageNumber?: string;

    /**采购单 */
    orderNumber?: string;

    /**追踪号 */
    trackingNumber?: string;

    /**扫描时间开始 */
    startScanDate?: string;

    /**扫描时间结束 */
    endScanDate?: string;

    /**仓库id */
    storageId?: string;

    /**扫描人员 */
    scanName?: string;

    /**签收状态 */
    signStatus?: number;
  }
  export type Request = PagingRequest<RequestData>;
  export type Response = Paging<{
    /**id */
    id: number;

    /**入库单号 */
    putStorageNumber: string;

    /**采购单 */
    orderNumber: string;

    /**追踪号 */
    trackingNumber: string;

    /**出库id */
    storageId: string;

    /**出库名称 */
    storageName: string;

    /**扫描时间 */
    scanTime: string;

    /**扫描人员 */
    scanName: string;

    /**签收状态 */
    signStatus: number;

    /**备注 */
    remarks: string;

    /**创建人 */
    createAt: string;

    /**创建时间 */
    createBy: string;
  }>;
}
