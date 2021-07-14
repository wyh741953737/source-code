import { Col, Form, Input, Row, DatePicker } from 'antd';
import React from 'react';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { SearchBtnRender } from '@/components/SearchTable';
import { getValueFromEvent } from '@/utils/index';
export default connect(({ orderDispatchProcessed, common }: any) => ({
  searchData: orderDispatchProcessed.searchData,
  warehouseId: common.warehouseId,
}))(({ searchData, dispatch, warehouseId }: any) => {
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const { form, onSearch } = searchFormHooks(searchData, dispatch, warehouseId);
  const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
  const layout2 = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };
  return (
    <Form form={form} {...layout}>
      <Row style={{ maxWidth: 1200 }}>
        <Col span={6}>
          <Form.Item label="签收日期" name="createTime" {...layout}>
            <DatePicker.RangePicker
              allowClear
              showTime={{ format: 'HH:mm:ss' }}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="trackingNumber"
            label="运单号"
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" allowClear maxLength={50} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="parcelNumber"
            label="包裹编号"
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" allowClear maxLength={50} />
          </Form.Item>
        </Col>
        <Col span={3}>
          <SearchBtnRender searchBtn={{ onSearch }} />
        </Col>
      </Row>
    </Form>
  );
});
