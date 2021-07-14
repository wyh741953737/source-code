import React, { useEffect, useState, useContext } from 'react';
import { Modal, Form, Select, InputNumber, message } from 'antd';
import useOptions from '@/hooks/useOptions';
import style from './index.less';
import { warehouseApply } from '@/option.apply';
import { ModalProps } from '@/hooks/useModal';
import { connect } from 'dva';
import { getSetting } from '@/services/batchManage';
import { OUTBOUNDORDERTYPE } from '@/enum.config';

interface Props {
  modal: ModalProps;
  warehouseId: string;
}

const AddOrUpdate: React.FC<Props> = ({ modal, warehouseId }) => {
  const { visible, close, onOk, form, params, loading } = modal;
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  useEffect(() => {
    form.setFieldsValue({ storehouseId: warehouseId });
  }, [warehouseId]);
  const [storehouseId, setStorehouseId] = useState(warehouseId);
  const layout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };

  const onValuesChange = (changedValues: any) => {
    if ('storehouseId' in changedValues) {
      setStorehouseId(changedValues.storehouseId);
    }
    if ('orderType' in changedValues) {
      const { storehouseId, orderType } = changedValues;
      const hide = message.loading('获取配置中...');
      getSetting({ storehouseId, orderType })
        .then(e => {
          form.setFieldsValue({
            singleOrderCount: e.data?.singleOrderNum,
            singleCommodityCount: e.data?.singleProductNum,
            multiOrderCount: e.data?.moreOrderNum,
            multiCommodityCount: e.data?.moreProductNum,
          });
          hide();
        })
        .catch(e => {
          hide();
        });
      return () => hide();
    }
  };
  return (
    <Modal
      title={`批次规则设置`}
      visible={visible}
      confirmLoading={loading}
      onCancel={close}
      onOk={onOk}
    >
      <Form
        form={form}
        {...layout}
        className={style.form}
        onValuesChange={onValuesChange}
      >
        <Form.Item
          label={'目标仓库'}
          name={'storehouseId'}
          rules={[{ required: true, message: '请选择目标仓库' }]}
        >
          <Select
            getPopupContainer={triggerNode => triggerNode.parentNode}
            placeholder="请选择"
          >
            {option.menu.map(item => (
              <Select.Option key={item.key} value={item.key}>
                {item.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={'订单类型'}
          name={'orderType'}
          rules={[{ required: true, message: '请选择订单类型' }]}
        >
          <Select
            getPopupContainer={triggerNode => triggerNode.parentNode}
            placeholder="请选择"
            allowClear
          >
            {OUTBOUNDORDERTYPE.map(item => (
              <Select.Option key={item.key} value={item.key}>
                {item.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={'单品订单数量'}
          name={'singleOrderCount'}
          rules={[{ required: true, message: '请输入单品订单数量' }]}
        >
          <InputNumber placeholder="请输入" min={1} max={200} precision={0} />
        </Form.Item>
        <Form.Item
          label={'单品商品数量'}
          name={'singleCommodityCount'}
          extra="（若单个单品订单商品数量超过数量上限，则该订单生成一个单独批次）"
          rules={[{ required: true, message: '请输入单品商品数量' }]}
        >
          <InputNumber placeholder="请输入" min={1} max={1000} precision={0} />
        </Form.Item>
        <Form.Item
          label={'多品订单数量'}
          name={'multiOrderCount'}
          rules={[{ required: true, message: '请输入多品订单数量' }]}
        >
          <InputNumber placeholder="请输入" min={1} max={200} precision={0} />
        </Form.Item>
        <Form.Item
          label={'多品商品数量'}
          name={'multiCommodityCount'}
          extra="（若单个多品订单商品数量超过数量上限，则该订单生成一个单独批次）"
          rules={[{ required: true, message: '请输入多品商品数量' }]}
        >
          <InputNumber placeholder="请输入" min={1} max={1000} precision={0} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default connect(({ common }: any) => ({
  warehouseId: common.warehouseId,
}))(AddOrUpdate);
