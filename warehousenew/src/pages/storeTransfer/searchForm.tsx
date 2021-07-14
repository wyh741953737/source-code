import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import React from 'react';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { SearchBtnRender } from '@/components/SearchTable';
import { TRANSFERSTATUS } from '@/enum.config';

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
          <Form.Item name="storehouseId" label="仓库">
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
          <Form.Item name="transferCodes" label="转移单号">
            <Input
              placeholder="支持多单号查询，英文逗号分隔"
              allowClear
              maxLength={100}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="variantSku" label="SKU">
            <Input placeholder="请输入" allowClear maxLength={100} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="status" label="状态">
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
            >
              {TRANSFERSTATUS.map(m => (
                <Select.Option key={m.key} value={m.key}>
                  {m.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="locationName" label="库位">
            <Input placeholder="请输入" allowClear maxLength={100} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="createBy" label="创建人">
            <Input placeholder="请输入" allowClear maxLength={100} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="updateBy" label="转移人">
            <Input placeholder="请输入" allowClear maxLength={100} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="createTime" label="创建时间">
            <DatePicker.RangePicker allowClear />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="transTime" label="转移时间">
            <DatePicker.RangePicker allowClear />
          </Form.Item>
        </Col>
      </Row>
      <SearchBtnRender searchBtn={{ onClearSearch, onSearch }} />
    </Form>
  );
});
