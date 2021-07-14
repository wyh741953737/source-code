import React, { useEffect, useState } from 'react';
import {
  Modal,
  Form,
  Select,
  Row,
  Col,
  Button,
  message,
  InputNumber,
} from 'antd';
import style from '../index.less';

import { ModalProps } from '@/hooks/useModal';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { connect } from 'dva';
import UploadOSS from '@/components/CustomFields/UploadOSS';
import { UploadOutlined } from '@ant-design/icons';
import * as api from '@/services/weightConfig';
import { GetLogisticNumberList } from '@/services/weightConfig.d';
interface Props {
  modal: ModalProps;
  logisticData: Array<any>;
}

export default connect(({ weightConfig }: any) => ({
  logisticData: weightConfig.logisticData,
}))(({ modal, logisticData }: Props) => {
  const { visible, close, onOk, form, params, loading } = modal;
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const [logisticNumberData, setLogisticNumber] = useState<
    Array<GetLogisticNumberList.Data>
  >([]);
  const [logisticsCompany, setLogisticsCompany] = useState<string>('');
  const [storehouseName, setStorehouseName] = useState<string>('');

  const isUpdate = params && params.id ? true : false;
  const layout = { labelCol: { span: 7 }, wrapperCol: { span: 17 } };
  useEffect(() => {
    if (params) {
      form.setFieldsValue({
        ...params,
        storehouseId: params.storehouseId,
        firstOrder: Number(params.firstOrder),
        firstCustomer: Number(params.firstCustomer),
      });
    } else {
      form.resetFields();
    }
  }, [params]);
  const onValuesChange = (changedValues: any) => {
    if ('storehouseId' in changedValues) {
      //   form.setFieldsValue({ areaName: undefined });
    }
  };

  const confirmOk = async () => {
    const values = await form.validateFields();
    if (values.files.length > 0 && values.files[0].status !== 'done') {
      message.warn('附件还没有上传成功！请稍等一会');
      return false;
    } else {
      onOk({ ...params, logisticsCompany, storehouseName });
    }
  };

  const logisticChange = async (value: any, option: any) => {
    const resp = await api.getLogisticNumberList({ id: option.key });
    setLogisticNumber(resp.data);
    setLogisticsCompany(option.children);
    form.setFieldsValue({ companyAccount: undefined });
  };
  const storeChange = async (value: any, option: any) => {
    setStorehouseName(option.children);
  };
  const validateItem = (rule: any, value: any) => {
    if (logisticNumberData.length > 0 && !value) {
      return Promise.reject('请选择物流账号');
    }
    return Promise.resolve();
  };

  return (
    <Modal
      title={`${isUpdate ? '修改' : '新增'}框位`}
      visible={visible}
      width={600}
      destroyOnClose={true}
      wrapClassName={style['add-or-update-modal']}
      confirmLoading={loading}
      onCancel={close}
      onOk={confirmOk}
    >
      <Form form={form} onValuesChange={onValuesChange} preserve={false}>
        <Row>
          <Col span={23}>
            <Form.Item
              label={'所属框位'}
              name={'frameLocation'}
              {...layout}
              rules={[{ required: true, message: '请输入所属框位' }]}
            >
              <InputNumber
                placeholder="请输入所属框位"
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item
              label={'物流公司'}
              name={'logisticsCode'}
              {...layout}
              rules={[{ required: true, message: '请选择物流公司' }]}
            >
              <Select
                placeholder={'请选择'}
                showSearch
                filterOption={(input: any, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                onChange={logisticChange}
              >
                {logisticData.map(item => (
                  <Select.Option key={item.id} value={item.companyCode}>
                    {item.companyCnName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label={'物流账号'}
              name={'companyAccount'}
              {...layout}
              rules={[{ validator: validateItem }]}
            >
              <Select
                placeholder={'请选择'}
                showSearch
                filterOption={(input: any, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {logisticNumberData.map(item => (
                  <Select.Option key={item.id} value={item.accountName}>
                    {item.accountName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label={'仓库'}
              name={'storehouseId'}
              {...layout}
              rules={[{ required: true, message: '请选择仓库' }]}
            >
              <Select
                placeholder={'请选择'}
                showSearch
                filterOption={(input: any, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                onChange={storeChange}
              >
                {option.menu.map(item => (
                  <Select.Option key={item.key} value={item.key}>
                    {item.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              {...layout}
              label="音频文件"
              name="files"
              extra="支持扩展名：.mp3"
              rules={[{ required: true, message: '请上传音频文件' }]}
            >
              <UploadOSS
                listType="text"
                accept=".mp3"
                max={1}
                limit={{
                  type: ['mpeg', 'mp3', 'mpeg-4', 'midi', 'wma'],
                  size: 20 * 1024 * 1024,
                }}
              >
                <Button icon={<UploadOutlined />}>上传文件</Button>
              </UploadOSS>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
});
