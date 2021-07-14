import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import React from 'react';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { SearchBtnRender } from '@/components/SearchTable';
import {
  TRANSFERSTATUS,
  MANAGESTYTLE,
  MANAGESTATUS,
  MANAGESOURCE,
} from '@/enum.config';

export default connect(({ storeTransfer, common }: any) => ({
  searchData: storeTransfer.searchData,
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
          <Form.Item name="tallyNum" label="理货单号">
            <Input
              placeholder="支持多单号查询，英文逗号分隔"
              allowClear
              maxLength={100}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="storehouseId" label="仓库">
            <Select placeholder="全部" allowClear>
              {option.menu.map(m => (
                <Select.Option key={m.key} value={m.key}>
                  {m.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="tallySource" label="来源">
            <Select placeholder="全部" allowClear>
              {MANAGESOURCE.map(m => (
                <Select.Option key={m.key} value={m.key}>
                  {m.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="status" label="状态">
            <Select placeholder="全部" allowClear>
              {MANAGESTATUS.map(m => (
                <Select.Option key={m.key} value={m.key}>
                  {m.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="type" label="类型">
            <Select placeholder="全部" allowClear>
              {MANAGESTYTLE.map(m => (
                <Select.Option key={m.key} value={m.key}>
                  {m.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="createBy" label="创建人">
            <Input placeholder="请输入" allowClear maxLength={100} />
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
