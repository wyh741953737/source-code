import React, { useEffect, useRef, useState } from 'react';
import {
  Form,
  Modal,
  Select,
  Input,
  Col,
  Row,
  Space,
  DatePicker,
  InputNumber,
} from 'antd';
import { ModalProps } from '@/hooks/useModal';
import useOptions from '@/hooks/useOptions';
import { warehouseApply, areaApply } from '@/option.apply';
import * as api from '@/services/inventoryList';
import { CHECKWAYS, CHECKRANGE, CHECKFROZEN, TOUCHTYPES } from '@/enum.config';
import { connect } from 'dva';
import { dateTimeFormat } from '@/utils';

interface Props {
  modal: ModalProps;
  warehouseId: string;
}

const Index: React.FC<Props> = ({ modal, warehouseId }) => {
  const { visible, close, onOk, loading } = modal;
  const layout = { labelCol: { span: 8 }, wrapperCol: { span: 14 } };
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const [checkDimension, setCheckDimension] = useState(); // 盘点维度
  const [customerList, setCustomerList] = useState<any>([]); // 客户列表
  const [dates, setDates] = useState<any>([]);
  const [areaOption, setAreaOption] = useState<any>([]);
  const [locationFlag, setLocationFlag] = useState<boolean>(false);
  const timer: any = useRef();
  const areaTimer: any = useRef();

  useEffect(() => {
    if (visible) {
      getCheckNum();
    }
  }, [visible]);

  /**通过sku获取货主 */
  const getCustomerBySKU = (sku: string) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(async () => {
      try {
        const resp = await api.getCustomerBySKU({
          sku,
          storehouseId: warehouseId,
        });
        const data = resp?.data || [];
        setCustomerList(data);
        modal.form.setFieldsValue({ customerId: undefined });
      } catch (e) {
        setCustomerList([]);
        modal.form.setFieldsValue({ customerId: undefined });
      }
    }, 300);
  };

  /**获取盘点单号 */
  async function getCheckNum() {
    const resp = await api.getCheckNum();
    const checkNum = resp.data;
    modal.form.setFieldsValue({ checkNum });
  }

  /**表单值变化 */
  function handleFormChange(value: any) {
    const keys = Object.keys(value);
    if (keys.includes('checkDimension')) {
      setCheckDimension(value.checkDimension);
    }
    if (keys.includes('sku')) {
      const val = value.sku.trim();
      if (!val) {
        setCustomerList([]);
        modal.form.setFieldsValue({ customerId: undefined });
        return;
      }
      getCustomerBySKU(val);
    }
    if (keys.includes('storehouseId')) {
      getAreaOption();
    }

    if (keys.includes('operationType') || keys.includes('checkDimension')) {
      const operationType = modal.form.getFieldValue('operationType');
      const checkDimension = modal.form.getFieldValue('checkDimension');
      checkDimension === 1 && operationType === 2
        ? setLocationFlag(true)
        : setLocationFlag(false);
    }
  }

  function getAreaOption() {
    if (areaTimer.current) {
      clearTimeout(areaTimer.current);
    }
    areaTimer.current = setTimeout(async () => {
      const { storehouseId } = modal.form.getFieldsValue();
      const areaList = await areaApply(storehouseId);
      setAreaOption(areaList);
    }, 500);
  }

  function validateVal() {
    const {
      areaCode,
      locations,
      operationType,
      checkDimension,
    } = modal.form.getFieldsValue();
    if (!checkDimension || checkDimension == CHECKRANGE.product.key) {
      return Promise.resolve();
    }
    if (!areaCode && !locations && !operationType) {
      return Promise.reject('至少一个不为空!');
    }
    return Promise.resolve();
  }

  function validateMoveTouch() {
    const { operationType, moveTouch } = modal.form.getFieldsValue();
    if (!!operationType && !moveTouch) {
      return Promise.reject('请选择动碰时间!');
    }
    return Promise.resolve();
  }

  const onOpenChange = (open: boolean) => {
    if (open) {
      setDates([]);
    }
  };

  const disabledDate = (current: any) => {
    if (!dates || dates.length === 0) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') > 7;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > 7;
    return tooEarly || tooLate;
  };

  const validateInventory = () => {
    const { inventoryMax, inventoryMin } = modal.form.getFieldsValue();
    const empty = [null, undefined, ''];
    if (
      !empty.includes(inventoryMax) &&
      !empty.includes(inventoryMin) &&
      inventoryMax < inventoryMin
    ) {
      return Promise.reject('库存量范围不正确');
    }
    return Promise.resolve();
  };
  const checkLocation = (rule: any, value: string, callback: any) => {
    const reg = /^[a-zA-Z-\d]+(,[a-zA-Z-\d]+)*$/;
    if (!reg.test(value)) {
      callback('输入格式不对，请用单个英文逗号隔开');
      return;
    }
    callback();
  };

  const submitAdd = async () => {
    const { moveTouch, ...rest } = await modal.form.validateFields();
    const areaName = areaOption.find((item: any) => item.key == rest.areaCode)
      ?.value;

    /**如果盘点维度是商品，动碰类型固定为4 */
    const IS_SKU = 4;
    const params = {
      ...rest,
      areaName,
      operationType:
        rest.checkDimension == CHECKRANGE.position.key
          ? rest.operationType
          : IS_SKU,
      moveTouchStartTime: moveTouch ? dateTimeFormat(moveTouch[0]) : '',
      moveTouchEndTime: moveTouch ? dateTimeFormat(moveTouch[1]) : '',
    };
    onOk(params);
  };

  return (
    <Modal
      title="新增盘点单"
      width={1000}
      visible={visible}
      destroyOnClose
      onCancel={close}
      onOk={submitAdd}
      confirmLoading={loading}
      okText="确定"
      maskClosable={false}
    >
      <Form onValuesChange={handleFormChange} form={modal.form} {...layout}>
        <Form.Item
          name="storehouseId"
          label="仓库名称"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 7 }}
          rules={[{ required: true, message: '请选择仓库' }]}
        >
          <Select placeholder="请选择">
            {option.menu.map(item => (
              <Select.Option key={item.key} value={item.key}>
                {item.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item name="checkNum" label="盘点单号">
              <Input disabled allowClear maxLength={100} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="checkDimension"
              label="盘点维度"
              rules={[{ required: true, message: '请选择盘点维度' }]}
            >
              <Select placeholder="请选择" allowClear>
                {CHECKRANGE.map(m => (
                  <Select.Option key={m.key} value={m.key}>
                    {m.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="checkType"
              label="盘点方式"
              rules={[{ required: true, message: '请选择盘点方式' }]}
            >
              <Select placeholder="请选择" allowClear>
                {CHECKWAYS.map(m => (
                  <Select.Option key={m.key} value={m.key}>
                    {m.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="isFrozen"
              label="冻结盘点"
              rules={[{ required: true, message: '请选择冻结盘点' }]}
            >
              <Select placeholder="请选择" allowClear>
                {CHECKFROZEN.map(m => (
                  <Select.Option key={m.key} value={m.key}>
                    {m.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              dependencies={['locations', 'operationType']}
              name="areaCode"
              label="库区"
              rules={[{ validator: validateVal }]}
            >
              <Select placeholder="请选择" allowClear>
                {areaOption.map((m: any) => (
                  <Select.Option key={m.key} value={m.key}>
                    {m.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              dependencies={['areaCode', 'operationType']}
              name="locations"
              label="库位"
              rules={[{ validator: validateVal }, { validator: checkLocation }]}
            >
              <Input
                placeholder="支持多库位输入，英文逗号分隔"
                allowClear
                disabled={locationFlag}
                maxLength={1000}
              />
            </Form.Item>
          </Col>
          {checkDimension == CHECKRANGE.position.key && (
            <>
              <Col span={12}>
                <Form.Item
                  dependencies={['areaCode', 'locations']}
                  name="operationType"
                  label="动碰类型"
                  rules={[{ validator: validateVal }]}
                >
                  <Select placeholder="请选择" allowClear>
                    {TOUCHTYPES.map(m => (
                      <Select.Option key={m.key} value={m.key}>
                        {m.value}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  dependencies={['operationType']}
                  name="moveTouch"
                  label="动碰时间"
                  rules={[{ validator: validateMoveTouch }]}
                >
                  <DatePicker.RangePicker
                    onCalendarChange={val => setDates(val)}
                    onOpenChange={onOpenChange}
                    disabledDate={disabledDate}
                    placeholder={['请选择', '请选择']}
                    allowClear
                  />
                </Form.Item>
              </Col>
            </>
          )}
          {checkDimension == CHECKRANGE.product.key && (
            <>
              <Col span={12}>
                <Form.Item
                  name="sku"
                  label="SKU"
                  rules={[{ required: true, message: '请输入SKU' }]}
                >
                  <Input placeholder="请输入" allowClear />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="customerId"
                  label="货主"
                  rules={[{ required: true, message: '请选择货主' }]}
                >
                  <Select placeholder="请选择" allowClear>
                    {customerList.map((m: any) => (
                      <Select.Option key={m.customerId} value={m.customerId}>
                        {m.customerName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="库存量">
                  <Space>
                    <Form.Item
                      dependencies={['inventoryMax']}
                      name="inventoryMin"
                      rules={[{ validator: validateInventory }]}
                    >
                      <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        placeholder="请输入"
                      />
                    </Form.Item>
                    <div style={{ marginTop: '-25px' }}>-</div>
                    <Form.Item
                      dependencies={['inventoryMin']}
                      name="inventoryMax"
                    >
                      <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        placeholder="请输入"
                      />
                    </Form.Item>
                  </Space>
                </Form.Item>
              </Col>
            </>
          )}
        </Row>
      </Form>
    </Modal>
  );
};
export default connect(({ common }: any) => ({
  warehouseId: common.warehouseId,
}))(Index);
