import { Form } from 'antd';
import { useEffect } from 'react';
import { history } from '@@/core/history';
import moment from 'moment';
import * as api from '@/services/weighManage';
import printRequest from '@/utils/printTwo';
import useModal from '@/hooks/useModal';
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
      type: 'weighManage/search',
      payload: {
        searchData: {
          storageId: warehouseId,
          status: 0,
          queryType: 1,
          queryTypeValue: null,
          beginDate: null,
          endDate: null,
        },
      },
    });
  }, [warehouseId]);
  const onSearch = async () => {
    const values = form.getFieldsValue();
    const { createTime, status, queryTypeValue } = values;
    let beginDate = createTime
      ? moment(createTime[0]).format('YYYY-MM-DD')
      : null;
    let endDate = createTime
      ? moment(createTime[1]).format('YYYY-MM-DD')
      : null;
    dispatch({
      type: 'weighManage/search',
      payload: {
        searchData: {
          ...values,
          beginDate,
          endDate,
          status: status !== '' ? status : null,
          queryTypeValue: queryTypeValue ? queryTypeValue.trim() : null,
        },
      },
    });
  };
  const onValesChange = (changedValues: any) => {
    if ('status' in changedValues) {
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
  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: 'weighManage/search',
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };
  const [simpleForm] = useModal({
    onOk: async values => {
      const record: any = simpleForm.params;
      const { batchNumber, variantKeyMap, sku, shotNum } = record;
      const { subStandardQuantity } = values;
      const makeupParams: any = {
        subStandardQuantity,
        batchNumber,
        sku,
        shotNum,
        variantKeyMap,
      };
      const resp: any = await api.weightMakeup(makeupParams).catch(e => {});
      printRequest([
        {
          title: '打印批次号',
          url: resp.data,
        },
      ]);
    },
  });
  return {
    onChange,
    simpleForm,
  };
};
