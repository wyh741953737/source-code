import React from 'react';
import { connect } from 'dva';
import { Table, Button } from 'antd';
import SearchForm from './searchForm';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import { SIGNFORSTATUS } from '@/enum.config';
import { dateTimeFormat, defaultColumns } from '@/utils';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
/**
 * 打包记录
 */
export default BreadcrumbHeader([{ name: '入库' }, { name: '签收扫描记录' }])(
  connect(({ signforRecordss }: any) => ({
    searchData: signforRecordss.searchData,
    dataSource: signforRecordss.dataSource,
    current: signforRecordss.current,
    pageSize: signforRecordss.pageSize,
    total: signforRecordss.total,
    loading: signforRecordss.loading,
  }))(
    ({
      searchData,
      dataSource,
      loading,
      current,
      pageSize,
      total,
      dispatch,
    }) => {
      const { onChange, exportBtn } = indexHooks(dispatch, searchData);
      const columns = defaultColumns([
        {
          title: '运单号',
          dataIndex: 'trackingNumber',
          key: 'trackingNumber',
          align: 'left',
          fixed: 'left',
        },
        {
          title: '采购单号',
          dataIndex: 'orderNumber',
          key: 'orderNumber',
          align: 'left',
        },
        {
          title: '入库单号',
          dataIndex: 'putStorageNumber',
          key: 'putStorageNumber',
          align: 'left',
        },
        {
          title: '仓库',
          dataIndex: 'storageName',
          key: 'storageName',
          align: 'left',
        },
        {
          title: '扫描人',
          dataIndex: 'scanName',
          key: 'scanName',
          align: 'left',
        },
        {
          title: '扫描时间',
          dataIndex: 'scanTime',
          key: 'scanTime',
          align: 'left',
          render: (text: string) => dateTimeFormat(text) || '-',
        },
        {
          title: '签收状态',
          dataIndex: 'signStatus',
          key: 'signStatus',
          align: 'left',
          render: (text: any) => SIGNFORSTATUS.key(text)?.value || '-',
        },
        {
          title: '备注',
          dataIndex: 'remarks',
          key: 'remarks',
          align: 'left',
        },
      ]);
      return (
        <SearchTable
          searchFormRender={<SearchForm />}
          operateBtnRender={
            <>
              <Button
                type="primary"
                onClick={exportBtn.onClick}
                loading={exportBtn.loading}
              >
                导出
              </Button>
            </>
          }
        >
          <Table
            // @ts-ignore
            columns={columns}
            bordered
            rowKey={record => record.id}
            dataSource={dataSource}
            loading={loading}
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
        </SearchTable>
      );
    },
  ),
);
