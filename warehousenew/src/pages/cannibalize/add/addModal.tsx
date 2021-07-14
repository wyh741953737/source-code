import React, { FC, useEffect, useState, useContext } from 'react';
import { ModalProps } from '@/hooks/useModal';
import { Modal, Form, Select, Input, InputNumber, message } from 'antd';
import { CANNIBALIZEPROPERTY, STORETYPETRANS } from '@/enum.config';
import * as api from '@/services/cannibalize';
import style from './index.less';
import { AddModalParams, ProduceInfo } from './hooks';
import ReadText from '@/components/CustomFields/ReadText';
import throttle from '@/utils/throttle';

interface Props {
  modal: ModalProps<AddModalParams>;
  produceList: ProduceInfo[];
}

const throttleContainer = throttle.new();
const AddModal: FC<Props> = ({ modal, produceList }) => {
  const { params, onOk, loading, close, visible, form } = modal;
  const layout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };
  const isEdit = !!params?.info;
  useEffect(() => {
    if (visible && params?.info) {
      const hide = message.loading('数据重新获取中...');
      api
        .getInfo({
          stockType: params.info.stockType,
          skuOrNum: params.info.skuOrNum,
          sourceStorehouseId: params.sourceStorehouseId,
        })
        .then(d => {
          form.setFieldsValue({
            ...d.data,
            skuOrNum: params.info.skuOrNum,
            transferQuantity: params.info?.transferQuantity,
            id: params.info?.id,
          });
          hide();
        })
        .catch(e => {
          form.setFieldsValue({
            productProperty: undefined,
            packWeight: undefined,
            availableQuantity: undefined,
            transferQuantity: undefined,
          });
          hide();
        });
    }
  }, [visible]);
  const validatorTransferQuantity = async (rules: any, value: number) => {
    if (!value) return;
    const availableQuantity = Number(form.getFieldValue('availableQuantity'));
    if (isNaN(availableQuantity))
      return Promise.reject('请先填写SKU/短码查询可用库存量');
    if (value > availableQuantity)
      return Promise.reject('需调度数量不能大于可用库存数');
  };
  const validatorSkuOrNum = async (rules: any, value: any) => {
    const { stockType, transferQuantity } = form.getFieldsValue([
      'stockType',
      'transferQuantity',
    ]);
    if (!value || !stockType) return;
    await throttleContainer.dispatch(async () => {
      try {
        const resp = await api.getInfo({
          stockType,
          skuOrNum: value,
          sourceStorehouseId: params?.sourceStorehouseId as string,
        });
        const id = `${resp.data.variantSku}-${resp.data.stockType}`;
        if (!isEdit && produceList.find(p => p.id === id)) {
          return Promise.reject('该商品已添加，您可以去修改该商品明细');
        }
        // 判断的字符串，如果包含"普货"即为普货，否则为非普货
        if (
          !CANNIBALIZEPROPERTY.key(params?.packProperty)?.judge(
            resp.data.productProperty,
          )
        ) {
          return Promise.reject('该商品属性与指定属性不符');
        }
        form.setFieldsValue({ ...resp.data, transferQuantity, id });
      } catch (e) {
        form.setFieldsValue({
          productProperty: undefined,
          packWeight: undefined,
          availableQuantity: undefined,
          transferQuantity: undefined,
        });
        return Promise.reject(e.message || '查询数据出错');
      }
    });
  };
  return (
    <Modal
      title={`${isEdit ? '修改' : '新增'}商品`}
      visible={visible}
      onCancel={close}
      confirmLoading={loading}
      onOk={onOk}
      okText="添加"
    >
      <Form form={form} {...layout} className={style.form}>
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="variantId" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="variantSku" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="variantNum" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="variantImg" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="productType" hidden>
          <Input />
        </Form.Item>
        <Form.Item
          label="库存类型"
          name="stockType"
          initialValue={1}
          rules={[{ required: true, message: '请选择库存类型' }]}
        >
          <Select
            getPopupContainer={triggerNode => triggerNode.parentNode}
            placeholder="请选择"
            disabled={isEdit}
          >
            {STORETYPETRANS.map(m => (
              <Select.Option key={m.key} value={m.key}>
                {m.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="SKU/短码"
          name="skuOrNum"
          dependencies={['stockType']}
          hasFeedback
          rules={[
            { required: true, message: '请输入SKU/短码' },
            { validator: validatorSkuOrNum },
          ]}
        >
          <Input placeholder="请输入" disabled={isEdit} maxLength={50} />
        </Form.Item>
        <Form.Item label="商品属性" name="productProperty">
          <ReadText>（根据SKU/短码获取商品属性）</ReadText>
        </Form.Item>
        <Form.Item label="重量" name="packWeight">
          <ReadText successRender={value => `${value}g`}>
            （根据SKU/短码获取商品毛重）
          </ReadText>
        </Form.Item>
        <Form.Item label="可用库存数" name="availableQuantity">
          <ReadText>（根据SKU/短码获取可用库存数量）</ReadText>
        </Form.Item>
        <Form.Item
          label="需调拨数量"
          name="transferQuantity"
          rules={[
            { required: true, message: '请输入需调拨数量' },
            { validator: validatorTransferQuantity },
          ]}
        >
          <InputNumber
            placeholder="请输入"
            precision={0}
            min={1}
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddModal;
