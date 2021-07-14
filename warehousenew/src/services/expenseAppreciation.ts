import request from '@/utils/request';

/** 获取列表 */
export const getList = (data: any) => {
  return request.get('', { params: data });
};
