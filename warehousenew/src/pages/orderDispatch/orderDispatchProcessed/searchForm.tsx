import { Col, Form, Input, Row, Select, DatePicker, Radio } from 'antd';
import React, { useEffect } from 'react';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { SearchBtnRender } from '@/components/SearchTable';
import { getValueFromEvent } from '@/utils/index';
import { PACKAGEPORPERTY, ORDERDISPATCHTABLECLOUMN } from '@/enum.config';
export default connect(({ orderDispatchProcessed, common }: any) => ({
  searchData: orderDispatchProcessed.searchData,
  warehouseId: common.warehouseId,
}))(({ searchData, dispatch, warehouseId }: any) => {
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const { form, onSearch, typeChange } = searchFormHooks(
    searchData,
    dispatch,
    warehouseId,
  );
  const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
  const layout2 = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };
  const { type } = searchData;
  return (
    <Form form={form} {...layout}>
      <Row style={{ maxWidth: 1200 }}>
        <Col span={12}>
          <Form.Item label="" name="type" {...layout2} initialValue={type}>
            <Radio.Group style={{ marginBottom: 8 }} onChange={typeChange}>
              {ORDERDISPATCHTABLECLOUMN.map(o => (
                <Radio.Button key={o.key} value={o.key}>
                  {o.value}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      {type === 1 ? (
        <Row>
          <Col span={6}>
            <Form.Item label="签收日期" name="createTime" {...layout}>
              <DatePicker.RangePicker
                allowClear
                showTime={{ format: 'HH:mm:ss' }}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="trackingNumber"
              label="运单号"
              getValueFromEvent={getValueFromEvent}
            >
              <Input placeholder="请输入" allowClear maxLength={50} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="parcelNumber"
              label="包裹编号"
              getValueFromEvent={getValueFromEvent}
            >
              <Input placeholder="请输入" allowClear maxLength={50} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="packProperty" label="包裹属性">
              <Select
                getPopupContainer={triggerNode => triggerNode.parentNode}
                placeholder="全部"
                allowClear
              >
                {PACKAGEPORPERTY.map(o => (
                  <Select.Option key={o.key} value={o.key}>
                    {o.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col span={6}>
            <Form.Item
              name="dispatchNumber"
              label="调度编号"
              getValueFromEvent={getValueFromEvent}
            >
              <Input placeholder="请输入" allowClear />
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
            <Form.Item name="goodsLoanName" label="货代名称">
              <Input placeholder="请输入" allowClear maxLength={50} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="parcelNumber"
              label="包裹编号"
              getValueFromEvent={getValueFromEvent}
            >
              <Input placeholder="请输入" allowClear maxLength={50} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="trackingNumber"
              label="包裹运单号"
              getValueFromEvent={getValueFromEvent}
            >
              <Input placeholder="请输入" allowClear maxLength={50} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="parcelOrWaybillNumber"
              label="订单运单号"
              getValueFromEvent={getValueFromEvent}
            >
              <Input placeholder="请输入" allowClear maxLength={50} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="createBy" label="创建人">
              <Input placeholder="请输入" allowClear maxLength={50} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="createTime" label="创建时间">
              <DatePicker.RangePicker allowClear />
            </Form.Item>
          </Col>
        </Row>
      )}

      <Row>
        <SearchBtnRender searchBtn={{ onSearch }} />
      </Row>
    </Form>
  );
});
