import React from 'react';
import { connect } from 'dva';
import { Table, Button, Space } from 'antd';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import { dateTimeFormat, defaultColumns } from '@/utils';
import EditContent from '../components/editContent';
import SearchForm from './searchForm';

export default BreadcrumbHeader([
  { name: '出库' },
  { name: '绩效统计' },
  { name: '绩效列表',url:"/performanceList" },
  { name: '绩效变更记录' },
])(
  connect(({ performanceLog,performanceList }: any) => ({
    searchData: performanceLog.searchData,
    dataSource: performanceLog.dataSource,
    current: Number(performanceLog.current),
    pageSize: Number(performanceLog.pageSize),
    total: performanceLog.total,
    loading: performanceLog.loading,
    currentItem: performanceList.currentItem
  }))(
    ({
      searchData,
      dataSource,
      loading,
      current,
      pageSize,
      total,
      currentItem,
      dispatch,
    }: any) => {
     
      const { onChange, editModal } = indexHooks(dispatch,currentItem);
     
      const columns = defaultColumns([
        {
          title: '时间',
          dataIndex: 'createAt',
          key: 'createAt',
          render:(text:string,record:any)=> (dateTimeFormat(text))
        },
        {
          title: '变更记录',
          dataIndex: 'content',
          key: 'content',
        },
        {
          title: '积分变动',
          dataIndex: 'score',
          key: 'score',
        },
        {
          title: '总积分',
          dataIndex: 'totalScore',
          key: 'totalScore',
        },
      ]);

      return (
       <SearchTable
          searchFormRender={<SearchForm />}
          operateBtnRender={ <Button type="primary" onClick={()=>editModal.show()}>新增变更</Button>}
        >
       
          <Table
            // @ts-ignore
            columns={columns}
            bordered
            dataSource={dataSource}
            loading={loading}
            rowKey={(record: any) => record.id}
            pagination={{
              current,
              pageSize,
              total,
              pageSizeOptions: ['10', '20', '50', '100'],
              showQuickJumper: true,
              showTotal: total => {
                return <span>共计{total}条数据</span>;
              },
              onChange: onChange,
            }}
          />

          <EditContent modal={editModal} />
       </SearchTable>
      );
    },
  ),
);
