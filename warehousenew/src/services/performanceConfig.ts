import request from '@/utils/request';
import { GetList, EditRule } from './performanceConfig.d';
/**
 * 获取规则列表
 * @param data
 */
export function getList(data: GetList.Request) {
  return request.post<GetList.Response>(
    '/storehouse/performanceRule/getRuleList',
    data,
  );
}

//绩效规则新增编辑
export function editRule(data: EditRule.Request) {
  return request.post<EditRule.Response>(
    '/storehouse/performanceRule/addOrUpdateForRuleList',
    data,
  );
}
