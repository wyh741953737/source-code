import throttle from '@/utils/throttle';
import React, { useEffect, useState } from 'react';
import { ModalProps } from '@/hooks/useModal';
import * as api from '@/services/moveInWarehouse';
import { recommendHooks } from './hooks';
import { Form, Input, InputNumber, Modal } from 'antd';
import { COMMMASSEPARATE } from '@/regExp.config';
import { GetRecommendedLocation } from '@/services/moveInWarehouse.d';
import RecommendList from './recommendList';
const throttleContainer = throttle.new();
const MoveConfirm: React.FC<{ modal: ModalProps }> = ({ modal }) => {
  const { visible, close, onOk, form, params, loading } = modal;
  const layout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };
  const { recommendModal } = recommendHooks();
  const [recommendList, setRecommendList] = useState<
    Array<GetRecommendedLocation.ResponseItem>
  >([]);
  const {
    realityQuantity,
    frozenQuantity,
    useQuantity,
    id,
    shortCode,
    skuId,
    storageName,
    batchNumber,
    inventoryInfoBatchId,
    type,
  } = params?.from || {};

  useEffect(() => {
    id &&
      api
        .getRecommendedLocation({ id })
        .then(res => setRecommendList(res.data));
  }, [visible]);
  const canMoveQuantity =
    Number(realityQuantity) - Number(frozenQuantity) - Number(useQuantity);
  const [containerType, setContainerType] = useState<number>(2);
  const validateContainer = async (rule: any, value: any) => {
    if (value) {
      await throttleContainer.dispatch(async () => {
        try {
          const resp = await api.verifyTargetLocation({
            storehouseId: params.cond.storehouseId,
            locationName: value,
          });
          form.setFieldsValue({ toContainer: resp.data });
          resp.data.toContainerType &&
            setContainerType(resp.data.toContainerType);
        } catch (e) {
          form.setFieldsValue({ toContainer: undefined });
          return Promise.reject('移动库位/容器验证失败');
        }
      });
    }
  };
  const checkCommas = (rule: any, value: string, callback: any) => {
    if (value && !COMMMASSEPARATE.test(value)) {
      callback('您输入的格式有误，仅支持数字，英文，和英文逗号');
      return;
    }
    callback();
  };
  const checkRecommend = () => {
    recommendModal.show(recommendList);
  };
  return (
    <Modal
      title="移动数量"
      visible={visible}
      onCancel={close}
      onOk={() =>
        onOk({
          id,
          shortCode,
          skuId,
          storageName,
          batchNumber,
          inventoryInfoBatchId,
        })
      }
      confirmLoading={loading}
    >
      <Form form={form}>
        <Form.Item
          label="移动库位/容器"
          name="toContainerNum"
          {...layout}
          hasFeedback
          // style={{position:'relative'}}
          rules={[
            { required: true, message: '请输入移动库位/容器' },
            { max: 20, message: '限制20字符' },
            { validator: validateContainer },
          ]}
        >
          <Input placeholder="请输入，限制20字符" />
        </Form.Item>
        <p
          style={{
            margin: 0,
            position: 'absolute',
            bottom: '136px',
            right: '64px',
          }}
        >
          <a onClick={checkRecommend}>推荐库位</a>
        </p>
        <Form.Item name="toContainer" hidden />
        <Form.Item
          label="移动数量"
          name="moveQuantity"
          {...layout}
          rules={[
            { required: true, message: '请输入移动数量' },
            {
              max: isNaN(canMoveQuantity) ? 0 : canMoveQuantity,
              type: 'number',
              message: isNaN(canMoveQuantity)
                ? '可移动数量异常'
                : `可移动数量上限不能大于${canMoveQuantity}`,
            },
          ]}
        >
          <InputNumber
            min={0}
            precision={0}
            placeholder="请输入"
            style={{ width: '100%' }}
          />
        </Form.Item>
        {type == '1' && containerType == 1 && (
          <Form.Item
            label={'指定抵扣订单'}
            name={'orderInfo'}
            {...layout}
            rules={[
              {
                validator: checkCommas,
                message: '请输入正确的格式，仅支持数字，英文，且用英文逗号隔开',
              },
            ]}
          >
            <Input placeholder="请输入订单号,多个请用英文逗号隔开" />
          </Form.Item>
        )}
      </Form>

      <RecommendList modal={recommendModal} />
    </Modal>
  );
};
export default MoveConfirm;
