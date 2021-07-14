import React from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
import SearchForm from './searchForm';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import { dateTimeFormat, defaultColumns } from '@/utils';
import style from './index.less';
import { CopyOutlined } from '@ant-design/icons/lib';

import PackageDetail from '@/components/PackageDetail';
import Log from '@/components/Log';

/**
 * 已发货
 */
export default connect(({ reachStoreReceipted }: any) => ({
  searchData: reachStoreReceipted.searchData,
  dataSource: reachStoreReceipted.dataSource,
  current: reachStoreReceipted.current,
  pageSize: reachStoreReceipted.pageSize,
  total: reachStoreReceipted.total,
  loading: reachStoreReceipted.loading,
}))(({ dataSource, loading, current, pageSize, total, dispatch }) => {
  const { onChange, checkLog, logModal } = indexHooks(dispatch);
  const columns = defaultColumns([
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      align: 'left',
      width: 80,
      fixed: 'left',
      render: (text: any, record: any, index: number) => index + 1,
    },
    {
      title: '运单号',
      dataIndex: 'trackingNumber',
      key: 'trackingNumber',
      align: 'left',
    },
    {
      title: '签收日期',
      dataIndex: 'receiptAt',
      key: 'receiptAt',
      align: 'left',
      fixed: 'left',
      render: (text: string, record: any) => {
        let time = dateTimeFormat(text);
        return (
          <>
            {time}

            {record.mark && record.mark == 1 ? (
              <span className={style.interceptSpan}>拦</span>
            ) : null}
            <CopyOutlined
              className={style.copy}
              onClick={() => checkLog(record)}
            />
          </>
        );
      },
    },
    {
      title: '签收人',
      dataIndex: 'receiptBy',
      key: 'receiptBy',
      align: 'left',
    },
    {
      title: '货代名称',
      dataIndex: 'goodsLoanName',
      key: 'goodsLoanName',
      align: 'left',
    },
    {
      title: '包裹编号',
      dataIndex: 'parcelNumber',
      key: 'parcelNumber',
      align: 'left',
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      key: 'remarks',
      align: 'left',
    },
  ]);
  return (
    <SearchTable searchFormRender={<SearchForm />}>
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

      <Log modal={logModal} />
    </SearchTable>
  );
});
