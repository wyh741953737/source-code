import { Form, message, Modal } from 'antd';
import { useState, useRef, useEffect } from 'react';
import * as api from '@/services/orderDispatch';
import { reportText } from '@/utils/report';

import throttle from '@/utils/throttle';
const { confirm } = Modal;
const throttleContainer = throttle.new();
export const indexHooks = (warehouseId: string) => {
  const [form] = Form.useForm();

  useEffect(() => {
    containerEl.current.focus();
  }, []);
  useEffect(() => {
    form.setFieldsValue({ storageId: warehouseId });
  }, [warehouseId]);
  const [dataSource, setDataSource] = useState<Array<any>>([]);
  const containerEl = useRef<any>(null);

  const onPressEnterContainer = async () => {
    const values = await form.validateFields();
    const parcelNumbering = form.getFieldsValue().parcelNumbering.trim();
    const { storageId } = values;
    const hide = message.loading('查询中，请稍后...');
    await throttleContainer.dispatch(
      async () => {
        const resp: any = await api
          .signFor({
            parcelNumbering,
            storageId,
          })
          .catch(e => {});
        hide();
        if (resp && resp.data) {
          if (resp.data.mark == 1) {
            message.warn('该包裹为拦截包裹');
            reportText('拦截包裹');
          }

          setDataSource([resp.data]);
        } else {
          form.setFieldsValue({ parcelNumbering: '' });
        }
      },
      { time: 500 },
    );
  };

  const onValueChange = (index: number, objVal: any) => {
    // 缺少判断少货和多货逻辑
  };

  return {
    form,
    onPressEnterContainer,
    dataSource,
    onValueChange,
    containerEl,
  };
};
