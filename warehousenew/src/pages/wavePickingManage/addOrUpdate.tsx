import React, { useEffect, useState } from 'react';
import {
  Modal,
  Form,
  Select,
  Input,
  Radio,
  InputNumber,
  Row,
  Col,
  DatePicker,
  Checkbox,
  Skeleton,
  Spin,
  message,
} from 'antd';
import {
  COMMODITYRULE,
  COMMONBOOLEAN,
  ORDERTYPE,
  WAVEPICKINGTYPE,
  ISCOUNTRYORDER,
} from '@/enum.config';
import useOptions from '@/hooks/useOptions';
import style from '../../utils/index.less';
import NumberRange, {
  NumberRangeValidator,
} from '@/components/CustomFields/NumberRange';
import {
  areaApply,
  searchCustomerApply,
  searchLogisticsApply,
  searchWavePickingApply,
  warehouseApply,
} from '@/option.apply';
import { ModalProps } from '@/hooks/useModal';
import { connect } from 'dva';
import InputAndSearch from '@/components/CustomFields/InputAndSearch';
import { SearchWavePicking } from '@/services/wavePickingManage.d';
import moment from 'moment';
import { COMMMASSEPARATE } from '@/regExp.config';

interface Props {
  modal: ModalProps;
  warehouseId: string;
}

const AddOrUpdate: React.FC<Props> = ({ modal, warehouseId }) => {
  const { visible, close, onOk, form, params, loading } = modal;
  const [storehouseId, setStorehouseId] = useState(warehouseId);
  const [customerText, setCustomerText] = useState();
  const [logisticsText, setLogistics] = useState();
  const [commodityRules, setCommodityRules] = useState();
  const [type, setType] = useState(WAVEPICKINGTYPE.toArray()[0].key);
  const [option] = useOptions(warehouseApply, { interval: Infinity });

  useEffect(() => {
    if (params) {
      form.setFieldsValue({
        ...params,
      });
      setStorehouseId(params.storehouseId);
    }
  }, [params]);
  // 根据仓库变更库区
  const [optionArea] = useOptions(areaApply, {
    params: storehouseId,
    callback: data => {
      if (data.options && data.options.length > 0) {
        const areaBatch = data.options.map(item => item.key);
        form.setFieldsValue({ areaBatch });
      } else {
        form.setFieldsValue({ areaBatch: undefined });
      }
    },
  });
  // 根据客户名称搜索
  const [customerOption] = useOptions(searchCustomerApply, {
    params: { name: customerText },
  });
  // 根据物流名称搜索
  const [logisticsOption] = useOptions(searchLogisticsApply, {
    params: { name: logisticsText },
  });
  const onSelected = ({ data }: { data: SearchWavePicking.SearchData }) => {
    if (!data) return message.warning('搜索数据错误');
    let customerInfo = undefined;
    if (data.customerInfo) {
      customerInfo = JSON.parse(data.customerInfo) as Array<{
        id: string;
        name: string;
      }>;
      customerInfo = customerInfo.map(c => ({ value: c.id, label: c.name }));
    }
    let logisticsChannelInfo = undefined;
    if (data.logisticsChannelInfo) {
      logisticsChannelInfo = JSON.parse(data.logisticsChannelInfo) as Array<{
        id: string;
        name: string;
      }>;
      logisticsChannelInfo = logisticsChannelInfo.map(l => ({
        value: l.id,
        label: l.name,
      }));
    }
    // 选中了搜索项，重新赋值表单值
    form.setFieldsValue({
      ...data,
      customerInfo,
      logisticsChannelInfo,
    });
    setType(data.waveType);
    setCommodityRules(data.commodityRules);
  };
  const layout = { labelCol: { span: 4 }, wrapperCol: { span: 18 } };
  const layout1 = { labelCol: { span: 11 }, wrapperCol: { span: 13 } };
  const onValuesChange = (changedValues: any) => {
    if ('waveType' in changedValues) {
      setType(changedValues.waveType);
    }
    if ('storehouseId' in changedValues) {
      setStorehouseId(changedValues.storehouseId);
    }
    if ('commodityRules' in changedValues) {
      setCommodityRules(changedValues.commodityRules);
    }
  };

  const checkCommas = (rule: any, value: string, callback: any) => {
    if (value && !COMMMASSEPARATE.test(value)) {
      callback('您输入的格式有误，仅支持数字，英文，和英文逗号');
      return;
    }
    callback();
  };

  return (
    <Modal
      title={`新建波次`}
      visible={visible}
      confirmLoading={loading}
      onCancel={close}
      onOk={() => onOk(option.menu.key(storehouseId)?.value)}
      width={750}
      maskClosable={false}
    >
      <Form
        form={form}
        {...layout}
        className={style.form}
        onValuesChange={onValuesChange}
      >
        <Form.Item
          label={'所属仓库'}
          name={'storehouseId'}
          initialValue={storehouseId}
          rules={[{ required: true, message: '请选择所属仓库' }]}
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
          label={'波次名称'}
          name={'waveName'}
          extra={<span>选择常用规则自动填充，点控件右边搜索</span>}
          rules={[{ required: true, message: '请选择波次名称' }]}
          initialValue={`BC${Date.now()}`}
        >
          <InputAndSearch
            placeholder="请输入"
            selectPlaceholder="输入您想要找的规则名称"
            apply={searchWavePickingApply}
            onSelected={onSelected}
            paramsChanged={value => ({ storehouseId, waveName: value })}
            maxLength={100}
          />
        </Form.Item>
        <Form.Item
          label={'波次类型'}
          name={'waveType'}
          rules={[{ required: true, message: '请选择波次类型' }]}
          initialValue={type}
        >
          <Radio.Group>
            {WAVEPICKINGTYPE.map(item => (
              <Radio key={item.key} value={item.key}>
                {item.value}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label={'订单数量上限'}
          name={'orderQuantityLimit'}
          rules={[{ required: true, message: '请输入订单数量上限' }]}
        >
          <InputNumber placeholder="请输入" min={1} max={10000} precision={0} />
        </Form.Item>
        {WAVEPICKINGTYPE.date.key !== type && (
          <>
            <Form.Item
              label={'商品规则'}
              name={'commodityRules'}
              rules={[
                {
                  required: WAVEPICKINGTYPE.commodity.key === type,
                  message: '请选择商品规则',
                },
              ]}
            >
              <Select
                getPopupContainer={triggerNode => triggerNode.parentNode}
                placeholder="请选择"
                allowClear
              >
                {COMMODITYRULE.map(item => (
                  <Select.Option key={item.key} value={item.key}>
                    {item.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            {commodityRules === COMMODITYRULE.sameSku.key && (
              <Form.Item
                label="相同sku订单数"
                name="sameSku"
                initialValue={[50, 1000]}
                rules={[
                  { required: true, message: '请输入上下限' },
                  { validator: NumberRangeValidator },
                ]}
              >
                <NumberRange
                  inputNumberProps={{ min: 1, max: 10000, precision: 0 }}
                />
              </Form.Item>
            )}
          </>
        )}
        {WAVEPICKINGTYPE.date.key !== type && (
          <>
            <Form.Item
              label={'订单类型'}
              name={'orderType'}
              rules={[
                {
                  required: WAVEPICKINGTYPE.order.key === type,
                  message: '请选择订单类型',
                },
              ]}
            >
              <Select
                getPopupContainer={triggerNode => triggerNode.parentNode}
                placeholder="请选择"
                allowClear
              >
                {ORDERTYPE.map(item => (
                  <Select.Option key={item.key} value={item.key}>
                    {item.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            {type === 2 && (
              <>
                <Form.Item
                  label={'母订单号'}
                  name={'shipmentsOrderIdList'}
                  rules={[
                    {
                      validator: checkCommas,
                      message:
                        '请输入正确的格式，仅支持数字，英文，且用英文逗号隔开',
                    },
                  ]}
                >
                  <Input placeholder="请输入订单号,多个请用英文逗号隔开" />
                </Form.Item>
                <Form.Item
                  label={'订单号'}
                  name={'orderIdList'}
                  rules={[
                    {
                      validator: checkCommas,
                      message:
                        '请输入正确的格式，仅支持数字，英文，且用英文逗号隔开',
                    },
                  ]}
                >
                  <Input placeholder="请输入订单号,多个请用英文逗号隔开" />
                </Form.Item>
                <Form.Item
                  label="是否国内"
                  name="isChina"
                  {...layout}
                  initialValue={ISCOUNTRYORDER.no.key}
                >
                  <Select
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    placeholder="全部"
                    allowClear
                  >
                    {ISCOUNTRYORDER.map(item => (
                      <Select.Option key={item.key} value={item.key}>
                        {item.value}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </>
            )}
          </>
        )}
        {WAVEPICKINGTYPE.date.key !== type && (
          <Form.Item
            label={'客户编号/客户名称'}
            name={'customerInfo'}
            rules={[
              {
                required: WAVEPICKINGTYPE.customer.key === type,
                message: '请选择客户名称',
              },
            ]}
          >
            <Select
              placeholder="模糊查询并选择"
              mode="multiple"
              onSearch={setCustomerText}
              filterOption={false}
              labelInValue
              notFoundContent={
                customerOption.loading ? <Spin size="small" /> : null
              }
            >
              {customerOption.menu.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}
        {WAVEPICKINGTYPE.date.key !== type && (
          <Form.Item
            label={'物流渠道'}
            name={'logisticsChannelInfo'}
            rules={[
              {
                required: WAVEPICKINGTYPE.logistics.key === type,
                message: '请选择物流渠道',
              },
            ]}
          >
            <Select
              placeholder="模糊查询并选择"
              mode="multiple"
              onSearch={setLogistics}
              filterOption={false}
              labelInValue
              notFoundContent={
                customerOption.loading ? <Spin size="small" /> : null
              }
            >
              {logisticsOption.menu.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}
        {WAVEPICKINGTYPE.date.key === type && (
          <Form.Item
            label="选择日期"
            name="date"
            rules={[{ required: true, message: '请选择日期' }]}
          >
            <DatePicker.RangePicker
              showTime={{ format: 'HH' }}
              format="YYYY-MM-DD HH"
            />
          </Form.Item>
        )}
        <Row>
          {WAVEPICKINGTYPE.date.key !== type && (
            <Col span={12}>
              <Form.Item
                label={'是否pod'}
                name={'whetherPod'}
                initialValue={COMMONBOOLEAN.false.key}
                {...layout1}
              >
                <Radio.Group>
                  {COMMONBOOLEAN.map(item => (
                    <Radio key={item.key} value={item.key}>
                      {item.value}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            </Col>
          )}
          {WAVEPICKINGTYPE.date.key !== type && (
            <Col span={12}>
              <Form.Item
                label={'是否顶层'}
                name={'whetherTop'}
                initialValue={COMMONBOOLEAN.false.key}
                {...layout1}
              >
                <Radio.Group>
                  {COMMONBOOLEAN.map(item => (
                    <Radio key={item.key} value={item.key}>
                      {item.value}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            </Col>
          )}
          {commodityRules === COMMODITYRULE.multi.key &&
            WAVEPICKINGTYPE.date.key !== type && (
              <Col span={12}>
                <Form.Item
                  label={'是否包装'}
                  name={'whetherPack'}
                  initialValue={COMMONBOOLEAN.false.key}
                  {...layout1}
                >
                  <Radio.Group>
                    {COMMONBOOLEAN.map(item => (
                      <Radio key={item.key} value={item.key}>
                        {item.value}
                      </Radio>
                    ))}
                  </Radio.Group>
                </Form.Item>
              </Col>
            )}
          <Col span={12}>
            <Form.Item
              label={'客户首发单优先处理'}
              name={'firstOrderType'}
              initialValue={COMMONBOOLEAN.true.key}
              {...layout1}
            >
              <Radio.Group>
                {COMMONBOOLEAN.map(item => (
                  <Radio key={item.key} value={item.key}>
                    {item.value1}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </Col>
          {WAVEPICKINGTYPE.date.key !== type && (
            <Col span={12}>
              <Form.Item
                label={'是否创建为常用规则'}
                name={'whetherCommonRules'}
                initialValue={0}
                {...layout1}
              >
                <Radio.Group>
                  {COMMONBOOLEAN.map(item => (
                    <Radio key={item.key} value={item.key}>
                      {item.value}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            </Col>
          )}
        </Row>
        {WAVEPICKINGTYPE.date.key !== type && (
          <Form.Item
            label={'按库区创建批次'}
            name={'areaBatch'}
            extra="(建议在大促期间启用）"
          >
            {optionArea.loading ? (
              <Skeleton active title={false} paragraph={{ rows: 2 }} />
            ) : (
              <Checkbox.Group>
                <Row>
                  {optionArea.menu.map(item => (
                    <Col span={4} key={item.key}>
                      <Checkbox value={item.key}>{item.value}</Checkbox>
                    </Col>
                  ))}
                  {optionArea.options.length === 0 && <span>暂无选项</span>}
                </Row>
              </Checkbox.Group>
            )}
          </Form.Item>
        )}
        <Form.Item label={'备注'} name={'remark'}>
          <Input.TextArea placeholder="请输入" rows={4} maxLength={200} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default connect(({ common }: any) => ({
  warehouseId: common.warehouseId,
}))(AddOrUpdate);
