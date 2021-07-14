import React from 'react';
import { connect } from 'dva';
import { Link } from 'umi';
import { Button, Table, Space, Badge } from 'antd';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import UpdateModal from './update';
import AddModal from './add';
import Log from './log';
import style from './index.less';
import SearchForm from './searchForm';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import { WAREHOUSESTATUS, WAREHOUSWARRANTETYPE } from '@/enum.config';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';
import { dateTimeFormat } from '@/utils';

/**
 * 入库单查询
 */
export default BreadcrumbHeader([{ name: '入库' }, { name: '入库单查询' }])(
  connect(({ warehouseWarrantFinder }: any) => ({
    searchData: warehouseWarrantFinder.searchData,
    dataSource: warehouseWarrantFinder.dataSource,
    current: warehouseWarrantFinder.current,
    pageSize: warehouseWarrantFinder.pageSize,
    total: warehouseWarrantFinder.total,
    loading: warehouseWarrantFinder.loading,
  }))(({ dataSource, loading, current, pageSize, total, dispatch }: any) => {
    const {
      onChange,
      onDelete,
      onSelectionChange,
      addModal,
      updateModal,
      logModal,
      selectedRowKeys,
      onUpdate,
    } = indexHooks(dispatch, dataSource);
    const columns = [
      {
        title: '入库单号',
        dataIndex: 'putStorageNumber',
        key: 'putStorageNumber',
        fixed: 'left',
        render: (text: any, record: any) => (
          <Link to={`/warehouseWarrantDetail?id=${record.id}`}>{text}</Link>
        ),
      },
      {
        title: '入库仓库',
        dataIndex: 'storageName',
        key: 'storageName',
      },
      {
        title: '入库类型',
        dataIndex: 'type',
        key: 'type',
        render: (text: any) => WAREHOUSWARRANTETYPE.key(text)?.value || '-',
      },
      {
        title: '采购订单号',
        dataIndex: 'orderNumber',
        key: 'orderNumber',
      },
      {
        title: '物流信息',
        dataIndex: 'logisticsInfo',
        key: 'logisticsInfo',
        width: 300,
        align: 'left',
        render: (text: string = '') => {
          const temp = text.split(';');
          const temp1 = temp.slice(0, 3).filter(Boolean);
          return temp.length > 3 ? (
            <>
              {temp1.map((t, i) => (
                <div key={i}>{t}</div>
              ))}
              <div>...</div>
            </>
          ) : (
            temp1.map((t, i) => <div key={i}>{t}</div>)
          );
        },
      },
      {
        title: '创建时间',
        dataIndex: 'createAt',
        key: 'createAt',
        render: (text: string) => dateTimeFormat(text),
      },
      {
        title: '创建人',
        dataIndex: 'createBy',
        key: 'createBy',
      },
      {
        title: '商品数量',
        dataIndex: 'quantity',
        key: 'quantity',
      },
      {
        title: '供货方',
        dataIndex: 'supplier',
        key: 'supplier',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        align: 'left',
        render: (text: any) => {
          const en = WAREHOUSESTATUS.key(Number(text));
          return (
            <span>
              <Badge color={en?.color} className={style.badge} />
              {en?.value}
            </span>
          );
        },
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        render: (text: string) => text || '-',
      },
      {
        title: '日志',
        dataIndex: 'id',
        key: 'id',
        width: 80,
        fixed: 'right',
        render: (text: any, record: any) => (
          <a onClick={() => logModal.show({ id: record.putStorageNumber })}>
            查看
          </a>
        ),
      },
    ];
    return (
      <SearchTable
        searchFormRender={<SearchForm />}
        operateBtnRender={
          <Space>
            <AuthJudge code={AUTH.RKCX001001}>
              <Button type="primary" onClick={() => addModal.show()}>
                添加入库单
              </Button>
            </AuthJudge>
            <AuthJudge code={AUTH.RKCX001002}>
              <Button type="default" onClick={onUpdate}>
                修改
              </Button>
            </AuthJudge>
            {/* <AuthJudge code={AUTH.RKCX001003}>
              <Button type="primary" danger ghost onClick={onDelete}>
                删除
              </Button>
            </AuthJudge> */}
          </Space>
        }
      >
        <Table
          // @ts-ignore
          columns={columns}
          rowKey={record => record.id}
          bordered
          scroll={{ x: 2000 }}
          rowSelection={{
            fixed: true,
            onChange: onSelectionChange,
            selectedRowKeys,
          }}
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
        <UpdateModal modal={updateModal} />
        <AddModal modal={addModal} />
        <Log modal={logModal} />
      </SearchTable>
    );
  }),
);
