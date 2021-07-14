import { Button, Col, Form, Input, Row, Select } from 'antd';
import { MATERIALSTATUS } from '@/enum.config';
import style from './index.less';
import React from 'react';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import { getValueFromEvent } from '@/utils/index';

export default connect(({ materialManage }: any) => ({
  searchData: materialManage.searchData,
}))(({ searchData, dispatch }: any) => {
  const { form, onSearch } = searchFormHooks(searchData, dispatch);
  const layout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
  return (
    <Form form={form} className={style['search-form']}>
      <Row>
        <Col span={7}>
          <Form.Item
            label="耗材编号"
            name="cNumber"
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
        <Col span={7}>
          <Form.Item label="耗材名称" name="cName" {...layout}>
            <Input
              placeholder="请输入"
              allowClear
              maxLength={20}
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item label="停用" name="isDelete" {...layout}>
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
            >
              {MATERIALSTATUS.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={2} style={{ textAlign: 'right' }}>
          <Button type="primary" onClick={() => onSearch()}>
            搜索
          </Button>
        </Col>
      </Row>
    </Form>
  );
});
