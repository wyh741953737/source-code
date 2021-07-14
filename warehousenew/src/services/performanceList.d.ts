import { Paging } from './common.d';
// 查询列表
export declare namespace GetList {
  // ("1", "签收"),
  // ("2", "分标"),
  // ("3", "质检"),
  // ("4", "称重入库"),
  // ("5", "上架"),
  // ("6", "拣货"),
  // ("7", "分拣"),
  // ("8", "验单"),
  // ("9", "打包"),
  // ("10", "称重出库");
  export type Request = {
    /**起始时间 */
    startTime?: string;

    /**结束时间 */
    endTime?: string;

    /**仓库id */
    storeId?: string;

    /**组 */
    group?: string;
  };
  interface receiveResult {
    pageSize?: number;

    pageNumber?: number;

    totalRecords?: number;

    totalPages?: number;
    content: Array<{
      id: number;
      /**员工id */
      employeeId: string;

      /**员工名称 */

      employeeName: string;

      /**仓库id */

      storehouseId: string;

      /**包裹数量(个) */

      packageCount: number;

      /**sku数量(个) */

      skuCount: number;

      /**变体数量(个) */

      stanCount: number;

      /**采购单数量(个) */

      orderCount: number;

      /**总分 */

      score: number;

      /**创建时间 */

      createAt: string;

      /**修改时间 */
      updateAt: string;

      // 日平均积分
      averageHour: number;
    }>;
  }
  interface distributeResult {
    pageSize?: number;

    pageNumber?: number;

    totalRecords?: number;

    totalPages?: number;
    content: Array<{
      id: number;

      /**员工id */
      employeeId: string;

      /**员工名称 */
      employeeName: string;

      /**仓库id */
      storehouseId: string;

      /**sku分标数量(个)	 */
      skuCount: number;

      /**变体数量(个) */
      stanCount: number;

      /**到货数量 */
      arrivalCount: number;

      /**合格数量 */
      qualifiedCount: number;

      /**次品数量 */
      defectiveCount: number;

      /**少货数量 */
      understockCount: number;

      /**多货数量 */
      overstockCount: number;

      /**总分 */
      score: number;

      /**创建时间 */
      createAt: string;

      /**修改时间 */
      updateAt: string;
      // 日平均积分
      averageHour: number;
    }>;
  }
  interface inspectionResult {
    pageSize?: number;

    pageNumber?: number;

    totalRecords?: number;

    totalPages?: number;
    content: Array<{
      id: number;

      /**员工id */
      employeeId: string;

      /**员工名称 */
      employeeName: string;

      /**仓库id */
      storehouseId: string;

      /**质检批次数量 */
      collarBatchCount: number;

      /**商品总数量 */
      productAllCount: number;

      /**sku总数量 */
      skuAllCount: number;

      /**sku变体数量 */
      skuStanCount: number;

      /**到货数量 */
      qualifiedCount: number;

      /**次品数量 */
      defectiveCount: number;

      /**少货数量 */
      understockCount: number;

      /**多货数量 */
      overstockCount: number;

      /**总分 */
      score: number;

      /**创建时间 */
      createAt: string;

      /**修改时间 */
      updateAt: string;
      // 日平均积分
      averageHour: number;
    }>;
  }
  interface weighInResult {
    pageSize?: number;

    pageNumber?: number;

    totalRecords?: number;

    totalPages?: number;
    content: Array<{
      id: number;

      /**员工id */
      employeeId: string;

      /**员工名称 */
      employeeName: string;

      /**仓库id */
      storehouseId: string;

      /**批次号数量 */
      batchNumberCount: number;

      /**称重次数 */
      weighCount: number;

      /**修改重量次数 */
      modifyWeighCount: number;

      /**修改体积次数 */
      modifyVolumeCount: number;

      /**称重数量 */
      weighNum: number;

      /**合格数量 */
      qualifiedCount: number;

      /**次品数量 */
      defectiveCount: number;

      /**少货数量 */
      understockCount: number;

      /**多货数量 */
      overstockCount: number;

      /**总分 */
      score: number;

      /**创建时间 */
      createAt: string;

      /**修改时间 */
      updateAt: string;
      // 日平均积分
      averageHour: number;
    }>;
  }
  interface weighOutResult {
    pageSize?: number;

    pageNumber?: number;

    totalRecords?: number;

    totalPages?: number;
    content: Array<{
      id: number;

      /**员工id */
      employeeId: string;

      /**员工名称 */
      employeeName: string;

      /**仓库id */
      storehouseId: string;

      /**包裹总数量 */
      packageAllCount: number;

      /**包裹净重(千克) */
      packageWeightCount: number;

      /**包裹毛重(千克)	 */
      packageGrossWeightCount: number;

      /**体积（立方米） */
      volumeCount: number;

      /**总分 */
      score: number;

      /**创建时间 */
      createAt: string;

      /**修改时间 */
      updateAt: string;
      // 日平均积分
      averageHour: number;
    }>;
  }
  interface shelvesResult {
    pageSize?: number;

    pageNumber?: number;

    totalRecords?: number;

    totalPages?: number;
    content: Array<{
      id: number;
      /**员工id */
      employeeId: string;

      /**员工名称 */
      employeeName: string;

      /**仓库id */
      storehouseId: string;

      /**sku变体数量 */
      skuStanCount: number;

      /**商品数量 */
      productCount: string;

      /**上架重量（克） */
      weightNum: number;

      /**上架体积（平方米） */
      volumeNum: number;

      /**总分 */
      score: number;

      /**创建时间 */
      createAt: string;

      /**修改时间 */
      updateAt: string;
      // 日平均积分
      averageHour: number;
    }>;
  }
  interface pickResult {
    pageSize?: number;

    pageNumber?: number;

    totalRecords?: number;

    totalPages?: number;
    content: Array<{
      id: number;

      /**员工id */
      employeeId: string;

      /**员工名称 */

      employeeName: string;

      /**仓库id */

      storehouseId: string;

      /**单品商品数 */

      singleProductNum: number;

      /**单品批次数 */

      singleBatchNum: number;

      /**单品库位数 */

      singleLocationNum: number;

      /**单品sku数 */

      singleSkuNum: number;

      /**单品sku变体数 */

      singleStanNum: number;

      /**多品商品数 */

      multiProductNum: number;

      /**多品批次数 */

      multiBatchNum: number;

      /**多品库位数 */

      multiLocationNum: number;

      /**多品sku数 */

      multiSkuNum: number;

      /**多品sku变体数 */

      multiStanNum: number;

      /**总重量(Kg) */

      allWeight: number;

      /**总体积(立方米) */

      allVolume: number;

      /**总距离 */
      allDistance: number;

      /**验单不成功 */
      checklistUnsuccessfulNum: number;

      /**总分 */

      score: number;

      /**创建时间 */

      createAt: string;

      /**修改时间 */

      updateAt: string;
      // 日平均积分
      averageHour: number;
    }>;
  }
  interface sortingResult {
    pageSize?: number;

    pageNumber?: number;

    totalRecords?: number;

    totalPages?: number;
    content: Array<{
      id: number;

      /**分拣员id */
      employeeId: string;

      /**分拣员name */

      employeeName: string;

      /**仓库id */

      storehouseId: string;

      /**分拣商品总数量（个） */

      singleBatchGoodsCount: number;

      /**批次数量（个） */

      batchCount: number;

      /**单品变体sku数量（个） */

      singleSkuStanCount: number;

      /**多品变体sku数量（个） */

      multiSkuStanCount: number;

      /**包装多品批次商品数量（个） */

      packageProductCount: number;

      /**总分 */

      score: number;

      /**创建时间 */

      createAt: string;

      /**修改时间 */

      updateAt: string;
      // 日平均积分
      averageHour: number;
    }>;
  }
  interface checkBillResult {
    pageSize?: number;

    pageNumber?: number;

    totalRecords?: number;

    totalPages?: number;
    content: Array<{
      id: number;

      /**员工id */
      employeeId: string;

      /**员工name */
      employeeName: string;

      /**仓库id */
      storehouseId: string;

      /**订单数量（个） */
      orderCount: number;

      /**商品数量（个） */
      productCount: number;

      /**包装商品数量（个） */
      packProductCount: number;

      /**验单错误数量 */
      checklistUnsuccessfulNum: number;

      /**日小时平均数 */
      averageHour: number;

      /**总分 */
      score: number;

      /**创建时间 */
      createAt: string;
    }>;
  }
  interface packageResult {
    pageSize?: number;

    pageNumber?: number;

    totalRecords?: number;

    totalPages?: number;
    content: Array<{
      id: number;

      /**分拣员id */
      employeeId: string;

      /**分拣员name */
      employeeName: string;

      /**仓库id */
      storehouseId: string;

      /**打包面单数 */
      sheetCount: number;

      /**商品数量（个） */
      productCount: number;

      /**体积（平方米） */
      volumeCount: number;

      /**重量 */
      weightNum: number;

      /**总分 */
      score: number;

      /**创建时间 */
      createAt: string;

      /**修改时间 */
      updateAt: string;
      // 日平均积分
      averageHour: number;
    }>;
  }
  interface responseData {
    /**签收 */
    receiveResult?: receiveResult;

    /**分标 */
    distributeResult?: distributeResult;

    /**质检 */
    inspectionResult?: inspectionResult;

    /**入库称重 */
    weighInResult?: weighInResult;

    /**出库称重 */
    weighOutResult?: weighOutResult;

    /**上架 */
    shelvesResult?: shelvesResult;

    /**拣货 */
    pickResult?: pickResult;

    /**分拣 */
    sortingResult?: sortingResult;

    /**验单 */
    checkBillResult?: checkBillResult;

    /**打包 */
    packageResult?: packageResult;

    group?: number;
  }
  export type Response = responseData;
}

// 绩效变更
export declare namespace PointChange {
  export type Request = {
    /**变更值 */
    quantity: string;

    /**原因 */
    remarks: string;

    /**组 */
    group: string;

    /**员工id */
    employeeId: string;

    /**仓库id */
    storehouseId: string;

    /**员工名称 */
    employeeName: string;
  };

  export type Response = boolean;
}

// 绩效导出
export declare namespace ExportPerfmance {
  export type Request = {
    /**起始时间 */
    startTime: string;

    /**结束时间 */

    endTime: string;

    /**仓库id */

    storeId: string;

    /**组 */

    group: string;

    pageNum: number;

    pageSize: number;
  };

  export type Response = Blob;
}

// 绩效日志列表

export declare namespace GetLogList {
  export type Request = {
    /**起始时间 */
    startTime: string;

    /**结束时间 */
    endTime: string;

    /**仓库id */
    storeId: string;

    /**组 */
    group: string;

    // 员工id
    employeeId: string;

    pageNum: number;

    pageSize: number;
  };

  export type Response = Paging<{
    id: number;

    /**员工id*/
    employeeId: string;

    /**员工名称*/

    employeeName: string;

    /**仓库id*/

    storehouseId: string;

    /**类别(1:签收;2:分标;3:质检;4:入库称重;5:上架;6:拣货;7:分拣;8:验单;9:打包;10:出库称重;)	*/

    type: number;

    /**变动分分数*/
    score: number;

    /**变动 1加 2减	*/

    scoreType: number;

    /**操作后总分*/

    totalScore: number;

    /**业务id*/

    businessId: string;

    /**内容*/

    content: string;

    /**操作人员工id*/

    operatorId: string;

    /**创建时间*/

    createAt: string;
  }>;
}
