import { Form, message, Modal } from 'antd';
import { useState, useRef, useEffect } from 'react';
import * as api from '@/services/surfacePlay';
import * as printApi from '@/services/packageRecord';
// import printAuto from '@/components/Print';
import printAuto from '@/utils/printThree';

import throttle from '@/utils/throttle';
const { confirm } = Modal;
const throttleContainer = throttle.new();
export const indexHooks = () => {
  const [form] = Form.useForm();

  const [dataSource, setDataSource] = useState<Array<any>>([]);
  const containerEl = useRef<any>(null);

  useEffect(() => {
    containerEl.current.focus();
  }, []);
  const onPressEnterContainer = async () => {
    const values = await form.validateFields(['container']);
    const logisticsTrackingNumbers = form
      .getFieldsValue()
      .logisticsTrackingNumbers.trim();
    const hide = message.loading('查询中，请稍后...');
    await throttleContainer.dispatch(
      async () => {
        const resp: any = await api
          .getList({
            logisticsTrackingNumbers: logisticsTrackingNumbers.split(','),
          })
          .catch(e => {});
        hide();
        if (resp && resp.data) {
          setDataSource(resp.data);
        } else {
          form.setFieldsValue({ container: '' });
          setDataSource([]);
        }
      },
      { time: 500 },
    );
  };

  const onValueChange = (index: number, objVal: any) => {
    // 缺少判断少货和多货逻辑
  };

  // 打印sku
  const printSku = async (record: any, batchNumberType: number) => {
    const { packCode } = record;
    const hide = message.loading('打印中，请稍后...');
    try {
      const resp = await printApi.printList({
        packCodeList: [packCode],
      });

      if (resp.data.length > 0)
        printAuto(
          resp.data.map(d => ({
            url: d.pdf,
            logisticsChannel: d.logisticsChannel,
            orderId: d.orderId,
            logisticsCompany: d.logisticsCompany,
          })),
        );
    } catch (error) {
    } finally {
      hide();
    }
  };
  return {
    form,
    onPressEnterContainer,
    dataSource,
    onValueChange,
    printSku,
    containerEl,
  };
};
