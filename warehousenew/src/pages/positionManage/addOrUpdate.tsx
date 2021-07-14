import React, { useEffect, useState } from 'react';
import {
  Modal,
  Form,
  Select,
  Switch,
  Row,
  Col,
  InputNumber,
  message,
} from 'antd';
import style from './index.less';
import {
  POSITIONPURPOSE,
  POSITIONQUAILTY,
  POSITIONTYPE,
  NUMBERLIST99,
  NUMBERSHELVE35,
  NUMBERGOODS75,
} from '@/enum.config';
import { ModalProps } from '@/hooks/useModal';
import useOptions from '@/hooks/useOptions';
import { areaApply, warehouseApply } from '@/option.apply';
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
  const [storehouseId, setStorehouseId] = useState<string>('');
  const [areaNameOption] = useOptions(areaApply, {
    interval: 0,
    params: storehouseId,
  });
  const isUpdate = !!params;
  const layout = { labelCol: { span: 9 }, wrapperCol: { span: 15 } };
  useEffect(() => {
    if (params) {
      let [channel, shelf, location] = params?.locationName.split('-') || [];
      if (!channel || !shelf || !location) {
        message.error('库位编号有误，请确认');
      }
      setStorehouseId(params.storehouseId);
      form.setFieldsValue({
        ...params,
        channel,
        shelf,
        location,
        isDelete: !!params.isDelete,
      });
    } else {
      form.resetFields();
      form.setFieldsValue({ storehouseId: warehouseId });
      setStorehouseId(warehouseId);
    }
  }, [params]);
  const onValuesChange = (changedValues: any) => {
    if ('storehouseId' in changedValues) {
      form.setFieldsValue({ areaName: undefined });
    }
  };
  return (
    <Modal
      title={`${isUpdate ? '修改' : '新增'}库位`}
      visible={visible}
      width={600}
      destroyOnClose={true}
      wrapClassName={style['add-or-update-modal']}
      confirmLoading={loading}
      onCancel={close}
      onOk={() => onOk(params)}
    >
      <Form form={form} onValuesChange={onValuesChange}>
        <div className={style.title}>库位编号：</div>
        <Row className={style.row}>
          <Col span={12}>
            <Form.Item
              label={'所属仓库'}
              name={'storehouseId'}
              {...layout}
              rules={[{ required: true, message: '请选择所属仓库' }]}
            >
              <Select
                placeholder={'请选择'}
                disabled={isUpdate}
                onChange={setStorehouseId}
              >
                {option.menu.map(item => (
                  <Select.Option key={item.key} value={item.key}>
                    {item.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={'库区编号'}
              name={'areaName'}
              {...layout}
              rules={[{ required: true, message: '请选择库区编号' }]}
            >
              <Select
                getPopupContainer={triggerNode => triggerNode.parentNode}
                placeholder={'请选择'}
                disabled={isUpdate}
              >
                {areaNameOption.menu.map(item => (
                  <Select.Option key={item.key} value={item.value}>
                    {item.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={'所在通道'}
              name={'channel'}
              {...layout}
              rules={[{ required: true, message: '请选择所在通道' }]}
            >
              <Select
                getPopupContainer={triggerNode => triggerNode.parentNode}
                placeholder={'请选择'}
                disabled={isUpdate}
                showSearch
              >
                {NUMBERLIST99.map(item => (
                  <Select.Option key={item.key} value={item.key}>
                    {item.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={'所在货架'}
              name={'shelf'}
              {...layout}
              rules={[{ required: true, message: '请选择所在货架' }]}
            >
              <Select
                getPopupContainer={triggerNode => triggerNode.parentNode}
                placeholder={'请选择'}
                disabled={isUpdate}
                showSearch
              >
                {NUMBERSHELVE35.map(item => (
                  <Select.Option key={item.key} value={item.key}>
                    {item.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={'所在货位'}
              name={'location'}
              {...layout}
              rules={[{ required: true, message: '请选择所在货位' }]}
            >
              <Select
                getPopupContainer={triggerNode => triggerNode.parentNode}
                placeholder={'请选择'}
                disabled={isUpdate}
                showSearch
              >
                {NUMBERGOODS75.map(item => (
                  <Select.Option key={item.key} value={item.key}>
                    {item.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
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
            <Form.Item
              label={'路径节点'}
              name={'pathNode'}
              {...layout}
              rules={[{ required: true, message: '请输入路径节点' }]}
            >
              <InputNumber placeholder={'请输入'} min={0} precision={0} />
            </Form.Item>
          </Col>
          {isUpdate && (
            <Col span={12}>
              <Form.Item
                label={'是否停用'}
                name={'isDelete'}
                {...layout}
                valuePropName="checked"
              >
                <Switch checkedChildren={'是'} unCheckedChildren={'否'} />
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>
    </Modal>
  );
});
