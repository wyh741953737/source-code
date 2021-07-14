import { Button, Col, Form, Input, Row, Select, DatePicker } from 'antd';
import {
  OUTBOUNDORDERTYPE,
  TIMEOUTORDERSTATUS,
  ISCOUNTRYORDER,
  EXCEPTOUTBOUNDORDERTYPE,
  OUTBOUNDORDERSTATUSHASMATCH,
} from '@/enum.config';
import style from './index.less';
import React from 'react';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { getValueFromEvent } from '@/utils/index';
const { Option } = Select;
export default connect(({ outBoundOrder, common }: any) => ({
  searchData: outBoundOrder.searchData,
  tabData: outBoundOrder.tabData,
  columnTag: outBoundOrder.columnTag,
  warehouseId: common.warehouseId,
}))(({ searchData, tabData, columnTag, warehouseId, dispatch, form }: any) => {
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const { onSearch, onClearSearch } = searchFormHooks(
    searchData,
    tabData,
    warehouseId,
    dispatch,
    form,
  );
  const layout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
  const layout2 = { labelCol: { span: 2 }, wrapperCol: { span: 22 } };
  console.log(OUTBOUNDORDERSTATUSHASMATCH.key(searchData.status));
  return (
    <Form form={form} className={style['search-form']}>
      <Row>
        {columnTag === 'timeout' ? (
          <Col span={8}>
            <Form.Item label="异常处理状态" name="controlStatus" {...layout}>
              <Select
                getPopupContainer={triggerNode => triggerNode.parentNode}
                placeholder="全部"
                allowClear
              >
                {TIMEOUTORDERSTATUS.map(item => (
                  <Option key={item.key} value={item.key}>
                    {item.value}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        ) : (
          <Col span={8}>
            <Form.Item
              label="出库编号"
              name="outboundOrder"
              {...layout}
              getValueFromEvent={getValueFromEvent}
            >
              <Input
                placeholder="请输入出库编号"
                allowClear
                maxLength={20}
                onPressEnter={onSearch}
              />
            </Form.Item>
          </Col>
        )}

        <Col span={8}>
          <Form.Item label="出库仓库" name="storageId" {...layout}>
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
          <Form.Item label="订单类型" name="type" {...layout}>
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
            >
              {OUTBOUNDORDERTYPE.map(item => (
                <Option key={item.key} value={item.key}>
                  {item.value}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Form.Item
            label="客户订单号"
            name="clientOrderId"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input
              placeholder="请输入客户订单号"
              allowClear
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="客户名称"
            name="customerName"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input
              placeholder="请输入客户名称"
              allowClear
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="CJ订单号"
            name="orderId"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input
              placeholder="请输入CJ订单号"
              allowClear
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="母订单号"
            name="shipmentsOrderId"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input
              placeholder="请输入母订单号"
              allowClear
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="创建时间" name="createTime" {...layout}>
            <DatePicker.RangePicker showTime allowClear />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="出库时间" name="deliveryTime" {...layout}>
            <DatePicker.RangePicker showTime allowClear />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="物流单号"
            name="logisticsTrackingNumber"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input
              placeholder="请输入物流单号"
              allowClear
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="是否国内" name="isCountry" {...layout}>
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
            >
              {ISCOUNTRYORDER.map(item => (
                <Option key={item.key} value={item.key}>
                  {item.value}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="变体SKU" name="variantSku" {...layout}>
            <Input
              placeholder="请输入变体sku"
              allowClear
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="商品SKU" name="productSku" {...layout}>
            <Input
              placeholder="请输入商品sku"
              allowClear
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        {columnTag === 'except' && (
          <Col span={8}>
            <Form.Item label="异常类型" name="exceptionStatus" {...layout}>
              <Select
                getPopupContainer={triggerNode => triggerNode.parentNode}
                placeholder="全部"
                allowClear
              >
                {EXCEPTOUTBOUNDORDERTYPE.map(item => (
                  <Option key={item.key} value={item.key}>
                    {item.value}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        )}
        <Col span={8}>
          <Form.Item label="上一步操作时间" name="upTime" {...layout}>
            <DatePicker.RangePicker showTime allowClear />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="业务员群主" name="salesmanName" {...layout}>
            <Input
              placeholder="请输入业务员群主"
              allowClear
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        {OUTBOUNDORDERSTATUSHASMATCH.key(searchData.status) && (
          <Col span={8}>
            <Form.Item label="已配齐时间" name="completeAt" {...layout}>
              <DatePicker.RangePicker showTime allowClear />
            </Form.Item>
          </Col>
        )}
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            style={{ marginRight: '20px' }}
            onClick={() => onSearch()}
          >
            搜索
          </Button>

          <Button type="default" onClick={() => onClearSearch()}>
            重置
          </Button>
        </Col>
      </Row>
    </Form>
  );
});
