import React from 'react';
import { connect } from 'dva';
import { Table, Space, Button, Tag } from 'antd';
import SearchForm from './searchForm';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import LostConfirm from './lostConfirm';
import { EXCEPTIIONDEALSTATUS, EXCEPTIIONDEALSTATUSORDER } from '@/enum.config';
import { dateTimeFormat, defaultColumns } from '@/utils';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';
import ImagePreview from '@/components/ImagePreview';
import LogModal from './components/Log';
/**
 * 异常记录
 */
export default connect(({ abnormalOfLost }: any) => ({
  searchData: abnormalOfLost.searchData,
  dataSource: abnormalOfLost.dataSource,
  current: abnormalOfLost.current,
  pageSize: abnormalOfLost.pageSize,
  total: abnormalOfLost.total,
  loading: abnormalOfLost.loading,
}))(
  ({ searchData, dataSource, loading, current, pageSize, total, dispatch }) => {
    const { onChange, find, lost, showLog, logModal } = indexHooks(
      dispatch,
      searchData,
    );
    const columns = defaultColumns([
      {
        title: '客户订单号',
        dataIndex: 'clientOrderId',
        key: 'clientOrderId',
        align: 'left',
        fixed: 'left',
        width: 150,
      },
      {
        title: '仓库',
        dataIndex: 'storehouseName',
        key: 'storehouseName',
        width: 150,
      },
      {
        title: '物流运单号',
        dataIndex: 'logisticsTrackingNumber',
        key: 'logisticsTrackingNumber',
      },
      {
        title: 'CJ订单号',
        dataIndex: 'orderId',
        key: 'orderId',
        render: (text: string, record: any) => (
          <div style={{ textAlign: 'center' }}>
            <p>{text}</p>
            {record.isFirstOrder == '1' && <Tag color="#f50">首</Tag>}
          </div>
        ),
      },
      {
        title: '缺货时间',
        dataIndex: 'createAt',
        key: 'createAt',
        align: 'left',
        render: (text: string) => dateTimeFormat(text),
      },
      {
        title: '缺货数量',
        dataIndex: 'totalStockoutCount',
        key: 'totalStockoutCount',
      },
      {
        title: '提交缺货人',
        dataIndex: 'createBy',
        key: 'createBy',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text: number) =>
          EXCEPTIIONDEALSTATUSORDER.key(Number(text))?.value || '-',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        fixed: 'right',
        width: 120,
        render: (text: any, record: any) => (
          <Button onClick={() => showLog(record.orderId)}>查看日志</Button>
        ),
      },
    ]);

    const expandedRowRender = (record: any) => {
      const { storehouseId, status } = record;
      const columns1 = defaultColumns([
        {
          title: '商品图片',
          dataIndex: 'imgUrl',
          key: 'imgUrl',
          align: 'left',
          render: (text: string) => <ImagePreview key={text} url={text} />,
        },
        {
          title: '缺货SKU',
          dataIndex: 'sku',
          key: 'sku',
          align: 'left',
        },
        {
          title: 'SKU短码',
          dataIndex: 'variantNum',
          key: 'variantNum',
          align: 'left',
        },
        {
          title: '缺货数量',
          dataIndex: 'quantity',
          key: 'quantity',
          align: 'left',
        },
        {
          title: '拣货库位',
          dataIndex: 'pickingLocation',
          key: 'pickingLocation',
          align: 'left',
        },
        {
          title: '处理状态',
          dataIndex: 'status',
          key: 'status',
          align: 'left',
          render: (text: number) =>
            EXCEPTIIONDEALSTATUS.key(Number(text))?.value || '-',
        },
        {
          title: '处理人',
          dataIndex: 'operatorName',
          key: 'operatorName',
          align: 'left',
        },
        {
          title: '处理时间',
          dataIndex: 'operatorTime',
          key: 'operatorTime',
          align: 'left',
          render: (text: string) => dateTimeFormat(text),
        },
        {
          title: '备注',
          dataIndex: 'remarks',
          key: 'remarks',
          align: 'left',
        },
        {
          title: '操作',
          dataIndex: 'id',
          key: 'id',
          width: 200,
          fixed: 'right',
          render: (text: any, record: any) => (
            <Space>
              <AuthJudge code={AUTH.YSBZ006001}>
                <Button
                  type="primary"
                  size="small"
                  disabled={
                    record.status !== EXCEPTIIONDEALSTATUS.pending.key ||
                    status == 3
                  }
                  onClick={() => find({ ...record, storehouseId })}
                >
                  货已找到
                </Button>
              </AuthJudge>

              <AuthJudge code={AUTH.YSBZ006002}>
                <Button
                  type="primary"
                  size="small"
                  disabled={
                    record.status !== EXCEPTIIONDEALSTATUS.pending.key ||
                    status == 3
                  }
                  onClick={() => lost.show({ ...record, storehouseId })}
                >
                  确认缺货
                </Button>
              </AuthJudge>
            </Space>
          ),
        },
      ]);
      return (
        <Table
          // @ts-ignore
          columns={columns1}
          rowKey={r => r.id}
          dataSource={record.productList}
          pagination={false}
          // scroll={{ y: 200 }}
        />
      );
    };
    return (
      <SearchTable searchFormRender={<SearchForm />}>
        <Table
          // @ts-ignore
          columns={columns}
          bordered
          rowKey={record => record.id}
          scroll={{ x: 1500 }}
          dataSource={dataSource}
          loading={loading}
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
        <LostConfirm modal={lost} />
        <LogModal modal={logModal} />
      </SearchTable>
    );
  },
);
