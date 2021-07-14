import React from 'react';
import { connect } from 'dva';
import { history } from 'umi';
import { Table } from 'antd';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import SearchForm from './searchForm';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import { dateTimeFormat, defaultColumns } from '@/utils';

export default BreadcrumbHeader([
  { name: '出库' },
  { name: '称重出库' },
  { name: '揽收记录', url: '/outboundRecord' },
  { name: '清单详情' },
])(
  connect(({ listDetail }: any) => ({
    searchData: listDetail.searchData,
    dataSource: listDetail.dataSource,
    current: Number(listDetail.current),
    pageSize: Number(listDetail.pageSize),
    total: listDetail.total,
    loading: listDetail.loading,
  }))(({ dataSource, loading, current, pageSize, total, dispatch }: any) => {
    const columns = defaultColumns([
      {
        title: '包裹编号',
        dataIndex: 'packageNumber',
        key: 'packageNumber',
        fixed: 'left',
        width: 180,
        align: 'left',
      },
      {
        title: '仓库',
        dataIndex: 'storageName',
        key: 'storageName',
        align: 'left',
      },
      {
        title: '物流公司',
        dataIndex: 'logisticsCompany',
        key: 'logisticsCompany',
        align: 'left',
      },
      {
        title: '出库编号',
        dataIndex: 'receiveNumber',
        key: 'receiveNumber',
        align: 'left',
      },
      {
        title: '票数',
        dataIndex: 'packageQuantity',
        key: 'packageQuantity',
        align: 'left',
        render: (text: number, record: any) => {
          return text !== 0 ? (
            <a
              onClick={() => {
                history.push({
                  pathname: '/outboundRecord/bagDetail',
                  query: { weightPackageId: record.id },
                });
              }}
            >
              {text}
            </a>
          ) : (
            text
          );
        },
      },
      {
        title: '净重(KG)',
        dataIndex: 'netWeight',
        key: 'netWeight',
        align: 'left',
      },
      {
        title: '毛重(KG)',
        dataIndex: 'grossWeight',
        key: 'grossWeight',
        align: 'left',
      },
      {
        title: '打印时间',
        dataIndex: 'printAt',
        key: 'printAt',
        align: 'left',
        render: (text: string) => dateTimeFormat(text),
      },
      {
        title: '已上网(票)',
        dataIndex: 'onlineNum',
        key: 'onlineNum',
        align: 'left',
      },
      {
        title: '未上网(票)',
        dataIndex: 'notOnlineNum',
        key: 'notOnlineNum',
        align: 'left',
      },
      {
        title: '打印人',
        dataIndex: 'printBy',
        key: 'printBy',
        align: 'left',
      },
    ]);
    const { onChange, selected } = indexHooks(dispatch, history.location.query);
    return (
      <SearchTable searchFormRender={<SearchForm />}>
        <Table
          // @ts-ignore
          columns={columns}
          bordered
          dataSource={dataSource}
          loading={loading}
          rowKey={(record: any) => record.id}
          scroll={{ x: 1600 }}
          pagination={false}
        />
      </SearchTable>
    );
  }),
);
