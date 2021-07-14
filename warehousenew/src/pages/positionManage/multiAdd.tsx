import React, { useEffect, useState } from 'react';
import { Modal, Form, Select, Row, Col, InputNumber } from 'antd';
import style from './index.less';
import {
  POSITIONPURPOSE,
  POSITIONQUAILTY,
  POSITIONTYPE,
  NUMBERLIST99,
  NUMBERSHELVE35,
  NUMBERGOODS75,
} from '@/enum.config';
import SelectFromTo from '@/components/CustomFields/SelectFromTo';
import { ModalProps } from '@/hooks/useModal';
import useOptions from '@/hooks/useOptions';
import { warehouseApply, areaApply } from '@/option.apply';
import { connect } from 'dva';

interface Props {
  modal: ModalProps;
  warehouseId: string;
}

export default connect(({ common }: any) => ({
  warehouseId: common.warehouseId,
}))(({ modal, warehouseId }: Props) => {
  const { visible, close, onOk, form, params, loading } = modal;
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const layout = { labelCol: { span: 10 }, wrapperCol: { span: 14 } };
  const layout1 = { labelCol: { span: 5 }, wrapperCol: { span: 19 } };
  const [storehouseId, setStorehouseId] = useState<string>('');
  const [areaNameOption] = useOptions(areaApply, {
    params: storehouseId,
  });
  useEffect(() => {
    if (visible) {
      form.resetFields();
      form.setFieldsValue({ storehouseId: warehouseId });
      setStorehouseId(warehouseId);
    }
  }, [visible, warehouseId]);
  const validate = async (rules: any, value: any) => {
    const [from, to] = value || [];
    if (Number(from) > Number(to)) {
      return Promise.reject('第一个值不可以大于第二个值');
    }
  };
  const onValuesChange = (changedValues: any) => {
    if ('storehouseId' in changedValues) {
      form.setFieldsValue({ areaName: undefined });
    }
  };
  return (
    <Modal
      title="批量生成库位"
      visible={visible}
      width={600}
      destroyOnClose={true}
      wrapClassName={style['add-or-update-modal']}
      confirmLoading={loading}
      onCancel={close}
      onOk={onOk}
    >
      <Form form={form} onValuesChange={onValuesChange}>
        <div className={style.title}>库位编号：</div>
        <div className={style.row}>
          <Form.Item
            label={'所属仓库'}
            name={'storehouseId'}
            {...layout1}
            rules={[{ required: true, message: '请选择所属仓库' }]}
          >
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder={'请选择'}
              onChange={setStorehouseId}
            >
              {option.menu.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={'库区编号'}
            name={'areaName'}
            {...layout1}
            rules={[{ required: true, message: '请选择库区编号' }]}
          >
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder={'请选择'}
            >
              {areaNameOption.menu.map(item => (
                <Select.Option key={item.key} value={item.value}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={'所在通道'}
            name={'channel'}
            {...layout1}
            rules={[
              {
                required: true,
                message: '请选择所在通道',
              },
              {
                validator: validate,
              },
            ]}
          >
            <SelectFromTo options={NUMBERLIST99} />
          </Form.Item>
          <Form.Item
            label={'所在货架'}
            name={'shelf'}
            {...layout1}
            rules={[
              { required: true, message: '请选择所在货架' },
              {
                validator: validate,
              },
            ]}
          >
            <SelectFromTo options={NUMBERSHELVE35} />
          </Form.Item>
          <Form.Item
            label={'所在货位'}
            name={'location'}
            {...layout1}
            rules={[
              { required: true, message: '请选择所在货位' },
              {
                validator: validate,
              },
            ]}
          >
            <SelectFromTo options={NUMBERGOODS75} />
          </Form.Item>
        </div>
        <Row className={style.row}>
          <Col span={12}>
            <Form.Item label={'库位高度'} name={'locationH'} {...layout}>
              <InputNumber
                placeholder={'请输入'}
                min={0}
                formatter={value => {
                  const temp = Number(value as string);
                  return `${isNaN(temp) ? 0 : temp}cm`;
                }}
                parser={value => (value || '').replace('cm', '')}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'库位宽度'} name={'locationW'} {...layout}>
              <InputNumber
                placeholder={'请输入'}
                min={0}
                formatter={value => {
                  const temp = Number(value as string);
                  return `${isNaN(temp) ? 0 : temp}cm`;
                }}
                parser={value => (value || '').replace('cm', '')}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'库位长度'} name={'locationL'} {...layout}>
              <InputNumber
                placeholder={'请输入'}
                min={0}
                formatter={value => {
                  const temp = Number(value as string);
                  return `${isNaN(temp) ? 0 : temp}cm`;
                }}
                parser={value => (value || '').replace('cm', '')}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'可承载数量'} name={'capacity'} {...layout}>
              <InputNumber
                placeholder={'请输入'}
                min={0}
                formatter={value => {
                  const temp = Number(value as string);
                  return `${isNaN(temp) ? 0 : temp}个`;
                }}
                parser={value => (value || '').replace('个', '')}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'可承载重量'} name={'localtionLoad'} {...layout}>
              <InputNumber
                placeholder={'请输入'}
                min={0}
                formatter={value => {
                  const temp = Number(value as string);
                  return `${isNaN(temp) ? 0 : temp}g`;
                }}
                parser={value => (value || '').replace('g', '')}
              />
            </Form.Item>
          </Col>
        </Row>
        <div className={style.title}>库位属性：</div>
        <Row className={style.row}>
          <Col span={12}>
            <Form.Item
              label={'库位用途'}
              name={'useType'}
              {...layout}
              rules={[{ required: true, message: '请选择库位用途' }]}
            >
              <Select
                getPopupContainer={triggerNode => triggerNode.parentNode}
                placeholder={'请选择'}
              >
                {POSITIONPURPOSE.map(item => (
                  <Select.Option key={item.key} value={item.key}>
                    {item.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={'库位类型'}
              name={'type'}
              {...layout}
              rules={[{ required: true, message: '请选择库位类型' }]}
            >
              <Select
                getPopupContainer={triggerNode => triggerNode.parentNode}
                placeholder={'请选择'}
              >
                {POSITIONTYPE.map(item => (
                  <Select.Option key={item.key} value={item.key}>
                    {item.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={'库位货品'}
              name={'locationType'}
              {...layout}
              rules={[{ required: true, message: '请选择库位货品' }]}
            >
              <Select
                getPopupContainer={triggerNode => triggerNode.parentNode}
                placeholder={'请选择'}
              >
                {POSITIONQUAILTY.map(item => (
                  <Select.Option key={item.key} value={item.key}>
                    {item.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'路径节点'} {...layout}>
              <span className={style.describe}>默认按顺序生产</span>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
});
