import { useEffect, useState } from 'react';
import { Form, message } from 'antd';
import moment from 'moment';
import useModal from '@/hooks/useModal';
import * as api from '@/services/weightOutbound';
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
      type: 'waitingOutbound/search',
      payload: { searchData: { storageId: warehouseId, status: 0 } },
    });
  }, [warehouseId]);
  const onSearch = async () => {
    const values = form.getFieldsValue();
    const time = form.getFieldsValue().createTime;
    let inspectionTimeStart = time
      ? moment(time[0]).format('YYYY-MM-DD HH:mm:ss')
      : '';
    let inspectionTimeEnd = time
      ? moment(time[1]).format('YYYY-MM-DD HH:mm:ss')
      : '';
    dispatch({
      type: 'waitingOutbound/search',
      payload: {
        searchData: {
          ...values,
          inspectionTimeStart,
          inspectionTimeEnd,
          status: 0,
        },
      },
    });
  };
  const onClearSearch = () => {
    form.resetFields();
    dispatch({
      type: 'waitingOutbound/searchDataClear',
      payload: { storageId: warehouseId, status: 0 },
    });
  };
  return {
    form,
    onSearch,
    onClearSearch,
  };
};

export const indexHooks = (dispatch: Function) => {
  const [selected, setSelected] = useState({ keys: [], rows: [] });

  useEffect(() => {
    dispatch({
      type: 'waitingOutbound/saveThreshold',
      payload: {},
    });
  }, []);

  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: 'waitingOutbound/search',
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };
  const onSelectChange = (keys: any, rows: any) => {
    console.log(keys, rows, 'keys==========rows');
    setSelected({ keys, rows });
  };
  const [resultModal] = useModal({});

  const [inputWeightModal] = useModal({
    onOk: async (values, p) => {
      try {
        console.log(p, 'p===========');
        if (p.length > 0) {
          let params = p.map((item: any) => {
            return {
              logisticsTrackingNumber: item.logisticsTrackingNumber,
              weight: item.actualWeight,
              orderId: item.orderId,
            };
          });
          const resp = await api.inputWeight(params).catch(e => {});
          if (resp && resp.code === 200) {
            resultModal.show(resp.data);
            dispatch({ type: 'waitingOutbound/search', payload: {} });
            setSelected({ keys: [], rows: [] });
          }
        } else {
          resultModal.show([]);
        }
      } catch (e) {
        return false;
      }
      // dispatch({ type: 'waitingOutbound/search', payload: {} });
      return true;
    },
  });

  const inputWeight = () => {
    if (selected.keys.length === 0) return message.warning('未选择运单号');
    let newData = selected.rows.map((item: any) => {
      return {
        ...item,
        timer: new Date().getTime(),
      };
    });
    inputWeightModal.show(newData);
    // inputWeightModal.show(selected.rows);
  };
  return {
    onChange,
    selected,
    onSelectChange,
    inputWeight,
    inputWeightModal,
    resultModal,
  };
};
