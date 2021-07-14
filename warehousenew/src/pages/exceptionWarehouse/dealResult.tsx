import React from 'react';
import { Modal, Descriptions } from 'antd';
import { ModalProps } from '@/hooks/useModal';
import { EXCEPTIONPURCHASEDEALTYPE } from '@/enum.config';
import ImagePreview from '@/components/ImagePreview';
import style from './index.less';
import { displayMoney } from '@/utils';

interface Props {
  modal: ModalProps;
}

export default ({ modal }: Props) => {
  const { visible, close, params = {} } = modal;
  const e = EXCEPTIONPURCHASEDEALTYPE.key(params?.processType);
  const Component = e?.describe;
  return (
    <Modal
      title={`处理结果：${e?.value || '未知类型'}`}
      visible={visible}
      onCancel={close}
      footer={false}
      width={600}
      className={style['deal-result']}
    >
      {Component ? (
        <Component data={params} />
      ) : (
        <span>没有找到匹配的处理结果</span>
      )}
    </Modal>
  );
};
/**
 * 仅补发
 * @constructor
 */
export const Reissue = ({ data }: any) => {
  return (
    <Descriptions column={2}>
      <Descriptions.Item label="物流公司">
        {data.logisticsCompany || '-'}
      </Descriptions.Item>
      <Descriptions.Item label="物流追踪号">
        {data.logisticsTrackingNumber || '-'}
      </Descriptions.Item>
    </Descriptions>
  );
};
/**
 * 仅退款
 * @param data
 * @constructor
 */
export const Refund = ({ data }: any) => {
  return (
    <Descriptions column={2}>
      <Descriptions.Item label="退款金额">
        {displayMoney(data.refundAmount)}
      </Descriptions.Item>
      <Descriptions.Item label="退款凭证">
        <ImagePreview
          key={data.refundCertificate}
          size={100}
          url={data.refundCertificate}
        />
      </Descriptions.Item>
    </Descriptions>
  );
};
/**
 * 退货退款
 * @param data
 * @constructor
 */
export const ReturnAndRefund = ({ data }: any) => {
  return (
    <Descriptions column={2}>
      <Descriptions.Item label="物流公司">
        {data.logisticsCompany || '-'}
      </Descriptions.Item>
      <Descriptions.Item label="物流追踪号">
        {data.returnTrackingNumber || '-'}
      </Descriptions.Item>
      <Descriptions.Item label="退货数量">
        {data.returnNum || '-'}
      </Descriptions.Item>
      <Descriptions.Item label="退货地址">
        {data.returnAddress}
      </Descriptions.Item>
      <Descriptions.Item label="收件人">
        {data.consignee || '-'}
      </Descriptions.Item>
      <Descriptions.Item label="联系电话">
        {data.phone || '-'}
      </Descriptions.Item>
      <Descriptions.Item label="退货地址" span={2}>
        {data.returnAddress || '-'}
      </Descriptions.Item>
      <Descriptions.Item label="备注" span={2}>
        {data.remark || '-'}
      </Descriptions.Item>
    </Descriptions>
  );
};
/**
 * 退货换货
 * @param data
 * @constructor
 */
export const ReturnAndChange = ({ data }: any) => {
  return (
    <Descriptions column={2}>
      <Descriptions.Item label="物流公司">
        {data.logisticsCompany || '-'}
      </Descriptions.Item>
      <Descriptions.Item label="物流追踪号">
        {data.returnTrackingNumber || '-'}
      </Descriptions.Item>
      <Descriptions.Item label="退货数量">
        {data.returnNum || '-'}
      </Descriptions.Item>
      <Descriptions.Item label="退货地址">
        {data.returnAddress || '-'}
      </Descriptions.Item>
      <Descriptions.Item label="收件人">
        {data.consignee || '-'}
      </Descriptions.Item>
      <Descriptions.Item label="联系电话">
        {data.phone || '-'}
      </Descriptions.Item>
      <Descriptions.Item label="换货物流公司">
        {data.changeLogisticsCompany || '-'}
      </Descriptions.Item>
      <Descriptions.Item label="换货追踪号">
        {data.changeLogisticsTrackingNumber || '-'}
      </Descriptions.Item>
      <Descriptions.Item label="备注">{data.remark || '-'}</Descriptions.Item>
    </Descriptions>
  );
};
/**
 * 仅补发配件
 * @param data
 * @constructor
 */
export const PartsReissue = ({ data }: any) => {
  return <Reissue data={data} />;
};
/**
 * 更换SKU
 * @param data
 * @constructor
 */
export const SKUChange = ({ data }: any) => {
  return (
    <Descriptions column={1}>
      <Descriptions.Item label="更改后SKU名称">
        {data.afterReplacementSku || '-'}
      </Descriptions.Item>
      <Descriptions.Item label="备注">{data.remark || '-'}</Descriptions.Item>
    </Descriptions>
  );
};
/**
 * 合格
 * @param data
 * @constructor
 */
export const Qualified = ({ data }: any) => {
  return (
    <Descriptions column={1}>
      <Descriptions.Item label="备注">{data.remark || '-'}</Descriptions.Item>
    </Descriptions>
  );
};
/**
 * 部分签收
 * @param data
 * @constructor
 */
export const SignPart = ({ data }: any) => {
  return <Reissue data={data} />;
};
