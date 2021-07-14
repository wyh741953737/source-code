import React from 'react';
import { connect } from 'dva';
import { Table, Button } from 'antd';
import SearchForm from './searchForm';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import { defaultColumns, dateTimeFormat } from '@/utils';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import ImagePreview from '@/components/ImagePreview';
import AddModal from '../components/addModal';
import propertyTraversal from '@/utils/propertyUtils';

/**
 * 异常记录
 */
export default connect(({ overSku }: any) => ({
  searchData: overSku.searchData,
  dataSource: overSku.dataSource,
  current: overSku.current,
  pageSize: overSku.pageSize,
  total: overSku.total,
  loading: overSku.loading,
}))(({ dataSource, loading, current, pageSize, total, dispatch }) => {
  const { onChange, onSelectChange, selected, createMask, modal } = indexHooks(
    dispatch,
  );
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const columns = defaultColumns([
    {
      title: '商品图片',
      dataIndex: 'image',
      key: 'image',
      width: 90,
      fixed: 'left',
      align: 'left',
      render: (text: any, record: any) => (
        <ImagePreview key={text} url={text} />
      ),
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      fixed: 'left',
      align: 'left',
    },
    {
      title: '短码',
      dataIndex: 'shortCode',
      key: 'shortCode',
      align: 'left',
    },
    {
      title: '属性',
      dataIndex: 'variantKeyMap',
      key: 'variantKeyMap',
      align: 'left',
      render: (text: any) => {
        return <div>{propertyTraversal(text)}</div>;
      },
    },
    {
      title: '货主名称',
      dataIndex: 'customerName',
      key: 'customerName',
      align: 'left',
    },
    {
      title: '仓库',
      dataIndex: 'storehouseId',
      key: 'storehouseId',
      render: (text: string) => option.menu.key(text)?.value || '-',
    },
    {
      title: '库存量',
      dataIndex: 'availableQuantity',
      key: 'availableQuantity',
      align: 'left',
    },
    {
      title: '最近抵扣时间',
      dataIndex: 'lastDeductionAt',
      key: 'lastDeductionAt',
      align: 'left',
      width: 100,
      render: (text: string) => dateTimeFormat(text),
    },
    {
      title: '无抵扣天数',
      dataIndex: 'notDeductionDay',
      key: 'notDeductionDay',
      align: 'left',
      width: 100,
    },
    {
      title: '近一周出库量',
      dataIndex: 'weekOutQuantity',
      key: 'weekOutQuantity',
      align: 'left',
      width: 100,
    },
    {
      title: '近一个月出库量',
      dataIndex: 'monthOutQuantity',
      key: 'monthOutQuantity',
      align: 'left',
      width: 100,
    },
    {
      title: '近三个月出库量',
      dataIndex: 'threeMonthOutQuantity',
      key: 'threeMonthOutQuantity',
      align: 'left',
      width: 100,
    },
    {
      title: '近一周库存周转天数',
      dataIndex: 'weekTurnoverDay',
      key: 'weekTurnoverDay',
      align: 'left',
      width: 100,
    },
    {
      title: '近一个月库存周转天数',
      dataIndex: 'monthTurnoverDay',
      key: 'monthTurnoverDay',
      align: 'left',
      width: 100,
    },
    {
      title: '近三个月库存周转天数',
      dataIndex: 'threeMonthTurnoverDay',
      key: 'threeMonthTurnoverDay',
      align: 'left',
      width: 100,
    },
  ]);
  return (
    <SearchTable
      searchFormRender={<SearchForm />}
      operateBtnRender={
        <Button type="primary" onClick={createMask}>
          生成理货任务
        </Button>
      }
    >
      <Table
        // @ts-ignore
        columns={columns}
        bordered
        rowKey={record => record.variantId}
        scroll={{ x: 1600 }}
        dataSource={dataSource}
        loading={loading}
        rowSelection={{
          fixed: true,
          onChange: onSelectChange,
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
      <AddModal modal={modal} title="生成理货单" okText="确定" />
    </SearchTable>
  );
});
