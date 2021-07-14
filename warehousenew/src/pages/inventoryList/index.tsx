import React from 'react';
import { connect } from 'dva';
import { Table, Button } from 'antd';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import SearchForm from './searchForm';
import { dateTimeFormat, defaultColumns } from '@/utils';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import { FileTextOutlined } from '@ant-design/icons/lib';
import AddModal from './addModal';
import {
  CHECKTYPES,
  CHECKSTATUS,
  CHECKWAYS,
  CHECKRANGE,
  CHECKFROZEN,
} from '@/enum.config';

export default BreadcrumbHeader([{ name: '库存盘点' }, { name: '盘点单' }])(
  connect(({ inventoryList }: any) => ({
    searchData: inventoryList.searchData,
    dataSource: inventoryList.dataSource,
    current: inventoryList.current,
    pageSize: inventoryList.pageSize,
    total: inventoryList.total,
    loading: inventoryList.loading,
  }))(({ dataSource, loading, current, pageSize, total, dispatch }) => {
    const {
      onChange,
      rowSelection,
      rowSelection2,
      giveUp,
      createBatch,
      modal,
      onRowSelect,
      selected,
      selected2,
      setClassName,
      rowDetail,
      deleteDetail,
    } = indexHooks(dispatch, dataSource);
    const columns = defaultColumns([
      {
        title: '盘点单号',
        dataIndex: 'checkNum',
        key: 'checkNum',
        fixed: 'left',
        width: 150,
      },
      {
        title: '仓库',
        dataIndex: 'storehouseName',
        key: 'storehouseName',
        fixed: 'left',
        width: 120,
      },
      {
        title: '类别',
        dataIndex: 'type',
        key: 'type',
        render: (text: string) => CHECKTYPES.key(text)?.value,
      },
      {
        title: '盘点方式',
        dataIndex: 'checkType',
        key: 'checkType',
        render: (text: string) => CHECKWAYS.key(text)?.value,
      },
      {
        title: '盘点维度',
        dataIndex: 'checkDimension',
        key: 'checkDimension',
        render: (text: string) => CHECKRANGE.key(text)?.value,
      },
      {
        title: '冻结盘点',
        dataIndex: 'isFrozen',
        key: 'isFrozen',
        render: (text: string) => CHECKFROZEN.key(text)?.value,
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text: string) => CHECKSTATUS.key(text)?.value,
      },
      {
        title: '创建人',
        dataIndex: 'createBy',
        key: 'createBy',
      },
      {
        title: '创建时间',
        dataIndex: 'createAt',
        key: 'createAt',
        render: (text: string) => dateTimeFormat(text),
      },
    ]);
    const columns2 = defaultColumns([
      {
        title: 'SKU',
        dataIndex: 'sku',
        key: 'sku',
      },
      {
        title: '货主',
        dataIndex: 'customerName',
        key: 'customerName',
      },
      {
        title: '库区',
        dataIndex: 'areaName',
        key: 'areaName',
      },
      {
        title: '库位',
        dataIndex: 'locationName',
        key: 'locationName',
      },
    ]);

    return (
      <SearchTable
        searchFormRender={<SearchForm />}
        operateBtnRender={
          <>
            <Button type="primary" onClick={() => modal.show()}>
              新增
            </Button>
            <Button
              disabled={selected?.keys?.length == 0}
              type="primary"
              danger
              onClick={giveUp}
            >
              放弃
            </Button>
            <Button
              disabled={selected?.keys?.length == 0}
              type="primary"
              onClick={createBatch.onClick}
              loading={createBatch.loading}
            >
              生成批次
            </Button>
          </>
        }
      >
        <Table
          columns={columns}
          bordered
          rowKey={record => record.id}
          scroll={{ x: 1500 }}
          dataSource={dataSource}
          loading={loading}
          rowSelection={rowSelection}
          rowClassName={setClassName} //表格行点击高亮
          onRow={(record, index) => ({
            onClick: () => onRowSelect(record, index),
          })}
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
        <div style={{ padding: '15px 0 5px' }}>
          <span>
            <FileTextOutlined />
            &nbsp;明细
          </span>
        </div>
        <div>
          <Button
            disabled={selected2?.keys?.length == 0}
            danger
            type="primary"
            onClick={deleteDetail}
          >
            删除
          </Button>
        </div>
        <Table
          rowSelection={rowSelection2}
          columns={columns2}
          rowKey={record => record.id}
          dataSource={rowDetail}
          size="small"
          style={{ marginTop: 10 }}
        />
        <AddModal modal={modal} />
      </SearchTable>
    );
  }),
);
