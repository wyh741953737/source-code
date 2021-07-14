import React from 'react';
import { connect } from 'dva';
import { Table, Button } from 'antd';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import SearchForm from './searchForm';
import { dateTimeFormat, defaultColumns } from '@/utils';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { FileTextOutlined } from '@ant-design/icons/lib';
import { BATCHSTATUS, BATCHDETAILSTATUS } from '@/enum.config';

export default BreadcrumbHeader([{ name: '库存管理' }, { name: '理货批次' }])(
  connect(({ tallyBatch }: any) => ({
    detail: tallyBatch?.detail,
    searchData: tallyBatch.searchData,
    dataSource: tallyBatch.dataSource,
    current: tallyBatch.current,
    pageSize: tallyBatch.pageSize,
    total: tallyBatch.total,
    loading: tallyBatch.loading,
  }))(({ detail, dataSource, loading, current, pageSize, total, dispatch }) => {
    const {
      detailLoaing,
      onChange,
      rowSelection,
      printSelect,
      onRowSelect,
      setClassName,
    } = indexHooks(dispatch, dataSource);
    const [option] = useOptions(warehouseApply, { interval: Infinity });
    const columns = defaultColumns([
      {
        title: '批次号',
        dataIndex: 'batchNum',
        key: 'batchNum',
        fixed: 'left',
        width: 150,
      },
      {
        title: '理货单号',
        dataIndex: 'tallyNum',
        key: 'tallyNum',
        fixed: 'left',
        width: 120,
      },
      {
        title: '仓库',
        dataIndex: 'storehouseId',
        key: 'storehouseId',
        align: 'left',
        render: (text: any) => option.menu.key(text)?.value || '-',
      },
      {
        title: '理货任务数',
        dataIndex: 'quantity',
        key: 'quantity',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text: any) => BATCHSTATUS.key(text)?.value || '-',
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
      {
        title: '理货人',
        dataIndex: 'updateBy',
        key: 'updateBy',
      },
      {
        title: '最后时间',
        dataIndex: 'updateAt',
        key: 'updateAt',
        render: (text: string) => dateTimeFormat(text),
      },
    ]);
    const columns1 = defaultColumns([
      {
        title: 'sku',
        dataIndex: 'sku',
        key: 'sku',
      },
      {
        title: '货主',
        dataIndex: 'customerName',
        key: 'customerName',
      },
      {
        title: '下架库位',
        dataIndex: 'locationName',
        key: 'locationName',
      },
      {
        title: '上架库位',
        dataIndex: 'toLocationName',
        key: 'toLocationName',
      },
      {
        title: '理货数量',
        dataIndex: 'quantity',
        key: 'quantity',
      },
      {
        title: '实际理货数量',
        dataIndex: 'realQuantity',
        key: 'realQuantity',
      },
      {
        title: '明细状态',
        dataIndex: 'status',
        key: 'status',
        render: (text: any) => BATCHDETAILSTATUS.key(text)?.value || '-',
      },
      {
        title: '理货人',
        dataIndex: 'updateBy',
        key: 'updateBy',
      },
      {
        title: '理货时间',
        dataIndex: 'updateAy',
        key: 'updateAy',
        render: (text: string) => dateTimeFormat(text),
      },
    ]);

    console.log(detail, 'detail');

    return (
      <SearchTable
        searchFormRender={<SearchForm />}
        operateBtnRender={
          <>
            <Button type="primary" onClick={printSelect}>
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
          rowKey={record => record.id}
          dataSource={detail || []}
          loading={detailLoaing}
          pagination={false}
          title={() => (
            <span>
              <FileTextOutlined />
              &nbsp;明细
              <span style={{ color: 'grey', fontSize: 12 }}>
                （点击理货单获取明细）
              </span>
            </span>
          )}
          size="small"
        />
      </SearchTable>
    );
  }),
);
