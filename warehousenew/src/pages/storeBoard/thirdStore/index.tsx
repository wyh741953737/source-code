import React from 'react';
import { connect } from 'dva';
import { Table, Button } from 'antd';
import SearchTable from '@/components/SearchTable';
import SearchForm from './searchForm';
import { indexHooks } from './hooks';
import TableTitle from '../tableTitle';
import ImagePreview from '@/components/ImagePreview';
import {
  CONTAINERTYPE,
  STORETYPE,
  ISSERVICEGOODS,
  ISSEhanRVICEGOODS,
} from '@/enum.config';
import Detail from './detail';
import { defaultColumns } from '@/utils';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import propertyTraversal from '@/utils/propertyUtils';
import { Link } from 'umi';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';
export default connect(({ thirdStore }: any) => ({
  searchData: thirdStore.searchData,
  dataSource: thirdStore.dataSource,
  current: thirdStore.current,
  pageSize: thirdStore.pageSize,
  total: thirdStore.total,
  loading: thirdStore.loading,
}))(
  ({ searchData, dataSource, loading, current, pageSize, total, dispatch }) => {
    const { onChange, modal, commonExport } = indexHooks(dispatch, searchData);
    const [option] = useOptions(warehouseApply, { interval: Infinity });
    const titleData: {
      allSkuQuantity?: number;
      oneSkuQuantity?: number;
      twoSkuQuantity?: number;
      threeSkuQuantity?: number;
    } = dataSource[0] || {};
    const columns = defaultColumns([
      {
        title: '商品图片',
        dataIndex: 'image',
        key: 'image',
        width: 100,
        fixed: 'left',
        render: (text: string) => <ImagePreview key={text} url={text} />,
      },
      {
        title: 'SKU',
        dataIndex: 'sku',
        key: 'sku',
        fixed: 'left',
        width: 120,
        render: (text: string, record: any) => {
          return (
            <Link
              style={{ color: '#000000d9' }}
              to={`/productDetail/${record.productId}`}
              target="_blank"
            >
              {text}
            </Link>
          );
        },
      },
      {
        title: '商品SKU',
        dataIndex: 'productSku',
        key: 'productSku',
        fixed: 'left',
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
      { title: '短码', dataIndex: 'shortCode', key: 'shortCode' },
      {
        title: '商品名称',
        dataIndex: 'productName',
        key: 'productName',
        width: 200,
      },
      {
        title: '商品属性',
        dataIndex: 'property',
        key: 'property',
        render: (text: any, record: any) => {
          return text ? JSON.parse(text).join(',') : '-';
        },
      },
      {
        title: '商品状态',
        dataIndex: 'saleStatus',
        key: 'saleStatus',
        render: (text: string) => (text == '3' ? '上架' : '下架'),
      },
      {
        title: '仓库名称',
        dataIndex: 'storehouseId',
        key: 'storehouseId',
        render: (text: string) => {
          const current = option.options.filter(item => item.key === text);
          return current && current.length > 0 ? current[0].value : '-';
        },
      },
      { title: '货主编号', dataIndex: 'cjNumber', key: 'cjNumber' },
      { title: '货主名称', dataIndex: 'customerName', key: 'customerName' },
      {
        title: '服务商品',
        dataIndex: 'isServiceGoods',
        key: 'isServiceGoods',
        render: (text: number) => ISSEhanRVICEGOODS.key(text)?.value || '-',
      },
      { title: '库区', dataIndex: 'areaName', key: 'areaName' },
      {
        title: '容器类型',
        dataIndex: 'containerType',
        key: 'containerType',
        render: (text: number) => CONTAINERTYPE.key(text)?.value || '库位',
      },
      {
        title: '容器名称',
        dataIndex: 'containerNum',
        key: 'containerNum',
        render: (text: string, record: any) => {
          return record.locationName || text;
        },
      },
      {
        title: '库存类型',
        dataIndex: 'type',
        key: 'type',
        render: (text: number) => STORETYPE.key(text)?.value,
      },
      {
        title: '实物库存',
        dataIndex: 'realityQuantity',
        key: 'realityQuantity',
      },
      {
        title: '可用库存',
        dataIndex: 'availableQuantity',
        key: 'availableQuantity',
      },
      { title: '占用库存', dataIndex: 'useQuantity', key: 'useQuantity' },
      { title: '冻结库存', dataIndex: 'frozenQuantity', key: 'frozenQuantity' },
      {
        title: '操作',
        dataIndex: 'id',
        key: 'id',
        fixed: 'right',
        width: 120,
        render: (text: string) => (
          <AuthJudge code={AUTH.KCKB004001}>
            <Button
              type="primary"
              size="small"
              onClick={() => modal.show({ id: text })}
            >
              查看详情
            </Button>
          </AuthJudge>
        ),
      },
    ]);
    return (
      <SearchTable
        searchFormRender={<SearchForm />}
        operateBtnRender={
          <Button
            type="primary"
            onClick={commonExport.onClick}
            loading={commonExport.loading}
          >
            导出
          </Button>
        }
      >
        <Table
          // @ts-ignore
          columns={columns}
          bordered
          rowKey={record => record.id}
          dataSource={dataSource}
          loading={loading}
          scroll={{ x: 1800 }}
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
        <Detail modal={modal} />
      </SearchTable>
    );
  },
);
