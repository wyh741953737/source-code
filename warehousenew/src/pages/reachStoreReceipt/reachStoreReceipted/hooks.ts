import { useEffect } from 'react';
import { Form, message } from 'antd';
import { namespace } from '@/models/reachStoreReceipted';
import useModal from '@/hooks/useModal';
import moment from 'moment';
import * as api from '@/services/orderDispatch';

export const searchFormHooks = (
  searchData: any,
  dispatch: Function,
  warehouseId: string,
) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(searchData);
  }, [searchData]);
  useEffect(() => {
    dispatch({
      type: `${namespace}/search`,
      payload: { searchData: {} },
    });
  }, []);
  const onSearch = async () => {
    const values = form.getFieldsValue();
    const timer = form.getFieldsValue().createTime;
    let beginDate = timer ? moment(timer[0]).format('YYYY-MM-DD hh:mm:ss') : '';
    let endDate = timer ? moment(timer[1]).format('YYYY-MM-DD hh:mm:ss') : '';
    dispatch({
      type: `${namespace}/search`,
      payload: { searchData: { ...values, beginDate, endDate } },
    });
  };

  return {
    form,
    onSearch,
  };
};

export const indexHooks = (dispatch: Function) => {
  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: `${namespace}/search`,
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };

  // 查看日志
  const checkLog = async (record: any) => {
    const { id } = record;
    const hide = message.loading('查询中，请稍后...');
    const resp: any = await api.checkPackageLog({ id }).catch(e => {});

    hide();
    if (resp && resp.data) {
      logModal.show(resp.data);
    }
  };

  // 日志详情
  const [logModal] = useModal({});
  return {
    onChange,

    checkLog,
    logModal,
  };
};
