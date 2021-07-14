import { useEffect, useState } from 'react';
import { Form, message } from 'antd';
import { namespace } from '@/models/orderDispatchProcessed';
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
      payload: { searchData: { status: 3 } },
    });
  }, []);
  const onSearch = async () => {
    const formatStr =
      searchData.type === 'top' ? 'YYYY-MM-DD hh:mm:ss' : 'YYYY-MM-DD';
    const values = form.getFieldsValue();
    const timer = form.getFieldsValue().createTime;
    let beginDate = timer ? moment(timer[0]).format(formatStr) : '';
    let endDate = timer ? moment(timer[1]).format(formatStr) : '';
    dispatch({
      type: `${namespace}/search`,
      payload: { searchData: { ...values, beginDate, endDate, status: 3 } },
    });
  };
  const typeChange = (e: any) => {
    form.resetFields();
    const values = form.getFieldsValue();
    dispatch({
      type: `${namespace}/search`,
      payload: {
        searchData: {
          ...values,
          type: e.target.value,
          status: 3,
          beginDate: '',
          endDate: '',
        },
      },
    });
  };
  return {
    form,
    onSearch,
    typeChange,
  };
};

export const indexHooks = (dispatch: Function) => {
  const [selected, setSelected] = useState({ keys: [], rows: [] });
  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: `${namespace}/search`,
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };
  const onSelectChange = (keys: any, rows: any) => {
    setSelected({ keys, rows });
  };

  // 查看包裹详情
  const checkDetail = async (item: any) => {
    const { id, parcelNumber } = item;
    const hide = message.loading('查询中，请稍后...');
    const resp: any = await api.checkPackageDetail({ id }).catch(() => {});
    hide();
    if (resp && resp.data) {
      detailModal.show({
        packageNumber: parcelNumber,
        Data: resp.data,
      });
    }
  };

  // 查看日志
  const checkLog = async (item: any) => {
    const { id } = item;
    const hide = message.loading('查询中，请稍后...');
    const resp: any = await api.checkPackageLog({ id }).catch(() => {});
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
    onSelectChange,
    selected,
    checkDetail,
    checkLog,
    detailModal,
    logModal,
  };
};
