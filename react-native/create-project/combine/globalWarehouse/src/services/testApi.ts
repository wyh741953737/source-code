import request from '../utils/request';

export async function getListApi(data: any) {
  return request({
    url: 'api/v45/business/jobs/product/home/page',
    data,
  });
}

export async function isRegisterApi(data: any) {
  return request({
    url: 'api/v45/login/check/email/isRegister',
    method: 'post',
    data,
  });
}
