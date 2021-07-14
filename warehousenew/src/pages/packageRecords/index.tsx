import React from 'react';
import { connect } from 'dva';
import { Table, Button, Descriptions } from 'antd';
import SearchForm from './searchForm';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import { PACKAGESTATUS } from '@/enum.config';
import { dateTimeFormat, defaultColumns } from '@/utils';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import propertyTraversal from '@/utils/propertyUtils';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';
import ImagePreview from '@/components/ImagePreview';
/**
 * 打包记录
 */
export default BreadcrumbHeader([
  { name: '出库' },
  { name: '验货包装' },
  { name: '打包记录' },
])(
  connect(({ packageRecords }: any) => ({
    searchData: packageRecords.searchData,
    dataSource: packageRecords.dataSource,
    current: packageRecords.current,
    pageSize: packageRecords.pageSize,
    total: packageRecords.total,
    loading: packageRecords.loading,
  }))(
    ({
      searchData,
      dataSource,
      loading,
      current,
      pageSize,
      total,
      dispatch,
    }) => {
      const {
        onChange,
        onSelectChange,
        selected,
        printBtn,
        exportBtn,
        printDetailClick,
      } = indexHooks(dispatch, searchData);
      const columns = defaultColumns([
        {
          title: '包裹编号',
          dataIndex: 'packCode',
          key: 'packCode',
          align: 'left',
          fixed: 'left',
        },
        {
          title: '耗材条码',
          dataIndex: 'consumablesNum',
          key: 'consumablesNum',
          align: 'left',
        },
        {
          title: 'CJ订单号',
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
          title: '线下物流',
          dataIndex: 'offlineLogistics',
          key: 'offlineLogistics',
          align: 'left',
        },
        {
          title: '订单商品数量',
          dataIndex: 'orderQuantity',
          key: 'orderQuantity',
          align: 'left',
        },
        {
          title: '包裹商品数量',
          dataIndex: 'packQuantity',
          key: 'packQuantity',
          align: 'left',
        },
        {
          title: '操作人',
          dataIndex: 'createBy',
          key: 'createBy',
          align: 'left',
        },
        {
          title: '操作时间',
          dataIndex: 'createAt',
          key: 'createAt',
          align: 'left',
          render: (text: string) => dateTimeFormat(text),
        },

        {
          title: '状态',
          dataIndex: 'packStatus',
          key: 'packStatus',
          align: 'left',
          render: (text: any) => PACKAGESTATUS.key(text)?.value || '-',
        },
      ]);
      return (
        <SearchTable
          searchFormRender={<SearchForm />}
          operateBtnRender={
            <>
              <AuthJudge code={AUTH.YSBZ004001}>
                <Button type="primary" onClick={printDetailClick}>
                  打印装箱明细
                </Button>
              </AuthJudge>
              <AuthJudge code={AUTH.YSBZ004002}>
                <Button
                  type="primary"
                  onClick={printBtn.onClick}
                  loading={printBtn.loading}
                >
                  打印面单
                </Button>
              </AuthJudge>
              <AuthJudge code={AUTH.YSBZ004003}>
                <Button
                  type="primary"
                  onClick={exportBtn.onClick}
                  loading={exportBtn.loading}
                >
                  导出
                </Button>
              </AuthJudge>
            </>
          }
        >
          <Table
            // @ts-ignore
            columns={columns}
            bordered
            rowKey={record => record.id}
            scroll={{ x: 1400 }}
            dataSource={dataSource}
            loading={loading}
            rowSelection={{
              fixed: true,
              onChange: onSelectChange,
              selectedRowKeys: selected.keys,
            }}
            expandable={{ expandedRowRender }}
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
    },
  ),
);
const expandedRowRender = (record: any) => {
  return record.storehousePackRecordDTOs.map((s: any) => (
    <Descriptions column={3}>
      <Descriptions.Item label="商品图片">
        <ImagePreview key={s.variantImg} url={s.variantImg} />
      </Descriptions.Item>
      <Descriptions.Item label="商品SKU">{s.variantSku}</Descriptions.Item>
      <Descriptions.Item label="属性">
        {propertyTraversal(s.variantKeyMap)}
      </Descriptions.Item>
      <Descriptions.Item label="商品名称">{s.productName}</Descriptions.Item>
      <Descriptions.Item label="订单商品数量">
        {s.orderQuantity}
      </Descriptions.Item>
      <Descriptions.Item label="包裹商品数量">
        {s.processedQuantity}
      </Descriptions.Item>
    </Descriptions>
  ));
};
