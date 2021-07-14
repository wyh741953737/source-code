import { useEffect, useState } from 'react';
import { Form } from 'antd';
import moment from 'moment';
export const searchFormHooks = (
  searchData: any,
  warehouseId: string,
  query: any,
  dispatch: Function,
) => {
  const [form] = Form.useForm();
  const { receiveRecordId } = query;
  useEffect(() => {
    form.setFieldsValue(searchData);
  }, [searchData]);
  useEffect(() => {
    dispatch({
      type: 'listDetail/search',
      payload: {
        searchData: {
          // storageId: warehouseId,
          receiveRecordId,
        },
      },
    });
  }, [warehouseId]);
  const onSearch = async () => {
    const values = form.getFieldsValue();
    const timer = form.getFieldsValue().createTime;
    let beginDate = timer ? moment(timer[0]).format('YYYY-MM-DD') : '';
    let endDate = timer ? moment(timer[1]).format('YYYY-MM-DD') : '';
    dispatch({
      type: 'listDetail/search',
      payload: {
        searchData: {
          ...values,
          receiveRecordId,
          beginDate,
          endDate,
        },
      },
    });
  };
  const onClearSearch = () => {
    form.resetFields();
    dispatch({
      type: 'listDetail/searchDataClear',
      payload: {
        // storageId: warehouseId,
        receiveRecordId,
      },
    });
  };
  return {
    form,
    onSearch,
    onClearSearch,
  };
};

export const indexHooks = (dispatch: Function, query: any) => {
  const [selected, setSelected] = useState({ keys: [], rows: [] });
  const { id } = query;

  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: 'listDetail/search',
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };
  return {
    onChange,
    selected,
  };
};
