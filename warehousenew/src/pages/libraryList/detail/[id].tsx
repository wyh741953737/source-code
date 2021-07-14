import React from 'react';
import { connect } from 'dva';
import { Table, Badge, Button, Space, Tabs ,Row } from 'antd';
import Page from '@/components/Page';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import { indexHooks } from './batchdetailHooks';
import { dateTimeFormat, defaultColumns } from '@/utils';
import { history } from 'umi';
/**
 * 上架单查询
 */
export default BreadcrumbHeader([
  { name: '出库' },
  { name: '越库看板', url: '/librarylist' },
  { name: '越库详情' },
])(
  connect(({ libraryList, libraryListDetail }: any) => ({
    currentItem: libraryList.currentItem,
    searchData: libraryListDetail.searchData,
    dataSource: libraryListDetail.dataSource,
    current: Number(libraryListDetail.current),
    pageSize: Number(libraryListDetail.pageSize),
    total: libraryListDetail.total,
    loading: libraryListDetail.loading,
  }))(({ 
    currentItem,
    dataSource,
    loading,
    current,
    pageSize,
    total,
    dispatch, }: any) => {
    const { TabPane } = Tabs;
    
    const params = history.location.pathname.split('detail/')[1];
    const {
        onChange,
        back,
        release
    } = indexHooks(params,dispatch)
    const columns = defaultColumns([
      {
        title: '订单号',
        dataIndex: 'orderId',
        key: 'orderId',
      },
      {
        title: '客户订单号',
        dataIndex: 'clientOrderId',
        key: 'clientOrderId',
        fixed: 'left',
        width: 180,
        align: 'left',
      },
      {
        title: '商品数量',
        dataIndex: 'quantity',
        key: 'quantity',
      },
      {
        title: '验单人',
        dataIndex: 'checkName',
        key: 'checkName',
      },
      {
        title: '验单时间',
        dataIndex: 'endAt',
        key: 'endAt',
        render: (text: string) => dateTimeFormat(text)
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text: any, record: any) => {
          return (
            <Space>
              <Button type="primary" onClick={() => release(record.id)} disabled={record.checkName || record.endAt}>
                释放
              </Button>
            </Space>
          );
        },
      },
    ]);

    return (
      <Page>
         <Tabs defaultActiveKey="1">
          <TabPane tab="越库管理" key="1">
          </TabPane>
        </Tabs>
        <Row>
          <Button type="primary" onClick={back} style={{margin: '10px 0'}}>返回</Button>
        </Row>
        <Table
        columns={columns}
        bordered
        dataSource={dataSource}
        loading={loading}
        rowKey={(record: any) => record.id}
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
      </Page>
    );
  }),
);
