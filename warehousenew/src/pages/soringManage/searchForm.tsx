import { Col, Form, Input, Row, Select } from 'antd';
import React from 'react';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { SearchBtnRender } from '@/components/SearchTable';
import { SORTSTATUS } from '@/enum.config';
import { getValueFromEvent } from '@/utils/index';
export default connect(({ soringManage, common }: any) => ({
  searchData: soringManage.searchData,
  warehouseId: common.warehouseId,
}))(({ searchData, dispatch, warehouseId }: any) => {
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const { form, onSearch, onClearSearch } = searchFormHooks(
    searchData,
    dispatch,
    warehouseId,
  );
  const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
  return (
    <Form form={form} {...layout}>
      <Row style={{ maxWidth: 1200 }}>
        <Col span={6}>
          <Form.Item name="storehouseId" label="仓库">
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
          <Form.Item
            name="variantSku"
            label="商品sku"
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" allowClear maxLength={50} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="variantNum"
            label="短码"
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" allowClear maxLength={50} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="sortedBy" label="分拣人">
            <Input placeholder="请输入" allowClear maxLength={50} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="batchId"
            label="拣货批次"
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" allowClear maxLength={50} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="containerNum" label="拣货容器">
            <Input placeholder="请输入" allowClear maxLength={50} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="sortingStatus" label="分拣状态">
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
            >
              {SORTSTATUS.map(o => (
                <Select.Option key={o.key} value={o.key}>
                  {o.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="分拣容器"
            name="sortedContainer"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" allowClear onPressEnter={onSearch} />
          </Form.Item>
        </Col>
      </Row>
      <SearchBtnRender searchBtn={{ onClearSearch, onSearch }} />
    </Form>
  );
});
