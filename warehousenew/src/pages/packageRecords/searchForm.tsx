import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import React from 'react';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import { PACKAGESTATUS } from '@/enum.config';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { SearchBtnRender } from '@/components/SearchTable';
import { getValueFromEvent } from '@/utils/index';

export default connect(({ packageRecords, common }: any) => ({
  searchData: packageRecords.searchData,
  warehouseId: common.warehouseId,
}))(({ searchData, warehouseId, dispatch }: any) => {
  const { form, onSearch, onClearSearch } = searchFormHooks(
    searchData,
    warehouseId,
    dispatch,
  );
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const layout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
  return (
    <Form form={form}>
      <Row>
        <Col span={6}>
          <Form.Item label="仓库" name="storehouseId" {...layout}>
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
            >
              {option.menu.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="包裹编号"
            name="packCode"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" allowClear />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="CJ订单号"
            name="orderId"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" allowClear />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="运单号"
            name="trackingNumber"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" allowClear />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="商品SKU"
            name="variantSku"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" allowClear />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="变体短码"
            name="variantNum"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" allowClear />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="操作人" name="createBy" {...layout}>
            <Input placeholder="请输入" allowClear />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="操作时间" name="createTime" {...layout}>
            <DatePicker.RangePicker allowClear showTime />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="状态" name="packStatus" {...layout}>
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
            >
              {PACKAGESTATUS.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <SearchBtnRender searchBtn={{ onSearch, onClearSearch }} />
    </Form>
  );
});
