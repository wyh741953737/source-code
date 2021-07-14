import React from 'react';
import { connect } from 'dva';
import { Link } from 'umi';
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

import SaveWeight from './components/saveWeightModal';
import SuccessResult from './components/successResult';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';

export default BreadcrumbHeader([
  { name: '出库' },
  { name: '称重出库' },
  { name: '称重异常' },
])(
  connect(({ weighingAbnormal }: any) => ({
    searchData: weighingAbnormal.searchData,
    dataSource: weighingAbnormal.dataSource,
    current: Number(weighingAbnormal.current),
    pageSize: Number(weighingAbnormal.pageSize),
    total: weighingAbnormal.total,
    loading: weighingAbnormal.loading,
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
        render: (text: any, record: any) => {
          const status = WAITOUTBOUNDTYPE.key(text);
          return status ? <div>{status.value}</div> : '-';
        },
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
        render: (text: any, record: any) => {
          const status = WEIGHINGTYPE.key(text);
          return status ? <div>{status.value}</div> : '-';
        },
      },
      {
        title: '称重时间',
        dataIndex: 'weightAt',
        key: 'weightAt',
        render: (text: string) => dateTimeFormat(text),
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
      {
        title: '异常原因',
        dataIndex: 'exceptionRemark',
        key: 'exceptionRemark',
      },
    ]);
    const {
      selected,

      onChange,
      onSelectChange,
      mandatoryOutbound,
      inputWeight,
      inputWeightModal,
      resultModal,
    } = indexHooks(dispatch);
    return (
      <SearchTable
        searchFormRender={<SearchForm />}
        operateBtnRender={
          <Space>
            <AuthJudge code={AUTH.CZCD003001}>
              <Button type="primary">
                <Link to="/offlineWeight" target="_blank">
                  线下录入重量
                </Link>
              </Button>
            </AuthJudge>
            <AuthJudge code={AUTH.CZCD003002}>
              <Button type="primary" onClick={mandatoryOutbound}>
                强制出库
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

        {/* <SaveWeight modal={inputWeightModal} /> */}

        <SuccessResult modal={resultModal} />
      </SearchTable>
    );
  }),
);
