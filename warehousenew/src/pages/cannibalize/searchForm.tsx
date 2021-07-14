import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import React, { useEffect } from 'react';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { SearchBtnRender } from '@/components/SearchTable';
import { TRANSFERSTATUS } from '@/enum.config';
import { getValueFromEvent } from '@/utils/index';

export default connect(({ cannibalize, common }: any) => ({
  searchData: cannibalize.searchData,
  warehouseId: common.warehouseId,
}))(({ searchData, dispatch, warehouseId }: any) => {
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const { form, onSearch, onClearSearch } = searchFormHooks(
    searchData,
    dispatch,
    warehouseId,
  );
  const layout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
  return (
    <Form form={form} {...layout}>
      <Row>
        <Col span={6}>
          <Form.Item
            name="transferCode"
            label="调拨编号"
            getValueFromEvent={getValueFromEvent}
          >
            <Input
              placeholder="请输入"
              allowClear
              maxLength={100}
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="outboundOrder"
            label="出库单号"
            getValueFromEvent={getValueFromEvent}
          >
            <Input
              placeholder="请输入"
              allowClear
              maxLength={100}
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="putStorageNumber"
            label="入库单号"
            getValueFromEvent={getValueFromEvent}
          >
            <Input
              placeholder="请输入"
              allowClear
              maxLength={100}
              onPressEnter={onSearch}
            />
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
          <Form.Item
            name="createBy"
            label="创建人"
            getValueFromEvent={getValueFromEvent}
          >
            <Input
              placeholder="请输入"
              allowClear
              maxLength={100}
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="createTime" label="创建时间">
            <DatePicker.RangePicker allowClear />
          </Form.Item>
        </Col>
      </Row>
      <SearchBtnRender searchBtn={{ onClearSearch, onSearch }} />
    </Form>
  );
});
