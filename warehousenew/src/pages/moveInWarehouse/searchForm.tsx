import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import style from './index.less';
import React, { useEffect } from 'react';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import { MOVESTATUS, MOVETYPE } from '@/enum.config';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { getValueFromEvent } from '@/utils/index';

export default connect(({ moveInWarehouse, common }: any) => ({
  searchData: moveInWarehouse.searchData,
  warehouseId: common.warehouseId,
}))(({ searchData, warehouseId, dispatch }: any) => {
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const { form, onSearch, onClearSearch } = searchFormHooks(
    searchData,
    warehouseId,
    dispatch,
  );
  useEffect(() => {
    form.setFieldsValue(searchData);
  }, [searchData]);
  const layout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
  return (
    <Form form={form} className={style['search-form']}>
      <Row>
        <Col span={6}>
          <Form.Item
            name="moveId"
            label="移动单号"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" maxLength={50} allowClear />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="warehouse" label="仓库" {...layout}>
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
          <Form.Item name="shipperName" label="货主名称" {...layout}>
            <Input placeholder="请输入" maxLength={50} allowClear />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="moveType" label="移动类型" {...layout}>
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
            >
              {MOVETYPE.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <Form.Item name="moveStatus" label="状态" {...layout}>
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
            >
              {MOVESTATUS.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="fromContainer" label="从容器" {...layout}>
            <Input placeholder="请输入" maxLength={50} allowClear />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="toContainer" label="到容器" {...layout}>
            <Input placeholder="请输入" maxLength={50} allowClear />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="createPerson" label="创建人" {...layout}>
            <Input placeholder="请输入" maxLength={50} allowClear />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <Form.Item name="movePerson" label="移动人" {...layout}>
            <Input placeholder="请输入" maxLength={50} allowClear />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="createTime" label="创建时间" {...layout}>
            <DatePicker.RangePicker allowClear />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="moveTime" label="移动时间" {...layout}>
            <DatePicker.RangePicker allowClear />
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
