import React from 'react';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import { connect } from 'dva';
import SearchForm from './searchForm';
import { Button, Table } from 'antd';
import { indexHooks } from './hooks';
import AddOrUpdate from './addOrUpdate';
import SearchTable from '@/components/SearchTable';
import { COMMONBOOLEAN, WAREHOUSETYPE } from '@/enum.config';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';

export default BreadcrumbHeader([{ name: '系统管理' }, { name: '库区管理' }])(
  connect(({ warehouseManage }: any) => ({
    dataSource: warehouseManage.dataSource,
    loading: warehouseManage.loading,
    current: warehouseManage.current,
    pageSize: warehouseManage.pageSize,
    total: warehouseManage.total,
  }))(({ dataSource, loading, current, pageSize, total, dispatch }) => {
    const { onChange, modal } = indexHooks(dispatch);
    const [option] = useOptions(warehouseApply, { interval: Infinity });
    const columns = [
      {
        title: '库区编号',
        dataIndex: 'areaName',
        key: 'areaName',
        align: 'left',
      },
      {
        title: '所属仓库',
        dataIndex: 'storehouseId',
        key: 'storehouseId',
        align: 'left',
        render: (text: any) => option.menu.key(text)?.value || '-',
      },
      {
        title: '库区类型',
        dataIndex: 'type',
        key: 'type',
        align: 'left',
        render: (text: number) => WAREHOUSETYPE.key(text)?.value || '-',
      },
      {
        title: '库区品类',
        dataIndex: 'categoryName',
        key: 'categoryName',
        align: 'left',
        render: (text: string) => text || '-',
      },
      {
        title: '停用',
        dataIndex: 'isDelete',
        key: 'isDelete',
        align: 'left',
        render: (text: number) => COMMONBOOLEAN.key(text)?.value || '-',
      },
      {
        title: '操作',
        key: '',
        align: 'left',
        render: (text: any, record: any) => (
          <AuthJudge code={AUTH.CQGL001002}>
            <a onClick={() => modal.show({ isUpdate: true, record })}>修改</a>
          </AuthJudge>
        ),
      },
    ];
    return (
      <SearchTable
        searchFormRender={<SearchForm />}
        operateBtnRender={
          <AuthJudge code={AUTH.CQGL001001}>
            <Button type="primary" onClick={() => modal.show()}>
              新增库区
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
            //
            onChange,
          }}
        />
        <AddOrUpdate modal={modal} />
      </SearchTable>
    );
  }),
);
