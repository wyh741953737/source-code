import { Paging } from './common.d';

export declare namespace GetList {
  interface Data {
    /** 主键id（越库批次号） */
    id?: string;
    /** 仓库ID */
    storehouseId?: string;
    /** 状态，1：待验单， 2：验单中， 3：已完成 */
    status?: string;
    /** 验货人名称 */
    checkName?: string;
    /** 变体sku/越库sku */
    sku?: string;
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
    /** 创建开始时间 */
    beginDate?: string;
    /** 创建结束时间 */
    endDate?: string;
  }
  export type Response = Paging<{}>;
}

/**越库批次详情 */
export declare namespace GetDetail {
  type Request = {
    id: string;
  };

  export type Response = {
    /**主键ID（批次号） */
    id: string;

    /**仓库ID */
    storehouseId: string;

    /**验货人名称 */
    checkName: string;

    /**容器编号 */
    containerNum: string;

    /**订单数量 */
    orderQuantity: number;

    /**商品数量 */
    variantQuantity: number;

    /**验单开始时间 */
    beginAt: string;

    /**验单结束时间 */
    endAt: string;

    /**状态1 待验单 2 已验单 */
    status: number;
  };
}

/**获取详情列表 */
export declare namespace GetDetailList {
  interface Data {
    batchNumber: string;
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
    /**主键id */
    id: number;

    /**订单号 待发单或者直发单号 */
    orderId: string;

    /**客户订单号 */
    clientOrderId: string;

    /**母订单号 */
    shipmentsOrderId: string;

    /**商品数量 */
    quantity: number;

    /**客户名称 */
    customerName: string;

    /**物流追踪号 */
    trackingNumber: string;
  }>;
}

/**越库批次详情列表 */
export declare namespace GetCrossDetailList {
  interface Data {
    batchNumber: string;
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
    /**主键id */
    id: number;

    /**客户订单号 */
    clientOrderId: string;

    /**商品数量 */
    quantity: number;

    /**验货人 */
    checkName: string;

    /**验单结束时间 */
    endAt: string;
  }>;
}

// 越库设置
export declare namespace CrossSetting {
  export interface Request {
    /** 仓库id */
    storehouseId: string;
    /** 越库状态,0:开启，1：关闭 */
    status?: number;
  }
  export interface Response {
    code: number;
    data: number;
  }
}

// 批量打印
export declare namespace BatchPrints {
  export interface Request {
    ids: Array<string | never>;
  }
}

// 批次释放
export declare namespace Release {
  export interface Request {
    id: string;
  }
  export interface Response {
    code: number;
    data: number;
  }
}
