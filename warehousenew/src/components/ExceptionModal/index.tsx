import React, { useState } from 'react';
import { Form, Modal, Input, Row, Col, message } from 'antd';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
import Field from './field';

interface Props {
  exception: ExceptionProps;
}
const ExceptionModal: React.FC<Props> = ({ exception }) => {
  const {
    visible,
    close,
    onOk,
    form,
    exceptionNumber,
    validateItem,
    loading,
  } = exception;
  const layout = { labelCol: { span: 0 }, wrapperCol: { span: 24 } };
  return (
    <Modal
      title="异常说明"
      visible={visible}
      onCancel={close}
      onOk={onOk}
      confirmLoading={loading}
      destroyOnClose
    >
      <Form form={form}>
        <Row>
          <Col span={10}>
            <Form.Item
              label="异常数量"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              {exceptionNumber}
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="color"
          {...layout}
          dependencies={['other', 'size']}
          rules={[{ validator: validateItem }]}
        >
          <Field title="颜色问题" />
        </Form.Item>
        <Form.Item
          name="size"
          {...layout}
          dependencies={['color', 'other']}
          rules={[{ validator: validateItem }]}
        >
          <Field title="尺寸问题" />
        </Form.Item>
        <Form.Item
          name="other"
          {...layout}
          dependencies={['color', 'size']}
          rules={[{ validator: validateItem }]}
        >
          <Field title="异常件" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

interface ExceptionProps {
  show: (record: any, num: number) => void;
  close: () => void;
  visible: boolean;
  onOk: () => void;
  form: FormInstance;
  exceptionNumber: number;
  validateItem: (rule: any, value: any) => Promise<any>;
  loading: boolean;
  setLoading: (params: boolean) => void;
}
interface UseProps {
  onSuccess?: (params: any) => void;
  onPressEnter?: (params: any) => void;
}
interface Params {
  [key: string]: string | number;
}
export const useExceptionModal: (
  props: UseProps,
) => [ExceptionProps] = props => {
  const [visible, setVisible] = useState<boolean>(false);
  const [exceptionNumber, setExceptionNumber] = useState<number>(0);
  const [record, setRecordId] = useState<Params>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const show = (record: any, num: number) => {
    setVisible(true);
    setRecordId(record);
    setExceptionNumber(num);
  };
  const close = () => {
    setVisible(false);
    form.resetFields();
  };
  const onOk = async () => {
    const values = await form.validateFields();
    let total = 0;
    if (values.color?.checked) total += values.color?.count || 0;
    if (values.size?.checked) total += values.size?.count || 0;
    if (values.other?.checked) total += values.other?.count || 0;
    if (total < exceptionNumber) {
      message.error('请填写异常');
      return;
    }
    setLoading(true);
    const {
      relatedId, //关联主键i
      productId, //商品id
      variantId, //变体id
      sku, //变体sku
      batchNumber, //批次号
      image, //sku图片
      putStoragNumber, //入库编号
      type, //0：签收异常，1：分标异常，2：质检异常，4：称重异常，5：上架异常
      quantity, //异常数量=实际数量-合格数量
      unexceptionQuantity, //无异常数量或合格数量
      createBy, //创建人
      expectQuantity, //预计到货数量
      realQuantity, //实际数量
      storageId,
      usedContainerNum,
    } = record;
    let exceptionParams: Params = {
      relatedId,
      productId,
      variantId,
      sku,
      batchNumber,
      image,
      putStoragNumber,
      type,
      quantity,
      unexceptionQuantity,
      createBy,
      expectQuantity,
      realQuantity,
      storageId,
      usedContainerNum,
      colorNum: values.color && values.color.checked ? values.color.count : 0, //颜色问题数量
      colorRemark:
        values.color && values.color.checked ? values.color.remark : '', //颜色问题备注
      sizeNum: values.size && values.size.checked ? values.size.count : 0, //尺寸问题数量
      sizeRemark: values.size && values.size.checked ? values.size.remark : '', //尺寸问题备注
      abnormalPartsNum:
        values.other && values.other.checked ? values.other.count : 0, //异常件数量
      abnormalPartsRemark:
        values.other && values.other.checked ? values.other.remark : '', //异常件备注
    };
    // setLoading(false);
    props.onSuccess && props.onSuccess(exceptionParams);
    // close();
  };
  const validateItem = (rule: any, value: any) => {
    if (!value?.checked) return Promise.resolve();
    if (!value.count) {
      return Promise.reject('已勾选，请填写数量');
    }
    const values = form.getFieldsValue();
    let total = 0;
    if (values.color?.checked) total += values.color?.count || 0;
    if (values.size?.checked) total += values.size?.count || 0;
    if (values.other?.checked) total += values.other?.count || 0;
    if (total > exceptionNumber) return Promise.reject('已超出总数量');
    if (total < exceptionNumber) {
      return Promise.reject(`异常总数不足${exceptionNumber}`);
    }
    return Promise.resolve();
  };
  return [
    {
      show,
      close,
      visible,
      onOk,
      form,
      exceptionNumber,
      validateItem,
      loading,
      setLoading,
    },
  ];
};

export default ExceptionModal;
