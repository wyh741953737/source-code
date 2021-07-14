import { Button, Col, Form, Input, Row, Select } from 'antd';
import style from './index.less';
import React from 'react';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { history } from 'umi';
export default connect(({ listDetail, common }: any) => ({
  searchData: listDetail.searchData,
  logisticList: listDetail.logisticList,
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
          <Form.Item label="包裹编号" name="packageNumber" {...layout}>
            <Input
              placeholder="请输入"
              allowClear
              maxLength={20}
              onPressEnter={onSearch}
            />
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
          <Form.Item label="打印人" name="printBy" {...layout}>
            <Input
              placeholder="请输入"
              allowClear
              maxLength={20}
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        <Col span={6} className={style['search-btns']}>
          <Button type="primary" onClick={() => onSearch()}>
            搜索
          </Button>
          <Button onClick={() => onClearSearch()}>重置</Button>
        </Col>
      </Row>
    </Form>
  );
});
