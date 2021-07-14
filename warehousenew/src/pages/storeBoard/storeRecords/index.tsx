import React from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
import SearchTable from '@/components/SearchTable';
import SearchForm from './searchForm';
import { indexHooks } from './hooks';
import TableTitle from '../tableTitle';
import { STORETYPE } from '@/enum.config';
import { dateTimeFormat, defaultColumns } from '@/utils';

export default connect(({ storeRecords }: any) => ({
  searchData: storeRecords.searchData,
  dataSource: storeRecords.dataSource,
  current: storeRecords.current,
  pageSize: storeRecords.pageSize,
  total: storeRecords.total,
  loading: storeRecords.loading,
}))(({ dataSource, loading, current, pageSize, total, dispatch }) => {
  const { onChange } = indexHooks(dispatch);
  const columns = defaultColumns([
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      fixed: 'left',
      width: 120,
    },
    {
      title: '商品名称',
      dataIndex: 'productName',
      key: 'productName',
      fixed: 'left',
      width: 220,
    },
    { title: '仓库名称', dataIndex: 'storageName', key: 'storageName' },
    { title: '货主ID', dataIndex: 'customerId', key: 'customerId' },
    { title: '货主名称', dataIndex: 'customerName', key: 'customerName' },
    {
      title: '库存类型',
      dataIndex: 'type',
      key: 'type',
      render: (text: number) => STORETYPE.key(text)?.value,
    },
    { title: '从容器', dataIndex: 'containerNum', key: 'containerNum' },
    { title: '到容器', dataIndex: 'toContainerNum', key: 'toContainerNum' },
    {
      title: '从实物库存',
      dataIndex: 'realityQuantity',
      key: 'realityQuantity',
    },
    {
      title: '到实物库存',
      dataIndex: 'toRealityQuantity',
      key: 'toRealityQuantity',
    },
    {
      title: '从可用库存',
      dataIndex: 'availableQuantity',
      key: 'availableQuantity',
    },
    {
      title: '到可用库存',
      dataIndex: 'toAvailableQuantity',
      key: 'toAvailableQuantity',
    },
    { title: '从占用库存', dataIndex: 'useQuantity', key: 'useQuantity' },
    { title: '到占用库存', dataIndex: 'toUseQuantity', key: 'toUseQuantity' },
    { title: '从冻结库存', dataIndex: 'frozenQuantity', key: 'frozenQuantity' },
    {
      title: '到冻结库存',
      dataIndex: 'toFrozenQuantity',
      key: 'toFrozenQuantity',
    },
    { title: '来源单据', dataIndex: 'documentNumber', key: 'documentNumber' },
    {
      title: '业务单据',
      dataIndex: 'putStorageNumber',
      key: 'putStorageNumber',
    },
    { title: '操作人', dataIndex: 'updateBy', key: 'updateBy' },
    {
      title: '操作时间',
      dataIndex: 'updateAt',
      key: 'updateAt',
      render: (text: string) => dateTimeFormat(text),
    },
  ]);
  return (
    <SearchTable searchFormRender={<SearchForm />}>
      <Table
        // @ts-ignore
        columns={columns}
        bordered
        rowKey={record => record.id}
        dataSource={dataSource}
        loading={loading}
        scroll={{ x: 2200 }}
        title={() => (
          <TableTitle
            data={[
              { name: '总SKU库存', value: 0 },
              { name: '正品库存', value: 0 },
              { name: '残品库存', value: 0 },
              { name: '异常品库存', value: 0 },
            ]}
          />
        )}
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
    </SearchTable>
  );
});
