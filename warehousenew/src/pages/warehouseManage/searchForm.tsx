import { Button, Col, Form, Row, Select } from 'antd';
import {
  WAREHOUSETYPE,
  SELECTOPTION,
  COMMONBOOLEAN,
  POSITIONNUMBER,
} from '@/enum.config';
import React from 'react';
import style from './index.less';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import useOptions from '@/hooks/useOptions';
import { categoryApply, warehouseApply } from '@/option.apply';

export default connect(({ warehouseManage, common }: any) => ({
  searchData: warehouseManage.searchData,
  warehouseId: common.warehouseId,
}))(({ searchData, warehouseId, dispatch }: any) => {
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const [option1] = useOptions(categoryApply);
  const { form, selectedOption, valuesChanged, onSearch } = searchFormHooks(
    searchData,
    warehouseId,
    dispatch,
  );
  const layout = { labelCol: { span: 10 }, wrapperCol: { span: 14 } };
  return (
    <div className={style['search-content']}>
      <Form
        form={form}
        className={style['search-form']}
        onValuesChange={valuesChanged}
      >
        <Row>
          <Col span={5}>
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
          <Col span={5}>
            <Form.Item label="库区类型" name="warehouseType" {...layout}>
              <Select
                getPopupContainer={triggerNode => triggerNode.parentNode}
                placeholder="全部"
                allowClear
              >
                {WAREHOUSETYPE.map(item => (
                  <Select.Option key={item.key} value={item.key}>
                    {item.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="selectedOption"
              label={' '}
              colon={false}
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 23 }}
            >
              <Select getPopupContainer={triggerNode => triggerNode.parentNode}>
                {SELECTOPTION.map(item => (
                  <Select.Option key={item.key} value={item.key}>
                    {item.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            {selectedOption === SELECTOPTION.warehouseNumber.key && (
              <Form.Item name="warehouseNumber">
                <Select
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                  placeholder={'全部'}
                  allowClear
                >
                  {POSITIONNUMBER.map(item => (
                    <Select.Option key={item.key} value={item.key}>
                      {item.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}
            {selectedOption === SELECTOPTION.warehouseCommodityType.key && (
              <Form.Item name="warehouseCommodityType">
                <Select
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                  placeholder="全部"
                  allowClear
                >
                  {option1.menu.map(item => (
                    <Select.Option key={item.key} value={item.key}>
                      {item.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}
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
    </div>
  );
});
