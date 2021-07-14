import React from 'react';
import { connect } from 'dva';
import ImagePreview from '@/components/ImagePreview';
import { Button, Table } from 'antd';
import SearchForm from './searchForm';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import { dateTimeFormat, defaultColumns } from '@/utils';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import { TRANSFERSTATUS, STORETYPE, SERVICECOMMODITYFLAG } from '@/enum.config';
import { FileTextOutlined } from '@ant-design/icons/lib';
import AddMove from '@/components/AddMoveModal';
import Trans from './trans';
import propertyTraversal from '@/utils/propertyUtils';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';
/**
 * 库存转移
 */
export default BreadcrumbHeader([{ name: '库存管理' }, { name: '库存转移' }])(
  connect(({ storeTransfer }: any) => ({
    searchData: storeTransfer.searchData,
    dataSource: storeTransfer.dataSource,
    current: storeTransfer.current,
    pageSize: storeTransfer.pageSize,
    total: storeTransfer.total,
    loading: storeTransfer.loading,
  }))(({ dataSource, loading, current, pageSize, total, dispatch }) => {
    const {
      onChange,
      rowSelection,
      giveUp,
      transfer,
      abnormal,
      modal,
      confirmModal,
      onRowSelect,
      rowInfo,
      setClassName,
    } = indexHooks(dispatch, dataSource);
    const columns = defaultColumns([
      {
        title: '转移单号',
        dataIndex: 'transferCode',
        key: 'transferCode',
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
        title: '库位',
        dataIndex: 'locationName',
        key: 'locationName',
        render: (text: string, record) => text || record.containerNum,
      },
      {
        title: '转移量',
        dataIndex: 'quantity',
        key: 'quantity',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text: string) => TRANSFERSTATUS.key(text)?.value,
      },
      {
        title: '创建人',
        dataIndex: 'createBy',
        key: 'createBy',
      },
      {
        title: '创建时间',
        dataIndex: 'createAt',
        key: 'createAt',
        render: (text: string) => dateTimeFormat(text),
      },
      {
        title: '转移人',
        dataIndex: 'updateBy',
        key: 'updateBy',
      },
      {
        title: '转移时间',
        dataIndex: 'updateAt',
        key: 'updateAt',
        render: (text: string) => dateTimeFormat(text),
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
      },
    ]);
    const columns1 = defaultColumns([
      {
        title: '转移信息',
        dataIndex: 'key',
        key: 'key',
      },
      {
        title: '货主编号',
        dataIndex: 'customerId',
        key: 'customerId',
      },
      {
        title: '货主名称',
        dataIndex: 'customerName',
        key: 'customerName',
      },
      {
        title: '库存类型',
        dataIndex: 'inventoryType',
        key: 'inventoryType',
        render: (text: string) => STORETYPE.key(text)?.value,
      },
    ]);
    return (
      <SearchTable
        searchFormRender={<SearchForm />}
        operateBtnRender={
          <>
            <AuthJudge code={AUTH.KCZZ001001}>
              <Button type="primary" onClick={() => modal.show()}>
                新增
              </Button>
            </AuthJudge>
            <AuthJudge code={AUTH.KCZZ001002}>
              <Button type="primary" danger onClick={giveUp}>
                放弃
              </Button>
            </AuthJudge>
            <AuthJudge code={AUTH.KCZZ001003}>
              <Button type="primary" onClick={transfer}>
                转移
              </Button>
            </AuthJudge>
            <AuthJudge code={AUTH.KCZZ001004}>
              <Button type="primary" onClick={abnormal}>
                入库异常
              </Button>
            </AuthJudge>
          </>
        }
      >
        <Table
          columns={columns}
          bordered
          rowKey={record => record.id}
          scroll={{ x: 1500 }}
          dataSource={dataSource}
          loading={loading}
          rowSelection={rowSelection}
          rowClassName={setClassName} //表格行点击高亮
          onRow={(record, index) => ({
            onClick: () => onRowSelect(record, index),
          })}
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
        <Table
          columns={columns1}
          rowKey={record => record.key}
          dataSource={rowInfo}
          size="small"
          title={() => (
            <span>
              <FileTextOutlined />
              &nbsp;明细
              <span style={{ color: 'grey', fontSize: 12 }}>
                （点击转移单获取明细）
              </span>
            </span>
          )}
          style={{ marginTop: 10 }}
        />
        <AddMove title="新增转移单" okText="转移" modal={modal} type={2} />
        <Trans modal={confirmModal} />
      </SearchTable>
    );
  }),
);
