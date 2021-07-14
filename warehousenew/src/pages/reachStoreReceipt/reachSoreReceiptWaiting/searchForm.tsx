import { Col, Form, Input, Row, Select } from 'antd';
import React from 'react';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { SearchBtnRender } from '@/components/SearchTable';
import { getValueFromEvent } from '@/utils/index';
export default connect(({ reachSoreReceiptWaiting, common }: any) => ({
  searchData: reachSoreReceiptWaiting.searchData,
  warehouseId: common.warehouseId,
}))(({ searchData, dispatch, warehouseId }: any) => {
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const { form, onSearch } = searchFormHooks(searchData, dispatch, warehouseId);
  const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
  return (
    <Form form={form} {...layout}>
      <Row style={{ maxWidth: 1200 }}>
        <Col span={6}>
          <Form.Item
            name="dispatchNumber"
            label="调度编号"
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" allowClear maxLength={50} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="sourceStorehouseId" label="转出仓">
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="请选择"
              allowClear
            >
              {option.menu.map(o => (
                <Select.Option key={o.key} value={o.key}>
                  {o.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="targetStorehouseId" label="到达仓">
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="请选择"
              allowClear
            >
              {option.menu.map(o => (
                <Select.Option key={o.key} value={o.key}>
                  {o.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={3}>
          <SearchBtnRender searchBtn={{ onSearch }} />
        </Col>
      </Row>
    </Form>
  );
});
