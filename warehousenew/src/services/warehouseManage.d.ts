import { Paging } from './common.d';
export declare namespace GetList {
  interface Data {
    /**
     * 库区名称
     */
    areaName?: string;
    /**
     * 仓库ID
     */
    storehouseId?: string;
    /**
     * 类目名称
     */
    categoryName?: string;
    /**
     * 类目ID
     */
    categoryId?: string;
    /**
     * 1：拣货区，2：暂存区，3：残品区，4备货区
     */
    type?: number;
    /**
     * 0：启用，1：禁用
     */
    isDelete?: number;
    userName?: string;
  }
  export interface Request {
    data?: Data;
    pageNum: number;
    pageSize: number;
    beginDate?: string;
    endDate?: string;
  }
  export type Response = Paging;
}
export declare namespace AddRecord {
  export interface Request {
    /**
     * 库区名称
     */
    areaName: string;
    /**
     * 仓库Id
     */
    storehouseId: string;
    /**
     * 类目名称
     */
    categoryName: string;
    /**
     * 类目id
     */
    categoryId: number;
    /**
     * 1：拣货区，2：暂存区，3：残品区
     */
    type: number;
  }
}
export declare namespace UpdateRecord {
  export interface Request extends AddRecord.Request {
    /**
     * 记录id
     */
    id: number;
    /**
     * 是否停用
     */
    isDelete: number;
  }
}
