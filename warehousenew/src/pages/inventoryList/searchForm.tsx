import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import React from 'react';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { SearchBtnRender } from '@/components/SearchTable';
import {
  CHECKTYPES,
  CHECKSTATUS,
  CHECKWAYS,
  CHECKRANGE,
  CHECKFROZEN,
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
          <Form.Item name="checkNum" label="盘点单号">
            <Input
              placeholder="支持多单号查询，英文逗号分隔"
              allowClear
              maxLength={100}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="storehouseId" label="仓库">
            <Select placeholder="请选择" allowClear>
              {option.menu.map(o => (
                <Select.Option key={o.key} value={o.key}>
                  {o.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="type" label="类别">
            <Select placeholder="请选择" allowClear>
              {CHECKTYPES.map(m => (
                <Select.Option key={m.key} value={m.key}>
                  {m.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="status" label="状态">
            <Select placeholder="请选择" allowClear>
              {CHECKSTATUS.map(m => (
                <Select.Option key={m.key} value={m.key}>
                  {m.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="checkType" label="盘点方式">
            <Select placeholder="请选择" allowClear>
              {CHECKWAYS.map(m => (
                <Select.Option key={m.key} value={m.key}>
                  {m.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="checkDimension" label="盘点维度">
            <Select placeholder="请选择" allowClear>
              {CHECKRANGE.map(m => (
                <Select.Option key={m.key} value={m.key}>
                  {m.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="isFrozen" label="冻结盘点">
            <Select placeholder="请选择" allowClear>
              {CHECKFROZEN.map(m => (
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
