import { Paging } from './common.d';
export declare namespace GetList {
  interface Data {
    /**
     * 容器编号
     */
    containerNum?: string;
    /**
     * 容器类型：1：箱子，2：工位
     */
    type?: number;
    /**
     * 状态：0：锁定，1：释放
     */
    status?: number;
    /**
     * 停用：0：启动，1：禁用
     */
    is_delete?: number;
    /**
     * 仓库ID
     */
    storehouseId?: string;
    /**
     * 最新操作人
     */
    updateBy: string;

    /**
     * 是否有货 0-无货 1-有货
     */
    occupyFlag: number;
  }
  export interface Request {
    data: Data;
    /**
     * 当前页码
     */
    pageNum: number;
    /**
     * 条数
     */
    pageSize: number;
  }
  export type Response = Paging;
}
export declare namespace Add {
  export interface Request {
    /**
     * 仓库Id
     */
    storehouseId: string;
    /**
     * 容器编号
     */
    containerNum?: string;
    /**
     * 容器类型:1：箱子，2：工位
     */
    type: number;
    /**
     * 备注
     */
    remarks: string;
  }
}
export declare namespace Disable {
  export interface Request {
    /**
     * 容器id列表
     */
    ids: Array<number>;
  }
}
export declare namespace Release {
  export interface Request {
    /**
     * 容器id列表
     */
    ids: Array<number>;
  }
}
export declare namespace Print {
  export interface Request {
    /**
     * 容器编号
     */
    containerNums: Array<string>;
  }
}
export declare namespace Commodity {
  export interface Request {
    /**
     * 容器编号
     */
    containerNum: string;
    /**
     * 仓库id
     */
    storehouseId: string;
  }
}
export declare namespace Log {
  export interface Request {
    /**
     * 容器主建id
     */
    containerId: number;
  }
}

/**删除商品 */
export declare namespace DeleteBusiness {
  export interface Request {
    /**
     * 商品主建id
     */
    idList: Array<string>;
  }
  export type Response = boolean;
}
