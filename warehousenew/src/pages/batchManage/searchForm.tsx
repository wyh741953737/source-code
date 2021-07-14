import { Col, Form, Input, Row, Select, InputNumber } from 'antd';
import {
  BATCHTYPE,
  LEADTYPE,
  OUTBOUNDORDERTYPE,
  BATCHMANAGEISPRINT,
} from '@/enum.config';
import React from 'react';
import style from './index.less';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import { SearchBtnRender } from '@/components/SearchTable';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import * as regExp from '@/regExp.config';
import { getValueFromEvent } from '@/utils/index';

export default connect(({ libraryList, common }: any) => ({
  searchData: libraryList.searchData,
  warehouseId: common.warehouseId,
}))(({ searchData, warehouseId, dispatch }: any) => {
  const { form, onClearSearch, valuesChanged, onSearch } = searchFormHooks(
    searchData,
    warehouseId,
    dispatch,
  );
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
  const validateRule = async (rule: any, value: any, callback: Function) => {
    if (value && !regExp.METARIALINTERGE.test(value)) {
      return Promise.reject('仅支持输入数字');
    }
  };
  return (
    <Form
      form={form}
      className={style['search-form']}
      onValuesChange={valuesChanged}
    >
      <Row>
        <Col span={6}>
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
        <Col span={6}>
          <Form.Item
            label="批次号"
            name="id"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" allowClear onPressEnter={onSearch} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="拣货状态" name="status" {...layout}>
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
            >
              {BATCHTYPE.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="订单类型" name="orderType" {...layout}>
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
            >
              {OUTBOUNDORDERTYPE.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="是否打印" name="isCodePrint" {...layout}>
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
            >
              {BATCHMANAGEISPRINT.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="是否领单" name="claimTicketStatus" {...layout}>
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
            >
              {LEADTYPE.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="领单人"
            name="zhaoHuoRen"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" allowClear onPressEnter={onSearch} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="波次ID"
            name="waveId"
            {...layout}
            rules={[{ validator: validateRule }]}
            getValueFromEvent={e => {
              return e.target.value.replace(/(^\s*)|(\s*$)/g, '');
            }}
          >
            <Input
              placeholder="请输入波次ID,仅支持数字"
              style={{ width: '100%' }}
              onPressEnter={onSearch}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="创建人" name="creater" {...layout}>
            <Input placeholder="请输入" />
          </Form.Item>
        </Col>
      </Row>
      <SearchBtnRender searchBtn={{ onClearSearch, onSearch }} />
    </Form>
  );
});
