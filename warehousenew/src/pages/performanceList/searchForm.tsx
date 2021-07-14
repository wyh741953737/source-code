import { Button, Col, Form, Row, Select } from 'antd';
import { PERFORMANCEGROUP } from '@/enum.config';
import style from './index.less';
import React from 'react';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { SearchBtnRender } from '@/components/SearchTable';
import DateSelect from '@/components/CustomFields/DateSelect';
export default connect(({ performanceList, common }: any) => ({
  searchData: performanceList.searchData,
  warehouseId: common.warehouseId,
}))(({ searchData, warehouseId, dispatch }: any) => {
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const { form, onSearch, onClearSearch } = searchFormHooks(
    searchData,
    warehouseId,
    dispatch,
  );
  const layout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
  return (
    <Form form={form} className={style['search-form']}>
      <Row>
        <Col span={6}>
          <Form.Item label="时间" name="createTime" {...layout}>
            <DateSelect modelType={true} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="仓库" name="storeId" {...layout}>
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
            label="请选择组"
            name="group"
            {...layout}
            initialValue={1}
            rules={[{ required: true, message: '请选择组' }]}
          >
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="请选择"
            >
              {PERFORMANCEGROUP.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <SearchBtnRender searchBtn={{ onClearSearch, onSearch }} />
        </Col>
      </Row>
    </Form>
  );
});
