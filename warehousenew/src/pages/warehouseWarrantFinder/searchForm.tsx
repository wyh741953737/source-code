import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { WAREHOUSWARRANTETYPE, WAREHOUSESTATUS } from '@/enum.config';
import style from './index.less';
import React, { useEffect } from 'react';
import { connect } from 'dva';
import { searchFormHooks } from './hooks';
import { getValueFromEvent } from '@/utils/index';

export default connect(({ warehouseWarrantFinder }: any) => ({
  searchData: warehouseWarrantFinder.searchData,
}))(({ searchData, dispatch }: any) => {
  const { form, onSearch, onClearSearch } = searchFormHooks(
    searchData,
    dispatch,
  );
  useEffect(() => {
    form.setFieldsValue(searchData);
  }, [searchData]);
  const layout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
  return (
    <div className={style['search-content']}>
      <Form form={form} className={style['search-form']}>
        <Row style={{ maxWidth: 1400 }}>
          <Col span={8}>
            <Form.Item
              label="入库单号"
              name="warehouseEntryNumber"
              {...layout}
              getValueFromEvent={getValueFromEvent}
            >
              <Input placeholder="请输入" allowClear onPressEnter={onSearch} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="入库类型" name="warehouseEntryType" {...layout}>
              <Select
                getPopupContainer={triggerNode => triggerNode.parentNode}
                placeholder="全部"
                allowClear
              >
                {WAREHOUSWARRANTETYPE.map(item => (
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
              name="trackingNumber"
              {...layout}
              getValueFromEvent={getValueFromEvent}
            >
              <Input placeholder="请输入" allowClear onPressEnter={onSearch} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="采购人" name="purchasingAgent" {...layout}>
              <Input placeholder="请输入" allowClear onPressEnter={onSearch} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="采购单号"
              name="purchaseOrderNumber"
              {...layout}
              getValueFromEvent={getValueFromEvent}
            >
              <Input placeholder="请输入" allowClear onPressEnter={onSearch} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="创建时间" name="createTime" {...layout}>
              <DatePicker.RangePicker allowClear />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="状态" name="status" {...layout}>
              <Select
                getPopupContainer={triggerNode => triggerNode.parentNode}
                placeholder="全部"
                allowClear
              >
                {WAREHOUSESTATUS.map(item => (
                  <Select.Option key={item.key} value={item.key}>
                    {item.value}
                  </Select.Option>
                ))}
              </Select>
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
    </div>
  );
});
