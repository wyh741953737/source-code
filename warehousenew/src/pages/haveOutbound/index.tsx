import React from 'react';
import { connect } from 'dva';
import { Table, Badge, Button, Space } from 'antd';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import SearchForm from './searchForm';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import {
  WAITOUTBOUNDTYPE,
  WAITOUTBOUNDSTATUS,
  WEIGHINGTYPE,
} from '@/enum.config';
import { dateTimeFormat, defaultColumns } from '@/utils';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';
/**
 * 上架单查询
 */
export default BreadcrumbHeader([
  { name: '出库' },
  { name: '称重出库' },
  { name: '已出库' },
])(
  connect(({ haveOutbound }: any) => ({
    searchData: haveOutbound.searchData,
    dataSource: haveOutbound.dataSource,
    current: Number(haveOutbound.current),
    pageSize: Number(haveOutbound.pageSize),
    total: haveOutbound.total,
    loading: haveOutbound.loading,
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
          title: '物流单号',
          dataIndex: 'logisticsTrackingNumber',
          key: 'logisticsTrackingNumber',
          fixed: 'left',
          width: 180,
          align: 'left',
        },
        {
          title: '出库类型',
          dataIndex: 'outboundType',
          key: 'outboundType',
          render: (text: any, record: any) =>
            WAITOUTBOUNDTYPE.key(text)?.value || '-',
        },
        {
          title: '物流货代',
          dataIndex: 'logisticsCompany',
          key: 'logisticsCompany',
        },
        {
          title: '订单编号',
          dataIndex: 'orderId',
          key: 'orderId',
        },
        {
          title: '归属仓库',
          dataIndex: 'storageName',
          key: 'storageName',
        },
        {
          title: '订单重量(g)',
          dataIndex: 'consumablesQuantity',
          key: 'consumablesQuantity',
        },
        {
          title: '物流账号',
          dataIndex: 'companyAccount',
          key: 'companyAccount',
        },
        {
          title: '称重重量(g)',
          dataIndex: 'weightDeviation',
          key: 'weightDeviation',
        },
        {
          title: '称重人',
          dataIndex: 'weightBy',
          key: 'weightBy',
        },
        {
          title: '称重方式',
          dataIndex: 'weightType',
          key: 'weightType',
          render: (text: any, record: any) =>
            WEIGHINGTYPE.key(text)?.value || '-',
        },
        {
          title: '称重时间',
          dataIndex: 'weightAt',
          key: 'weightAt',
          render: (text: string) => dateTimeFormat(text),
        },
        {
          title: '对应框位',
          dataIndex: 'frameLocation',
          key: 'frameLocation',
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          render: (text: any, record: any) => {
            const status = WAITOUTBOUNDSTATUS.key(text);
            return status ? (
              <div>
                <Badge color={status.color} />
                {status.value}
              </div>
            ) : (
              '-'
            );
          },
        },
      ]);
      const { onChange, onSelectChange, selected, exportExcel } = indexHooks(
        dispatch,
        searchData,
      );
      return (
        <SearchTable
          searchFormRender={<SearchForm />}
          operateBtnRender={
            <Space>
              <AuthJudge code={AUTH.CZCD004001}>
                <Button type="primary" onClick={exportExcel}>
                  导出清单
                </Button>
              </AuthJudge>
            </Space>
          }
        >
          <Table
            // @ts-ignore
            columns={columns}
            bordered
            dataSource={dataSource}
            loading={loading}
            rowKey={(record: any) => record.id}
            scroll={{ x: 2000 }}
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
