import React, { memo, useState, useEffect } from 'react';
import { Descriptions, Button, Spin } from 'antd';
import { OUTBOUNDORDERTYPE, OUTBOUNDORDERSTATUS } from '@/enum.config';
import { history } from 'umi';
import * as api from '@/services/outBoundOrder';
import { dateTimeFormat } from '@/utils';

export default memo(() => {
  const [checkmore, seCheckMore] = useState<boolean>(false);
  const [loading, seLoading] = useState<boolean>(true);
  const [basicInfo, setBasicData] = useState<any>({});
  const [logisticInfo, setLogisticData] = useState<any>({});
  useEffect(() => {
    const { id } = history.location.query;
    api
      .getLogisticsInfo({ id })
      .then(res => {
        if (res && res.data) {
          setLogisticData(res.data);
        }
      })
      .catch(e => {});
    api
      .getBasicInfo({ id })
      .then(res => {
        if (res && res.data) {
          setBasicData(res.data);
          seLoading(false);
        }
      })
      .catch(e => {});
  }, []);
  const {
    outboundOrder,
    status,
    batchId,
    logisticsTrackingNumber,
    orderId,
    clientOrderId,
    shipmentsOrderId,
    type,
    storageName,
    logisticsCost,
    isFirstOrder,
    orderAmount,
    logisticsCompany,
    consignee,
    customerName,
    paymentAt,
    isDeduction,
  } = basicInfo;
  const {
    shippingAddress,
    storeName,
    shippingAddress2,
    salesmanName,
    lord,
  } = logisticInfo;
  const typeObj = OUTBOUNDORDERTYPE.key(type);
  const statusObj = OUTBOUNDORDERSTATUS.key(status);
  const seeMore = () => {
    seCheckMore(true);
  };
  return (
    <>
      <Spin spinning={loading}>
        <Descriptions
          column={{ xxl: 4, xl: 4, lg: 4, md: 2, sm: 2, xs: 1 }}
          labelStyle={{ width: 90 }}
        >
          <Descriptions.Item label={'出库单号'}>
            {outboundOrder || '-'}
          </Descriptions.Item>

          <Descriptions.Item label={'出库状态'}>
            {statusObj?.value || '-'}
          </Descriptions.Item>

          <Descriptions.Item label={'拣货批次'}>
            {batchId || '-'}
          </Descriptions.Item>

          <Descriptions.Item label={'运单号'}>
            {logisticsTrackingNumber || '-'}
          </Descriptions.Item>

          <Descriptions.Item label={'CJ单号'}>
            {orderId || '-'}
          </Descriptions.Item>

          <Descriptions.Item label={'客户订单号'}>
            {clientOrderId || '-'}
          </Descriptions.Item>

          <Descriptions.Item label={'母订单号'}>
            {shipmentsOrderId || '-'}
          </Descriptions.Item>

          <Descriptions.Item label={'出库单类型'}>
            {typeObj?.value || '-'}
          </Descriptions.Item>
        </Descriptions>
      </Spin>
      {!checkmore ? (
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            padding: '10px 0',
          }}
        >
          <Button type="primary" onClick={seeMore}>
            更多详情
          </Button>
        </div>
      ) : (
        <Descriptions
          column={{ xxl: 4, xl: 4, lg: 4, md: 2, sm: 2, xs: 1 }}
          labelStyle={{ width: 90 }}
        >
          <Descriptions.Item label={'出库单总额'}>
            ${orderAmount || '-'}
          </Descriptions.Item>

          <Descriptions.Item label={'是否首单'}>
            {isFirstOrder == 1 ? '是' : '否'}
          </Descriptions.Item>

          <Descriptions.Item label={'客户名称'}>
            {customerName}
          </Descriptions.Item>

          <Descriptions.Item label={'付款时间'}>
            {paymentAt ? dateTimeFormat(paymentAt) : '-'}
          </Descriptions.Item>

          <Descriptions.Item label={'店铺名称'}>
            {storeName || '-'}
          </Descriptions.Item>

          <Descriptions.Item label={'业务员\\群主'}>
            {salesmanName || '-'}\{lord || '-'}
          </Descriptions.Item>

          <Descriptions.Item label={'订单邮费'}>
            ${logisticsCost || '-'}
          </Descriptions.Item>

          <Descriptions.Item label={'收件人'}>
            {consignee || '-'}
          </Descriptions.Item>

          <Descriptions.Item label={'物流'}>
            {logisticsCompany || '-'}
          </Descriptions.Item>

          <Descriptions.Item label={'出库仓库'}>
            {storageName || '-'}
          </Descriptions.Item>

          <Descriptions.Item label={'地址1'}>
            {shippingAddress || '-'}
          </Descriptions.Item>

          <Descriptions.Item label={'地址2'}>
            {shippingAddress2 || '-'}
          </Descriptions.Item>
        </Descriptions>
      )}
    </>
  );
});
