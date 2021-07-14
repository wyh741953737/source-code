import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import style from './index.less';
import React, { useEffect } from 'react';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import { COMMONBOOLEAN } from '@/enum.config';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { getValueFromEvent } from '@/utils/index';

export default connect(({ expenseAppreciation }: any) => ({
  searchData: expenseAppreciation.searchData,
}))(({ searchData, dispatch }: any) => {
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const { form, onSearch, onClearSearch } = searchFormHooks(
    searchData,
    dispatch,
  );
  useEffect(() => {
    form.setFieldsValue(searchData);
  }, [searchData]);
  const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
  return (
    <Form form={form} className={style['search-form']}>
      <Row>
        <Col span={6}>
          <Form.Item name="expenseName" label="费用名称" {...layout}>
            <Input
              placeholder="请输入"
              maxLength={50}
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="warehouse" label="仓库" {...layout}>
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              onChange={onSearch}
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
            name="customerId"
            label="客户编号"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input
              placeholder="请输入"
              maxLength={50}
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="customerName" label="客户名称" {...layout}>
            <Input
              placeholder="请输入"
              maxLength={50}
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <Form.Item name="serviceCommodity" label="服务商品" {...layout}>
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              onChange={onSearch}
            >
              {COMMONBOOLEAN.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="timeStart" label="有效期起" {...layout}>
            <DatePicker.RangePicker />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="endStart" label="有效期止" {...layout}>
            <DatePicker.RangePicker />
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
