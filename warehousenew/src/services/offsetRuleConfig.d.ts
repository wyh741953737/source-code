import { Paging } from './common.d';
// 查询列表
export declare namespace GetList {
  interface Detail {
    /** 自增主键 */
    id?: number;

    /** 自定义规则名称ID */

    ruleNameId?: number;

    /** 自定义规则名称 */

    ruleNameName?: string;

    /** 规则CODE */

    ruleId?: number;

    /** 规则名称 */

    ruleName?: string;

    /** 排序 */

    ruleRank?: number;

    /** 创建时间 */

    createAt?: string;

    /** 修改时间 */
    updateAt?: string;

    /** 创建人 */
    createBy?: string;

    /** 修改人 */

    updateBy?: string;

    /** 状态(0:未启用;1:启用) */

    status?: number;
  }
  interface Data {
    /**自定义规则自增主键ID */
    id?: number;

    /**规则名称 */

    name?: string;

    /**1:分仓，2：抵扣	 */

    type?: number;

    /**仓库ID */
    storehouseId?: string;

    /**仓库名称 */

    storehouseName?: string;

    /**状态(0:未启用;1:启用) */

    status?: number;

    /**创建时间 */

    createAt?: string;

    /**创建用户 */
    createBy?: string;

    /**更新时间 */

    updateAt?: string;

    /**更新用户 */
    updateBy?: string;

    /**首单是否优先 */

    firstOrder?: string;

    /**客户是否优先 */

    firstCustomer?: string;

    /**客户名称 */

    username?: string;

    storehouseRuleRelationDTOList: Array<Detail>;
  }
  export type Response = Array<Data>;
}

// 新增规则
export declare namespace AddRule {
  interface Data {
    /**规则Code */
    ruleId: number;

    /**规则名称 */

    ruleName?: string;

    /**排序	 */

    ruleRank?: number;
  }

  export type Request = {
    /**规则名称 */
    name: string;

    /**仓库ID */
    storehouseId: string;

    /**首单是否优先 "1"为是  "2"为否 */

    firstOrder: string;

    /**客户是否优先 "1"为是  "2"为否 */

    firstCustomer: string;

    /**客户名称 */

    username: string;

    /**规则和自定义规则关联表 */

    storehouseRuleRelationDTOList: Array<Data>;
  };
  export type Response = boolean;
}

// 新增规则
export declare namespace EditRule {
  interface Data {
    ruleId: number;

    ruleName: string;

    ruleRank: number;
  }

  export type Request = {
    id: string;
    /**规则名称 */
    name: string;

    /**仓库ID */
    storehouseId: string;

    /**首单是否优先 "1"为是  "2"为否 */

    firstOrder: string;

    /**客户是否优先 "1"为是  "2"为否 */

    firstCustomer: string;

    /**客户名称 */

    username: string;

    /**规则和自定义规则关联表 */

    storehouseRuleRelationDTOList: Array<Data>;
  };
  export type Response = boolean;
}

// 停用，启用规则
export declare namespace PlayStatus {
  export type Request = {
    id: string;
    /**仓库ID */
    storehouseId: string;

    /**停用 0,启用1 */

    status: string;
  };
  export type Response = boolean;
}
