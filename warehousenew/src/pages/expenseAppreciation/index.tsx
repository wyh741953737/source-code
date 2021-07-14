import React from 'react';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import { connect } from 'dva';
import { Space, Table, Button } from 'antd';
import SearchTable from '@/components/SearchTable';
import SearchForm from './searchForm';
import { indexHooks } from './hooks';
import AddAppreciation from './addAppreciation';

export default BreadcrumbHeader([{ name: '系统管理' }, { name: '增值费用' }])(
  connect(({ expenseAppreciation }: any) => ({
    searchData: expenseAppreciation.searchData,
    dataSource: expenseAppreciation.dataSource,
    current: expenseAppreciation.current,
    pageSize: expenseAppreciation.pageSize,
    total: expenseAppreciation.total,
    loading: expenseAppreciation.loading,
  }))(({ dataSource, loading, current, pageSize, total, dispatch }) => {
    const { onChange, onSelectionChange, modal } = indexHooks(dispatch);
    const columns = [
      { title: '编号', dataIndex: '', key: '' },
      { title: '费用名称', dataIndex: '', key: '' },
      { title: '仓库', dataIndex: '', key: '' },
      { title: '结算维度', dataIndex: '', key: '' },
      { title: '客户编号', dataIndex: '', key: '' },
      { title: '客户名称', dataIndex: '', key: '' },
      { title: '商品类型', dataIndex: '', key: '' },
      { title: '统计单位', dataIndex: '', key: '' },
      { title: '单价（$）', dataIndex: '', key: '' },
      { title: '有效期起', dataIndex: '', key: '' },
      { title: '有效期止', dataIndex: '', key: '' },
      { title: '免费天数（天）', dataIndex: '', key: '' },
    ];
    return (
      <SearchTable
        searchFormRender={<SearchForm />}
        operateBtnRender={
          <Button type="primary" onClick={() => modal.show()}>
            新增
          </Button>
        }
      >
        <Table
          // @ts-ignore
          columns={columns}
          bordered
          dataSource={dataSource}
          loading={loading}
          rowSelection={{ fixed: true, onChange: onSelectionChange }}
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
        <AddAppreciation modal={modal} />
      </SearchTable>
    );
  }),
);
