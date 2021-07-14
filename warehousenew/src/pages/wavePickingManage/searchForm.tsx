import { Col, Form, Input, Row, Select } from 'antd';
import {
  WAVEPICKINGTYPE,
  WAVEPICKINGSTATUS,
  ISCOUNTRYORDER,
} from '@/enum.config';
import React from 'react';
import style from '../../utils/index.less';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import { SearchBtnRender } from '@/components/SearchTable';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';

export default connect(({ wavePickingManage, common }: any) => ({
  searchData: wavePickingManage.searchData,
  warehouseId: common.warehouseId,
}))(({ searchData, warehouseId, dispatch }: any) => {
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const { form, onClearSearch, valuesChanged, onSearch } = searchFormHooks(
    searchData,
    warehouseId,
    dispatch,
  );
  const layout = { labelCol: { span: 10 }, wrapperCol: { span: 14 } };
  return (
    <Form
      form={form}
      className={style['search-form']}
      onValuesChange={valuesChanged}
    >
      <Row>
        <Col span={6}>
          <Form.Item label="所属仓库" name="storehouseId" {...layout}>
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
          <Form.Item label="波次名称" name="waveName" {...layout}>
            <Input placeholder="请输入" allowClear />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="波次ID" name="id" {...layout}>
            <Input placeholder="请输入" allowClear />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="波次类型" name="waveType" {...layout}>
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
            >
              {WAVEPICKINGTYPE.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="波次状态" name="waveStatus" {...layout}>
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
            >
              {WAVEPICKINGSTATUS.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <SearchBtnRender searchBtn={{ onClearSearch, onSearch }} />
    </Form>
  );
});
