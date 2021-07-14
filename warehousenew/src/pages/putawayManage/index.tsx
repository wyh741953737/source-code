import React from 'react';
import { connect } from 'dva';
import { history } from 'umi';
import { Table, Badge, Button } from 'antd';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import SearchForm from './searchForm';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import { PUTAWAYSTATUS } from '@/enum.config';
import ToAssign from './components/toAssign';
import { dateTimeFormat, defaultColumns } from '@/utils';
/**
 * 上架单查询
 */
export default BreadcrumbHeader([{ name: '入库' }, { name: '上架管理' }])(
  connect(({ putawayManage }: any) => ({
    searchData: putawayManage.searchData,
    dataSource: putawayManage.dataSource,
    current: Number(putawayManage.current),
    pageSize: Number(putawayManage.pageSize),
    total: putawayManage.total,
    loading: putawayManage.loading,
  }))(({ dataSource, loading, current, pageSize, total, dispatch }: any) => {
    const columns = defaultColumns([
      {
        title: '上架单号',
        dataIndex: 'onShelfNum',
        key: 'onShelfNum',
        fixed: 'left',
        width: 180,
        align: 'left',
        render: (text: any, record: any) => (
          <a
            onClick={() => {
              dispatch({
                type: 'putawayManage/_changecurrentItem',
                payload: { currentItem: record },
              });
              history.push({ pathname: '/putawayDetail', query: { id: text } });
            }}
          >
            {text}
          </a>
        ),
      },
      {
        title: '上架仓库',
        dataIndex: 'storehouseName',
        key: 'storehouseName',
      },
      {
        title: '容器',
        dataIndex: 'containerNum',
        key: 'containerNum',
      },
      {
        title: '总量',
        dataIndex: 'totalQuantity',
        key: 'totalQuantity',
      },
      {
        title: '已上架量',
        dataIndex: 'onShelfQuantity',
        key: 'onShelfQuantity',
      },
      {
        title: '创建时间',
        dataIndex: 'createAt',
        key: 'createAt',
        render: (text: string) => dateTimeFormat(text),
      },
      {
        title: '上架操作人',
        dataIndex: 'updateBy',
        key: 'updateBy',
      },
      {
        title: '称重人',
        dataIndex: 'createBy',
        key: 'createBy',
      },
      {
        title: '称重开始时间',
        dataIndex: 'updateBegain',
        key: 'updateBegain',
        render: (text: string) => dateTimeFormat(text),
      },
      {
        title: '称重结束时间',
        dataIndex: 'updateEnd',
        key: 'updateEnd',
        render: (text: string) => dateTimeFormat(text),
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text: any, record: any) => {
          const status = PUTAWAYSTATUS.key(text);
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
        title: '备注',
        dataIndex: 'remarks',
        key: 'remarks',
      },
      {
        title: '操作',
        dataIndex: 'actions',
        key: 'actions',
        fixed: 'right',
        render: (text: string, record: any) => (
          <Button type="primary" onClick={() => toAssignModal.show(record)}>
            重新指派
          </Button>
        ),
      },
    ]);
    const { onChange, toAssignModal } = indexHooks(dispatch);
    return (
      <SearchTable searchFormRender={<SearchForm />}>
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
        />
        <ToAssign modal={toAssignModal} />
      </SearchTable>
    );
  }),
);
