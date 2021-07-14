import React from 'react';
import style from './index.less';
import { Tabs, Table, Button, message, Modal } from 'antd';
import ImagePreview from '@/components/ImagePreview';
import { recordInfoHooks } from './hooks';
import { RECEIPTES, OPERATION } from '@/enum.config';
import { dateTimeFormat, defaultColumns } from '@/utils';

const { confirm } = Modal;

export default ({ target }: { target: object | undefined }) => {
  const {
    dataSource1,
    dataSource2,
    rowSelection,
    deleteBusiness,
  } = recordInfoHooks(target);

  return (
    <Tabs defaultActiveKey="1" animated>
      <Tabs.TabPane key="1" tab="关联商品">
        <Button
          danger
          style={{ marginBottom: '12px' }}
          onClick={deleteBusiness}
        >
          删除商品
        </Button>
        <Table
          // @ts-ignore
          columns={columns1}
          rowKey={(record: any) => record.id}
          dataSource={dataSource1}
          rowSelection={rowSelection}
        />
      </Tabs.TabPane>
      <Tabs.TabPane key="2" tab="容器日志">
        <Table
          // @ts-ignore
          columns={columns2}
          rowKey={(record: any) => record.id}
          dataSource={dataSource2}
        />
      </Tabs.TabPane>
    </Tabs>
  );
};

const columns1 = defaultColumns([
  {
    title: '图片',
    dataIndex: 'image',
    key: 'image',
    align: 'left',
    render: (text: any) => {
      return <ImagePreview key={text} url={text} />;
    },
  },
  {
    title: '商品名称',
    dataIndex: 'variantName',
    key: 'variantName',
    align: 'left',
  },
  {
    title: 'SKU',
    dataIndex: 'sku',
    key: 'sku',
    align: 'left',
  },
  {
    title: '短SKU',
    dataIndex: 'shortCode',
    key: 'shortCode',
    align: 'left',
  },
  {
    title: '数量',
    dataIndex: 'quantity',
    key: 'quantity',
    align: 'left',
  },
  {
    title: '正品数量',
    dataIndex: 'realQuantity',
    key: 'realQuantity',
    align: 'left',
  },
  {
    title: '残品数量',
    dataIndex: 'defectiveQuantity',
    key: 'defectiveQuantity',
    align: 'left',
  },
  {
    title: '货主',
    dataIndex: 'ownerGoods',
    key: 'ownerGoods',
    align: 'left',
  },
  {
    title: '批次号',
    dataIndex: 'batchId',
    key: 'batchId',
    align: 'left',
  },
]);
const columns2 = defaultColumns([
  {
    title: '操作员',
    dataIndex: 'createBy',
    key: 'createBy',
    align: 'left',
  },
  {
    title: '操作信息',
    dataIndex: 'operationInfo',
    key: 'operationInfo',
    align: 'left',
    render: (text: any) => OPERATION.key(text)?.value || '-',
  },
  {
    title: '操作环节',
    dataIndex: 'status',
    key: 'status',
    align: 'left',
    render: (text: any) => RECEIPTES.key(text)?.value || '-',
  },
  {
    title: '操作时间',
    dataIndex: 'createAt',
    key: 'createAt',
    align: 'left',
    render: (text: string) => dateTimeFormat(text),
  },
]);
