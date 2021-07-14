import React, { useCallback, useEffect, useState } from 'react';
import { Form, Modal, InputNumber, Input, Select } from 'antd';
import { ModalProps } from '@/hooks/useModal';
import { EXCEPTIONPURCHASEDEALTYPE, LOGISTICS } from '@/enum.config';
import UploadOSS, { imageType } from '@/components/CustomFields/UploadOSS';
import { PlusOutlined } from '@ant-design/icons/lib';
import style from './index.less';
import * as uuid from 'uuid';
import * as regExp from '@/regExp.config';
import * as api from '@/services/exceptionPurchase';

interface Props {
  modal: ModalProps;
  readonly?: boolean;
}

const layout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
export default ({ modal, readonly }: Props) => {
  const { visible, close, onOk, form, params, loading } = modal;
  const [type, setType] = useState(1);
  const Component = EXCEPTIONPURCHASEDEALTYPE.key(type)?.form;
  const onValuesChange = (changedValues: any) => {
    if ('processType' in changedValues) {
      setType(changedValues.processType);
    }
  };
  useEffect(() => {
    if (params?.data) {
      const values = params.data;
      if (values.refundCertificate) {
        values.refundCertificate = values.refundCertificate
          .split(',')
          .map((item: any) => ({
            uid: uuid.v4(),
            status: 'done',
            url: item,
          }));
      }
      form.setFieldsValue(values);
    } else {
      form.resetFields();
      params &&
        form.setFieldsValue({
          returnNum: params[0].quantity,
        });
    }
    setType(params?.data?.processType || 1);
  }, [params]);
  return (
    <Modal
      title="异常处理"
      visible={visible}
      onCancel={close}
      onOk={() => onOk(params)}
      confirmLoading={loading}
      footer={readonly ? false : undefined}
    >
      <Form
        form={form}
        className={style['deal-form']}
        onValuesChange={onValuesChange}
      >
        <Form.Item
          {...layout}
          label="处理方式"
          name="processType"
          initialValue={params?.data?.processType || 1}
          rules={[{ required: true, message: '请选择处理方式' }]}
        >
          <Select
            getPopupContainer={triggerNode => triggerNode.parentNode}
            placeholder="请选择"
            disabled={readonly || params?.isUpdate}
          >
            {EXCEPTIONPURCHASEDEALTYPE.map(item => (
              <Select.Option key={item.key} value={item.key}>
                {item.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        {Component && <Component disabled={readonly} form={form} />}
      </Form>
    </Modal>
  );
};
/**
 * 仅补发、仅补发配件、部分签收
 * @param data
 * @constructor
 */
export const Form1 = ({ disabled }: any) => {
  return (
    <>
      <Form.Item
        {...layout}
        label="物流公司"
        name="logisticsCompany"
        rules={[{ required: true, message: '请选择物流公司' }]}
      >
        <Select
          getPopupContainer={triggerNode => triggerNode.parentNode}
          placeholder="请选择"
          disabled={disabled}
        >
          {LOGISTICS.map(item => (
            <Select.Option key={item.key} value={item.key}>
              {item.value}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        {...layout}
        label="追踪号"
        name="logisticsTrackingNumber"
        rules={[
          { required: true, message: '请输入追踪号' },
          { max: 100, message: '限制100字符' },
          { pattern: regExp.EN, message: '限制仅英文、数字' },
        ]}
      >
        <Input placeholder="请输入" disabled={disabled} />
      </Form.Item>
    </>
  );
};
/**
 * 仅退款
 * @param data
 * @constructor
 */
export const Form2 = ({ disabled }: any) => {
  const [focus, setFocus] = useState(false);
  const focusChange = () => {
    setFocus(true);
  };
  const blurChange = () => {
    setFocus(false);
  };
  return (
    <>
      <Form.Item
        {...layout}
        label="退款金额"
        name="refundAmount"
        rules={[{ required: true, message: '请输入退款金额' }]}
      >
        <InputNumber
          placeholder="请输入"
          min={0}
          max={100000}
          precision={2}
          disabled={disabled}
          onFocus={focusChange}
          onBlur={blurChange}
          formatter={value => {
            if (focus) {
              return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
            return `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }}
          parser={(value: any) => value.replace(/\￥\s?|(,*)/g, '')}
        />
      </Form.Item>
      <Form.Item
        {...layout}
        label="退款凭证"
        name="refundCertificate"
        extra="凭证格式：jpg,gif,jpeg,png"
      >
        <UploadOSS
          listType="picture-card"
          max={1}
          disabled={disabled}
          limit={{ type: imageType, size: 10 * 1024 * 1024 }}
        >
          <PlusOutlined style={{ fontSize: 30 }} />
        </UploadOSS>
      </Form.Item>
    </>
  );
};
/**
 * 仅退货换货
 * @param data
 * @constructor
 */
export const Form3 = ({ disabled }: any) => {
  return (
    <>
      <Form.Item {...layout} label="物流公司" name="logisticsCompany">
        <Select
          getPopupContainer={triggerNode => triggerNode.parentNode}
          placeholder="请选择"
          disabled={disabled}
        >
          {LOGISTICS.map(item => (
            <Select.Option key={item.key} value={item.key}>
              {item.value}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        {...layout}
        label="退货追踪号"
        name="returnTrackingNumber"
        rules={[
          { max: 100, message: '限制100字符' },
          { pattern: regExp.EN, message: '限制仅英文、数字' },
        ]}
      >
        <Input placeholder="请输入" disabled={disabled} />
      </Form.Item>
      <Form.Item
        {...layout}
        label="退货数量"
        name="returnNum"
        rules={[{ required: true, message: '请输入退货数量' }]}
      >
        <InputNumber
          placeholder="请输入"
          min={0}
          precision={0}
          disabled={true}
        />
      </Form.Item>
      <Form.Item
        {...layout}
        label="收件人"
        name="consignee"
        rules={[
          // { required: true, message: '请输入收件人' },
          { max: 50, message: '限制50字符' },
          {
            pattern: regExp.BLANKAROUND,
            message: '限制非纯空白字符并两边不能存在空白字符',
          },
        ]}
      >
        <Input placeholder="请输入" disabled={disabled} />
      </Form.Item>
      <Form.Item
        {...layout}
        label="联系电话"
        name="phone"
        rules={[
          // { required: true, message: '请输入联系电话' },
          { max: 50, message: '限制50字符' },
          { pattern: regExp.CONTACTNUM, message: '联系电话格式错误，请校对' },
        ]}
      >
        <Input placeholder="请输入" disabled={disabled} />
      </Form.Item>
      <Form.Item
        {...layout}
        label="退货地址"
        name="returnAddress"
        rules={[
          // { required: true, message: '请输入退货地址' },
          { max: 100, message: '限制100字符' },
          {
            pattern: regExp.BLANKAROUND,
            message: '限制非纯空白字符并两边不能存在空白字符',
          },
        ]}
      >
        <Input placeholder="请输入" disabled={disabled} />
      </Form.Item>
      <Form.Item
        {...layout}
        label="换货物流公司"
        name="changeLogisticsCompany"
        rules={[{ required: true, message: '请选择换货物流公司' }]}
      >
        <Select
          getPopupContainer={triggerNode => triggerNode.parentNode}
          placeholder="请选择"
          disabled={disabled}
        >
          {LOGISTICS.map(item => (
            <Select.Option key={item.key} value={item.key}>
              {item.value}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        {...layout}
        label="换货追踪号"
        name="changeLogisticsTrackingNumber"
        rules={[
          { required: true, message: '请输入换货追踪号' },
          { max: 100, message: '限制100字符' },
          { pattern: regExp.EN, message: '限制仅英文、数字' },
        ]}
      >
        <Input placeholder="请输入" disabled={disabled} />
      </Form.Item>
      <Form.Item
        {...layout}
        label="备注"
        name="remark"
        rules={[{ max: 200, message: '限制200字符' }]}
      >
        <Input.TextArea placeholder="请输入" rows={3} disabled={disabled} />
      </Form.Item>
    </>
  );
};
/**
 * 仅退货退款
 * @param data
 * @constructor
 */
export const Form4 = ({ disabled }: any) => {
  const [focus, setFocus] = useState(false);
  const focusChange = () => {
    setFocus(true);
  };
  const blurChange = () => {
    setFocus(false);
  };
  return (
    <>
      <Form.Item {...layout} label="物流公司" name="logisticsCompany">
        <Select
          getPopupContainer={triggerNode => triggerNode.parentNode}
          placeholder="请选择"
          disabled={disabled}
        >
          {LOGISTICS.map(item => (
            <Select.Option key={item.key} value={item.key}>
              {item.value}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        {...layout}
        label="退货追踪号"
        name="returnTrackingNumber"
        rules={[
          { max: 100, message: '限制100字符' },
          { pattern: regExp.EN, message: '限制仅英文、数字' },
        ]}
      >
        <Input placeholder="请输入" disabled={disabled} />
      </Form.Item>
      <Form.Item
        {...layout}
        label="退货数量"
        name="returnNum"
        rules={[{ required: true, message: '请输入退货数量' }]}
      >
        <InputNumber
          placeholder="请输入"
          min={0}
          precision={0}
          disabled={true}
        />
      </Form.Item>
      <Form.Item
        {...layout}
        label="收件人"
        name="consignee"
        rules={[
          // { required: true, message: '请输入收件人' },
          { max: 50, message: '限制50字符' },
          {
            pattern: regExp.BLANKAROUND,
            message: '限制非纯空白字符并两边不能存在空白字符',
          },
        ]}
      >
        <Input placeholder="请输入" disabled={disabled} />
      </Form.Item>
      <Form.Item
        {...layout}
        label="联系电话"
        name="phone"
        rules={[
          // { required: true, message: '请输入联系电话' },
          { max: 50, message: '限制50字符' },
          { pattern: regExp.CONTACTNUM, message: '联系电话格式错误，请校对' },
        ]}
      >
        <Input placeholder="请输入" disabled={disabled} />
      </Form.Item>
      <Form.Item
        {...layout}
        label="退货地址"
        name="returnAddress"
        rules={[
          // { required: true, message: '请输入退货地址' },
          { max: 200, message: '限制200字符' },
          {
            pattern: regExp.BLANKAROUND,
            message: '限制非纯空白字符并两边不能存在空白字符',
          },
        ]}
      >
        <Input placeholder="请输入" disabled={disabled} />
      </Form.Item>
      <Form.Item
        {...layout}
        label="备注"
        name="remark"
        rules={[{ max: 200, message: '限制200字符' }]}
      >
        <Input.TextArea placeholder="请输入" rows={3} disabled={disabled} />
      </Form.Item>
      <Form.Item
        {...layout}
        label="退款金额"
        name="refundAmount"
        rules={[{ required: true, message: '请输入退款金额' }]}
      >
        <InputNumber
          placeholder="请输入"
          min={0}
          max={100000}
          precision={2}
          disabled={disabled}
          onFocus={focusChange}
          onBlur={blurChange}
          formatter={value => {
            if (focus) {
              return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
            return `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }}
          parser={(value: any) => value.replace(/\￥\s?|(,*)/g, '')}
        />
      </Form.Item>
      <Form.Item
        {...layout}
        label="退款凭证"
        name="refundCertificate"
        extra="凭证格式：jpg,gif,jpeg,png"
      >
        <UploadOSS
          listType="picture-card"
          max={1}
          disabled={disabled}
          limit={{ type: imageType, size: 10 * 1024 * 1024 }}
        >
          <PlusOutlined style={{ fontSize: 30 }} />
        </UploadOSS>
      </Form.Item>
    </>
  );
};
/**
 * 合格
 * @param data
 * @constructor
 */
export const Form5 = ({ disabled }: any) => {
  return (
    <>
      <Form.Item
        {...layout}
        label="备注"
        name="remark"
        rules={[{ max: 200, message: '限制200字符' }]}
      >
        <Input.TextArea placeholder="请输入" rows={3} disabled={disabled} />
      </Form.Item>
    </>
  );
};
/**
 * 更改SKU
 * @param data
 * @constructor
 */
export const Form6 = ({ disabled, form }: any) => {
  const checkSku = (rule: any, value: string, callback: any) => {
    if (value) {
      api.validateSku({ ids: [value] }).then(resp => {
        if (resp && resp.data.length === 0) {
          callback('SKU不存在,请重新输入');
          return Promise.reject();
        } else {
          callback();
          return Promise.resolve();
        }
      });
    }
  };
  return (
    <>
      <Form.Item
        {...layout}
        label="更改后SKU名称"
        name="afterReplacementSku"
        validateTrigger="onBlur"
        rules={[
          { required: true, message: '请输入更改后SKU名称' },
          { max: 100, message: '限制100字符' },
          { validator: checkSku },
        ]}
      >
        <Input placeholder="请输入" disabled={disabled} />
      </Form.Item>
      <Form.Item
        {...layout}
        label="备注"
        name="remark"
        rules={[{ max: 200, message: '限制200字符' }]}
      >
        <Input.TextArea placeholder="请输入" rows={3} disabled={disabled} />
      </Form.Item>
    </>
  );
};
