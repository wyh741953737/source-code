import React from 'react';
import { connect } from 'dva';
import { Table, Badge, Button, Space } from 'antd';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import SearchForm from './searchForm';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import { WAITOUTBOUNDTYPE, WAITOUTBOUNDSTATUS } from '@/enum.config';
import { dateTimeFormat, defaultColumns } from '@/utils';
import SaveWeight from './components/saveWeightModal';
import SuccessResult from './components/successResult';
import { history, Link } from 'umi';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';
/**
 * 上架单查询
 */
export default BreadcrumbHeader([
  { name: '出库' },
  { name: '称重出库' },
  { name: '等待出库' },
])(
  connect(({ waitingOutbound }: any) => ({
    searchData: waitingOutbound.searchData,
    dataSource: waitingOutbound.dataSource,
    current: Number(waitingOutbound.current),
    pageSize: Number(waitingOutbound.pageSize),
    total: waitingOutbound.total,
    loading: waitingOutbound.loading,
  }))(({ dataSource, loading, current, pageSize, total, dispatch }: any) => {
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
        title: '验货人',
        dataIndex: 'inspectionBy',
        key: 'inspectionBy',
      },
      {
        title: '验货时间',
        dataIndex: 'inspectionAt',
        key: 'inspectionAt',
        render: (text: string) => dateTimeFormat(text),
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text: any, record: any) =>
          WAITOUTBOUNDSTATUS.key(text)?.value || '-',
      },
    ]);
    const {
      onChange,
      selected,
      onSelectChange,
      inputWeight,
      inputWeightModal,
      resultModal,
    } = indexHooks(dispatch);
    return (
      <SearchTable
        searchFormRender={<SearchForm />}
        operateBtnRender={
          <Space>
            {/* <Button type="primary" onClick={inputWeight}>
              录入重量
            </Button> */}
            <AuthJudge code={AUTH.CZCD002001}>
              <Button type="primary">
                <Link to="/offlineWeight" target="_blank">
                  线下录入重量
                </Link>
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
          rowSelection={{
            fixed: true,
            onChange: onSelectChange,
            selectedRowKeys: selected.keys,
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

        <SaveWeight modal={inputWeightModal} />

        <SuccessResult modal={resultModal} />
      </SearchTable>
    );
  }),
);
