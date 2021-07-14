import useSearchForm from '@/hooks/useSearchForm';
import * as api from '@/services/outBoundOrder';
import { history } from 'umi';
export const indexHooks = (query: { id: string }) => {
  const searchForm = useSearchForm(async c => {
    const { current, pageSize } = c;
    const id = query.id;
    const resp: any = await api
      .getDetail({ data: { id }, pageNum: current, pageSize })
      .catch(e => {});
    return {
      current: resp.data.pageNumber,
      total: resp.data.totalRecords,
      dataSource: resp.data.content,
      pageSize: resp.data.pageSize,
    };
  }, []);

  const backRouter = () => {
    history.go(-1);
  };

  return { ...searchForm, backRouter };
};
