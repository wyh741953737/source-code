import React from 'react';
import { connect } from 'dva';
import { Table, Badge, Button, Space, Descriptions,Row } from 'antd';
import Page from '@/components/Page';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import { indexHooks } from './detailHooks';
import { dateTimeFormat, defaultColumns } from '@/utils';
import { LIBRARYSTATUS } from '@/enum.config';
import { history } from 'umi';

/**
 * 上架单查询
 */
export default BreadcrumbHeader([
  { name: '出库' },
  { name: '越库看板', url: '/librarylist' },
  { name: '越库详情' },
])(
  connect(({ libraryList, libraryListItem, common }: any) => ({
    currentItem: libraryList.currentItem,
    searchData: libraryListItem.searchData,
    dataSource: libraryListItem.dataSource,
    current: Number(libraryListItem.current),
    pageSize: Number(libraryListItem.pageSize),
    total: libraryListItem.total,
    loading: libraryListItem.loading,
    warehouseId: common.warehouseId
  }))(({ currentItem,  searchData,
    dataSource,
    loading,
    current,
    pageSize,
    total,
    warehouseId,
    dispatch, }: any) => {
    const params = history.location.pathname.split('librarylist/')[1];

    const {
        onChange,
        back,
        initData
    } = indexHooks({...currentItem, params, warehouseId },dispatch)
    const columns = defaultColumns([
      {
        title: '客户订单号',
        dataIndex: 'clientOrderId',
        key: 'clientOrderId',
        fixed: 'left',
        width: 180,
        align: 'left',
      },
      {
        title: 'cj订单号',
        dataIndex: 'orderId',
        key: 'orderId',
      },
      {
        title: '母订单号',
        dataIndex: 'shipmentsOrderId',
        key: 'shipmentsOrderId',
      },
      {
        title: '客户名称',
        dataIndex: 'customerName',
        key: 'customerName',
      },
      {
        title: '物流渠道\运单号',
        dataIndex: 'trackingNumber',
        key: 'trackingNumber',
      },
      {
        title: '商品数量',
        dataIndex: 'quantity',
        key: 'quantity',
      },
    ]);
    let data;
    if(initData && Object.keys(initData).length >0) {
      data= initData
    } else {
      data = currentItem
    }

    const {
      id,
      sku,
      orderQuantity,
      status,
      checkName,
      beginAt,
      variantQuantity,
      endAt,
      containerNum,
    } = data;
    return (
      <Page>
        <Button type="primary" style={{margin: '10px 0'}} onClick={back}>返回</Button>
        <Row>
          <Descriptions
            title=""
            size="middle"
            column={3}
            labelStyle={{ width: '100px' }}
          >
            <Descriptions.Item label="越库批次号">
              {id || '-'}
            </Descriptions.Item>
            <Descriptions.Item label="越库sku">
              {sku || '-'}
            </Descriptions.Item>
            <Descriptions.Item label="订单数量">
              {orderQuantity || '-'}
            </Descriptions.Item>
            <Descriptions.Item label="验单状态">
              {LIBRARYSTATUS.key(status)?.value || '-'}
            </Descriptions.Item>
            <Descriptions.Item label="验单人">
              {checkName || '-'}
            </Descriptions.Item>
            <Descriptions.Item label="验单开始时间">
              {dateTimeFormat(beginAt) || '-'}
            </Descriptions.Item>
            <Descriptions.Item label="商品数量">
              {variantQuantity || '-'}
            </Descriptions.Item>
            <Descriptions.Item label="验单结束时间">
              {dateTimeFormat(endAt) || '-'}
            </Descriptions.Item>
            <Descriptions.Item label="位置数量">
              {containerNum || '-'}
            </Descriptions.Item>
          </Descriptions>
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
