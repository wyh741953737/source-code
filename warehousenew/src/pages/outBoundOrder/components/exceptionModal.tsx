import React from 'react';
import { Modal, Form, Select, Input, Row, Col } from 'antd';
import style from '../index.less';
import { ModalProps } from '@/hooks/useModal';
import { TIMEOUTORDERSTATUS } from '@/enum.config';
interface Props {
  modal: ModalProps;
}

export default ({ modal }: Props) => {
  const { visible, close, onOk, form, params, loading } = modal;

  const layout = { labelCol: { span: 7 }, wrapperCol: { span: 17 } };

  const onValuesChange = (changedValues: any) => {
    if ('storehouseId' in changedValues) {
    }
  };

  const checkSpace = (rule: any, value: string, callback: any) => {
    if (!value) {
      callback('备注不能为空');
      return;
    } else if (!value.trim()) {
      callback('不能输入纯空格');
      return;
    }
    callback();
  };

  return (
    <Modal
      title={`异常订单处理`}
      visible={visible}
      width={600}
      destroyOnClose={true}
      wrapClassName={style['add-or-update-modal']}
      confirmLoading={loading}
      onCancel={close}
      onOk={() => onOk(params)}
    >
      <Form form={form} onValuesChange={onValuesChange} preserve={false}>
        <Row>
          <Col span={22}>
            <Form.Item
              label={'处理类型'}
              name={'controlStatus'}
              {...layout}
              rules={[{ required: true, message: '' }]}
              initialValue={2}
            >
              <Select getPopupContainer={triggerNode => triggerNode.parentNode}>
                {TIMEOUTORDERSTATUS.map(item => {
                  if (item.key !== 1) {
                    return (
                      <Select.Option key={item.key} value={item.key}>
                        {item.value}
                      </Select.Option>
                    );
                  }
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label={'备注'}
              name={'remarks'}
              {...layout}
              rules={[
                // { required: true, message: '请填写备注' },
                { validator: checkSpace },
              ]}
            >
              <Input.TextArea placeholder="请填写备注" maxLength={100} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
