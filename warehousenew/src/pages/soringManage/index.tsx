import React from 'react';
import { connect } from 'dva';
import { Table, Button, Spin } from 'antd';
import SearchForm from './searchForm';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import { dateTimeFormat, defaultColumns } from '@/utils';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import { SORTSTATUS, ORDERTYPE } from '@/enum.config';
import style from './index.less';
import Log from './components/Log';

export default BreadcrumbHeader([{ name: '出库' }, { name: '分拣管理' }])(
  connect(({ soringManage }: any) => ({
    searchData: soringManage.searchData,
    dataSource: soringManage.dataSource,
    current: soringManage.current,
    pageSize: soringManage.pageSize,
    total: soringManage.total,
    loading: soringManage.loading,
  }))(({ dataSource, loading, current, pageSize, total, dispatch }) => {
    const { onChange, logModal, checkDetail } = indexHooks(dispatch);
    const columns = defaultColumns([
      {
        title: '拣货批次',
        dataIndex: 'id',
        key: 'id',
        align: 'left',
        fixed: 'left',
        width: 200,
      },
      {
        title: '仓库',
        dataIndex: 'storehouseName',
        key: 'storehouseName',
        align: 'left',
      },
      {
        title: '拣货容器',
        dataIndex: 'pickingContainers',
        key: 'pickingContainers',
        align: 'left',
        render: (text: any) => {
          return text && text.length > 0 ? text.join(',') : '-';
        },
      },
      {
        title: '拣货人',
        dataIndex: 'pickingUserName',
        key: 'pickingUserName',
        align: 'left',
      },
      {
        title: '需分拣数量',
        dataIndex: 'needSortingQuantity',
        key: 'needSortingQuantity',
        align: 'left',
      },
      {
        title: '已分拣数量',
        dataIndex: 'sortedAllQuantity',
        key: 'sortedAllQuantity',
        align: 'left',
      },
      {
        title: '分拣容器',
        dataIndex: 'sortedContainers',
        key: 'sortedContainers',
        align: 'left',
        render: (text: any) => {
          return text && text.length > 0 ? text.join(',') : '-';
        },
      },
      {
        title: '分拣状态',
        dataIndex: 'sortedStatus',
        key: 'sortedStatus',
        align: 'left',
        render: (text: any, record: any) => {
          return SORTSTATUS.key(text)?.value || '-';
        },
      },
      {
        title: '分拣人',
        dataIndex: 'sortedUserName',
        key: 'sortedUserName',
        align: 'left',
      },
      {
        title: '分拣开始时间',
        dataIndex: 'startSortingAt',
        key: 'startSortingAt',
        align: 'left',
        render: (text: string) => dateTimeFormat(text),
      },
      {
        title: '分拣结束时间',
        dataIndex: 'fenHuoDate',
        key: 'fenHuoDate',
        align: 'left',
        render: (text: string) => dateTimeFormat(text),
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align: 'left',
        width: 120,
        fixed: 'right',
        render: (text: string, record: any) => (
          <Button type="primary" onClick={() => checkDetail(record.id)}>
            查看详情
          </Button>
        ),
      },
    ]);
    return (
      <SearchTable searchFormRender={<SearchForm />}>
        <Table
          // @ts-ignore
          columns={columns}
          bordered
          rowKey={record => record.id}
          scroll={{ x: 1400 }}
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
  }),
);
