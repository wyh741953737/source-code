import { Form, message } from 'antd';
import { useEffect } from 'react';
import moment from 'moment';
import { history } from '@@/core/history';
import * as api from '@/services/qualityManage';
import printRequest from '@/utils/printTwo';
import useModal from '@/hooks/useModal';
export const searchFormHooks = (
  searchData: any,
  warehouseId: string,
  dispatch: Function,
) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ ...searchData });
  }, [searchData]);
  useEffect(() => {
    dispatch({
      type: 'qualityManage/search',
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
    let beginDate: any = createTime
      ? moment(createTime[0]).format('YYYY-MM-DD')
      : null;
    let endDate: any = createTime
      ? moment(createTime[1]).format('YYYY-MM-DD')
      : null;
    dispatch({
      type: 'qualityManage/search',
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
      type: 'qualityManage/search',
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };
  const print = async (record: any) => {
    const hide = message.loading('打印中，请稍后...');
    const resp: any = await api
      .printOrder({ orderNumber: record.orderNumber })
      .catch(e => {});
    hide();
    printRequest([
      {
        url: resp.data,
        title: '打印采购单号',
      },
    ]);
    // resp && window.open(resp.data);
  };

  const [simpleForm] = useModal({
    onOk: async values => {
      const record: any = simpleForm.params;
      const { batchNumber, sku, shotNum, variantKeyMap } = record;
      const { subStandardQuantity } = values;
      const makeupParams: any = {
        subStandardQuantity,
        batchNumber,
        sku,
        shotNum,
        variantKeyMap,
      };

      const resp: any = await api.qualityMakeup(makeupParams).catch(e => {});
      printRequest([
        {
          url: resp.data,
          title: '打印批次号',
        },
      ]);
      // resp && window.open(resp.data);
    },
  });
  return {
    onChange,
    print,
    simpleForm,
  };
};
