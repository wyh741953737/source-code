import React from 'react';
import { connect } from 'dva';
import { history } from 'umi';
import { Table, Badge, Button, Space } from 'antd';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import SearchForm from './searchForm';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import { OUTBOUNDPRINTSTATUS } from '@/enum.config';
import { dateTimeFormat, defaultColumns } from '@/utils';
import EditMoal from './components/editModal';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';
/**
 * 上架单查询
 */
export default BreadcrumbHeader([
  { name: '出库' },
  { name: '称重出库' },
  { name: '揽收记录' },
])(
  connect(({ outboundRecord }: any) => ({
    searchData: outboundRecord.searchData,
    dataSource: outboundRecord.dataSource,
    current: Number(outboundRecord.current),
    pageSize: Number(outboundRecord.pageSize),
    total: outboundRecord.total,
    loading: outboundRecord.loading,
  }))(
    ({
      searchData,
      dataSource,
      loading,
      current,
      pageSize,
      total,
      dispatch,
    }: any) => {
      const columns = defaultColumns([
        {
          title: '出库编号',
          dataIndex: 'receiveNumber',
          key: 'receiveNumber',
          fixed: 'left',
          width: 180,
          align: 'left',
        },
        {
          title: '仓库',
          dataIndex: 'storageName',
          key: 'storageName',
          align: 'left',
        },
        {
          title: '物流公司',
          dataIndex: 'logisticsCompany',
          key: 'logisticsCompany',
          align: 'left',
        },
        {
          title: '袋数',
          dataIndex: 'bagsQuantity',
          key: 'bagsQuantity',
          align: 'left',
          render: (text: number, record: any) => {
            return text !== 0 ? (
              <a
                onClick={() => {
                  history.push({
                    pathname: '/outboundRecord/listDetail',
                    query: { receiveRecordId: record.id },
                  });
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
          title: '票数',
          dataIndex: 'packangQuantity',
          key: 'packangQuantity',
          align: 'left',
          render: (text: number, record: any) => {
            return text !== 0 ? (
              <a
                onClick={() => {
                  history.push({
                    pathname: '/outboundRecord/bagDetail',
                    query: { receiveRecordId: record.id },
                  });
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
          title: '净重(KG)',
          dataIndex: 'netWeight',
          key: 'netWeight',
          align: 'left',
        },
        {
          title: '毛重(KG)',
          dataIndex: 'grossWeight',
          key: 'grossWeight',
          align: 'left',
        },
        {
          title: '揽收时间',
          dataIndex: 'receiveAt',
          key: 'receiveAt',
          align: 'left',
          render: (text: string) => dateTimeFormat(text),
        },
        {
          title: '打印人',
          dataIndex: 'printBy',
          key: 'printBy',
          align: 'left',
        },
        {
          title: '状态',
          dataIndex: 'printStatus',
          key: 'printStatus',
          align: 'left',
          render: (text: any, record: any) => {
            const status = OUTBOUNDPRINTSTATUS.key(text);
            return status ? (
              <div>
                <span>
                  <Badge color={status.color} />
                  {status.value}
                </span>
              </div>
            ) : (
              '-'
            );
          },
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          width: 80,
          align: 'left',
          fixed: 'right',
          render: (text: number, record: any) => {
            return (
              <Space direction="vertical">
                {record.printStatus === 0 ? (
                  <AuthJudge code={AUTH.CZCD007003}>
                    <Button
                      size="small"
                      type="primary"
                      onClick={() => editPackage(record.id)}
                    >
                      编辑
                    </Button>
                  </AuthJudge>
                ) : null}
                <AuthJudge code={AUTH.CZCD007004}>
                  <Button
                    size="small"
                    type="default"
                    onClick={() => checkNetwork(record)}
                  >
                    查看
                  </Button>
                </AuthJudge>
              </Space>
            );
          },
        },
      ]);
      const {
        onChange,
        selected,
        onSelectChange,
        exportExcel,
        inputWeightModal,
        checkNetwork,
        print,
        editPackage,
      } = indexHooks(dispatch, { ...searchData, current, pageSize });
      return (
        <SearchTable
          searchFormRender={<SearchForm />}
          operateBtnRender={
            <Space>
              <AuthJudge code={AUTH.CZCD007001}>
                <Button type="primary" onClick={print}>
                  打印
                </Button>
              </AuthJudge>
              <AuthJudge code={AUTH.CZCD007002}>
                <Button type="primary" onClick={exportExcel}>
                  导出
                </Button>
              </AuthJudge>
            </Space>
          }
        >
          <Table
            // @ts-ignore
            columns={columns}
            bordered
            dataSource={dataSource}
            loading={loading}
            rowKey={(record: any) => record.id}
            scroll={{ x: 2000 }}
            rowSelection={{
              fixed: true,
              onChange: onSelectChange,
              selectedRowKeys: selected.keys,
            }}
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

          <EditMoal modal={inputWeightModal} />
        </SearchTable>
      );
    },
  ),
);
