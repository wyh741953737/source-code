import { Paging, PagingRequest } from './common.d';

//获取揽收记录列表
export declare namespace GetList {
  interface Data {
    /**
     * 揽件出库编号
     */
    receiveNumber?: string;

    /**
     * 仓库id
     */
    storageId?: string;

    /**
     * 物流名字
     */
    logisticsCompany?: string;

    /**
     * 打印人
     */
    printBy?: string;

    /**
     * 打印状态 0 未打印 1 已打印
     */
    printStatus?: number;

    /**
     * 物流追踪号
     */
    logisticsTrackingNumber?: string;

    /**
     * 出库单订单号
     */
    orderId?: string;
  }
  export type Request = {
    data: Data;
    pageNum: number;
    pageSize: number;
    beginDate: string;
    endDate: string;
  };
  export type Response = Paging<{
    /**
     * 揽件出库记录表
     */
    id: number;

    /**
     * 揽件出库编号
     */
    receiveNumber: string;

    /**
     * 仓库名称
     */
    storageName: string;

    /**
     * 物流名字
     */
    logisticsCompany: string;

    /**
     * 袋数
     */
    bagsQuantity: number;

    /**
     * 包裹数
     */
    packangQuantity: number;

    /**
     * 净重(KG)
     */
    netWeight: number;

    /**
     * 毛重(KG)
     */
    grossWeight: number;

    /**
     * 打印人
     */
    printBy: string;

    /**
     * 揽件出库时间
     */
    receiveAt: string;

    /**
     * 打印状态 0 未打印 1 已打印
     */
    printStatus: number;
  }>;
}

//导出清单
export declare namespace BatchExportExcel {
  export type Request = {
    /**
     * 选中id集合
     */
    ids: Array<string>;
  };

  export type Response = boolean;
}

//揽收记录查看
export declare namespace CheckRecord {
  interface Data {
    nums: number;

    onlineStatus: number;

    receiveRecordId: number;

    weightPackageId: number;
  }
  export type Request = {
    /**
     * 选中id集合
     */
    id: string;
  };

  export type Response = Array<Data>;
}

//获取清单详情列表
export declare namespace GetListDetail {
  interface Data {
    /**
     * 包裹编号
     */
    packageNumber?: string;

    /**
     * 打印人
     */
    printBy?: string;

    /**
     * 仓库id
     */
    storageId?: string;

    /**
     * 揽收记录ID
     */
    receiveRecordId: string;
  }
  export type Request = {
    data: Data;
    pageNum: number;
    pageSize: number;
    beginDate: string;
    endDate: string;
  };
  export type Response = Paging<{
    /**
     * 出库称重包裹id
     */
    id: number;

    /**
     * 包裹编号
     */
    packageNumber: string;

    /**
     * 仓库名称
     */
    storageName: string;

    /**
     * 物流名字
     */
    logisticsCompany: string;

    /**
     * 揽件出库编号
     */
    receiveNumber: string;

    /**
     * 包裹数量
     */
    packageQuantity: number;

    /**
     * 净重(KG)
     */
    netWeight: number;

    /**
     * 毛重(KG)
     */

    grossWeight: number;

    /**
     * 打印时间
     */

    printAt: string;

    /**
     * 打印人
     */
    printBy: string;

    /**
     * 未上网(票数)
     */
    notOnlineNum: number;

    /**
     * 已上网(票数)
     */
    onlineNum: number;
  }>;
}

//获取货代详情列表
export declare namespace GetForwardDetail {
  interface Data {
    /**
     * 物流公司
     */
    logisticsCompany: string;

    /**
     * 物流追踪号
     */
    logisticsTrackingNumber: string;

    /**
     * 出库单订单号
     */
    orderId: string;

    /**
     * 仓库id
     */
    storageId: string;

    /**
     *  0 待上网  1 已上网
     */
    onlineStatus: number;

    /**
     * 签收国
     */
    signingCountry: string;

    /**
     * 称重包裹id
     */
    weightPackageId: number;

    /**
     * 揽收记录id
     */
    receiveRecordId: number;
  }
  export type Request = {
    data: Data;
    pageNum: number;
    pageSize: number;
    beginDate: string;
    endDate: string;
  };
  export type Response = Paging<{
    /**
     * 订单号
     */
    orderId: string;

    /**
     * 运单号
     */
    logisticsTrackingNumber: string;

    /**
     * 包裹号
     */
    packageNumber: string;

    /**
     * 揽收日期
     */
    collectionDate: string;

    /**
     * 签收国
     */
    signingCountry: string;

    /**
     * 物流公司
     */
    logisticsCompany: string;

    /**
     * 物流方式
     */
    logisticsChannel: string;

    /**
     * CJ追踪号
     */
    cjTrackingNumber: string;

    /**
     * 出库重量
     */
    weight: number;

    /**
     * 出库时间
     */
    weightAt: string;

    /**
     * 0 待上网  1 已上网
     */
    onlineStatus: number;

    /**
     * 发件仓
     */
    storageName: string;

    /**
     * 称重包裹id
     */
    weightPackageId: number;

    /**
     * 揽收记录id
     */
    receiveRecordId: number;
  }>;
}

//货代详情导出
export declare namespace BatchExportBagDetail {
  export type Request = {
    /**
     * 选中id集合
     */
    ids: Array<string>;
  };

  export type Response = boolean;
}

//货代详情-批量修改上网状态
export declare namespace BatchEditOnlineStatus {
  export type Request = {
    /**
     * 选中id集合
     */
    ids: Array<string>;
  };

  export type Response = boolean;
}

// 揽件出库编辑-获取详情
export declare namespace GetTookDetail {
  interface list {
    /**
     * 出库称重包裹id
     */
    id: number;

    /**
     * 包裹编号
     */
    packageNumber: string;

    /**
     * 袋数
     */
    bagsQuantity: number;

    /**
     * 包裹数量
     */
    packageQuantity: number;

    /**
     * 净重(KG)
     */
    netWeight: number;

    /**
     * 毛重(KG)
     */
    grossWeight: number;

    /**
     * 仓库id
     */
    storageId: string;

    /**
     * 仓库名称
     */
    storageName: string;
  }
  interface ResponseData {
    /**
     * 揽件出库记录表
     */
    id: number;

    /**
     * 揽件出库编号
     */
    receiveNumber: string;

    /**
     * 仓库id
     */
    storageId: string;

    /**
     * 仓库名称
     */
    storageName: string;

    /**
     * 物流渠道
     */
    logisticsChannel: string;

    /**
     * 物流名字
     */
    logisticsCompany: string;

    /**
     * 袋数
     */
    bagsQuantity: number;

    /**
     * 包裹数
     */
    packangQuantity: number;

    /**
     * 净重(KG)
     */
    netWeight: number;

    /**
     * 毛重(KG)
     */
    grossWeight: number;

    /**
     * 包裹列表
     */
    packageResultDTOList: Array<list>;
  }

  export type Request = {
    id: string;
  };

  export type Response = ResponseData;
}

//导入修改上网状态
export declare namespace ImportInternetStatus {
  export interface requestData {
    /**
     * 订单号
     */
    orderId: string;

    /**
     * 追踪号
     */
    logisticsTrackingNumber: string;

    /**
     * 所属包裹
     */
    owningPackage: string;

    /**
     * 订单状态
     */
    orderStatus: string;
  }
  export type Request = {
    content: Array<requestData>;
  };

  export type Response = boolean;
}
