import React from 'react';
import { connect } from 'dva';
import { Table, Button, Space } from 'antd';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import SearchForm from './searchForm';
import { dateTimeFormat, defaultColumns } from '@/utils';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import { FileTextOutlined } from '@ant-design/icons/lib';
import {
  CHECKTYPES,
  INVENTORYRESULTSTATUS,
  CHECKWAYS,
  CHECKFROZEN,
  INVENTORYRESULTDETAILSTATUS,
} from '@/enum.config';
import AddModal from './addModal';

export default BreadcrumbHeader([{ name: '库存盘点' }, { name: '盘点结果' }])(
  connect(({ inventoryResult }: any) => ({
    searchData: inventoryResult.searchData,
    dataSource: inventoryResult.dataSource,
    current: inventoryResult.current,
    pageSize: inventoryResult.pageSize,
    total: inventoryResult.total,
    loading: inventoryResult.loading,
  }))(({ dataSource, loading, current, pageSize, total, dispatch }) => {
    const {
      onChange,
      modal,
      onRowSelect,
      rowInfo,
      setClassName,
      resultReplay,
      resultEndplay,
      resultCheckEnd,
      rowSelection,
      title,
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
        title: '冻结盘点',
        dataIndex: 'isFrozen',
        key: 'isFrozen',
        render: (text: string) => CHECKFROZEN.key(text)?.value,
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text: string) => INVENTORYRESULTSTATUS.key(text)?.value,
      },
      {
        title: '结束操作人',
        dataIndex: 'updateBy',
        key: 'updateBy',
      },
      {
        title: '结束时间',
        dataIndex: 'updateAt',
        key: 'updateAt',
        render: (text: string) => dateTimeFormat(text),
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        fixed: 'right',
        width: 100,
        align: 'center',
        render: (text: string, record: any) => {
          return (
            <Space direction="vertical">
              {record.status == 1 ? (
                <Button
                  size="small"
                  type="primary"
                  style={{ width: '72px' }}
                  onClick={() => {
                    resultReplay(record);
                  }}
                >
                  复盘
                </Button>
              ) : null}
              {record.status == 2 ? (
                <Button
                  size="small"
                  type="primary"
                  style={{ width: '72px' }}
                  onClick={() => {
                    resultEndplay(record);
                  }}
                >
                  终盘
                </Button>
              ) : null}
              {record.status == 3 || record.status == 4 ? '-' : null}
            </Space>
          );
        },
      },
    ]);
    const DiffHtml = ({ text }: any) => {
      return <span style={{ color: 'red' }}>{text}</span>;
    };
    const columns1 = defaultColumns([
      {
        title: '明细状态',
        dataIndex: 'status',
        key: 'status',
        render: (text: string) => INVENTORYRESULTDETAILSTATUS.key(text)?.value,
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
        title: '盘点批次号',
        dataIndex: 'batchNum',
        key: 'batchNum',
      },
      {
        title: '初盘系统数量',
        dataIndex: 'initQuantity',
        key: 'initQuantity',
      },
      {
        title: '初盘数量',
        dataIndex: 'firstQuantity',
        key: 'firstQuantity',
      },
      {
        title: '差异',
        dataIndex: 'diff1',
        key: 'diff1',
        render: (text: string, record: any) => {
          return (
            <DiffHtml
              text={Number(record.firstQuantity) - Number(record.initQuantity)}
            />
          );
        },
      },
      {
        title: '复盘系统数量',
        dataIndex: 'secondSystemQuantity',
        key: 'secondSystemQuantity',
      },
      {
        title: '复盘数量',
        dataIndex: 'secondQuantity',
        key: 'secondQuantity',
      },
      {
        title: '差异',
        dataIndex: 'diff2',
        key: 'diff2',
        render: (text: string, record: any) => {
          return (
            <DiffHtml
              text={
                Number(record.secondQuantity) -
                Number(record.secondSystemQuantity)
              }
            />
          );
        },
      },
      {
        title: '终盘系统数量',
        dataIndex: 'lastSystemQuantity',
        key: 'lastSystemQuantity',
      },
      {
        title: '终盘数量',
        dataIndex: 'lastQuantity',
        key: 'lastQuantity',
      },
      {
        title: '差异',
        dataIndex: 'diff3',
        key: 'diff3',
        render: (text: string, record: any) => {
          return (
            <DiffHtml
              text={
                Number(record.lastQuantity) - Number(record.lastSystemQuantity)
              }
            />
          );
        },
      },
    ]);
    return (
      <SearchTable
        searchFormRender={<SearchForm />}
        operateBtnRender={
          <>
            <Button type="primary" danger onClick={resultCheckEnd}>
              结束盘点
            </Button>
          </>
        }
      >
        <Table
          columns={columns}
          bordered
          rowKey={record => record.id}
          scroll={{ x: 1500, y: 300 }}
          dataSource={dataSource}
          loading={loading}
          rowClassName={setClassName} //表格行点击高亮
          rowSelection={rowSelection}
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
          scroll={{ x: 1500, y: 300 }}
          pagination={false}
          title={() => (
            <span>
              <FileTextOutlined />
              &nbsp;明细
            </span>
          )}
          size="small"
          style={{ marginTop: 10 }}
        />
        <AddModal modal={modal} title={title} />
      </SearchTable>
    );
  }),
);
