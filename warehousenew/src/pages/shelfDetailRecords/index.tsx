import React from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
import SearchForm from './searchForm';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import { dateTimeFormat, defaultColumns } from '@/utils';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import { SERVICECOMMODITYFLAG } from '@/enum.config';
import propertyTraversal from '@/utils/propertyUtils';
import ImagePreview from '@/components/ImagePreview';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';

export default BreadcrumbHeader([{ name: '出库' }, { name: '分拣管理' }])(
  connect(({ shelfDetailRecords }: any) => ({
    searchData: shelfDetailRecords.searchData,
    dataSource: shelfDetailRecords.dataSource,
    current: shelfDetailRecords.current,
    pageSize: shelfDetailRecords.pageSize,
    total: shelfDetailRecords.total,
    loading: shelfDetailRecords.loading,
  }))(({ dataSource, loading, current, pageSize, total, dispatch }) => {
    const [option] = useOptions(warehouseApply, { interval: Infinity });
    const { onChange } = indexHooks(dispatch);
    const columns = defaultColumns([
      {
        title: '图片',
        dataIndex: 'variantImg',
        key: 'variantImg',
        align: 'left',
        width: 100,
        fixed: 'left',
        render: (text: string) => <ImagePreview key={text} url={text} />,
      },
      {
        title: 'SKU',
        dataIndex: 'variantSku',
        key: 'variantSku',
        align: 'left',
        fixed: 'left',
      },
      {
        title: '短码',
        dataIndex: 'variantNum',
        key: 'variantNum',
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
        title: '批次号',
        dataIndex: 'batchNumber',
        key: 'batchNumber',
        align: 'left',
      },
      {
        title: '仓库',
        dataIndex: 'storehouseId',
        key: 'storehouseId',
        align: 'left',
        render: (text: string) => {
          const current = option.options.filter(item => item.key === text);
          return current && current.length > 0 ? current[0].value : '-';
        },
      },
      {
        title: '上架位置',
        dataIndex: 'locationName',
        key: 'locationName',
        align: 'left',
      },
      {
        title: '入库数量',
        dataIndex: 'quantity',
        key: 'quantity',
        align: 'left',
      },
      {
        title: '货主名称',
        dataIndex: 'customerName',
        key: 'customerName',
        align: 'left',
      },
      {
        title: '服务商品',
        dataIndex: 'isServiceGoods',
        key: 'isServiceGoods',
        align: 'left',
        render: (text: number) => SERVICECOMMODITYFLAG.key(text)?.value || '-',
      },
      {
        title: '上架单号',
        dataIndex: 'onShelfNum',
        key: 'onShelfNum',
        align: 'left',
      },
      {
        title: '上架人',
        dataIndex: 'createBy',
        key: 'createBy',
        align: 'left',
      },
      {
        title: '上架车',
        dataIndex: 'containerNum',
        key: 'containerNum',
        align: 'left',
      },
      {
        title: '上架时间',
        dataIndex: 'createAt',
        key: 'createAt',
        align: 'left',
        render: (text: string) => dateTimeFormat(text),
      },
      {
        title: '剩余可用库存',
        dataIndex: 'remainQuantity',
        key: 'remainQuantity',
        align: 'left',
      },
    ]);
    return (
      <SearchTable searchFormRender={<SearchForm />}>
        <Table
          // @ts-ignore
          columns={columns}
          bordered
          rowKey={record => record.id}
          scroll={{ x: 1400 }}
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
      </SearchTable>
    );
  }),
);
