import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { BAGNETWORKSTATUS } from '@/enum.config';
import style from './index.less';
import React from 'react';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { history } from 'umi';
export default connect(({ bagDetail, common }: any) => ({
  searchData: bagDetail.searchData,
  logisticList: bagDetail.logisticList,
  warehouseId: common.warehouseId,
}))(({ searchData, logisticList, warehouseId, dispatch }: any) => {
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const { form, onSearch, onClearSearch } = searchFormHooks(
    searchData,
    warehouseId,
    history.location.query,
    dispatch,
  );
  const layout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
  return (
    <Form form={form} className={style['search-form']}>
      <Row>
        <Col span={6}>
          <Form.Item label="订单号" name="orderId" {...layout}>
            <Input placeholder="请输入" allowClear onPressEnter={onSearch} />
          </Form.Item>
        </Col>
        <Col span={6}>
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
        <Col span={6}>
          <Form.Item label="上网状态" name="onlineStatus" {...layout}>
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
            >
              {BAGNETWORKSTATUS.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
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
        <Col span={6}>
          <Form.Item label="签收国" name="signingCountry" {...layout}>
            <Input
              placeholder="请输入"
              allowClear
              maxLength={20}
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="运单号" name="logisticsTrackingNumber" {...layout}>
            <Input
              placeholder="请输入"
              allowClear
              maxLength={20}
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="出库时间" name="createTime" {...layout}>
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
