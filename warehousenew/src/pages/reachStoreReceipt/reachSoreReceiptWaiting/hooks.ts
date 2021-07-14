import { useEffect } from 'react';
import { Form, message } from 'antd';
import { namespace } from '@/models/reachSoreReceiptWaiting';
import useModal from '@/hooks/useModal';
import * as api from '@/services/orderDispatch';
import moment from 'moment';

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
      payload: { searchData: { status: 2 } },
    });
  }, []);
  const onSearch = async () => {
    const values = form.getFieldsValue();
    const timer = form.getFieldsValue().createTime;
    let beginDate = timer ? moment(timer[0]).format('YYYY-MM-DD') : '';
    let endDate = timer ? moment(timer[1]).format('YYYY-MM-DD') : '';
    dispatch({
      type: `${namespace}/search`,
      payload: { searchData: { ...values, beginDate, endDate, status: 2 } },
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

  const checkDetail = async (item: any) => {
    const { id, parcelNumber } = item;
    const hide = message.loading('查询中，请稍后...');
    const resp: any = await api.checkPackageDetail({ id }).catch(e => {});
    hide();
    if (resp && resp.data) {
      detailModal.show({
        packageNumber: parcelNumber,
        Data: resp.data,
      });
    }
  };
  // 查询包裹日志
  const checkLog = async (item: any) => {
    const { id } = item;
    const hide = message.loading('查询中，请稍后...');
    const resp: any = await api.checkPackageLog({ id }).catch(e => {});
    hide();
    if (resp && resp.data) {
      logModal.show(resp.data);
    }
  };

  // 包裹详情
  const [detailModal] = useModal({});

  // 日志详情
  const [logModal] = useModal({});

  return {
    onChange,
    detailModal,
    checkDetail,
    logModal,
    checkLog,
  };
};
