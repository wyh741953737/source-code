import React from 'react';
import { connect } from 'dva';
import { Button, Table } from 'antd';
import SearchForm from './searchForm';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import { dateTimeFormat, defaultColumns } from '@/utils';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import {
  STORETYPE,
  MANAGESTATUS,
  MANAGESOURCE,
  MANAGESTYTLE,
  ISSEhanRVICEGOODS,
} from '@/enum.config';
import { FileTextOutlined } from '@ant-design/icons/lib';
import AddModal from './addModal';
import ExcelUpload from '@/components/CustomFields/ExcelUpload';
/**
 * 理货管理
 */
export default BreadcrumbHeader([{ name: '库存管理' }, { name: '理货管理' }])(
  connect(({ tallyManage }: any) => ({
    searchData: tallyManage.searchData,
    dataSource: tallyManage.dataSource,
    current: tallyManage.current,
    pageSize: tallyManage.pageSize,
    total: tallyManage.total,
    loading: tallyManage.loading,
  }))(({ dataSource, loading, current, pageSize, total, dispatch }) => {
    const {
      onChange,
      giveUp,
      rowSelection,
      modal,
      onRowSelect,
      rowInfo,
      setClassName,
      excelColumns,
      importMaterialData,
      createBatch,
    } = indexHooks(dispatch, dataSource);
    const columns = defaultColumns([
      {
        title: '理货单号',
        dataIndex: 'tallyNum',
        key: 'tallyNum',
      },
      {
        title: '仓库',
        dataIndex: 'storehouseName',
        key: 'storehouseName',
      },
      {
        title: '来源',
        dataIndex: 'tallySource',
        key: 'tallySource',
        render: (text: string) => MANAGESOURCE.key(text)?.value,
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render: (text: string) => MANAGESTYTLE.key(text)?.value,
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text: string) => MANAGESTATUS.key(text)?.value,
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
    const columns1 = defaultColumns([
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
        title: '库存类型',
        dataIndex: 'type',
        key: 'type',
        render: (text: string) => STORETYPE.key(text)?.value,
      },
      {
        title: '服务商品',
        dataIndex: 'isServiceGoods',
        key: 'isServiceGoods',
        render: (text: string) => ISSEhanRVICEGOODS.key(text)?.value,
      },
      {
        title: '原始库位',
        dataIndex: 'locationName',
        key: 'locationName',
      },
      {
        title: '目标库位',
        dataIndex: 'toLocationName',
        key: 'toLocationName',
      },
      {
        title: '数量',
        dataIndex: 'quantity',
        key: 'quantity',
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
            <ExcelUpload
              templateHref={'/tallyManage.xlsx'}
              templateName={'理货单导入模板.xlsx'}
              columns={excelColumns}
              upload={importMaterialData}
              buttonName="导入理货单"
            />
            <Button type="primary" danger onClick={giveUp}>
              放弃
            </Button>
            <Button
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
            onChange: onChange,
          }}
        />
        <Table
          columns={columns1}
          rowKey={record => record.id}
          dataSource={rowInfo}
          size="small"
          title={() => (
            <span>
              <FileTextOutlined />
              &nbsp;明细
            </span>
          )}
          style={{ marginTop: 10 }}
        />
        {modal?.visible && (
          <AddModal modal={modal} title={'新增理货单'} okText={'完成'} />
        )}
      </SearchTable>
    );
  }),
);
