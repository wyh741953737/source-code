import { Form, Modal, message } from 'antd';
import { useEffect } from 'react';
import useModal from '@/hooks/useModal';
import * as api from '@/services/offsetRuleConfig';

export const indexHooks = (dispatch: Function, dataSource: any) => {
  useEffect(() => {
    dispatch({ type: 'offsetRuleConfig/getList', payload: {} });
  }, []);
  const [editModal] = useModal({
    onOk: async (values, p) => {
      const { storehouseRuleRelationDTOList } = p;
      try {
        if (p.id) {
          // 是修改
          await api
            .editRule({
              ...values,
              storehouseRuleRelationDTOList,
              id: p.id,
            })
            .catch(e => {});
        } else {
          await api
            .addRule({
              ...values,
              username: values.username ? values.username : '',
              storehouseRuleRelationDTOList,
            })
            .catch(e => {});
        }
      } catch (e) {
        return false;
      }
      dispatch({ type: 'offsetRuleConfig/getList', payload: {} });
      return true;
    },
  });

  const onClick = async ({ item, key, domEvent }: any, record: any) => {
    domEvent.stopPropagation();
    const hide = message.loading('查询中，请稍后...');
    const { id, storehouseId } = record;
    await api
      .playStatus({
        id,
        storehouseId,
        status: key,
      })
      .catch(e => {});
    hide();
    dispatch({ type: 'offsetRuleConfig/getList', payload: {} });
  };
  return {
    editModal,
    onClick,
  };
};
