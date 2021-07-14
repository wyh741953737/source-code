import React from 'react';
import { connect } from 'dva';
import ImagePreview from '@/components/ImagePreview';
import { Table, Space, Button, Dropdown, Menu } from 'antd';
import SearchForm from './searchForm';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import AddExceptionConfirm from './addExceptionConfirm';
import UpdateExceptionConfirm from './updateExceptionConfirm';
import { EXCEPTIONTYPE, RECEIPTES } from '@/enum.config';
import { dateTimeFormat, defaultColumns } from '@/utils';
import propertyTraversal from '@/utils/propertyUtils';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';
/**
 * 异常记录
 */
export default connect(({ exceptionWarehousePending }: any) => ({
  searchData: exceptionWarehousePending.searchData,
  dataSource: exceptionWarehousePending.dataSource,
  current: exceptionWarehousePending.current,
  pageSize: exceptionWarehousePending.pageSize,
  total: exceptionWarehousePending.total,
  loading: exceptionWarehousePending.loading,
}))(({ dataSource, loading, current, pageSize, total, dispatch }) => {
  const {
    onChange,
    addExceptionModal,
    updateExceptionModal,
    deleteRecord,
    submit,
    giveUp,
    onSelectionChange,
    submitLoading,
    giveUpLoading,
    selected,
  } = indexHooks(dispatch, dataSource);
  const columns = defaultColumns([
    {
      title: '异常单号',
      dataIndex: 'exceptionNum',
      key: 'exceptionNum',
      fixed: 'left',
    },
    {
      title: '仓库',
      dataIndex: 'storageName',
      key: 'storageName',
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: '运单号',
      dataIndex: 'logisticsTrackingNumber',
      key: 'logisticsTrackingNumber',
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
    {
      title: '采购订单号',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
    },
    {
      title: '商品图片',
      dataIndex: 'image',
      key: 'image',
      width: 90,
      render: (text: any, record: any) => (
        <ImagePreview key={text} url={text} />
      ),
    },
    {
      title: '货主',
      dataIndex: 'ownerGoods',
      key: 'ownerGoods',
    },
    {
      title: '批次号',
      dataIndex: 'batchNumber',
      key: 'batchNumber',
    },
    {
      title: '容器位置',
      dataIndex: 'containerNum',
      key: 'containerNum',
    },
    {
      title: '异常单据',
      dataIndex: 'exceptionSource',
      key: 'exceptionSource',
      render: (text: number) => RECEIPTES.key(text)?.value,
    },
    {
      title: '异常类型',
      dataIndex: 'type',
      key: 'type',
      render: (text: number) => EXCEPTIONTYPE.key(text)?.value,
    },
    {
      title: '异常数量',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: '入库单号',
      dataIndex: 'putStorageNumber',
      key: 'putStorageNumber',
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
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      width: 150,
      fixed: 'right',
      render: (text: any, record: any) => {
        return (
          <AuthJudge code={AUTH.YCCL004001}>
            <Button
              type="primary"
              size="small"
              onClick={() => addExceptionModal.show(record)}
            >
              添加异常明细
            </Button>
          </AuthJudge>
        );
      },
    },
  ]);
  const expandedRowRender = (record: any) => {
    const columns1 = defaultColumns([
      {
        title: '证明图片',
        dataIndex: 'images',
        key: 'images',
        align: 'left',
        render: (text: string) => {
          return text
            .split(',')
            .map((item, index) => <ImagePreview key={index} url={item} />);
        },
      },
      {
        title: '异常描述',
        dataIndex: 'exceptionCause',
        key: 'exceptionCause',
        align: 'left',
        width: 250,
      },
      {
        title: '数量',
        dataIndex: 'quantity',
        key: 'quantity',
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
        title: '操作',
        dataIndex: 'id',
        key: 'id',
        width: 120,
        align: 'left',
        render: (text: number, re: any) => {
          return (
            <Space direction="horizontal">
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  updateExceptionModal.show({ data: re, record });
                }}
              >
                编辑
              </Button>
              <Button
                type="primary"
                size="small"
                onClick={() => deleteRecord(re.id)}
              >
                删除
              </Button>
            </Space>
          );
        },
      },
    ]);
    return (
      <Table
        // @ts-ignore
        columns={columns1}
        rowKey={r => r.id}
        dataSource={record.receiptRecordList}
        pagination={false}
      />
    );
  };
  return (
    <SearchTable
      searchFormRender={<SearchForm />}
      operateBtnRender={
        <Space>
          <Button type="primary" onClick={submit} loading={submitLoading}>
            提交
          </Button>
          <Button
            type="primary"
            danger
            onClick={giveUp}
            loading={giveUpLoading}
          >
            放弃
          </Button>
        </Space>
      }
    >
      <Table
        // @ts-ignore
        columns={columns}
        bordered
        rowKey={record => record.id}
        scroll={{ x: 2500 }}
        dataSource={dataSource}
        rowSelection={{
          fixed: true,
          onChange: onSelectionChange,
          selectedRowKeys: selected.keys,
        }}
        expandable={{ expandedRowRender }}
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
      <AddExceptionConfirm modal={addExceptionModal} />
      <UpdateExceptionConfirm modal={updateExceptionModal} />
    </SearchTable>
  );
});
