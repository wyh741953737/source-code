import { Button, Col, Form, Input, Row, Select } from 'antd';
import { PACKAGESELECTOPTION, PACKAGETYPE } from '@/enum.config';
import React from 'react';
import style from './index.less';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import DateSelect from '@/components/CustomFields/DateSelect';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { getValueFromEvent } from '@/utils/index';

export default connect(({ packageUnSign, common }: any) => ({
  searchData: packageUnSign.searchData,
  warehouseId: common.warehouseId,
}))(({ searchData, warehouseId, dispatch }: any) => {
  const { form, onSearch, onValesChange, dateChange } = searchFormHooks(
    searchData,
    warehouseId,
    dispatch,
  );
  const layout = { labelCol: { span: 10 }, wrapperCol: { span: 14 } };
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  return (
    <Form
      form={form}
      className={style['search-form']}
      onValuesChange={onValesChange}
    >
      <Row>
        <Col span={8}>
          <Form.Item
            label="创建时间"
            initialValue={searchData.createTime}
            name="createTime"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <DateSelect />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item
            initialValue={0}
            name="type"
            label={' '}
            colon={false}
            labelCol={{ span: 1 }}
            wrapperCol={{ span: 23 }}
          >
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
            >
              {PACKAGESELECTOPTION.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="searchText">
            <Input
              placeholder="请输入"
              allowClear
              style={{ marginLeft: 5 }}
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="batchNumber"
            label="批次号"
            labelCol={{ span: 8 }}
            getValueFromEvent={getValueFromEvent}
          >
            <Input
              placeholder="请输入批次号"
              allowClear
              style={{ marginLeft: 5 }}
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        <Col span={2} offset={1}>
          <Button type="primary" onClick={onSearch}>
            搜索
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Form.Item
            label="目标仓库"
            name="storageId"
            rules={[{ required: false, message: '请选择目标仓库' }]}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
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
        <Col span={4}>
          <Form.Item label="签收类型" name="signInType" {...layout}>
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
            >
              {PACKAGETYPE.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
});
