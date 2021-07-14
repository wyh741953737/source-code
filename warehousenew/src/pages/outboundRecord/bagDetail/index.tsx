import React from 'react';
import { connect } from 'dva';
import { history } from 'umi';
import { Table, Badge, Button, Space } from 'antd';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import SearchForm from './searchForm';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import { BAGNETWORKSTATUS } from '@/enum.config';
import { dateTimeFormat, defaultColumns } from '@/utils';
import ExcelUpload from '@/components/CustomFields/ExcelUpload';

export default BreadcrumbHeader([
  { name: '出库' },
  { name: '称重出库' },
  { name: '揽收记录', url: '/outboundRecord' },
  { name: '货袋(票)详情' },
])(
  connect(({ bagDetail }: any) => ({
    searchData: bagDetail.searchData,
    dataSource: bagDetail.dataSource,
    current: Number(bagDetail.current),
    pageSize: Number(bagDetail.pageSize),
    total: bagDetail.total,
    loading: bagDetail.loading,
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
      const columns = defaultColumns([
        {
          title: '订单号',
          dataIndex: 'orderId',
          key: 'orderId',
          fixed: 'left',
          width: 180,
          align: 'left',
        },
        {
          title: '运单号',
          dataIndex: 'logisticsTrackingNumber',
          key: 'logisticsTrackingNumber',
          align: 'left',
        },
        {
          title: '包裹号',
          dataIndex: 'packageNumber',
          key: 'packageNumber',
          align: 'left',
        },
        {
          title: '揽收日期',
          dataIndex: 'collectionDate',
          key: 'collectionDate',
          align: 'left',
          render: (text: string) => dateTimeFormat(text),
        },
        {
          title: '发件仓',
          dataIndex: 'storageName',
          key: 'storageName',
          align: 'left',
        },
        {
          title: '签收国',
          dataIndex: 'signingCountry',
          key: 'signingCountry',
          align: 'left',
        },
        {
          title: '物流公司',
          dataIndex: 'logisticsCompany',
          key: 'logisticsCompany',
          align: 'left',
        },
        {
          title: '物流方式',
          dataIndex: 'logisticsChannel',
          key: 'logisticsChannel',
          align: 'left',
        },
        {
          title: 'CJ追踪号',
          dataIndex: 'cjTrackingNumber',
          key: 'cjTrackingNumber',
          align: 'left',
        },
        {
          title: '出库重量(g)',
          dataIndex: 'weight',
          key: 'weight',
          align: 'left',
        },
        {
          title: '出库时间',
          dataIndex: 'weightAt',
          key: 'weightAt',
          align: 'left',
          render: (text: string) => dateTimeFormat(text),
        },
        {
          title: '订单状态',
          dataIndex: 'onlineStatus',
          key: 'onlineStatus',
          align: 'left',
          render: (text: any, record: any) => {
            const status = BAGNETWORKSTATUS.key(text);
            return status ? (
              <div>
                <span>
                  <Badge color={status.color} />
                  {status.value}
                </span>
              </div>
            ) : (
              '-'
            );
          },
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          width: 80,
          align: 'left',
          fixed: 'right',
          render: (text: number, record: any) => {
            return (
              <Space direction="horizontal">
                <Button
                  size="small"
                  type="primary"
                  onClick={() => checkOtherDetail(record)}
                >
                  详情
                </Button>
              </Space>
            );
          },
        },
      ]);
      const {
        onChange,
        selected,
        onSelectChange,
        checkOtherDetail,
        exportNetworkStatus,
        batchEditNetworkStatus,
        importEditNetworkStatus,
        excelColumns,
      } = indexHooks(dispatch, history.location.query, {
        ...searchData,
        pageSize,
        current,
      });
      return (
        <SearchTable
          searchFormRender={<SearchForm />}
          operateBtnRender={
            <Space>
              <Button type="primary" onClick={exportNetworkStatus}>
                导出
              </Button>
              <Button type="primary" onClick={batchEditNetworkStatus}>
                批量修改上网状态
              </Button>
              <ExcelUpload
                templateHref={'/bagDetail.xlsx'}
                templateName={'导入修改上网状态模板.xlsx'}
                columns={excelColumns}
                upload={importEditNetworkStatus}
                buttonName="导入修改上网状态"
              />
            </Space>
          }
        >
          <Table
            // @ts-ignore
            columns={columns}
            bordered
            dataSource={dataSource}
            loading={loading}
            rowKey={(record: any) => record.orderId}
            scroll={{ x: 1600 }}
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
            rowSelection={{
              fixed: true,
              onChange: onSelectChange,
              selectedRowKeys: selected.keys,
            }}
          />
        </SearchTable>
      );
    },
  ),
);
