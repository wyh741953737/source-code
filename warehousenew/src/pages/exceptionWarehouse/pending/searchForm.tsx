import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import style from './index.less';
import React, { useEffect } from 'react';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import {
  EXCEPTIONWAREHOUSEOPTIONS,
  RECEIPTES,
  EXCEPTIONTYPE,
} from '@/enum.config';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { getValueFromEvent } from '@/utils/index';

export default connect(({ exceptionWarehousePending, common }: any) => ({
  searchData: exceptionWarehousePending.searchData,
  warehouseId: common.warehouseId,
}))(({ searchData, warehouseId, dispatch }: any) => {
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const { form, onSearch, onClearSearch } = searchFormHooks(
    searchData,
    warehouseId,
    dispatch,
  );
  const layout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
  return (
    <Form form={form} className={style['search-form']}>
      <Row style={{ maxWidth: 1400 }}>
        <Col span={8}>
          <Form.Item label="创建时间" name="timeRange" {...layout}>
            <DatePicker.RangePicker allowClear />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item
            name="selectedOption"
            label={' '}
            colon={false}
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 24 }}
            style={{ paddingLeft: 20 }}
          >
            <Select getPopupContainer={triggerNode => triggerNode.parentNode}>
              {EXCEPTIONWAREHOUSEOPTIONS.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item
            name="searchText"
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 24 }}
            style={{ paddingLeft: 5 }}
            getValueFromEvent={getValueFromEvent}
          >
            <Input
              placeholder="请输入"
              allowClear
              maxLength={50}
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="receipts" label="异常单据" {...layout}>
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
            >
              {RECEIPTES.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="type" label="异常类型" {...layout}>
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
            >
              {EXCEPTIONTYPE.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="sku"
            label="sku"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input
              placeholder="支持多个SKU并列查询，英文逗号分隔"
              maxLength={100}
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="shortNum"
            label="短码"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input
              placeholder="支持多个短码并列查询，英文逗号分隔"
              maxLength={100}
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="enterNumber"
            label="入库单号"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input
              placeholder="支持多个单号并列查询，英文逗号分隔；"
              maxLength={100}
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="createPerson"
            label="创建人"
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
        <Col span={8}>
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
        <Col span={8}>
          <Form.Item
            name="orderNumber"
            label="采购单号"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input
              placeholder="请输入采购单号"
              maxLength={50}
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row className={style['search-btns']}>
        <Button type="primary" onClick={() => onSearch()}>
          搜索
        </Button>
        <Button onClick={() => onClearSearch()}>重置</Button>
      </Row>
    </Form>
  );
});
