import { Form, message } from 'antd';
import { useEffect, useState } from 'react';
import { history } from '@@/core/history';
import moment from 'moment';
import * as api from '@/services/minuteMarkManage';
import useModal from '@/hooks/useModal';

import printRequest from '@/utils/printTwo';

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
      type: 'minuteMarkManage/search',
      payload: {
        searchData: {
          storageId: warehouseId,
          queryType: 1,
          queryTypeValue: null,
          subStandardStatus: 0,
          beginDate: null,
          endDate: null,
        },
      },
    });
  }, [warehouseId]);
  const onSearch = async () => {
    const values = form.getFieldsValue();
    const { createTime, queryTypeValue, subStandardStatus } = values;
    let beginDate = createTime
      ? moment(createTime[0]).format('YYYY-MM-DD')
      : null;
    let endDate = createTime
      ? moment(createTime[1]).format('YYYY-MM-DD')
      : null;
    dispatch({
      type: 'minuteMarkManage/search',
      payload: {
        searchData: {
          ...values,
          beginDate,
          endDate,
          subStandardStatus:
            subStandardStatus !== '' ? subStandardStatus : null,
          queryTypeValue: queryTypeValue ? queryTypeValue.trim() : null,
        },
      },
    });
  };
  const onValesChange = (changedValues: any) => {
    if ('subStandardStatus' in changedValues) {
      onSearch();
    }
  };
  return {
    form,
    onSearch,
    onValesChange,
  };
};

export const indexHooks = (dispatch: Function) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<Array<any>>([]);
  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: 'minuteMarkManage/search',
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };
  const goPODMinuteMarkPage = () => {
    history.push('/minuteMarkManage/pod');
  };
  const print = async (record: any) => {
    const hide = message.loading('打印中，请稍后...');
    const resp: any = await api
      .printOrder({ orderNumber: record.orderNumber })
      .catch(e => {});
    hide();
    printRequest([
      {
        title: '打印采购单号',
        url: resp.data,
      },
    ]);
    // resp && window.open(resp.data);
  };
  const showLog = (record: any) => {
    dispatch({ type: 'minuteMarkManage/getLog', payload: {} });
  };

  const changeRowsKey = (expanded: any, record: any) => {
    console.log(expanded, record);
    let temp = [];
    if (expanded) {
      temp.push(record.id);
    }
    setExpandedRowKeys(temp);
  };
  const [simpleForm] = useModal({
    onOk: async values => {
      const record: any = simpleForm.params;
      const { id } = record;
      const { subStandardQuantity } = values;
      const makeupParams: any = {
        quantity: subStandardQuantity,
        id,
      };
      const resp: any = await api.supplementPrint(makeupParams).catch(e => {});
      printRequest([
        {
          title: '补打',
          url: resp.data,
        },
      ]);
      // resp && window.open(resp.data);
    },
  });

  return {
    onChange,
    goPODMinuteMarkPage,
    print,
    showLog,
    expandedRowKeys,
    changeRowsKey,
    simpleForm,
  };
};
export const logModalHooks = (dispatch: Function) => {
  const onClose = () => {
    dispatch({
      type: 'minuteMarkManage/_logVisibleChange',
      payload: {
        visible: false,
      },
    });
  };
  return {
    onClose,
  };
};
