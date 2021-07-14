import { Col, Form, Input, Row, Select } from 'antd';
import React from 'react';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import { INVENTORYTURNOVERTIME } from '@/enum.config';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { SearchBtnRender } from '@/components/SearchTable';
import { getValueFromEvent } from '@/utils/index';

export default connect(({ overSku, common }: any) => ({
  searchData: overSku.searchData,
  warehouseId: common.warehouseId,
}))(({ searchData, warehouseId, dispatch }: any) => {
  const { form, onSearch, onClearSearch } = searchFormHooks(
    searchData,
    warehouseId,
    dispatch,
  );
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const layout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
  return (
    <Form form={form}>
      <Row>
        <Col span={8}>
          <Form.Item
            label="SKU"
            name="sku"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" allowClear onPressEnter={onSearch} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="无抵扣天数"
            name="notDeductionDay"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" allowClear onPressEnter={onSearch} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="短码"
            name="shortCode"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" allowClear onPressEnter={onSearch} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="库存量" {...layout}>
            <div style={{ display: 'flex' }}>
              <Form.Item
                name="startAvailableQuantity"
                getValueFromEvent={getValueFromEvent}
              >
                <Input
                  placeholder="请输入"
                  allowClear
                  onPressEnter={onSearch}
                />
              </Form.Item>
              <span style={{ lineHeight: '28px', margin: '0 4px' }}>~</span>
              <Form.Item
                name="endAvailableQuantity"
                getValueFromEvent={getValueFromEvent}
              >
                <Input
                  placeholder="请输入"
                  allowClear
                  onPressEnter={onSearch}
                />
              </Form.Item>
            </div>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="仓库" name="storehouseId" {...layout}>
            <Select
              getPopupContainer={(triggerNode: { parentNode: any }) =>
                triggerNode.parentNode
              }
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
          <Form.Item label="出库量" {...layout}>
            <div style={{ display: 'flex' }}>
              <Form.Item name="outQuantityType">
                <Select
                  getPopupContainer={(triggerNode: { parentNode: any }) =>
                    triggerNode.parentNode
                  }
                  placeholder="全部"
                  allowClear
                >
                  {INVENTORYTURNOVERTIME.map(item => (
                    <Select.Option key={item.key} value={item.key}>
                      {item.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="outQuantity"
                getValueFromEvent={getValueFromEvent}
              >
                <Input
                  placeholder="请输入"
                  allowClear
                  onPressEnter={onSearch}
                />
              </Form.Item>
            </div>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="周转天数" {...layout}>
            <div style={{ display: 'flex' }}>
              <Form.Item name="turnOverDayType">
                <Select
                  getPopupContainer={(triggerNode: { parentNode: any }) =>
                    triggerNode.parentNode
                  }
                  placeholder="全部"
                  allowClear
                >
                  {INVENTORYTURNOVERTIME.map(item => (
                    <Select.Option key={item.key} value={item.key}>
                      {item.value2}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="startTurnOverDay"
                getValueFromEvent={getValueFromEvent}
              >
                <Input
                  placeholder="请输入"
                  allowClear
                  onPressEnter={onSearch}
                />
              </Form.Item>
              <span style={{ lineHeight: '28px', margin: '0 4px' }}>~</span>
              <Form.Item
                name="endTurnOverDay"
                getValueFromEvent={getValueFromEvent}
              >
                <Input
                  placeholder="请输入"
                  allowClear
                  onPressEnter={onSearch}
                />
              </Form.Item>
            </div>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="货主"
            name="customerName"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" allowClear onPressEnter={onSearch} />
          </Form.Item>
        </Col>
      </Row>
      <SearchBtnRender searchBtn={{ onSearch, onClearSearch }} />
    </Form>
  );
});
