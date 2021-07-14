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
    /**
     * 货主编号
     */
    customerId?: string;
    /**
     * 货主名称
     */
    customerName?: string;
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

  export type Response = Paging;
}
