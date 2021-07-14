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
import { BATCHSTATUS, INVENTORYSTATUS } from '@/enum.config';

export default BreadcrumbHeader([{ name: '库存盘点' }, { name: '盘点批次' }])(
  connect(({ inventoryBatchNo }: any) => ({
    searchData: inventoryBatchNo.searchData,
    dataSource: inventoryBatchNo.dataSource,
    current: inventoryBatchNo.current,
    pageSize: inventoryBatchNo.pageSize,
    total: inventoryBatchNo.total,
    loading: inventoryBatchNo.loading,
  }))(({ dataSource, loading, current, pageSize, total, dispatch }) => {
    const {
      onChange,
      rowSelection,
      modal,
      onRowSelect,
      rowInfo,
      selected,
      printBatch,
      setClassName,
    } = indexHooks(dispatch, dataSource);
    const columns = defaultColumns([
      {
        title: '批次号',
        dataIndex: 'batchNum',
        key: 'batchNum',
        fixed: 'left',
        width: 150,
      },
      {
        title: '盘点单号',
        dataIndex: 'checkNum',
        key: 'checkNum',
      },
      {
        title: '仓库',
        dataIndex: 'storehouseName',
        key: 'storehouseName',
      },
      {
        title: '盘点任务数',
        dataIndex: 'quantity',
        key: 'quantity',
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
        render: text => dateTimeFormat(text),
      },
      {
        title: '盘点人',
        dataIndex: 'updateBy',
        key: 'updateBy',
      },
      {
        title: '最后更新时间',
        dataIndex: 'updateAt',
        key: 'updateAt',
        render: text => dateTimeFormat(text),
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text: string) => BATCHSTATUS.key(text)?.value,
      },
    ]);
    const columns1 = defaultColumns([
      {
        title: '库位',
        dataIndex: 'locationName',
        key: 'locationName',
      },
      {
        title: '货主',
        dataIndex: 'customerName',
        key: 'customerName',
      },
      {
        title: 'SKU',
        dataIndex: 'sku',
        key: 'sku',
      },
      {
        title: '明细状态',
        dataIndex: 'status',
        key: 'status',
        render: (text: string) => INVENTORYSTATUS.key(text)?.value,
      },
      {
        title: '盘点人',
        dataIndex: 'updateBy',
        key: 'updateBy',
      },
      {
        title: '盘点时间',
        dataIndex: 'updateAt',
        key: 'updateAt',
      },
    ]);
    return (
      <SearchTable
        searchFormRender={<SearchForm />}
        operateBtnRender={
          <>
            <Button disabled type="primary" onClick={() => modal.show()}>
              重新指派
            </Button>
            <Button
              disabled={selected.keys.length == 0}
              type="primary"
              onClick={printBatch}
            >
              批次打印
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
            onChange: onChange,
          }}
        />
        <Table
          columns={columns1}
          title={() => (
            <span>
              <FileTextOutlined />
              &nbsp;明细
            </span>
          )}
          rowKey={record => record.id}
          dataSource={rowInfo?.checkBatchVariantDTOS || []}
          size="small"
          style={{ marginTop: 10 }}
        />
        <AddModal modal={modal} />
      </SearchTable>
    );
  }),
);
