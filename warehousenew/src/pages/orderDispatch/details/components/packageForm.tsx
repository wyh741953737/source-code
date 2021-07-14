import { Col, Form, Input, Row, Select, InputNumber } from 'antd';
import React, { useEffect } from 'react';
import { indexHooks } from '../hooks';
import { Link, history } from 'umi';
import { connect } from 'dva';
// import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { SearchBtnRender } from '@/components/SearchTable';
import { PACKAGEPORPERTY } from '@/enum.config';

export default connect(({ orderDispatchWaiting }: any) => ({
  currentItem: orderDispatchWaiting.currentItem,
}))(({ dispatch, currentItem, form, detailData }: any) => {
  // const [option] = useOptions(warehouseApply, { interval: Infinity })
  const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
  const layout2 = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };
  return (
    <Form form={form} {...layout}>
      <Row style={{ maxWidth: 1200 }}>
        <Col span={8}>
          <Form.Item name="dispatchNumber" label="调度编号">
            <Input placeholder="请输入" disabled />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="packProperty" label="包裹属性" initialValue={1}>
            <Select
              placeholder="请选择"
              disabled={detailData && detailData.length > 0}
            >
              {PACKAGEPORPERTY.map(o => (
                <Select.Option key={o.key} value={o.key}>
                  {o.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="trackingNumber" label="运单号">
            <Input placeholder="请输入" allowClear />
          </Form.Item>
        </Col>
      </Row>
      <Row style={{ maxWidth: 1200 }}>
        <Col span={16}>
          <Form.Item label="包裹尺寸" style={{ marginBottom: 0 }} {...layout2}>
            <Form.Item
              name="length"
              style={{ display: 'inline-block', width: '88px' }}
            >
              <InputNumber placeholder="长" precision={0} min={0} />
            </Form.Item>
            <Form.Item
              name="width"
              style={{
                display: 'inline-block',
                width: '88px',
                marginLeft: '10px',
              }}
            >
              <InputNumber placeholder="宽" precision={0} min={0} />
            </Form.Item>
            <Form.Item
              name="height"
              style={{
                display: 'inline-block',
                width: '88px',
                marginLeft: '10px',
              }}
            >
              <InputNumber placeholder="高" precision={0} min={0} />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="weight" label="重量">
            <InputNumber
              precision={0}
              placeholder="请输入"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col span={8}></Col>
      </Row>
      <Row style={{ maxWidth: 1200 }}>
        <Col span={16}>
          <Form.Item name="remarks" label="备注" {...layout2}>
            <Input.TextArea placeholder="请输入" />
          </Form.Item>
        </Col>
        <Col span={8}></Col>
      </Row>
    </Form>
  );
});
