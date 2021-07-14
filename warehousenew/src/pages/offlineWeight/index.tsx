import React from 'react';
import style from './index.less';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import { Input, Form, Table, Button, Select, InputNumber, message } from 'antd';
import { indexHooks } from './hooks';
import OperateLayout from '@/components/OperateLayout';
import { defaultColumns } from '@/utils';
const { Option } = Select;
export default BreadcrumbHeader([
  { name: '出库' },
  { name: '称重出库' },
  { name: '线下称重' },
])(() => {
  const {
    form,
    onPressEnter,
    dataSource,
    containerEl,
    printBtn,
    onValueChange,
    msg,
  } = indexHooks();
  const columns = defaultColumns([
    {
      title: '运单号/包裹码',
      dataIndex: 'logisticsTrackingNumber',
      key: 'logisticsTrackingNumber',
      align: 'left',
    },
    {
      title: '出库单号',
      dataIndex: 'outboundOrder',
      key: 'outboundOrder',
      align: 'left',
    },
    {
      title: '订单号',
      dataIndex: 'orderId',
      key: 'orderId',
      align: 'left',
    },

    {
      title: '物流',
      dataIndex: 'companyAccount',
      key: 'companyAccount',
      align: 'left',
    },
    {
      title: '重量(g)',
      dataIndex: 'weight',
      key: 'weight',
      align: 'left',
      render: (text: number, record: any, index: number) => {
        return record.isWeight ? (
          <p>{text}</p>
        ) : (
          <>
            <InputNumber
              min={0}
              precision={2}
              onChange={e => onValueChange(index, { weight: e })}
            />
            <Button
              onClick={() => {
                if (!record.weight) {
                  return message.warn('录入重量必须大于0');
                }
                printBtn.onClick(record);
              }}
              loading={printBtn.loading}
              style={{ marginLeft: '20px' }}
              type="primary"
            >
              确认
            </Button>
          </>
        );
      },
    },
  ]);
  return (
    <OperateLayout
      title=""
      form={form}
      empty={false}
      className={style.resetOperate}
      searchItems={[
        <Form.Item></Form.Item>,
        <Form.Item
          label="扫描包裹"
          name="logisticsTrackingNumber"
          rules={[{ required: true, message: '请扫描运单号/包裹码' }]}
        >
          <Input
            placeholder="请扫描运单号/包裹码"
            onPressEnter={onPressEnter}
            ref={containerEl}
          />
        </Form.Item>,
      ]}
    >
      {msg && (
        <div style={{ margin: '10px 0' }}>
          称重失败：<span style={{ color: 'red' }}>{msg}</span>
        </div>
      )}
      <Table
        // @ts-ignore
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey={(record: any) => record.id}
      />
    </OperateLayout>
  );
});
