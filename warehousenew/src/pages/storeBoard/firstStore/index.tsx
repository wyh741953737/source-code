import React from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
import SearchTable from '@/components/SearchTable';
import SearchForm from './searchForm';
import { indexHooks } from './hooks';
import TableTitle from '../tableTitle';
import { STORETYPE } from '@/enum.config';
import { defaultColumns } from '@/utils';

export default connect(({ firstStore }: any) => ({
  searchData: firstStore.searchData,
  dataSource: firstStore.dataSource,
  current: firstStore.current,
  pageSize: firstStore.pageSize,
  total: firstStore.total,
  loading: firstStore.loading,
}))(({ dataSource, loading, current, pageSize, total, dispatch }) => {
  const { onChange } = indexHooks(dispatch);
  const titleData: {
    allSkuQuantity?: number;
    oneSkuQuantity?: number;
    twoSkuQuantity?: number;
    threeSkuQuantity?: number;
  } = dataSource[0] || {};
  const columns = defaultColumns([
    { title: '仓库ID', dataIndex: 'storehouseId', key: 'storehouseId' },
    { title: '仓库名称', dataIndex: 'storageName', key: 'storageName' },
    {
      title: '库存类型',
      dataIndex: 'type',
      key: 'type',
      render: (text: number) => STORETYPE.key(text)?.value,
    },
    { title: '实物库存', dataIndex: 'realityQuantity', key: 'realityQuantity' },
    {
      title: '可用库存',
      dataIndex: 'availableQuantity',
      key: 'availableQuantity',
    },
    { title: '占用库存', dataIndex: 'useQuantity', key: 'useQuantity' },
    { title: '冻结库存', dataIndex: 'frozenQuantity', key: 'frozenQuantity' },
  ]);
  return (
    <SearchTable searchFormRender={<SearchForm />}>
      <Table
        // @ts-ignore
        columns={columns}
        bordered
        rowKey={record =>
          `${record.id}${record.storehouseId}${record.type}${record.realityQuantity}`
        }
        dataSource={dataSource}
        loading={loading}
        title={() => (
          <TableTitle
            data={[
              { name: '总SKU库存', value: titleData.allSkuQuantity },
              { name: '正品库存', value: titleData.oneSkuQuantity },
              { name: '残品库存', value: titleData.twoSkuQuantity },
              { name: '异常品库存', value: titleData.threeSkuQuantity },
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
