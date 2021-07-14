import { Paging } from './common.d';
// 查询列表
export declare namespace GetList {
  interface requestData {
    //调度编号
    dispatchNumber?: string;

    //状态  1：待发货 2：已发货 3：已收货
    status?: number;

    // 转出仓id
    sourceStorehouseId?: string;

    // 到达仓id
    targetStorehouseId?: string;

    //货贷名称
    goodsLoanName?: string;

    //包裹编号
    parcelNumber?: string;

    //包裹追踪号
    trackingNumber?: string;

    //包裹编号或运单号
    parcelOrWaybillNumber?: string;

    //创建人
    createBy?: string;
  }

  export type Request = {
    pageNum?: number;
    pageSize?: number;
    beginDate?: string;
    endDate?: string;
    data: requestData;
  };
  interface Detail {
    /**
     * 包裹id
     */
    id: number;

    /**
     * 包裹属性 1、普货 2、非普货
     */
    packProperty: number;

    /**
     * 包裹编号
     */
    parcelNumber: string;

    /**
     * 追踪号
     */
    trackingNumber: string;

    /**
     * 尺寸：长
     */
    length: number;

    /**
     * 尺寸：宽
     */
    width: number;

    /**
     * 尺寸：高
     */
    height: number;

    /**
     * 重量/KG
     */
    weight: number;

    /**
     * 备注
     */
    remarks: string;

    /**
     * 状态 1：未签收 2：已签收
     */
    status: number;

    /**
     * 创建人
     */
    createBy: string;

    /**
     * 创建时间
     */
    createAt: string;

    /**
     * 调度任务id
     */
    schedulingId: number;

    /**
     * 标记 1、拦截
     */
    mark: number;
  }

  export type Response = Paging<{
    id: number;

    //调度编号
    dispatchNumber: string;

    //备注
    remarks: string;

    //状态  1：待发货 2：已发货 3：已收货
    status: number;

    //创建人
    createBy: string;

    //创建时间
    createAt: string;

    //转出仓名称
    sourceStorehouseName: string;

    //转出仓id
    sourceStorehouseId: string;

    //到达仓名称
    targetStorehouseName: string;

    //到达仓id
    targetStorehouseId: string;

    //货贷名称
    goodsLoanName: string;

    schedulingPackageList: Array<Detail>;
  }>;
}

// 添加调度任务
export declare namespace AddScheduling {
  export type Request = {
    /**备注 */
    remarks?: string;

    /**转出仓id */

    sourceStorehouseId: string;

    /**转出仓名称 */

    sourceStorehouseName: string;

    /**到达仓id */

    targetStorehouseId: string;

    /**到达仓名称 */

    targetStorehouseName: string;

    /**货贷名称 */

    goodsLoanName: string;
  };

  export type Response = boolean;
}

//编辑调度任务
export declare namespace EditSheduling {
  export type Request = {
    id: number;
    /**备注 */
    remarks?: string;

    /**货贷名称 */

    goodsLoanName?: string;
  };

  export type Response = boolean;
}

//打印包裹编号

export declare namespace PrintPackageNumber {
  export type Request = {
    packageNumberList: Array<string>;
    packageIdList: Array<number>;
  };

  export type Response = string;
}

// 确认收发货 状态  1：待发货 2：已发货 3：已收货
export declare namespace ConfirmGoodsDelivery {
  export type Request = {
    id: number;
    status: number;
  };
  export type Response = boolean;
}

//包裹确认收货
export declare namespace ConfirmReceiveGoods {
  export type Request = {
    /**
     * 包裹id
     */
    id: number;
    /**
     * 调度任务id
     */
    schedulingId: number;
  };
  export type Response = boolean;
}

//查看包裹详情
export declare namespace CheckPackageDetail {
  export type Request = {
    id: number;
  };
  interface responseData {
    /**调度类型：1、订单调度 2、库存调拨	 */
    schedulingType: number;

    /**包裹编号或运单号 */
    parcelOrWaybillNumber: string;

    /**订单号 */
    orderId: string;

    /**属性 */
    property: string;

    /**重量(KG) */
    weight: number;

    /**数量 */
    quantity: number;

    /**调度id */
    schedulingPackageId: number;
  }
  export type Response = Array<responseData>;
}

/**
 * 导出
 * 1、DHL渠道交接清单 2、韩国UPS交接清单 3、空派 交接清单4、南风空派海运交接清单 5、杭州模版报关文件 6、上海模版清单文件 7、清关文件
 */

export declare namespace ExportExcel {
  export type Request = {
    schedulingPackageIdList: Array<number>;
    schedulingExportType: number;
  };
}

//  查询包裹操作日志

export declare namespace CheckPackageLog {
  export type Request = {
    id: number;
  };
  interface responseData {
    /**主键id */
    id: number;

    /**调拨单号 */
    transferCode: string;

    /**操作人id */
    createId: string;

    /**操作人名称 */
    createBy: string;

    /**操作时间 */
    createAt: string;

    /**操作内容 */
    operationContent: string;

    /**操作节点 */
    operationNode: number;
  }
  export type Response = Array<responseData>;
}

// 删除包裹
export declare namespace DeletePackage {
  export type Request = {
    id: number;
  };
  export type Response = boolean;
}

// 拦截包裹
export declare namespace InterceptPackage {
  export type Request = {
    id: number;
  };
  export type Response = boolean;
}

// 已签收包裹
export declare namespace HaveSignedPackage {
  interface requestData {
    //属性
    property?: number;

    //包裹编号
    parcelNumber?: string;

    //包裹追踪号
    trackingNumber?: string;

    // 调度类型
    dispatchType?: number;
  }

  export type Request = {
    pageNum?: number;
    pageSize?: number;
    beginDate?: string;
    endDate?: string;
    data: requestData;
  };

  export type Response = Paging<{
    /**
     * 包裹id
     */
    id: number;

    /**包裹编号 */
    parcelNumber: string;

    /**追踪号 */
    trackingNumber: string;

    /**签收人 */
    receiptBy: string;

    /**签收时间 */
    receiptAt: string;

    /**备注 */
    remarks: string;
  }>;
}

// 签收
export declare namespace SignFor {
  export type Request = {
    /**包裹编号 */
    parcelNumbering: string;

    /**仓库ID */
    storageId: string;
  };
  interface Data {
    /**调度类型：1、订单调度 2、库存调拨	 */
    schedulingType: number;

    /**包裹编号或运单号 */
    parcelOrWaybillNumber: string;

    /**订单号 */

    orderId: string;

    /**属性 */

    property: string;

    /**重量(KG) */

    weight: number;

    /**数量 */

    quantity: number;

    /**调度id */

    schedulingPackageId: number;
  }

  export type Response = {
    /**包裹属性 1、普货 2、非普货*/
    packProperty: number;

    /**包裹编号*/
    parcelNumber: string;

    /**追踪号*/
    trackingNumber: string;

    /**尺寸：长*/
    length: number;

    /**尺寸：宽*/
    width: number;

    /**尺寸：高*/
    height: number;

    /**重量/KG*/
    weight: number;

    /**备注*/

    remarks: string;

    /**标记1、拦截*/
    mark: number;

    /**调度编号*/

    schedulingNumber: string;

    /**转出仓名称*/
    sourceStorehouseName: string;

    /**货贷名称*/
    goodsLoanName: string;

    detailResultList: Array<Data>;
  };
}

// 删除调度任务

export declare namespace DeleteDispatcher {
  export type Request = {
    id: number;
  };

  export type Response = boolean;
}
