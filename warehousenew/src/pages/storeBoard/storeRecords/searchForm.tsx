import { Button, Col, Form, Input, Row, Select } from 'antd';
import style from './index.less';
import React from 'react';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import { STORETYPE } from '@/enum.config';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { getValueFromEvent } from '@/utils/index';

export default connect(({ storeRecords, common }: any) => ({
  searchData: storeRecords.searchData,
  warehouseId: common.warehouseId,
}))(({ searchData, warehouseId, dispatch }: any) => {
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const { form, onSearch, onClearSearch } = searchFormHooks(
    searchData,
    warehouseId,
    dispatch,
  );
  const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
  return (
    <Form form={form} className={style['search-form']}>
      <Row style={{ maxWidth: 1200 }}>
        <Col span={6}>
          <Form.Item name="sku" label="SKU" {...layout}>
            <Input placeholder="请输入" allowClear onPressEnter={onSearch} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="shortCode"
            label="短码"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" allowClear onPressEnter={onSearch} />
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
            <Input placeholder="请输入" onPressEnter={onSearch} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="containerName" label="容器名称" {...layout}>
            <Input placeholder="请输入" onPressEnter={onSearch} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="groupId"
            label="批次"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" onPressEnter={onSearch} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="warehouseArea" label="库区" {...layout}>
            <Input placeholder="请输入" onPressEnter={onSearch} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="storeType" label="库存类型" {...layout}>
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
            >
              {STORETYPE.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="fromRecord" label="来源单据" {...layout}>
            <Input placeholder="请输入" onPressEnter={onSearch} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="businessRecord" label="业务单据" {...layout}>
            <Input placeholder="请输入" onPressEnter={onSearch} />
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
