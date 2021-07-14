import { Apply } from '@cckj/cj-hooks/bin/useReply';
import api from '@/services/homePage';

/**
 * 父组件跟子组件需要共同调用的api,为了防止多次调用，遂取出
 * */

interface BasicInfo {
  warehouse: string;
}

export const basicInfoApply: Apply = async (data: BasicInfo) => {
  const temp = {
    ...data,
  };
  const resp = await api.getHomePageInfo(temp);
  return resp.data;
};
