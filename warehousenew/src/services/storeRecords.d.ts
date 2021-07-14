import { Paging } from './common.d';

export declare namespace GetList {
  interface Data {
    /**SKU_ID*/
    sku?: string;
    /**
     * 短码
     */
    shortCode?: string;
    /**仓库ID*/
    storehouseId?: string;
    /**货主名称，注意后端建议缓存货主编号，所以这里传id*/
    customerName?: string;
    /**容器名称*/
    containerNum?: string;
    /**批次*/
    batchNumber?: string;
    /**库区*/
    areaName?: string;
    /**库存类型1：正品，2：次品，2：异常品*/
    type?: number;
    /**来源单据*/
    documentNumber?: string;
    /**业务单据*/
    putStorageNumber?: string;
  }
  export interface Request {
    data: Data;
    /**每页条数*/
    pageSize: number;
    /**当前页码*/
    pageNum: number;
  }
  export type Respone = Paging;
}
