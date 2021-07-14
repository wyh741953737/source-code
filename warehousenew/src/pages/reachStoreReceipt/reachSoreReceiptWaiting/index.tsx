import React from 'react';
import { connect } from 'dva';
import { Table, Space, Button } from 'antd';
import SearchForm from './searchForm';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import { dateTimeFormat, defaultColumns } from '@/utils';
import style from './index.less';
import { CopyOutlined } from '@ant-design/icons/lib';
import PackageDetail from '@/components/PackageDetail';
import Log from '@/components/Log';

import { OUTPUTRECEIPTTYPE } from '@/enum.config';
import { history } from '@@/core/history';
import { PACKAGEPORPERTY } from '@/enum.config';

/**
 * 未发货
 */
export default connect(({ reachSoreReceiptWaiting }: any) => ({
  searchData: reachSoreReceiptWaiting.searchData,
  dataSource: reachSoreReceiptWaiting.dataSource,
  current: reachSoreReceiptWaiting.current,
  pageSize: reachSoreReceiptWaiting.pageSize,
  total: reachSoreReceiptWaiting.total,
  loading: reachSoreReceiptWaiting.loading,
}))(({ dataSource, loading, current, pageSize, total, dispatch }) => {
  const { onChange, detailModal, checkDetail, logModal, checkLog } = indexHooks(
    dispatch,
  );
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
      title: '调度编号',
      dataIndex: 'dispatchNumber',
      key: 'dispatchNumber',
      align: 'left',
      fixed: 'left',
    },
    {
      title: '转出仓',
      dataIndex: 'sourceStorehouseName',
      key: 'sourceStorehouseName',
      align: 'left',
    },
    {
      title: '到达仓',
      dataIndex: 'targetStorehouseName',
      key: 'targetStorehouseName',
      align: 'left',
    },
    {
      title: '包裹数量',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'left',
      render: (text: any, record: any) => {
        return record.schedulingPackageList
          ? record.schedulingPackageList.length
          : 0;
      },
    },
    {
      title: '创建人',
      dataIndex: 'createBy',
      key: 'createBy',
      align: 'left',
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      key: 'createAt',
      align: 'left',
      render: (text: string) => dateTimeFormat(text),
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      key: 'remarks',
      align: 'left',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      align: 'left',
      fixed: 'right',
      render: (text: number, record: any) => {
        const receiptedArr = record.schedulingPackageList.filter(
          (item: any) => item.status === 2,
        );
        return (
          <span className={style.spanAction}>
            {receiptedArr.length}/ {record.schedulingPackageList.length}
          </span>
        );
      },
    },
  ]);
  const expandedRowRender = (record: any) => {
    return (
      <>
        {record.schedulingPackageList.map((item: any) => {
          const status: any = OUTPUTRECEIPTTYPE.key(item.status);
          return (
            <div key={item.id} className={style['expanded-item']}>
              <div>
                <span title={item.parcelNumber}>
                  包裹编号：{item.parcelNumber || '-'}
                  <CopyOutlined
                    className={style.copy}
                    onClick={() => checkLog(item)}
                  />
                </span>
                <span title={PACKAGEPORPERTY.key(item.packProperty)?.value}>
                  包裹属性：
                  {PACKAGEPORPERTY.key(item.packProperty)?.value || '-'}
                </span>
                <span title={item.trackingNumber}>
                  运单号：{item.trackingNumber || '-'}
                </span>
              </div>
              <div>
                <span title={item.remarks}>备注：{item.remarks || '-'}</span>
                <span>状态：{status.value || '-'}</span>
                <span></span>
              </div>
              <span>
                <Button
                  size="small"
                  type="primary"
                  onClick={() => checkDetail(item)}
                >
                  查看详情
                </Button>
              </span>
            </div>
          );
        })}
      </>
    );
  };
  return (
    <SearchTable
      searchFormRender={<SearchForm />}
      operateBtnRender={
        <Space>
          <Button
            type="primary"
            onClick={() => {
              history.push(`/reachStoreReceipt/receipt`);
            }}
          >
            签收
          </Button>
        </Space>
      }
    >
      <Table
        // @ts-ignore
        columns={columns}
        bordered
        rowKey={record => record.id}
        scroll={{ x: 1600 }}
        dataSource={dataSource}
        loading={loading}
        expandable={{
          expandedRowRender,
          rowExpandable: record =>
            record.schedulingPackageList &&
            record.schedulingPackageList.length > 0,
        }}
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

      <PackageDetail modal={detailModal} />
      <Log modal={logModal} />
    </SearchTable>
  );
});
