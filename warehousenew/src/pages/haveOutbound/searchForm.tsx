import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { WAITOUTBOUNDTYPE } from '@/enum.config';
import style from './index.less';
import React from 'react';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { getValueFromEvent } from '@/utils/index';

export default connect(({ haveOutbound, common }: any) => ({
  searchData: haveOutbound.searchData,
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
      <Row>
        <Col span={8}>
          <Form.Item label="归属仓库" name="storageId" {...layout}>
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
          <Form.Item label="出库类型" name="outboundType" {...layout}>
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
            >
              {WAITOUTBOUNDTYPE.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="物流单号"
            name="logisticsTrackingNumber"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" allowClear onPressEnter={onSearch} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="订单编号"
            name="orderId"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input
              placeholder="请输入"
              allowClear
              maxLength={150}
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="物流货代" name="logisticsCompany" {...layout}>
            <Input
              placeholder="请输入"
              allowClear
              maxLength={50}
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="物流账号" name="companyAccount" {...layout}>
            <Input
              placeholder="请输入"
              allowClear
              maxLength={50}
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="称重时间" name="createTime" {...layout}>
            <DatePicker.RangePicker
              allowClear
              showTime={{ format: 'HH:mm:ss' }}
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
