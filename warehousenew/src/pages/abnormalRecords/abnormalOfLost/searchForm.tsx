import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import React from 'react';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import { EXCEPTIIONDEALSTATUSORDER } from '@/enum.config';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { SearchBtnRender } from '@/components/SearchTable';
import { getValueFromEvent } from '@/utils/index';

export default connect(({ abnormalOfLost, common }: any) => ({
  searchData: abnormalOfLost.searchData,
  warehouseId: common.warehouseId,
}))(({ searchData, warehouseId, dispatch }: any) => {
  const { form, onSearch, onClearSearch, exportBtn } = searchFormHooks(
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
          <Form.Item
            label="客户订单号"
            name="clientOrderId"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" allowClear onPressEnter={onSearch} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="CJ订单号"
            name="orderId"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" allowClear onPressEnter={onSearch} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="物流单号"
            name="logisticsTrackingNumber"
            {...layout}
            getValueFromEvent={e => {
              return e.target.value.replace(/(^\s*)|(\s*$)/g, '');
            }}
          >
            <Input placeholder="请输入" allowClear onPressEnter={onSearch} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="缺货SKU"
            name="sku"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" allowClear onPressEnter={onSearch} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="变体短码"
            name="variantNum"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" allowClear onPressEnter={onSearch} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="缺货人"
            name="stockoutName"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" allowClear onPressEnter={onSearch} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="处理人"
            name="operatorName"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" allowClear onPressEnter={onSearch} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="缺货时间" name="createAt" {...layout}>
            <DatePicker.RangePicker showTime allowClear />
          </Form.Item>
        </Col>
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
          <Form.Item label="状态" name="status" {...layout}>
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
            >
              {EXCEPTIIONDEALSTATUSORDER.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <SearchBtnRender searchBtn={{ onSearch, onClearSearch }}>
        <Button onClick={exportBtn.onClick} loading={exportBtn.loading}>
          导出
        </Button>
      </SearchBtnRender>
    </Form>
  );
});
