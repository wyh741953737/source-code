import React from 'react';
import { connect } from 'dva';
import { Button, Descriptions, Table } from 'antd';
import SearchForm from './searchForm';
import ImagePreview from '@/components/ImagePreview';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import { dateTimeFormat, defaultColumns } from '@/utils';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import style from './index.less';
import {
  CANNIBALIZEPROPERTY,
  CANNIBALIZERANGE,
  CANNIBALIZETYPE,
  OUTBOUNDORDERSTATUS,
  STORETYPETRANS,
} from '@/enum.config';
import { history } from 'umi';
import { FileTextOutlined } from '@ant-design/icons';
import StaticModal, { logColumns } from '@/components/StaticModal';
import TransferDetails from './components/transferDetails';
import propertyTraversal from '@/utils/propertyUtils';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';
/**
 * 调拨出库单
 */
export default BreadcrumbHeader([
  { name: '出库' },
  { name: '调度任务' },
  { name: '调拨出库单' },
])(
  connect(({ cannibalize }: any) => ({
    searchData: cannibalize.searchData,
    dataSource: cannibalize.dataSource,
    current: cannibalize.current,
    pageSize: cannibalize.pageSize,
    total: cannibalize.total,
    loading: cannibalize.loading,
  }))(({ dataSource, loading, current, pageSize, total, dispatch }) => {
    const { onChange, cancel, logModal, resultModal, checkDetail } = indexHooks(
      dispatch,
    );
    const columns = defaultColumns([
      {
        title: '调拨单号',
        dataIndex: 'transferCode',
        key: 'transferCode',
        fixed: 'left',
        width: 170,
        render: (text: number) => (
          <span>
            {text}
            <FileTextOutlined onClick={() => logModal.show({ id: text })} />
          </span>
        ),
      },
      {
        title: '出库单号',
        dataIndex: 'outboundOrder',
        key: 'outboundOrder',
      },
      {
        title: '入库单号',
        dataIndex: 'putStorageNumber',
        key: 'putStorageNumber',
      },
      {
        title: '调拨属性',
        dataIndex: 'packProperty',
        key: 'packProperty',
        render: (text: string) => CANNIBALIZEPROPERTY.key(text)?.value || '-',
      },
      {
        title: '调拨类型',
        dataIndex: 'transferType',
        key: 'transferType',
        render: (text: string) => CANNIBALIZETYPE.key(text)?.value || '-',
      },
      {
        title: '调拨范围',
        dataIndex: 'transferRange',
        key: 'transferRange',
        render: (text: string) => CANNIBALIZERANGE.key(text)?.value || '-',
      },
      {
        title: '转出仓',
        dataIndex: 'sourceStorehouseName',
        key: 'sourceStorehouseName',
      },
      {
        title: '到达仓',
        dataIndex: 'targetStorehouseName',
        key: 'targetStorehouseName',
      },
      {
        title: '创建时间',
        dataIndex: 'createAt',
        key: 'createAt',
        render: (text: string) => dateTimeFormat(text),
      },
      {
        title: '创建人',
        dataIndex: 'createBy',
        key: 'createBy',
      },
      {
        title: '需调拨数量',
        dataIndex: 'totalTransferQuantity',
        key: 'totalTransferQuantity',
      },
      {
        title: '包裹数量',
        dataIndex: 'packCount',
        key: 'packCount',
        render: (text: number, record: any) => {
          return text ? (
            <a
              onClick={() => {
                checkDetail(record);
              }}
            >
              {text}
            </a>
          ) : (
            text
          );
        },
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
      },
      {
        title: '状态',
        dataIndex: 'outboundStatus',
        key: 'outboundStatus',
        render: (text: string) => OUTBOUNDORDERSTATUS.key(text)?.value,
      },
      {
        title: '操作',
        dataIndex: 'id',
        key: 'id',
        fixed: 'right',
        align: 'center',
        width: 90,
        render: (text: string) => (
          <AuthJudge code={AUTH.DDRW002002}>
            <Button type="link" onClick={() => cancel(text)}>
              取消
            </Button>
          </AuthJudge>
        ),
      },
    ]);
    return (
      <SearchTable
        searchFormRender={<SearchForm />}
        operateBtnRender={
          <AuthJudge code={AUTH.DDRW002001}>
            <Button
              type="primary"
              onClick={() => history.push('/cannibalize/add')}
            >
              新增调拨单
            </Button>
          </AuthJudge>
        }
      >
        <Table
          columns={columns}
          bordered
          rowKey={record => record.id}
          scroll={{ x: 1800 }}
          dataSource={dataSource}
          loading={loading}
          expandedRowRender={expandedRowRender}
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
        <StaticModal
          title={'操作日志'}
          width={600}
          modal={logModal}
          columnsFactory={logColumns}
        />

        <TransferDetails modal={resultModal} />
      </SearchTable>
    );
  }),
);
const expandedRowRender = (record: any) => {
  return record.transferDetailsDTOList.map((t: any, index: number) => (
    <Descriptions
      key={index}
      column={6}
      size="small"
      className={style.descriptions}
    >
      <Descriptions.Item label="" style={{ width: 80 }}>
        <ImagePreview key={t.variantImg} url={t.variantImg} />
      </Descriptions.Item>
      <Descriptions.Item label="商品SKU">
        {t.variantSku || '-'}
      </Descriptions.Item>
      <Descriptions.Item label="属性">
        {/* {t.productProperty || '-'} */}
        {propertyTraversal(t.variantKeyMap)}
      </Descriptions.Item>
      <Descriptions.Item label="库存类型">
        {STORETYPETRANS.key(t.stockType)?.value || '-'}
      </Descriptions.Item>
      <Descriptions.Item label="重量">
        {isNaN(t.packWeight * t.transferQuantity)
          ? '-'
          : t.packWeight * t.transferQuantity}
        g
      </Descriptions.Item>
      <Descriptions.Item label="需调拨数量">
        {t.transferQuantity || '-'}
      </Descriptions.Item>
    </Descriptions>
  ));
};
