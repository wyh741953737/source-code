import { Form, message, Modal } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import * as api from '@/services/weightOutbound';
import throttle from '@/utils/throttle';
import useButton from '@/hooks/useButton';
import { reportLocalAudio } from '@/utils/report';
const { confirm } = Modal;
const throttleContainer = throttle.new();
export const indexHooks = () => {
  const [form] = Form.useForm();

  const [dataSource, setDataSource] = useState<Array<any>>([]);
  const containerEl = useRef<any>(null);
  const [msg, setMsg] = useState<string>('');

  useEffect(() => {
    containerEl.current.focus();
  }, []);

  const getData = async () => {
    const values = await form.validateFields();
    const { logisticsTrackingNumber } = values;
    const hide = message.loading('查询中，请稍后...');
    await throttleContainer.dispatch(
      async () => {
        const resp: any = await api
          .getOfflineWeightList({
            logisticsTrackingNumber,
          })
          .catch(e => {});
        hide();
        if (resp && resp.data) {
          // const (msg, list) = resp.data
          let Data = resp.data.map((item: any) => ({
            ...item,
            isWeight: false,
            weight: 0,
          }));
          setDataSource(Data);
          containerEl.current.select();
        }
      },
      { time: 500 },
    );
  };
  const onPressEnter = async () => {
    if (dataSource.length > 0 && !dataSource[0].isWeight) {
      confirm({
        title: '提示',
        content: '当前包裹重量未确认，确认跳过称重下一个包裹吗？',
        onOk: () => {
          getData();
        },
        onCancel() {},
      });
    } else {
      getData();
    }
  };
  const onValueChange = (index: number, objVal: any) => {
    let sourceData = JSON.parse(JSON.stringify(dataSource));
    let replaceData = JSON.parse(JSON.stringify(sourceData[index]));
    let replaceNewData = { ...replaceData, ...objVal };
    sourceData.splice(index, 1, replaceNewData);
    setDataSource(sourceData);
  };

  const printBtn = useButton({
    onClick: async (record: any) => {
      const { logisticsTrackingNumber, weight, orderId } = record;
      let params = [
        {
          logisticsTrackingNumber,
          weight,
          orderId,
        },
      ];
      const resp = await api.inputWeight({ data: params }).catch(e => {});
      if (resp && resp.code === 200 && !resp.data.msg) {
        const newData = dataSource.map((item: any) => ({
          ...item,
          isWeight: true,
        }));
        setDataSource(newData);
        setMsg('');
        reportLocalAudio(['成功']);
        message.success('成功');
      } else {
        resp && setMsg(resp?.data.msg);
        reportLocalAudio(['失败']);
      }
    },
  });
  return {
    form,
    onPressEnter,
    dataSource,
    onValueChange,
    containerEl,
    printBtn,
    msg,
  };
};
