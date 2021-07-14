import React from 'react';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import { connect } from 'dva';
import { Space, Table, Button } from 'antd';
import SearchTable from '@/components/SearchTable';
import SearchForm from './searchForm';
import { indexHooks } from './hooks';
import AddMove from '../../components/AddMoveModal';
import MoveConfirm from './moveConfirm';
import RecommendList from './recommendList';
import { MOVESTATUS, MOVETYPE, STORETYPE } from '@/enum.config';
import { dateTimeFormat, defaultColumns } from '@/utils';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import propertyTraversal from '@/utils/propertyUtils';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';
export default BreadcrumbHeader([{ name: '库存管理' }, { name: '库内移动' }])(
  connect(({ moveInWarehouse }: any) => ({
    searchData: moveInWarehouse.searchData,
    dataSource: moveInWarehouse.dataSource,
    current: moveInWarehouse.current,
    pageSize: moveInWarehouse.pageSize,
    total: moveInWarehouse.total,
    loading: moveInWarehouse.loading,
  }))(({ dataSource, loading, current, pageSize, total, dispatch }) => {
    const {
      onChange,
      onSelectionChange,
      modal,
      undo,
      doingMove,
      selected,
      confirmModal,
    } = indexHooks(dispatch, dataSource);
    const [option] = useOptions(warehouseApply, { interval: Infinity });
    const columns = defaultColumns([
      {
        title: '移动单号',
        dataIndex: 'moveCode',
        key: 'moveCode',
        align: 'left',
        fixed: 'left',
      },
      {
        title: 'SKU',
        dataIndex: 'variantSku',
        key: 'variantSku',
        align: 'left',
      },
      {
        title: '属性',
        dataIndex: 'variantKeyMap',
        key: 'variantKeyMap',
        width: 150,
        render: (text: any) => {
          return <div>{propertyTraversal(text)}</div>;
        },
      },
      // {
      //   title: '批次号',
      //   dataIndex: 'batchNumber',
      //   key: 'batchNumber',
      //   align: 'left',
      // },

      {
        title: '仓库',
        dataIndex: 'storehouseId',
        key: 'storehouseId',
        align: 'left',
        render: (text: string) => option.menu.key(text)?.value || '-',
      },
      {
        title: '货主',
        dataIndex: 'customerName',
        key: 'customerName',
        align: 'left',
      },
      {
        title: '移动类型',
        dataIndex: 'moveType',
        key: 'moveType',
        align: 'left',
        render: (text: number) => MOVETYPE.key(text)?.value || '-',
      },
      {
        title: '库存类型',
        dataIndex: 'inventoryType',
        key: 'inventoryType',
        align: 'left',
        render: (text: number) => STORETYPE.key(text)?.value || '-',
      },
      {
        title: '移动数量',
        dataIndex: 'moveQuantity',
        key: 'moveQuantity',
        align: 'left',
      },
      {
        title: '从容器',
        dataIndex: 'containerNum',
        key: 'containerNum',
        align: 'left',
      },
      {
        title: '到容器',
        dataIndex: 'toContainerNum',
        key: 'toContainerNum',
        align: 'left',
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
        title: '移动人',
        dataIndex: 'updateBy',
        key: 'updateBy',
        align: 'left',
      },
      {
        title: '移动时间',
        dataIndex: 'updateAt',
        key: 'updateAt',
        align: 'left',
        render: (text: string) => dateTimeFormat(text),
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        align: 'left',
        render: (text: number) => MOVESTATUS.key(text)?.value || '-',
      },
    ]);
    return (
      <SearchTable
        searchFormRender={<SearchForm />}
        operateBtnRender={
          <Space>
            <AuthJudge code={AUTH.KCYD001001}>
              <Button type="primary" onClick={() => modal.show()}>
                新增
              </Button>
            </AuthJudge>
            <AuthJudge code={AUTH.KCYD001002}>
              <Button type="primary" onClick={() => doingMove()}>
                提交移动
              </Button>
            </AuthJudge>
            <AuthJudge code={AUTH.KCYD001003}>
              <Button type="primary" danger onClick={() => undo()}>
                放弃
              </Button>
            </AuthJudge>
          </Space>
        }
      >
        <Table
          // @ts-ignore
          columns={columns}
          rowKey={record => record.id}
          bordered
          scroll={{ x: 2000 }}
          dataSource={dataSource}
          loading={loading}
          rowSelection={{
            fixed: true,
            onChange: onSelectionChange,
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
        <AddMove modal={modal} title="新增移动" okText="移动" />
        <MoveConfirm modal={confirmModal} />
      </SearchTable>
    );
  }),
);
