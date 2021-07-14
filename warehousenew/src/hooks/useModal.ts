import { FormInstance } from 'antd/lib/form/hooks/useForm';
import { useEffect, useState } from 'react';
import { Form } from 'antd';
import { CancelToken } from 'axios';

export interface ModalProps<T = any, F = any> {
  visible: boolean;
  show: (params?: T) => void;
  close: () => void;
  form: FormInstance<any>;
  onOk: (...p: any) => Promise<any>;
  params?: F | T;
  loading: boolean;
}

interface UseProps<T = any, F = any> {
  /**
   * 点击确定的回调
   * @param values form的值
   * @param p onOk中主动回调的参数
   */
  onOk?: (values: any, ...p: any) => Promise<boolean | void>;
  /**
   * 在modal弹框visible为true的时候调用，一般用于获取数据
   * @param params
   * @param setCancel
   */
  onFetch?: (params?: T, setCancel?: (c: CancelToken) => void) => Promise<F>;
  /**
   * 关闭提交时候form的自动校验， 默认为false
   */
  noVerifyForm?: boolean;
  /**
   * 关闭后自动清除数据
   */
  closeAndClear?: boolean;
}

export default function useModal<T = any, F = any>(
  props?: UseProps<T, F>,
): [ModalProps<T, F>] {
  const [visible, setVisible] = useState<boolean>(false);
  const [params, setParams] = useState<F | T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [cancel, setCancel] = useState<CancelToken | undefined>();
  const [form] = Form.useForm();
  const onOk = async (...p: any) => {
    setLoading(true);
    try {
      const values = props?.noVerifyForm
        ? form.getFieldsValue()
        : await form.validateFields();

      if (props?.onOk) {
        await props.onOk(values, ...p);
      }
      close();
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  const dispatchCancel = function() {
    if (cancel && cancel instanceof Function) {
      cancel();
      setCancel(undefined);
    }
  };
  const show = (params?: T) => {
    if (props?.onFetch) {
      dispatchCancel();
      props
        .onFetch(params, setCancel)
        .then(e => {
          setParams(e);
          setVisible(true);
        })
        .catch(e => {
          console.error(e);
        });
    } else {
      setParams(params);
      setVisible(true);
    }
  };
  const close = () => {
    dispatchCancel();
    setVisible(false);
    props?.closeAndClear && setTimeout(() => form.resetFields(), 1000);
  };
  return [{ visible, close, show, form, onOk, params, loading }];
}
