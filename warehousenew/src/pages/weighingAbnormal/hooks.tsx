import React, { useEffect, useState } from 'react';
import { Form, message, Modal } from 'antd';
import moment from 'moment';
import useModal from '@/hooks/useModal';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import * as api from '@/services/weightOutbound';
const { confirm } = Modal;
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
      type: 'weighingAbnormal/search',
      payload: { searchData: { storageId: warehouseId, status: 2 } },
    });
  }, [warehouseId]);
  const onSearch = async () => {
    const values = form.getFieldsValue();
    const time = form.getFieldsValue().createTime;
    let weighingTimeStart = time
      ? moment(time[0]).format('YYYY-MM-DD HH:mm:ss')
      : '';
    let weighingTimeEnd = time
      ? moment(time[1]).format('YYYY-MM-DD HH:mm:ss')
      : '';
    dispatch({
      type: 'weighingAbnormal/search',
      payload: {
        searchData: {
          ...values,
          weighingTimeStart,
          weighingTimeEnd,
          status: 2,
        },
      },
    });
  };
  const onClearSearch = () => {
    form.resetFields();
    dispatch({
      type: 'weighingAbnormal/searchDataClear',
      payload: { storageId: warehouseId, status: 2 },
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
      type: 'weighingAbnormal/saveThreshold',
      payload: {},
    });
  }, []);

  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: 'weighingAbnormal/search',
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
  const mandatoryOutbound = () => {
    if (selected.keys.length === 0) return message.warning('未选择运单号', 3);
    console.log(selected.keys, 'selected.keys============');
    const SubContent = () => (
      <div>
        <div>
          <span style={{ color: 'red' }}>点击【继续】该包裹将出库</span>
          ，你还要继续吗？
        </div>
      </div>
    );
    confirm({
      width: 450,
      title: '您选择的运单号重量异常，是否确认出库',
      icon: <ExclamationCircleOutlined />,
      content: <SubContent />,
      okText: '继续',
      onOk: async () => {
        const params = selected.rows.map((item: any) => ({
          logisticsTrackingNumber: item.logisticsTrackingNumber,
          orderId: item.orderId,
        }));
        const resp = await api.forceOutbound(params);
        if (resp.code === 200 && resp.data) {
          message.success('强制出库成功');
          setSelected({ keys: [], rows: [] });
          dispatch({
            type: 'weighingAbnormal/search',
            payload: {},
          });
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
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
            dispatch({
              type: 'weighingAbnormal/search',
              payload: {},
            });
            setSelected({ keys: [], rows: [] });
          }
        } else {
          resultModal.show([]);
        }
      } catch (e) {
        return false;
      }

      return true;
    },
  });

  const inputWeight = () => {
    if (selected.keys.length === 0) return message.warning('未选择运单号', 3);
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
    selected,

    onChange,
    onSelectChange,
    mandatoryOutbound,
    inputWeight,
    inputWeightModal,
    resultModal,
  };
};
