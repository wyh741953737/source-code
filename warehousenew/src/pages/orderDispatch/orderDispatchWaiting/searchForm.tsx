import { Col, Form, Input, Row, Select, DatePicker } from 'antd';
import React from 'react';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { SearchBtnRender } from '@/components/SearchTable';
import { getValueFromEvent } from '@/utils/index';

export default connect(({ orderDispatchWaiting, common }: any) => ({
  searchData: orderDispatchWaiting.searchData,
  warehouseId: common.warehouseId,
}))(({ searchData, dispatch, warehouseId }: any) => {
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const { form, onSearch } = searchFormHooks(searchData, dispatch, warehouseId);
  const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
  return (
    <Form form={form} {...layout}>
      <Row>
        <Col span={6}>
          <Form.Item
            name="dispatchNumber"
            label="调度编号"
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" allowClear />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="sourceStorehouseId" label="转出仓">
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="请选择"
              allowClear
            >
              {option.menu.map(o => (
                <Select.Option key={o.key} value={o.key}>
                  {o.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="targetStorehouseId" label="到达仓">
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="请选择"
              allowClear
            >
              {option.menu.map(o => (
                <Select.Option key={o.key} value={o.key}>
                  {o.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="goodsLoanName" label="货代名称">
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
        <Col span={6}>
          <Form.Item
            name="trackingNumber"
            label="包裹运单号"
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" allowClear maxLength={50} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="parcelOrWaybillNumber"
            label="订单运单号"
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" allowClear maxLength={50} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="createBy" label="创建人">
            <Input placeholder="请输入" allowClear maxLength={50} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="createTime" label="创建时间">
            <DatePicker.RangePicker allowClear />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <SearchBtnRender searchBtn={{ onSearch }} />
      </Row>
    </Form>
  );
});
