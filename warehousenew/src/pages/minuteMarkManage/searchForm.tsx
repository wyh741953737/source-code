import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { MINUTEMARKSELECTOPTION, COMMONSTATUS } from '@/enum.config';
import React from 'react';
import style from './index.less';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { getValueFromEvent } from '@/utils/index';
export default connect(({ minuteMarkManage, common }: any) => ({
  searchData: minuteMarkManage.searchData,
  warehouseId: common.warehouseId,
}))(({ searchData, warehouseId, dispatch }: any) => {
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const { form, onSearch, onValesChange } = searchFormHooks(
    searchData,
    warehouseId,
    dispatch,
  );
  const layout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
  return (
    <Form
      form={form}
      className={style['search-form']}
      onValuesChange={onValesChange}
    >
      <Row>
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
            label="分标时间"
            // initialValue={searchData.createTime}
            name="createTime"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <DatePicker.RangePicker />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item
            initialValue={Number(searchData.queryType)}
            name="queryType"
            label={' '}
            colon={false}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <Select getPopupContainer={triggerNode => triggerNode.parentNode}>
              {MINUTEMARKSELECTOPTION.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item
            name="queryTypeValue"
            // {...layout}
            // initialValue={searchData.data.queryTypeValue}
          >
            <Input
              placeholder="请输入"
              allowClear
              style={{ marginLeft: 5 }}
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="分标状态"
            initialValue={Number(searchData.subStandardStatus)}
            name="subStandardStatus"
            {...layout}
          >
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
            >
              {/* <Select.Option value={''}>全部</Select.Option> */}
              {COMMONSTATUS.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row className={style['search-btns']}>
        <Button type="primary" onClick={() => onSearch()}>
          搜索
        </Button>
      </Row>
    </Form>
  );
});
