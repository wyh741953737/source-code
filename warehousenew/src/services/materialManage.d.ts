import { Paging } from './common.d';
// 查询列表
export declare namespace GetList {
  interface Data {
    /**
     * 耗材编号
     */
    cNumber?: string;
    /**
     * 耗材名称
     */

    cName?: string;
    /**
     *停用状态 0-否，1-是
     */

    isDelete?: string;
  }
  export interface Request {
    data: Data;
    pageNum: number;
    pageSize: number;
  }
  export type Response = Paging<{
    /** 主键ID*/
    id: number;

    /** 耗材编号*/

    cNumber: string;

    /** 耗材名称*/

    cName: string;

    /** 长*/

    length: number;

    /** 宽*/

    width: number;

    /** 高*/

    height: number;

    /** 重量*/

    weight: number;

    /** 体积*/

    volume: number;

    /** 数量*/

    quantity: number;

    /** 单价*/

    price: number;

    /** 备注*/

    remark: string;

    /** 创建人*/

    createBy: string;

    /** 创建时间*/

    createAt: string;

    /** 修改人*/

    updateBy: string;

    /** 修新时间*/

    updateAt: string;

    /** 逻辑删除标识（0：未删除，1：已删除）*/

    isDelete: number;

    /** 图片*/

    image: string;
  }>;
}

// 新增耗材
export declare namespace AddConsumables {
  export interface Request {
    /** 耗材编号*/
    cNumber?: string;

    /** 耗材名称*/

    cName: string;

    /** 长*/

    length?: number;

    /** 宽*/

    width?: number;

    /** 高*/

    height?: number;

    /** 重量*/

    weight?: number;

    /** 体积*/

    volume?: number;

    /** 数量*/

    quantity?: number;

    /** 单价*/

    price?: number;

    /** 图片*/

    image?: string;
  }
  export type Response = string;
}

// 编辑耗材
export declare namespace EditConsumables {
  export interface Request {
    id: string;
    /** 耗材编号*/
    cNumber: string;

    /** 耗材名称*/

    cName: string;

    /** 长*/

    length?: number;

    /** 宽*/

    width?: number;

    /** 高*/

    height?: number;

    /** 重量*/

    weight?: number;

    /** 体积*/

    volume?: number;

    /** 数量*/

    quantity?: number;

    /** 单价*/

    price?: number;

    /** 图片*/

    image?: string;

    /**停用  逻辑删除标识（0：否，1：是）*/
    isDelete?: number;
  }
  export type Response = string;
}

// 查询日志
export declare namespace GetLog {
  export interface Request {
    id: string;
  }
  export type Response = Paging<{
    /**
     *  主键id
     */
    id?: number;

    /**耗材主键id */
    consumablesId: number;

    /**耗材编号 */

    cNumber: string;

    /**耗材名称 */

    cName: string;

    /**创建人 */

    createBy: string;

    /**创建时间 */

    createAt: string;

    /**操作日志 */
    operationInfo: string;
  }>;
}

// 批量导入
export declare namespace BatchImport {
  export interface Data {
    /**耗材编号 */
    cNumber: string;

    /**耗材名称 */

    cName: string;

    /**长 */

    length?: number;

    /**宽 */

    width?: number;

    /**高 */

    height?: number;

    /**重量 */

    weight?: number;

    /**体积 */

    volume?: number;

    /**数量 */

    quantity?: number;

    /**单价 */

    price?: number;

    /**逻辑删除标识（0：未删除，1：已删除） */

    isDelete?: number;
  }
  export interface Request {
    storehouseConsumablesDTOList: Array<Data>;
  }
  export type Response = string;
}

// 导出Excel
export declare namespace ExportExcel {
  export type Request = {
    /**耗材编号 */
    cNumber: string;

    /**耗材名称 */

    cName: string;

    /** 逻辑删除标识（0：未删除，1：已删除） */

    isDelete: number;

    /**字段标题 */

    titleList: Array<number>;
  };
  export type Response = string;
}
