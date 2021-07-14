import { Paging } from './common.d';
export declare namespace GetList {
  interface Data {
    locationName?: string;
    type?: number;
    isDelete?: number;
    areaName?: string;
    storehouseId?: string;
    userName?: string;
  }
  export interface Request {
    data: Data;
    pageNum: number;
    pageSize: number;
    beginDate?: string;
    endDate?: string;
  }
  export type Response = Paging;
}
export declare namespace AddRecord {
  interface Request {
    /**
     * 仓库id
     */
    storehouseId: string;
    /**
     * 库区名称
     */
    areaName: string;
    /**
     * 通道
     */
    channel: number;
    /**
     * 货架
     */
    shelf: number;
    /**
     * 货位
     */
    location: number;
    /**
     * 货位长度
     */
    locationL?: number;
    /**
     * 货位宽度
     */
    locationW?: number;
    /**
     * 货物高度
     */
    locationH?: number;
    /**
     * 可载重数量
     */
    capacity?: number;
    /**
     * 可载重重量
     */
    localtionLoad?: number;
    /**
     * 库位类型
     */
    type: number;
    /**
     * 库位用途
     */
    useType: number;
    /**
     * 库位货品
     */
    locationType: number;
    /**
     * 路劲节点
     */
    pathNode: string;
  }
  export type Response = Paging;
}
export declare namespace UpdateRecord {
  export interface Request {
    id: number;
    /**
     * 仓位id
     */
    locationId: string;
    /**
     * 库区编号
     */
    areaCode: string;
    /**
     * 通道
     */
    channel: number;
    /**
     * 货架
     */
    shelf: number;
    /**
     * 货位
     */
    location: number;
    /**
     * 货位长度
     */
    locationL?: number;
    /**
     * 货位宽度
     */
    locationW?: number;
    /**
     * 货物高度
     */
    locationH?: number;
    /**
     * 可载重数量
     */
    capacity?: number;
    /**
     * 可载重重量
     */
    localtionLoad?: number;
    /**
     * 库位类型
     */
    type: number;
    /**
     * 库位用途
     */
    useType: number;
    /**
     * 库位货品
     */
    locationType: number;
    /**
     * 路劲节点
     */
    pathNode: string;
    /**
     * 是否启用
     */
    isDelete: number;
  }
}
export declare namespace MultiAddRecord {
  export interface Request {
    /**
     * 仓库id
     */
    storehouseId: string;
    /**
     * 库区名称
     */
    areaName: string;
    /**
     * 通道开始
     */
    channelStart: number;
    /**
     * 通道结束
     */
    channelEnd: number;
    /**
     * 货架开始
     */
    shelfStart: number;
    /**
     * 货架结束
     */
    shelfEnd: number;
    /**
     * 货位开始
     */
    locationStart: number;
    /**
     * 货位结束
     */
    locationEnd: number;
    /**
     * 货位长度
     */
    locationL?: number;
    /**
     * 货位宽度
     */
    locationW?: number;
    /**
     * 货物高度
     */
    locationH?: number;
    /**
     * 可载重数量
     */
    capacity?: number;
    /**
     * 可载重重量
     */
    localtionLoad?: number;
    /**
     * 库位类型
     */
    type: number;
    /**
     * 库位用途
     */
    useType: number;
    /**
     * 库位货品
     */
    locationType: number;
  }
}
export declare namespace DeleteRecord {
  export interface Request {
    /**
     * 删除的id列表
     */
    locationIds: Array<string>;
  }
}
export declare namespace UploadRecord {
  export type Request = Array<{
    /**
     * 所属仓库
     */
    storehouseName: string;
    /**
     * 库位名称
     */
    locationName: string;
    /**
     * 库位长
     */
    locationL?: number;
    /**
     * 库位宽
     */
    locationW?: number;
    /**
     * 库位高
     */
    locationH?: number;
    /**
     * 库位容量
     */
    capacity?: number;
    /**
     * 库位载重量
     */
    localtionLoad?: number;
    /**
     * 1：一位一品，2：一位多品
     */
    locationType?: number;
    /**
     * 路径节点
     */
    pathNode: number;
  }>;
}

// 打印库区编号
export declare namespace Print {
  export type Request = {
    locationCodes: Array<string>;
  };
  export type Response = boolean;
}
