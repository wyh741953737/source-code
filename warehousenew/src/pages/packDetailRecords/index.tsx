import React from 'react';
import { connect } from 'dva';
import { Table, Button, Spin } from 'antd';
import SearchForm from './searchForm';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import { dateTimeFormat, defaultColumns } from '@/utils';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import { SERVICECOMMODITY } from '@/enum.config';
import propertyTraversal from '@/utils/propertyUtils';
import ImagePreview from '@/components/ImagePreview';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';

export default BreadcrumbHeader([{ name: '出库' }, { name: '分拣管理' }])(
  connect(({ packDetailRecords }: any) => ({
    searchData: packDetailRecords.searchData,
    dataSource: packDetailRecords.dataSource,
    current: packDetailRecords.current,
    pageSize: packDetailRecords.pageSize,
    total: packDetailRecords.total,
    loading: packDetailRecords.loading,
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
        dataIndex: 'batchId',
        key: 'batchId',
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
        title: '抵扣库位',
        dataIndex: 'locationName',
        key: 'locationName',
        align: 'left',
        render: (text: string) => {
          return text
            ? JSON.parse(text)
                .map((item: any) => item.locationName)
                .join(',')
            : '-';
        },
      },
      {
        title: '打包数量',
        dataIndex: 'processedQuantity',
        key: 'processedQuantity',
        align: 'left',
      },
      {
        title: '货主名称',
        dataIndex: 'customerInfo',
        key: 'customerInfo',
        align: 'left',
        render: (text: string) => {
          return text
            ? JSON.parse(text)
                .map((item: any) => item.customerName)
                .join(',')
            : '-';
        },
      },
      {
        title: '服务商品',
        dataIndex: 'isServerProduct',
        key: 'isServerProduct',
        align: 'left',
        render: (text: number) => SERVICECOMMODITY.key(text)?.value1 || '-',
      },
      {
        title: '订单号',
        dataIndex: 'orderId',
        key: 'orderId',
        align: 'left',
      },
      {
        title: '运单号',
        dataIndex: 'trackingNumber',
        key: 'trackingNumber',
        align: 'left',
      },
      {
        title: '打包人',
        dataIndex: 'createBy',
        key: 'createBy',
        align: 'left',
      },
      {
        title: '扣减容器',
        dataIndex: 'sortedContainer',
        key: 'sortedContainer',
        align: 'left',
      },
      {
        title: '打包时间',
        dataIndex: 'createAt',
        key: 'createAt',
        align: 'left',
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
