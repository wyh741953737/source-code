import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { OUTBOUNDPRINTSTATUS } from '@/enum.config';
import style from './index.less';
import React, { useEffect } from 'react';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { getValueFromEvent } from '@/utils/index';

export default connect(({ outboundRecord, common }: any) => ({
  searchData: outboundRecord.searchData,
  logisticList: outboundRecord.logisticList,
  warehouseId: common.warehouseId,
}))(({ searchData, logisticList, warehouseId, dispatch }: any) => {
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
        <Col span={8}>
          <Form.Item
            label="订单号"
            name="orderId"
            {...layout}
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
          <Form.Item label="仓库" name="storageId" {...layout}>
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
            label="出库编号"
            name="receiveNumber"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input
              placeholder="请输入"
              allowClear
              maxLength={20}
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="物流公司" name="logisticsCompany" {...layout}>
            <Select
              placeholder="全部"
              allowClear
              showSearch
              filterOption={(input: any, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {logisticList.map((item: any) => (
                <Select.Option key={item.id} value={item.companyCnName}>
                  {item.companyCnName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="状态" name="printStatus" {...layout}>
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
            >
              {OUTBOUNDPRINTSTATUS.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="运单号"
            name="logisticsTrackingNumber"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input
              placeholder="请输入"
              allowClear
              maxLength={20}
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="打印人" name="printBy" {...layout}>
            <Input
              placeholder="请输入"
              allowClear
              maxLength={20}
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="揽收时间" name="createTime" {...layout}>
            <DatePicker.RangePicker allowClear />
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
