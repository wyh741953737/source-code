import React, { useEffect, useState } from 'react';
import { Modal, Form, Select, Input, Row, Col, Radio } from 'antd';
import style from '../index.less';

import { ModalProps } from '@/hooks/useModal';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { connect } from 'dva';
import List from '@/components/DragList';
interface Props {
  modal: ModalProps;
  warehouseId: string;
}

export default connect(({ common }: any) => ({
  warehouseId: common.warehouseId,
}))(({ modal, warehouseId }: Props) => {
  const { visible, close, onOk, form, params, loading } = modal;
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const [storehouseId, setStorehouseId] = useState<string>();
  const [firstCustomer, setCustomerFirst] = useState<boolean>(true);
  const [ruleData, setRuleData] = useState<Array<any>>([]);
  const isUpdate = params && params.id ? true : false;
  const layout = { labelCol: { span: 7 }, wrapperCol: { span: 17 } };
  const layout2 = {
    labelCol: { span: 12, offset: 1 },
    wrapperCol: { span: 12, offset: 1 },
  };
  useEffect(() => {
    if (params) {
      setStorehouseId(params.storehouseId);
      form.setFieldsValue({
        ...params,
        storehouseId: params.storehouseId,
        firstOrder: Number(params.firstOrder),
        firstCustomer: Number(params.firstCustomer),
      });
      let ruleData = JSON.parse(
        JSON.stringify(params.storehouseRuleRelationDTOList),
      );
      ruleData.sort(
        (item1: any, item2: any) => item1.ruleRank - item2.ruleRank,
      );

      ruleData.length > 0 && setRuleData(ruleData);
      setCustomerFirst(params.firstCustomer != 1);
    } else {
      form.resetFields();
      form.setFieldsValue({ storehouseId: warehouseId });
      setStorehouseId(warehouseId);
      setCustomerFirst(true);
      setRuleData([
        {
          ruleId: '20001',
          ruleName: '订单付款时间',
          ruleRank: 3,
        },
        {
          ruleId: '20002',
          ruleName: '代发订单（单品）',
          ruleRank: 4,
        },
        {
          ruleId: '20003',
          ruleName: '代发订单（多品）',
          ruleRank: 5,
        },
        {
          ruleId: '20005',
          ruleName: '直发订单（私有）',
          ruleRank: 6,
        },
        {
          ruleId: '20004',
          ruleName: '直发订单',
          ruleRank: 7,
        },
        {
          ruleId: '20007',
          ruleName: '缺货异常',
          ruleRank: 8,
        },
      ]);
    }
  }, [params]);
  const onValuesChange = (changedValues: any) => {
    if ('storehouseId' in changedValues) {
      //   form.setFieldsValue({ areaName: undefined });
    }
  };
  const selectCustomerFirst = (e: any) => {
    if (e.target.value == 0) {
      setCustomerFirst(true);
      form.setFieldsValue({ username: '' });
    } else {
      setCustomerFirst(false);
    }
  };
  const changeValue = (value: any) => {
    let ruleData = JSON.parse(JSON.stringify(value));
    ruleData.forEach((item: any, index: number) => {
      item.ruleRank = index + 3;
    });
    setRuleData(ruleData);
    form.setFieldsValue({ storehouseRuleRelationDTOList: ruleData });
  };
  return (
    <Modal
      title={`${isUpdate ? '修改' : '新增'}抵扣规则`}
      visible={visible}
      width={600}
      destroyOnClose={true}
      wrapClassName={style['add-or-update-modal']}
      confirmLoading={loading}
      onCancel={close}
      onOk={() => onOk({ ...params, storehouseRuleRelationDTOList: ruleData })}
    >
      <Form form={form} onValuesChange={onValuesChange} preserve={false}>
        <Row>
          <Col span={23}>
            <Form.Item
              label={'仓库'}
              name={'storehouseId'}
              {...layout}
              rules={[{ required: true, message: '请选择所属仓库' }]}
              initialValue={warehouseId}
            >
              <Select
                getPopupContainer={triggerNode => triggerNode.parentNode}
                placeholder={'请选择'}
                disabled={isUpdate}
              >
                {option.menu.map(item => (
                  <Select.Option key={item.key} value={item.key}>
                    {item.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label={'规则名称'}
              name={'name'}
              {...layout}
              rules={[{ required: true, message: '请填写抵扣规则名称' }]}
            >
              <Input placeholder="请填写抵扣规则名称" maxLength={20} />
            </Form.Item>

            <Form.Item
              label={'首单优先'}
              name={'firstOrder'}
              {...layout}
              rules={[{ required: true, message: '' }]}
              initialValue={0}
            >
              <Radio.Group>
                <Radio value={1}>是</Radio>
                <Radio value={0}>否</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label={'是否指定客户优先'}
              name={'firstCustomer'}
              {...layout}
              rules={[{ required: true, message: '' }]}
              initialValue={0}
            >
              <Radio.Group onChange={selectCustomerFirst}>
                <Radio value={1}>是</Radio>
                <Radio value={0}>否</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label={'客户名称'}
              name={'username'}
              {...layout}
              rules={[{ required: !firstCustomer, message: '请填写客户名称' }]}
            >
              <Input
                placeholder="请填写客户名称"
                disabled={firstCustomer}
                maxLength={1000}
              />
            </Form.Item>
            <div
              style={{ color: '#ffb900', fontWeight: 'bold', marginBottom: 10 }}
            >
              <Row>
                <Col span={10} offset={2} style={{ textAlign: 'right' }}>
                  <span>规则选项(列表可拖拽)</span>
                </Col>
                <Col span={10} offset={2}>
                  <span>优先级</span>
                </Col>
              </Row>
            </div>
            <div>
              <List data={ruleData} changeValue={changeValue} />
            </div>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
});
