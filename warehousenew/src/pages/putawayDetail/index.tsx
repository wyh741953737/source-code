import React from 'react';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import style from './index.less';
import { Descriptions, Table, Badge, Button } from 'antd';
import { PUTAWAYSTATUS } from '@/enum.config';
import ImagePreview from '@/components/ImagePreview';
import { indexHooks } from './hooks';
import Detail from './detail';
import { history } from 'umi';
import { connect } from 'dva';
import { defaultColumns } from '@/utils';
import propertyTraversal from '@/utils/propertyUtils';
/**
 * 入库单详情
 */
export default BreadcrumbHeader([
  { name: '入库' },
  { name: '上架管理', url: '/putawayManage' },
  { name: '上架单详情' },
])(
  connect(({ putawayManage }: any) => ({
    currentItem: putawayManage.currentItem,
  }))(({ currentItem }: any) => {
    const {
      onShelfNum,
      storehouseName,
      updateBy,
      containerNum,
      remarks,
    } = currentItem;
    const {
      pageSize,
      current,
      total,
      dataSource,
      loading,
      search,
      visible,
      closeDetail,
      targetSKU,
      targetId,
      checkDetail,
    } = indexHooks(history.location.query);
    const columns = defaultColumns([
      {
        title: '批次号',
        dataIndex: 'batchNumber',
        key: 'batchNumber',
        align: 'left',
      },
      {
        title: 'SKU',
        dataIndex: 'variantSku',
        key: 'variantSku',
        align: 'left',
        render: (text: any, record: any) => {
          return (
            <div className={style['sku-render']}>
              <ImagePreview key={record.variantImg} url={record.variantImg} />
              <span>{text}</span>
            </div>
          );
        },
      },
      {
        title: 'SKU短码',
        dataIndex: 'variantNum',
        key: 'variantNum',
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
        title: '总数量',
        dataIndex: 'totalQuantity',
        key: 'totalQuantity',
        align: 'left',
      },
      {
        title: '已上架数量',
        dataIndex: 'onShelfQuantity',
        key: 'onShelfQuantity',
        align: 'left',
        render: (text: any, record: any) => {
          return record.status != 1 && record.status != 0 ? (
            <a onClick={() => checkDetail(record.id, record.variantSku)}>
              {text}
            </a>
          ) : (
            <a>{text}</a>
          );
        },
      },
      {
        title: '未上架数量',
        dataIndex: 'noShelfQuantity',
        key: 'noShelfQuantity',
        align: 'left',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        align: 'left',
        render: (text: any, record: any) => {
          const status = PUTAWAYSTATUS.key(text);
          return status ? (
            <div>
              <Badge color={status.color} />
              {status.value}
            </div>
          ) : (
            '-'
          );
        },
      },
    ]);
    return (
      <div className={style['putaway-detail']}>
        <Descriptions title={`上架单-${onShelfNum}`}>
          <Descriptions.Item label={'入库仓库'}>
            {storehouseName}
          </Descriptions.Item>
          <Descriptions.Item label={'上架操作人'}>{updateBy}</Descriptions.Item>
          <Descriptions.Item label={'当前容器'}>
            {containerNum}
          </Descriptions.Item>
          <Descriptions.Item label={'备注'}>
            {remarks ? remarks : '-'}
          </Descriptions.Item>
        </Descriptions>
        <Table
          // @ts-ignore
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={(record: any) => record.id}
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
        <Detail
          visible={visible}
          detailId={targetId}
          sku={targetSKU}
          onCancel={closeDetail}
        />
        <div className={style.back}>
          <Button onClick={() => window.history.back()} type="primary">
            返回
          </Button>
        </div>
      </div>
    );
  }),
);
