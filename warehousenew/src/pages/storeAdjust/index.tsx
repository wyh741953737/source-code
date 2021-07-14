import React from 'react';
import { connect } from 'dva';
import ImagePreview from '@/components/ImagePreview';
import { Button, Table } from 'antd';
import SearchForm from './searchForm';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import { dateTimeFormat, defaultColumns } from '@/utils';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import SimpleModal from '@/components/SimpleModalForm';
import { ADJUSTSTATUS, ADJUSTTYPE } from '@/enum.config';
import AddMove from '@/components/AddMoveModal';
import Adjust from './adjust';
import propertyTraversal from '@/utils/propertyUtils';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';
/**
 * 库存调整
 */
export default BreadcrumbHeader([{ name: '库存管理' }, { name: '库存调整' }])(
  connect(({ storeAdjust }: any) => ({
    searchData: storeAdjust.searchData,
    dataSource: storeAdjust.dataSource,
    current: storeAdjust.current,
    pageSize: storeAdjust.pageSize,
    total: storeAdjust.total,
    loading: storeAdjust.loading,
  }))(({ dataSource, loading, current, pageSize, total, dispatch }) => {
    const {
      onChange,
      rowSelection,
      giveUp,
      adjust,
      modal,
      confirmModal,
      simpleForm,
    } = indexHooks(dispatch, dataSource);
    const columns = defaultColumns([
      {
        title: '调整单号',
        dataIndex: 'alterCode',
        key: 'alterCode',
        fixed: 'left',
        width: 150,
      },
      {
        title: '仓库',
        dataIndex: 'storehouseName',
        key: 'storehouseName',
        fixed: 'left',
        width: 120,
      },
      {
        title: '商品图片',
        dataIndex: 'image',
        key: 'image',
        fixed: 'left',
        width: 100,
        render: (text: string) => <ImagePreview key={text} url={text} />,
      },
      {
        title: 'SKU',
        dataIndex: 'variantSku',
        key: 'variantSku',
        width: 120,
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
        title: '货主名称',
        dataIndex: 'customerName',
        key: 'customerName',
        width: 120,
      },
      {
        title: '库位',
        dataIndex: 'locationName',
        key: 'locationName',
        width: 120,
        render: (text: string, record) => text || record.containerNum,
      },
      {
        title: '调整类型',
        dataIndex: 'type',
        key: 'type',
        width: 100,
        render: (text: string) => ADJUSTTYPE.key(text)?.value,
      },
      {
        title: '调整原因',
        dataIndex: 'remark',
        key: 'remark',
        width: 300,
      },
      {
        title: '原可用量',
        dataIndex: 'quantity',
        key: 'quantity',
        width: 100,
      },
      {
        title: '目标数量',
        dataIndex: 'alterQuantity',
        key: 'alterQuantity',
        width: 100,
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        render: (text: string) => ADJUSTSTATUS.key(text)?.value,
      },
      {
        title: '创建人',
        dataIndex: 'createBy',
        key: 'createBy',
        width: 100,
      },
      {
        title: '创建时间',
        dataIndex: 'createAt',
        key: 'createAt',
        width: 150,
        render: (text: string) => dateTimeFormat(text),
      },
      {
        title: '调整人',
        dataIndex: 'updateBy',
        key: 'updateBy',
        width: 120,
      },
      {
        title: '调整时间',
        dataIndex: 'updateAt',
        key: 'updateAt',
        width: 150,
        render: (text: string) => dateTimeFormat(text),
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align: 'left',
        fixed: 'right',
        width: 100,
        render: (text: any, record: any) => {
          return (
            <Button
              size="small"
              type="primary"
              onClick={() => simpleForm.show(record)}
            >
              条码打印
            </Button>
          );
        },
      },
    ]);
    return (
      <SearchTable
        searchFormRender={<SearchForm />}
        operateBtnRender={
          <>
            <AuthJudge code={AUTH.KCTZ001001}>
              <Button type="primary" onClick={() => modal.show()}>
                新增
              </Button>
            </AuthJudge>
            <AuthJudge code={AUTH.KCTZ001002}>
              <Button type="primary" onClick={adjust}>
                调整
              </Button>
            </AuthJudge>
            <AuthJudge code={AUTH.KCTZ001003}>
              <Button type="primary" danger onClick={giveUp}>
                放弃
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
          scroll={{ x: 2200 }}
          dataSource={dataSource}
          rowSelection={rowSelection}
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
        <AddMove type={3} modal={modal} title="新增调整单" okText="调整" />
        <Adjust modal={confirmModal} />
        <SimpleModal simple={simpleForm} />
      </SearchTable>
    );
  }),
);
