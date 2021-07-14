import request from '@/utils/request';

import { GetList, AddRule, EditRule, PlayStatus } from './offsetRuleConfig.d';

/** 查询列表 */
export function getList() {
  return request.post<GetList.Response>(
    `/storehouse/deductionRules/getDeductionRuleList`,
  );
}

/** 新增抵扣规则 */
export function addRule(data: AddRule.Request) {
  return request.post<AddRule.Response>(
    `/storehouse/deductionRules/addDeductionRule`,
    data,
  );
}

/**修改抵扣规则 */
export function editRule(data: EditRule.Request) {
  return request.post<EditRule.Response>(
    `/storehouse/deductionRules/updateDeductionRule`,
    data,
  );
}

/**停用启用规则 */
export function playStatus(data: PlayStatus.Request) {
  return request.post<PlayStatus.Response>(
    `/storehouse/deductionRules/disableOrEnableRule`,
    data,
  );
}
