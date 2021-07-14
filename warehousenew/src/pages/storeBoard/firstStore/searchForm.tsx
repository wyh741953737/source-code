import { Button, Col, Form, Row, Select } from 'antd';
import style from './index.less';
import React from 'react';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import { STORETYPE } from '@/enum.config';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
export default connect(({ firstStore, common }: any) => ({
  searchData: firstStore.searchData,
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
      <Row style={{ width: 600 }}>
        <Col span={12}>
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
        <Col span={12}>
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
