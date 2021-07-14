import { useEffect } from 'react';
import { Form, message } from 'antd';
import moment from 'moment';
import useModal from '@/hooks/useModal';
import * as api from '@/services/putawayManage';
export const searchFormHooks = (
  searchData: any,
  warehouseId: string,
  dispatch: Function,
) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(searchData);
  }, [searchData]);
  useEffect(() => {
    dispatch({
      type: 'putawayManage/search',
      payload: { searchData: { storehouseId: warehouseId } },
    });
  }, [warehouseId]);
  const onSearch = async () => {
    const values = form.getFieldsValue();
    let beginDate = form.getFieldsValue().createTime
      ? moment(form.getFieldsValue().createTime[0]).format('YYYY-MM-DD')
      : '';
    let endDate = form.getFieldsValue().createTime
      ? moment(form.getFieldsValue().createTime[1]).format('YYYY-MM-DD')
      : '';
    dispatch({
      type: 'putawayManage/search',
      payload: { searchData: { ...values, beginDate, endDate } },
    });
  };
  const onClearSearch = () => {
    form.resetFields();
    dispatch({
      type: 'putawayManage/searchDataClear',
      payload: { storehouseId: warehouseId },
    });
  };
  return {
    form,
    onSearch,
    onClearSearch,
  };
};

export const indexHooks = (dispatch: Function) => {
  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: 'putawayManage/search',
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };

  // 回填运单号
  const [toAssignModal] = useModal({
    onOk: async (values, p) => {
      const data = {
        id: p.id,
        list: p.userArr
          .filter((item: any) => values.userIds.indexOf(item.value) > -1)
          .map((item: any) => ({
            id: item.value,
            name: item.text,
          })),
      };
      try {
        await api.onShelfReassign(data);
        message.success('指派成功');
      } catch (error) {
        return Promise.reject(error);
      }
    },
  });

  return {
    onChange,
    toAssignModal,
  };
};
