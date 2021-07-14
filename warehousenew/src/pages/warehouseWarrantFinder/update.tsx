import React, { useEffect } from 'react';
import { Modal, Form, Select, Input, Row, Col } from 'antd';
import style from './index.less';
import FormList from '@/components/FormList';
import { WAREHOUSESTATUS } from '@/enum.config';
import * as regs from '@/regExp.config';
import { ModalProps } from '@/hooks/useModal';

interface Props {
  modal: ModalProps;
}

export default ({ modal }: Props) => {
  const { visible, close, onOk, form, params = {}, loading } = modal;
  const logisticsList = (params.logisticsInfoDTOS || []).map((item: any) => {
    return {
      name: item.logisticsCompany,
      number: item.logisticsTrackingNumber,
    };
  });
  useEffect(() => {
    if (Object.keys(params).length > 0) {
      form.setFieldsValue({
        status: isNaN(Number(params.status))
          ? undefined
          : Number(params.status),
        logistics: logisticsList,
      });
    }
  }, [params]);
  return (
    <Modal
      title="修改运单号"
      visible={visible}
      destroyOnClose
      className={style['update-modal']}
      width={700}
      confirmLoading={loading}
      onCancel={close}
      onOk={() => onOk({ ...params, logisticsList })}
    >
      <Form form={form}>
        <div className={style.title}>状态</div>
        <Form.Item
          label="入库单状态"
          name="status"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 10 }}
          rules={[{ required: true, message: '请选择入库单状态' }]}
        >
          <Select
            getPopupContainer={triggerNode => triggerNode.parentNode}
            placeholder="请选择"
          >
            {WAREHOUSESTATUS.map(item => (
              <Select.Option key={item.key} value={item.key}>
                {item.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <div className={style.title}>物流信息</div>
        <FormList
          name="logistics"
          min={1}
          max={50}
          closeFilter={(index, field, fields) => {
            return logisticsList.length <= index;
          }}
          renderItem={(field, index) => {
            const ifRule = logisticsList.length <= index;
            return (
              <Row>
                <Col span={11} offset={1}>
                  <Form.Item
                    {...field}
                    label="物流公司"
                    name={[field.name, 'name']}
                    fieldKey={[field.fieldKey, 'name']}
                    rules={
                      ifRule
                        ? [
                            { required: true, message: '请输入物流公司' },
                            { max: 50, message: '限制50字符' },
                            {
                              pattern: regs.CEN,
                              message: '仅中文、英文、数字',
                            },
                          ]
                        : []
                    }
                  >
                    <Input
                      placeholder="请输入"
                      disabled={index < logisticsList.length}
                    />
                  </Form.Item>
                </Col>
                <Col span={11} offset={1}>
                  <Form.Item
                    {...field}
                    label="物流单号"
                    name={[field.name, 'number']}
                    fieldKey={[field.fieldKey, 'number']}
                    rules={
                      ifRule
                        ? [
                            { required: true, message: '请输入物流单号' },
                            { max: 100, message: '限制100字符' },
                            { pattern: regs.EN, message: '仅英文、数字' },
                          ]
                        : []
                    }
                  >
                    <Input
                      placeholder="请输入"
                      disabled={index < logisticsList.length}
                    />
                  </Form.Item>
                </Col>
              </Row>
            );
          }}
        />
      </Form>
    </Modal>
  );
};
