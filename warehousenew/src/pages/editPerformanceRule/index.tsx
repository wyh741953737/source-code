import React from 'react';
import { connect } from 'dva';
import { history } from 'umi';
import { Button, Form, Select } from 'antd';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import { indexHooks } from './hooks';
import { PERFORMANCEGROUP } from '@/enum.config';
import style from './index.less';
export default BreadcrumbHeader([
  { name: '出库' },
  { name: '绩效统计' },
  { name: '绩效规则设置', url: '/performanceConfig' },
  { name: '绩效规则编辑' },
])(
  connect(({ performanceConfig }: any) => ({
    searchData: performanceConfig.searchData,
    dataSource: performanceConfig.dataSource,
    current: Number(performanceConfig.current),
    pageSize: Number(performanceConfig.pageSize),
    total: performanceConfig.total,
    loading: performanceConfig.loading,
  }))(({ searchData, dispatch }: any) => {
    const Component = PERFORMANCEGROUP.key(Number(searchData.group))?.component;

    const { typeChange, confirmPost, form } = indexHooks(
      dispatch,
      history.location.query,
    );

    return (
      <div style={{ padding: '20px' }}>
        <Form form={form}>
          <Form.Item label="请选择组" name="group" initialValue={1}>
            <Select
              placeholder="请选择"
              style={{ width: '150px' }}
              onChange={typeChange}
            >
              {PERFORMANCEGROUP.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          {Component && <Component params={[]} />}

          <div className={style.btnClass}>
            <Button type="primary" onClick={confirmPost}>
              确认
            </Button>
            <Button
              type="default"
              onClick={() => {
                history.push(`/performanceConfig`);
              }}
            >
              取消
            </Button>
          </div>
        </Form>
      </div>
    );
  }),
);
