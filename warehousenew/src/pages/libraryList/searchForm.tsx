import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { LIBRARYSTATUS } from '@/enum.config';
import style from './index.less';
import React from 'react';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';

export default connect(({ haveOutbound, common }: any) => ({
  searchData: haveOutbound.searchData,
  warehouseId: common.warehouseId,
}))(({ searchData, warehouseId, dispatch }: any) => {
  const { form, onSearch, onClearSearch } = searchFormHooks(
    searchData,
    warehouseId,
    dispatch,
  );

  const layout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
  return (
    <Form form={form} className={style['search-form']}>
      <Row>
        <Col span={8}>
          <Form.Item label="越库批次号" name="id" {...layout}>
            <Input placeholder="请输入" allowClear maxLength={150} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="验单状态" name="status" {...layout}>
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
            >
              {LIBRARYSTATUS.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="验单人" name="checkName" {...layout}>
            <Input placeholder="请输入" allowClear maxLength={150} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="越库sku" name="sku" {...layout}>
            <Input placeholder="请输入" allowClear maxLength={150} />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="创建时间" name="timeRange" {...layout}>
            <DatePicker.RangePicker showTime allowClear />
          </Form.Item>
        </Col>
      </Row>
      <Row className={style['search-btns']}>
        <Button type="primary" onClick={onSearch}>
          搜索
        </Button>
        <Button onClick={onClearSearch}>重置</Button>
      </Row>
    </Form>
  );
});
