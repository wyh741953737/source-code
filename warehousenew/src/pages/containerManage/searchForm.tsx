import { Button, Col, Form, Input, Row, Select } from 'antd';
import style from './index.less';
import React, { useEffect } from 'react';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import TileSelect from '@/components/CustomFields/TileSelect';
import { COMMONBOOLEAN, CONTAINERSTATUS, CONTAINERTYPE } from '@/enum.config';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { getValueFromEvent } from '@/utils/index';

export default connect(({ containerManage, common }: any) => ({
  searchData: containerManage.searchData,
  warehouseId: common.warehouseId,
}))(({ searchData, warehouseId, dispatch }: any) => {
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const { form, onSearch, onClearSearch } = searchFormHooks(
    searchData,
    warehouseId,
    dispatch,
  );
  const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
  const onValuesChange = (changedValues: any) => {
    if (
      'warehouse' in changedValues ||
      'containerType' in changedValues ||
      'containerStatus' in changedValues ||
      'containerStop' in changedValues
    ) {
      onSearch();
    }
  };
  return (
    <Form
      form={form}
      className={style['search-form']}
      onValuesChange={onValuesChange}
    >
      <Form.Item
        name="warehouse"
        label="仓库"
        labelCol={{ span: 1 }}
        wrapperCol={{ span: 23 }}
      >
        <TileSelect options={option.options} />
      </Form.Item>
      <Row className={style['other']}>
        <Col span={8}>
          <Form.Item
            name="containerId"
            label="容器编号"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" onPressEnter={onSearch} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="updateBy"
            label="最新操作人"
            {...layout}
            getValueFromEvent={getValueFromEvent}
          >
            <Input placeholder="请输入" onPressEnter={onSearch} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="containerType"
            label="容器类型"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
          >
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
              onChange={onSearch}
            >
              {CONTAINERTYPE.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="containerStatus"
            label="状态"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 18 }}
          >
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
              onChange={onSearch}
            >
              {CONTAINERSTATUS.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="containerStop"
            label="停用"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
          >
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
              onChange={onSearch}
            >
              {COMMONBOOLEAN.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="occupyFlag"
            label="是否有货"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
          >
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
              allowClear
              onChange={onSearch}
            >
              {COMMONBOOLEAN.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value2}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row className={style['search-btns']}>
        <Button type="primary" onClick={onSearch}>
          搜索
        </Button>
        <Button onClick={onClearSearch}>重置</Button>
      </Row>
    </Form>
  );
});
