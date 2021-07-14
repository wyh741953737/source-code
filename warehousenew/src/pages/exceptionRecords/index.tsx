import React from 'react';
import style from './index.less';
import { connect } from 'dva';
import ImagePreview from '@/components/ImagePreview';
import { Table, Space, Button } from 'antd';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import SearchForm from './searchForm';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import FindConfirm from './findConfirm';
import LostConfirm from './lostConfirm';
import { EXCEPTIIONDEALSTATUS, EXCEPTIONSTATUS } from '@/enum.config';
import { dateTimeFormat, defaultColumns } from '@/utils';
import propertyTraversal from '@/utils/propertyUtils';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';
/**
 * 异常记录
 */
export default BreadcrumbHeader([{ name: '入库' }, { name: '异常记录' }])(
  connect(({ exceptionRecords }: any) => ({
    searchData: exceptionRecords.searchData,
    dataSource: exceptionRecords.dataSource,
    current: exceptionRecords.current,
    pageSize: exceptionRecords.pageSize,
    total: exceptionRecords.total,
    loading: exceptionRecords.loading,
  }))(({ dataSource, loading, current, pageSize, total, dispatch }) => {
    const { onChange, find, lost } = indexHooks(dispatch);

    const columns = defaultColumns([
      {
        title: '商品图片',
        dataIndex: 'image',
        key: 'image',
        fixed: 'left',
        width: 90,
        render: (text: any, record: any) => (
          <ImagePreview key={text} url={text} />
        ),
      },
      {
        title: '少件SKU',
        dataIndex: 'sku',
        key: 'sku',
        fixed: 'left',
        width: 150,
      },
      {
        title: '运单号',
        dataIndex: 'logisticsTrackingNumber',
        key: 'logisticsTrackingNumber',
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
        title: '少件数量',
        dataIndex: 'quantity',
        key: 'quantity',
      },
      {
        title: '入库单号',
        dataIndex: 'putStorageNumber',
        key: 'putStorageNumber',
      },
      {
        title: '采购单号',
        dataIndex: 'orderNumber',
        key: 'orderNumber',
      },
      {
        title: '仓库',
        dataIndex: 'storageName',
        key: 'storageName',
      },
      {
        title: '异常类型',
        dataIndex: 'exceptionType',
        key: 'exceptionType',
        render: (text: any) => EXCEPTIONSTATUS.key(text)?.value,
      },
      {
        title: '异常单据',
        dataIndex: 'documentNumber',
        key: 'documentNumber',
      },
      {
        title: '容器位置',
        dataIndex: 'containerNum',
        key: 'containerNum',
      },
      {
        title: '异常提交人',
        dataIndex: 'submitterBy',
        key: 'submitterBy',
      },
      {
        title: '提交时间',
        dataIndex: 'submitterAt',
        key: 'submitterAt',
        render: (text: any) => dateTimeFormat(text),
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text: any) => EXCEPTIIONDEALSTATUS.key(text)?.value || '-',
      },
      {
        title: '处理人',
        dataIndex: 'handlerBy',
        key: 'handlerBy',
      },
      {
        title: '处理时间',
        dataIndex: 'handlerAt',
        key: 'handlerAt',
        render: (text: any) => dateTimeFormat(text),
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        width: 200,
      },
      {
        title: '操作',
        dataIndex: 'id',
        key: 'id',
        width: 200,
        fixed: 'right',
        render: (text: any, record: any) => (
          <Space>
            <AuthJudge code={AUTH.YCCL002002}>
              <Button
                type="primary"
                size="small"
                disabled={
                  record.status !== EXCEPTIIONDEALSTATUS.pending.key ||
                  record.exceptionType == 5 ||
                  record.exceptionType == 6
                }
                onClick={() => find.show(record)}
              >
                货已找到
              </Button>
            </AuthJudge>
            <AuthJudge code={AUTH.YCCL002001}>
              <Button
                type="primary"
                size="small"
                disabled={
                  record.type === 5 ||
                  record.status !== EXCEPTIIONDEALSTATUS.pending.key ||
                  record.exceptionType == 5 ||
                  record.exceptionType == 6
                }
                onClick={() => lost.show(record)}
              >
                确认少件
              </Button>
            </AuthJudge>
          </Space>
        ),
      },
    ]);
    return (
      <SearchTable searchFormRender={<SearchForm />}>
        <Table
          // @ts-ignore
          columns={columns}
          bordered
          rowKey={record => record.id}
          scroll={{ x: 2500 }}
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
        <FindConfirm modal={find} />
        <LostConfirm modal={lost} />
      </SearchTable>
    );
  }),
);
