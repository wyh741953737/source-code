import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import React from 'react';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import { SIGNFORSTATUS } from '@/enum.config';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { SearchBtnRender } from '@/components/SearchTable';
import { getValueFromEvent } from '@/utils/index';

export default connect(({ signforRecordss, common }: any) => ({
  searchData: signforRecordss.searchData,
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
            label="采购单号"
            name="orderNumber"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" allowClear />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="入库单号"
            name="putStorageNumber"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" allowClear />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="扫描时间" name="createTime" {...layout}>
            <DatePicker.RangePicker allowClear showTime />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="仓库" name="storageId" {...layout}>
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
            label="扫描人"
            name="scanName"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" allowClear />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="签收状态" name="signStatus" {...layout}>
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
            >
              {SIGNFORSTATUS.map(item => (
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
