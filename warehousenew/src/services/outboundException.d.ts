import { Paging, PagingRequest } from './common.d';

//获取列表
export declare namespace GetList {
  interface Data {
    // 仓库ID
    storehouseId?: string;
    /**
     * 提交人
     */
    createBy?: string;

    /**
     *  异常类型：1.拣货少货，2.拣货坏件
     */
    abnormalType?: number;
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
     * 主键id
     */
    id: number;

    /**
     * 异常编号(单据ID)
     */
    abnormalCode: string;

    /**
     * 异常类型：1.拣货少货，2.拣货坏件
     */
    abnormalType: number;

    /**
     * 异常数量
     */
    abnormalQuantity: number;

    /**
     * 变体ID
     */
    variantId: string;

    /**
     * 变体sku
     */
    variantSku: string;

    /**
     * 变体短码
     */
    variantNum: string;

    /**
     * 变体图片
     */
    variantImg: string;

    /**
     * 拣货批次id
     */
    batchId: string;

    /**
     * 拣货容器编号
     */
    containerNum: string;

    /**
     * 提交人id
     */
    createId: string;

    /**
     * 提交人名称
     */
    createBy: string;

    /**
     * 提交时间
     */
    createAt: string;

    /**
     * 仓库ID
     */
    storehouseId: string;

    /**
     * 仓库名称
     */
    storehouseName: string;
  }>;
}
