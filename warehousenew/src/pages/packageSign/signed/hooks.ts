import { Form, message } from 'antd';
import { useEffect, useState } from 'react';
import { history } from '@@/core/history';
import { PACKAGESELECTOPTION } from '@/enum.config';
import moment from 'moment';
import * as api from '@/services/packageSign';

import * as common from '@/services/common';
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
      type: 'packageSigned/search',
      payload: { searchData: { storageId: warehouseId } },
    });
  }, [warehouseId]);
  const onSearch = async () => {
    const values = form.getFieldsValue();
    const { createTime, type, searchText } = values;
    const searchTextObj: any = {
      putStorageNumber: '',
      id: '',
      createBy: '',
      supplier: '',
      logisticsTrackingNumber: '',
      sku: '',
      orderNumber: '',
    };
    // debugger;
    let startCreateDate = createTime
      ? moment(createTime[0]).format('YYYY-MM-DD')
      : '';
    let endCreateDate = createTime
      ? moment(createTime[1]).format('YYYY-MM-DD')
      : '';
    if (PACKAGESELECTOPTION.key(type)) {
      let keyItem: any = PACKAGESELECTOPTION.key(type);
      searchTextObj[keyItem.paramsKey] = searchText;
    }
    dispatch({
      type: 'packageSigned/search',
      payload: {
        searchData: {
          ...values,
          startCreateDate,
          endCreateDate,
          ...searchTextObj,
        },
      },
    });
  };
  const onValesChange = (changedValues: any) => {
    if ('signInType' in changedValues || 'storageId' in changedValues) {
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
      type: 'packageSigned/search',
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };
  const print = async (record: any) => {
    const hide = message.loading('打印中，请稍后...');
    const orderNumber = record.logisticsTrackingNumber.split(':')[1];
    const resp: any = await api.printOrder({ orderNumber }).catch(e => {});
    hide();
    resp && window.open(resp.data);
  };
  const showLog = async (record: any) => {
    let params = [record.putStorageNumber];
    const hide = message.loading('查询中，请稍后...');
    const resp = await common.getLog({ ids: params });
    dispatch({
      type: 'packageSigned/_logVisibleChange',
      payload: { visible: true, data: resp.data },
    });
    hide();
  };
  const changeRowsKey = (expanded: any, record: any) => {
    console.log(expanded, record);
    let temp = [];
    if (expanded) {
      temp.push(record.id);
    }
    setExpandedRowKeys(temp);
  };
  return {
    onChange,
    print,
    showLog,
    expandedRowKeys,
    changeRowsKey,
  };
};
export const logModalHooks = (dispatch: Function) => {
  const onClose = () => {
    dispatch({
      type: 'packageSigned/_logVisibleChange',
      payload: {
        visible: false,
      },
    });
  };
  return {
    onClose,
  };
};
