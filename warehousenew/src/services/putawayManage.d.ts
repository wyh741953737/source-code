import { Paging } from './common.d';

export declare namespace GetList {
  export interface Request {
    /**
     * 开始时间
     */
    beginDate?: string;
    /**
     * 结束时间
     */
    endDate?: string;
    /**
     * 上架单号
     */
    onShelfNum?: string;
    /**
     * 仓库ID
     */

    storehouseId?: string;
    /**
     * 上架操作人
     */
    updateBy?: string;
    /**
     * 称重人
     */

    createBy?: string;
    /**
     * 状态 0：已创建，1：待上架，2：上架中，3：上架完成，4：异常结束
     */
    status?: number;
    containerNum?: string;
    pageNum?: number;
    pageSize?: number;
  }

  export type Response = Paging;
}

export declare namespace GetputawayDetail {
  export interface Request {
    /**
     * 上架单号
     */
    onShelfNum: string;
    pageNum?: number;
    pageSize?: number;
  }

  export type Response = Paging;
}

export declare namespace GetputawayRecordDetail {
  export interface Request {
    /**
     * 上架单号
     */
    onShelfInfoId: string;
    pageNum?: number;
    pageSize?: number;
  }

  export type Response = Paging;
}

/**获取erp用户信息 */
export declare namespace GetErpUserInfo {
  type Request = {
    name: string;
  };
  interface ResponseItem {
    /**用户id */
    id: string;

    /**用户名称 */
    name: string;
  }
  type Response = Array<ResponseItem>;
}

/**上架单重新指派 */
export declare namespace OnShelfReassign {
  type Request = {
    id: string;
    list: Array<{
      /**用户id */
      id: string;

      /**用户名称 */
      name: string;
    }>;
  };

  type Response = boolean;
}
