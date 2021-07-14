import React from 'react';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import { connect } from 'dva';
import SearchForm from './searchForm';
import { Button, Space, Table } from 'antd';
import { indexHooks } from './hooks';
import AddOrUpdate from './addOrUpdate';
import SearchTable from '@/components/SearchTable';
import { WAVEPICKINGSTATUS, WAVEPICKINGTYPE } from '@/enum.config';
import { dateTimeFormat, defaultColumns } from '@/utils';
import { Link } from 'umi';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';

export default BreadcrumbHeader([{ name: '出库' }, { name: '波次管理' }])(
  connect(({ wavePickingManage }: any) => ({
    dataSource: wavePickingManage.dataSource,
    loading: wavePickingManage.loading,
    current: wavePickingManage.current,
    pageSize: wavePickingManage.pageSize,
    total: wavePickingManage.total,
    currentStore: wavePickingManage.currentStore,
  }))(
    ({
      dataSource,
      loading,
      current,
      pageSize,
      total,
      currentStore,
      dispatch,
    }) => {
      const { onChange, modal, onRepeal } = indexHooks(dispatch);
      const columns = defaultColumns([
        {
          title: '波次ID',
          dataIndex: 'id',
          key: 'id',
          align: 'left',
        },
        {
          title: '波次名称',
          dataIndex: 'waveName',
          key: 'waveName',
          align: 'left',
        },
        {
          title: '仓库名称',
          dataIndex: 'storehouseName',
          key: 'storehouseName',
          align: 'left',
        },
        {
          title: '波次类型',
          dataIndex: 'waveType',
          key: 'waveType',
          align: 'left',
          render: (text: number) => WAVEPICKINGTYPE.key(text)?.value || '-',
        },
        {
          title: '波次状态',
          dataIndex: 'waveStatus',
          key: 'waveStatus',
          align: 'left',
          render: (text: number) => WAVEPICKINGSTATUS.key(text)?.value || '-',
        },
        {
          title: '当前波次订单数量',
          dataIndex: 'orderQuantity',
          key: 'orderQuantity',
        },
        {
          title: '订单数量上限',
          dataIndex: 'orderQuantityLimit',
          key: 'orderQuantityLimit',
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
          title: '操作',
          key: 'id',
          dataIndex: 'id',
          align: 'left',
          width: 160,
          fixed: 'right',
          render: (text: any, record: any) => (
            <Space>
              <AuthJudge code={AUTH.BCGL001002}>
                <Link to={`/wavePickingManage/detail?id=${text}`}>查看</Link>
              </AuthJudge>
              <AuthJudge code={AUTH.BCGL001003}>
                <Button
                  type="link"
                  onClick={() => onRepeal(record)}
                  disabled={record.waveStatus !== WAVEPICKINGSTATUS.pending.key}
                >
                  撤销波次
                </Button>
              </AuthJudge>
            </Space>
          ),
        },
      ]);
      return (
        <SearchTable
          searchFormRender={<SearchForm />}
          operateBtnRender={
            <AuthJudge code={AUTH.BCGL001001}>
              <Button
                type="primary"
                onClick={() => modal.show({ storehouseId: currentStore })}
              >
                新建波次
              </Button>
            </AuthJudge>
          }
        >
          <Table
            // @ts-ignore
            columns={columns}
            rowKey={record => record.id}
            dataSource={dataSource}
            loading={loading}
            scroll={{ x: 1500 }}
            bordered
            pagination={{
              current,
              pageSize,
              total,
              pageSizeOptions: ['10', '20', '50', '100'],
              showQuickJumper: true,
              showTotal: total => {
                return <span>共计{total}条数据</span>;
              },
              onChange,
            }}
          />
          {modal.visible && <AddOrUpdate modal={modal} />}
        </SearchTable>
      );
    },
  ),
);
