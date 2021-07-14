import React from 'react';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import style from './index.less';
import { Table, Card, Button } from 'antd';
import ImagePreview from '@/components/ImagePreview';
import { indexHooks } from './hooks';
import { history } from 'umi';
import { connect } from 'dva';
import { defaultColumns } from '@/utils';
import Detail from './components/detail';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import propertyTraversal from '@/utils/propertyUtils';
import { OUTBOUNDISDEDUCTION } from '@/enum.config';
export default BreadcrumbHeader([
  { name: '出库' },
  { name: '出库单查询', url: '/outBoundOrder' },
  { name: '出库单详情' },
])(
  connect(({ outBoundOrder }: any) => ({
    currentItem: outBoundOrder.currentItem,
  }))(({ currentItem }: any) => {
    const [option] = useOptions(warehouseApply, { interval: Infinity });
    const {
      pageSize,
      current,
      total,
      dataSource,
      loading,
      backRouter,
      search,
    } = indexHooks(history.location.query);
    const columns = defaultColumns([
      {
        title: '图片',
        dataIndex: 'image',
        key: 'image',
        align: 'left',
        width: 80,
        fixed: 'left',
        render: (text: any, record: any) => (
          <ImagePreview key={text} url={text} size={50} prevSize={300} />
        ),
      },
      {
        title: 'SKU',
        dataIndex: 'sku',
        key: 'sku',
        align: 'left',
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
        title: '商品名称',
        dataIndex: 'productName',
        key: 'productName',
        align: 'left',
      },
      {
        title: '是否到货',
        dataIndex: 'isDeduction',
        key: 'isDeduction',
        align: 'left',
        render: (text: number) => OUTBOUNDISDEDUCTION.key(text)?.value2 || '-',
      },
      {
        title: '属性',
        dataIndex: 'property',
        key: 'property',
        align: 'left',
      },
      {
        title: '重量(g)',
        dataIndex: 'weight',
        key: 'weight',
        align: 'left',
      },
      {
        title: '数量',
        dataIndex: 'quantity',
        key: 'quantity',
        align: 'left',
      },
      {
        title: '原价($)',
        dataIndex: 'originalPrice',
        key: 'originalPrice',
        align: 'left',
      },
      {
        title: '总价($)',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        align: 'left',
      },
      {
        title: '折后价($)',
        dataIndex: 'discountPrice',
        key: 'discountPrice',
        align: 'left',
      },
      {
        title: '折后总价($)',
        dataIndex: 'totalPriceAfterDiscount',
        key: 'totalPriceAfterDiscount',
        align: 'left',
      },
    ]);
    return (
      <>
        <Card title="" className={style['putaway-detail']}>
          <Detail />
        </Card>

        <Card title="商品信息" className={style['putaway-detail']}>
          <Table
            // @ts-ignore
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            rowKey={(record: any) => record.sku}
            scroll={{ x: 1600 }}
            pagination={{
              current: Number(current),
              pageSize: Number(pageSize),
              total,
              pageSizeOptions: ['10', '20', '50', '100'],
              showQuickJumper: true,
              showTotal: total => {
                return <span>共计{total}条数据</span>;
              },
              onChange: (page: any, pageSize: any) => {
                search({ nextPageNumber: page, nextPageSize: pageSize });
              },
            }}
          />
        </Card>

        <div className={style.backBtn}>
          <Button type="primary" onClick={backRouter}>
            返回
          </Button>
        </div>
      </>
    );
  }),
);
