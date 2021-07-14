import React from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import SearchForm from './searchForm';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import { OUTBOUNDEXCEPTIONTYPE } from '@/enum.config';
import { dateTimeFormat, defaultColumns } from '@/utils';
/**
 * 上架单查询
 */
export default BreadcrumbHeader([{ name: '出库' }, { name: '出库异常' }])(
  connect(({ outboundException }: any) => ({
    searchData: outboundException.searchData,
    dataSource: outboundException.dataSource,
    current: Number(outboundException.current),
    pageSize: Number(outboundException.pageSize),
    total: outboundException.total,
    loading: outboundException.loading,
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
          title: '单据ID',
          dataIndex: 'id',
          key: 'id',
          fixed: 'left',
          width: 120,
          align: 'left',
        },
        {
          title: '仓库',
          dataIndex: 'storehouseName',
          key: 'storehouseName',
          width: 80,
        },
        {
          title: '异常类型',
          dataIndex: 'abnormalType',
          key: 'abnormalType',
          width: 100,
          render: (text: any, record: any) =>
            OUTBOUNDEXCEPTIONTYPE.key(text)?.value || '-',
        },
        {
          title: 'sku',
          dataIndex: 'variantSku',
          key: 'variantSku',
        },
        {
          title: '异常数量',
          dataIndex: 'abnormalQuantity',
          key: 'abnormalQuantity',
        },
        {
          title: '拣货批次',
          dataIndex: 'batchId',
          key: 'batchId',
        },
        {
          title: '拣货容器',
          dataIndex: 'containerNum',
          key: 'containerNum',
        },

        {
          title: '提交人',
          dataIndex: 'createBy',
          key: 'createBy',
        },
        {
          title: '提交时间',
          dataIndex: 'createAt',
          key: 'createAt',
          render: (text: string) => dateTimeFormat(text),
        },
      ]);
      const { onChange } = indexHooks(dispatch, searchData);
      return (
        <SearchTable searchFormRender={<SearchForm />}>
          <Table
            // @ts-ignore
            columns={columns}
            bordered
            dataSource={dataSource}
            loading={loading}
            rowKey={(record: any) => record.id}
            scroll={{ x: 1400 }}
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
