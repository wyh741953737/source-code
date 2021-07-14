import React from 'react';
import { connect } from 'dva';
import { Table, Button } from 'antd';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import SearchForm from './searchForm';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import { PERFORMANCEGROUP } from '@/enum.config';
import EditContent from './components/editContent';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';

export default BreadcrumbHeader([
  { name: '出库' },
  { name: '绩效统计' },
  { name: '绩效列表' },
])(
  connect(({ performanceList }: any) => ({
    searchData: performanceList.searchData,
    dataSource: performanceList.dataSource,
    current: Number(performanceList.current),
    pageSize: Number(performanceList.pageSize),
    total: performanceList.total,
    loading: performanceList.loading,
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
      const { onChange, editModal, exportExcel } = indexHooks(
        dispatch,
        searchData,
      );
      const columns = PERFORMANCEGROUP.key(Number(searchData.group))?.listFun(
        editModal,
        dispatch,
      );

      return (
        <SearchTable
          searchFormRender={<SearchForm />}
          operateBtnRender={
            <AuthJudge code={AUTH.JXTJ002001}>
              <Button type="primary" onClick={exportExcel}>
                导出
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
            rowKey={(record: any) => record.storehouseId + record.employeeId}
            pagination={false}
          />

          <EditContent modal={editModal} />
        </SearchTable>
      );
    },
  ),
);
