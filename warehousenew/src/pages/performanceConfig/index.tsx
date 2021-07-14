import React from 'react';
import { connect } from 'dva';
import { history } from 'umi';
import { Table, Button, Form, Select } from 'antd';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import { PERFORMANCEGROUP } from '@/enum.config';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';

export default BreadcrumbHeader([
  { name: '出库' },
  { name: '绩效统计' },
  { name: '绩效规则设置' },
])(
  connect(({ performanceConfig }: any) => ({
    searchData: performanceConfig.searchData,
    dataSource: performanceConfig.dataSource,
    current: Number(performanceConfig.current),
    pageSize: Number(performanceConfig.pageSize),
    total: performanceConfig.total,
    loading: performanceConfig.loading,
  }))(
    ({
      searchData,
      dataSource,
      loading,
      current,
      pageSize,
      total,
      dispatch,
    }: any) => {
      const { onChange, form, displayStatus, typeChange } = indexHooks(
        dispatch,
      );
      const columns = PERFORMANCEGROUP.key(Number(searchData.group))?.configFun(
        displayStatus,
        dispatch,
      );

      return (
        <SearchTable
          searchFormRender={
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
            </Form>
          }
          operateBtnRender={
            <AuthJudge code={AUTH.JXTJ003001}>
              <Button
                type="primary"
                onClick={() => {
                  history.push('/editPerformanceRule');
                }}
              >
                添加
              </Button>
            </AuthJudge>
          }
        >
          <Table
            // @ts-ignore
            columns={columns}
            bordered
            dataSource={dataSource}
            loading={loading}
            rowKey={(record: any) => record.id}
            pagination={false}
            scroll={{ x: 1400 }}
          />
        </SearchTable>
      );
    },
  ),
);
