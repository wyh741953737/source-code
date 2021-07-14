import { Paging } from './common.d';

/**获取盘点列表 */
export declare namespace GetList {
  interface Data {
    /** 仓库Id */
    storehouseId: string;
    /**盘点单号 */
    checkNum: string;
    /**类别: 1：初盘单，2：复盘单，2：终盘单 */
    type: 1 | 2 | 3;
    /**状态: 1：未盘点，2：盘点中，3：盘点完成，4：已放弃 */
    status: 1 | 2 | 3 | 4;
    /**盘点方式 1：明盘，2：暗盘 */
    checkType: 1 | 2;
    /**盘点维度 1库位 2商品 */
    checkDimension: 1 | 2;
    /**是否冻结库存 1：未冻结，2：冻结 */
    isFrozen: 1 | 2;
    /**开始时间 */
    startTime: string;
    /**结束时间 */
    endTime: string;
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
     * 主键ID
     */
    id?: number;
    /**
     * 盘点单号
     */
    checkNum?: string;
    /**
     * 1：初盘单，2：复盘单，2：终盘单
     */
    type?: number;
    /**
     * 仓库ID
     */
    storehouseId?: string;
    /**
     * 仓库名
     */
    storehouseName?: string;
    /**
     * 1：明盘，2：暗盘
     */
    checkType?: number;
    /**
     * 盘点维度 1库位 2商品
     */
    checkDimension?: number;
    /**
     * 1：未盘点，2：盘点中，3：盘点完成
     */
    status?: number;
    /**
     * 1：未冻结，2：冻结
     */
    isFrozen?: number;
    /**
     * 创建人
     */
    createBy?: string;
    /**
     * 创建时间
     */
    createAt?: string;
  }>;
}

/**获取盘点明细 */
export declare namespace GetDetail {
  export interface Request {
    /**盘点表id */
    checkId: number;
  }
  export interface Response {
    /**
     * 返回是否正确 true || false
     */
    success: boolean;
    /**
     * 操作结果
     */
    data: {
      /**
       * 主键ID
       */
      id?: number;
      /**
       * SKU
       */
      sku?: string;
      /**
       * 货主名称
       */
      customerName?: string;
      /**
       * 库位名称
       */
      locationName?: string;
      /**
       * 库区
       */
      areaName?: string;
    };
    /**
     * 返回的code
     */
    code: number;
    /**
     * 返回的错误信息说明
     */
    message: string;
  }
}

/**放弃 */
export declare namespace GiveUp {
  export interface Request {
    /**要删除的明细id合集 */
    checkIdList: string[];
  }

  export interface Response {
    /**
     * 返回是否正确 true || false
     */
    success: boolean;
    /**
     * 操作结果
     */
    data: boolean;
    /**
     * 返回的code
     */
    code: number;
    /**
     * 返回的错误信息说明
     */
    message: string;
  }
}

/**删除详情 */
export declare namespace DeleteDetail {
  export interface Request {
    /**要删除的明细id合集 */
    idList: string[];
  }

  export interface Response {
    /**
     * 返回是否正确 true || false
     */
    success: boolean;
    /**
     * 操作结果
     */
    data: boolean;
    /**
     * 返回的code
     */
    code: number;
    /**
     * 返回的错误信息说明
     */
    message: string;
  }
}
/**通过SKU获取货主 */
export declare namespace GetCustomerBySKU {
  export interface Request {
    /**仓库ID */
    storehouseId: string;
    /**盘点sku */
    sku: string;
  }
  interface Data {
    /**货主ID */
    customerId: string;
    /**货主名称 */
    customerName: string;
  }

  export interface Response {
    /**
     * 返回是否正确 true || false
     */
    success: boolean;
    /**
     * 操作结果
     */
    data: Data[];
    /**
     * 返回的code
     */
    code: number;
    /**
     * 返回的错误信息说明
     */
    message: string;
  }
}

/**获取盘点单号 */
export declare namespace GetCheckNum {
  export interface Response {
    /**
     * 返回是否正确 true || false
     */
    success: boolean;
    /**
     * 操作结果
     */
    data: string;
    /**
     * 返回的code
     */
    code: number;
    /**
     * 返回的错误信息说明
     */
    message: string;
  }
}
/**生成批次 */
export declare namespace CreateBatch {
  export interface Request {
    /**盘点表id */
    checkId: string;
  }
  export interface Response {
    /**
     * 返回是否正确 true || false
     */
    success: boolean;
    /**
     * 操作结果
     */
    data: boolean;
    /**
     * 返回的code
     */
    code: number;
    /**
     * 返回的错误信息说明
     */
    message: string;
  }
}
