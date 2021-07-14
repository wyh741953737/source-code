import React from 'react';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import { Input, Form, Table, Space, Button, Badge } from 'antd';
import { indexHooks } from './hooks';
import OperateLayout from '@/components/OperateLayout';
import { ORDERTYPE } from '@/enum.config';
import { defaultColumns } from '@/utils';
export default BreadcrumbHeader([{ name: '出库' }, { name: '面单补打' }])(
  () => {
    const {
      form,
      onPressEnterContainer,
      dataSource,
      printSku,
      containerEl,
    } = indexHooks();
    const columns = defaultColumns([
      {
        title: '客户订单号',
        dataIndex: 'clientOrderId',
        key: 'clientOrderId',
        align: 'left',
      },
      {
        title: 'CJ订单号',
        dataIndex: 'orderId',
        key: 'orderId',
        align: 'left',
      },
      {
        title: '母订单号',
        dataIndex: 'shipmentsOrderId',
        key: 'shipmentsOrderId',
        align: 'left',
      },

      {
        title: '订单类型',
        dataIndex: 'type',
        key: 'type',
        align: 'left',
        render: (text: any) => ORDERTYPE.key(text)?.value || '-',
      },
      {
        title: '客户名称',
        dataIndex: 'customerName',
        key: 'customerName',
        align: 'left',
      },
      {
        title: '数量\\金额',
        dataIndex: 'numberPrice',
        key: 'numberPrice',
        render: (text: any, record: any) => {
          return record.quantity + ' \\ $' + record.orderAmount;
        },
      },
      {
        title: '重量\\邮费',
        dataIndex: 'weightPoster',
        key: 'weightPoster',
        render: (text: any, record: any) => {
          return record.packWeight + 'g \\ $' + record.logisticsCost;
        },
      },

      {
        title: '收件人',
        dataIndex: 'consignee',
        key: 'consignee',
        align: 'left',
      },
      {
        title: '地址',
        dataIndex: 'shippingAddress',
        key: 'shippingAddress',
        align: 'left',
      },
      {
        title: '物流渠道\\追踪号',
        dataIndex: 'channelWoBill',
        key: 'channelWoBill',
        render: (text: any, record: any) => {
          return (
            record.logisticsChannel + ': ' + record.logisticsTrackingNumber
          );
        },
      },

      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 100,
        align: 'left',
        fixed: 'right',
        render: (text: string, record: any, index: number) => {
          return (
            <Space direction="vertical">
              <Button
                size="small"
                type="primary"
                onClick={() => printSku(record, index)}
              >
                面单补打
              </Button>
            </Space>
          );
        },
      },
    ]);
    return (
      <OperateLayout
        title=""
        form={form}
        empty={!dataSource || dataSource.length == 0}
        searchItems={[
          <Form.Item
            label=""
            name="logisticsTrackingNumbers"
            rules={[{ required: true, message: '请扫描或输入追踪号/CJ订单号' }]}
          >
            <Input
              placeholder="请扫描或输入追踪号/CJ订单号"
              onPressEnter={onPressEnterContainer}
              ref={containerEl}
            />
          </Form.Item>,
        ]}
      >
        <Table
          // @ts-ignore
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          scroll={{ x: 1600 }}
          rowKey={(record: any) => record.id}
        />
      </OperateLayout>
    );
  },
);
