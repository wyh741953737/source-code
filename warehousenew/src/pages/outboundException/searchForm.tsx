import { Button, Col, Form, Input, Row, Select } from 'antd';
import { OUTBOUNDEXCEPTIONTYPE } from '@/enum.config';
import style from './index.less';
import React from 'react';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';

export default connect(({ outboundException, common }: any) => ({
  searchData: outboundException.searchData,
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
        <Col span={6}>
          <Form.Item label="仓库" name="storehouseId" {...layout}>
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
          <Form.Item label="提交人" name="createBy" {...layout}>
            <Input
              placeholder="请输入"
              allowClear
              maxLength={150}
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="异常类型" name="abnormalType" {...layout}>
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
            >
              {OUTBOUNDEXCEPTIONTYPE.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <div className={style['search-btns']}>
            <Button type="primary" onClick={() => onSearch()}>
              搜索
            </Button>
            <Button onClick={() => onClearSearch()}>重置</Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
});
