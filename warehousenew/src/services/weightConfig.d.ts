import { Paging, PagingRequest } from './common.d';

//获取列表
export declare namespace GetList {
  export type Request = {
    pageNum: number;

    pageSize: number;
  };
  export type Response = Paging<{
    /**
     * id
     */
    id: number;
    /**
     * 框位
     */
    frameLocation: string;

    /**
     * 物流编码
     *  */

    logisticsCode: string;

    /**
     * 物流公司 */

    logisticsCompany: string;

    /**
     * 文件名称 */

    fileName: string;

    /**
     * 文件地址 */

    fileUrl: string;

    /**
     * 创建人 */

    createBy: string;

    /**
     * 创建时间 */

    createAt: string;

    /**
     * 修改人
     */
    updateBy: string;

    /**
     * 修改时间 */

    updateAt: string;
  }>;
}

// 获取物流列表
export declare namespace GetLogisticList {
  interface Data {
    /**公司id */
    id: number;

    /**公司中文名 */
    companyCnName: string;

    /**公司英文名 */
    companyEnName: string;

    /**公司代码 */
    companyCode: string;
  }

  export type Response = Array<Data>;
}

// 获取物流列表
export declare namespace GetLogisticNumberList {
  export interface Data {
    /**公司id */
    id: number;

    /**公司ID */
    companyId: string;

    /**账号名称 */

    accountName: string;
  }

  export type Request = {
    id: string;
  };

  export type Response = Array<Data>;
}

//新增修改框位设置

export declare namespace UpdateConfigList {
  export type Request = {
    /**
     * id
     */
    id: number;
    /**
     * 物流编码
     */
    logisticsCode: string;

    /**
     * 物流公司
     */
    logisticsCompany: string;

    /**
     * 文件名称
     */
    fileName: string;

    /**
     * 文件地址
     */
    fileUrl: string;

    /**
     * 物流账号
     */
    companyAccount: string;
    /**
     * 框位
     */
    frameLocation: number;

    /**
     * 仓库ID
     */
    storehouseId: string;
    /**
     * 仓库名称
     */
    storehouseName: string;
  };

  export type Response = boolean;
}

// 清空删除框位

export declare namespace DeleteRecord {
  export type Request = {
    id: number;
  };

  export type Response = boolean;
}

// 查询重量阈值

export declare namespace SearchThresholdVal {
  interface Data {
    /**
     * id
     */
    id: number;

    /**
     * threshold 阈值
     */
    ruleKey: string;

    /**
     * 值
     */
    number: string;

    /**
     * 创建人id
     */
    createId: string;
  }

  export type Response = Data;
}

// 修改保存重量阈值
export declare namespace SaveThresholdVal {
  export type Request = {
    id: number;
    number: string;
  };

  export type Response = boolean;
}
