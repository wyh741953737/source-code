// 包裹或运单号扫描
export declare namespace ScanPackageOrTrackNumber {
  export type Request = {
    /**包裹属性 */
    packProperty: number;

    /**到达仓id */
    targetStorehouseId: string;

    /**包裹编号或运单号 */

    parcelOrWaybillNumber: string;

    /**转出仓id */
    sourceStorehouseId: string;
  };
  interface ResponseData {
    /**调度类型：1、订单调度 2、库存调拨 */
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

    /** 仓库 2:美西 3：美东 StorageEnum	 */
    store: number;

    /** 订单类型 1：正常 2：纠纷订单 3：拦截订单 */
    orderType: number;

    remarks: string;
  }

  export type Response = ResponseData;
}

//订单调度包裹及明细保存
export declare namespace SaveDetailPackageShceduing {
  interface Detail {
    // 调度类型：1、订单调度 2、库存调拨
    schedulingType?: number;

    //包裹编号或运单号
    parcelOrWaybillNumber?: string;

    //订单号
    orderId?: string;

    //属性
    property?: string;

    //重量(KG)
    weight?: number;

    //数量
    quantity?: number;

    //创建人
    createBy?: string;

    //调度任务id
    schedulingId?: number;

    // 调度id
    schedulingPackageId?: number;
  }
  export type Request = {
    id?: number;

    //包裹属性 1、普货 2、非普货
    packProperty?: number;

    //追踪号
    trackingNumber?: string;

    //尺寸：长
    length?: number;

    //尺寸：宽
    width?: number;

    //尺寸：高
    height?: number;

    //重量/KG
    weight?: number;

    //备注
    remarks?: string;

    //创建人
    createBy?: string;

    //调度编号
    dispatchNumber?: string;

    //调度任务id
    schedulingId?: number;

    //处理人ID
    processorId?: string;

    detailList?: Detail;
  };

  export type Response = boolean;
}

// 根据调度任务ID查询包裹及明细

export declare namespace CheckPackageDetailById {
  export type Request = {
    id: string;
  };

  interface Data {
    id: number;

    /**包裹属性 1、普货 2、非普货 */
    packProperty: number;

    /**包裹编号 */
    parcelNumber: string;

    /**追踪号 */
    trackingNumber: string;

    /**尺寸：长 */
    length: number;

    /**尺寸：宽 */
    width: number;

    /**尺寸：高 */
    height: number;

    /**重量/KG	 */
    weight: number;

    /**备注 */
    remarks: string;

    /**状态 1：未签收 2：已签收 */
    status: number;

    /**调度任务id */
    schedulingId: number;

    /**标记 1、拦截 */
    mark: number;
  }

  export type Response = Array<Data>;
}
