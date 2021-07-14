import useSearchForm from '@/hooks/useSearchForm';
import * as api from '@/services/putawayManage';
import { useState, useCallback } from 'react';
import { message } from 'antd';

export const indexHooks = (query: { id: string }) => {
  const searchForm = useSearchForm(async c => {
    const { current, pageSize } = c;
    const onShelfNum = query.id;
    const hide = message.loading('查询中，请稍后...');
    const resp: any = await api
      .getputawayDetail({ onShelfNum, pageNum: current, pageSize })
      .catch(e => {});
    hide();
    return {
      current: resp.data.pageNumber,
      total: resp.data.totalRecords,
      dataSource: resp.data.content,
      pageSize: resp.data.pageSize,
    };
  }, []);
  const [visible, setVisible] = useState<boolean>(false);
  const [targetSKU, setTargetSKU] = useState<string>('');
  const [targetId, setTargetID] = useState<string>('');
  const checkDetail = useCallback(
    (id: string, sku: string) => {
      setTargetID(id);
      setTargetSKU(sku);
      setVisible(true);
    },
    [targetId],
  );

  const closeDetail = useCallback(() => {
    setVisible(false);
  }, [targetId]);
  return {
    ...searchForm,
    visible,
    targetSKU,
    targetId,
    closeDetail,
    checkDetail,
  };
};
