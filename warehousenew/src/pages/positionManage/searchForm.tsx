import { Button, Col, Form, Input, Row, Select } from 'antd';
import { COMMONBOOLEAN, POSITIONNUMBER, POSITIONTYPE } from '@/enum.config';
import React from 'react';
import style from './index.less';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';

export default connect(({ positionManage, common }: any) => ({
  searchData: positionManage.searchData,
  warehouseId: common.warehouseId,
}))(({ searchData, warehouseId, dispatch }: any) => {
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const { form, onSearch } = searchFormHooks(searchData, warehouseId, dispatch);
  const layout = { labelCol: { span: 10 }, wrapperCol: { span: 14 } };
  return (
    <Form form={form} className={style['search-form']}>
      <Row>
        <Col span={4}>
          <Form.Item label="所属仓库" name="warehouse" {...layout}>
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
          <Form.Item label={'所属库区'} name="position" {...layout}>
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
            >
              {POSITIONNUMBER.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item label={'库位编号'} name="positionNumber" {...layout}>
            <Input
              placeholder="支持并列查询以英文逗号隔开"
              allowClear
              maxLength={1000}
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="仓位类型" name="positionType" {...layout}>
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
            >
              {POSITIONTYPE.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item label="停用" name="ifDisable" {...layout}>
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
            >
              {COMMONBOOLEAN.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={2} offset={1}>
          <Button type="primary" onClick={onSearch}>
            搜索
          </Button>
        </Col>
      </Row>
    </Form>
  );
});
