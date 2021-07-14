import React, { useEffect, useState } from 'react';
import { Modal, Form, Select, Row, Col, message } from 'antd';
import style from '../index.less';
import { ModalProps } from '@/hooks/useModal';
import { connect } from 'dva';
import { GetErpUserInfo } from '@/services/putawayManage.d';
import * as api from '@/services/putawayManage';

interface Props {
  modal: ModalProps;
  warehouseId: string;
}

const { Option } = Select;
let timeout: any = null;
let currentValue;
export default connect(({ common }: any) => ({
  warehouseId: common.warehouseId,
}))(({ modal, warehouseId }: Props) => {
  const { visible, close, onOk, form, params, loading } = modal;
  const [userArr, setUserArr] = useState<Array<any>>([]);
  const layout = { labelCol: { span: 9 }, wrapperCol: { span: 15 } };
  useEffect(() => {
    if (params) {
      form.resetFields();
      form.setFieldsValue({
        ...params,
      });
    } else {
      form.resetFields();
    }
  }, [params]);
  useEffect(() => {
    setUserArr([]);
  }, [visible]);
  const onValuesChange = (changedValues: any) => {
    if ('storehouseId' in changedValues) {
      form.setFieldsValue({ areaName: undefined });
    }
  };

  function fetch(value: string, callback: Function) {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    currentValue = value;

    const fake = async () => {
      if (!value.trim()) return message.warn('查询字符不能为空');
      const data = { name: value };
      const resp = await api.getErpUserInfo(data);
      let newData: Array<{ value: string; text: string }> = [];
      if (resp.data && resp.data.length > 0) {
        newData = resp.data.map((item: GetErpUserInfo.ResponseItem) => ({
          value: item.id,
          text: item.name,
        }));
      }
      callback(newData);
    };
    timeout = setTimeout(fake, 500);
  }

  const handleSearch = (value: string) => {
    if (value) {
      fetch(value, (data: any) => setUserArr(data));
    } else {
      setUserArr([]);
    }
  };
  return (
    <Modal
      title={`重新指派`}
      visible={visible}
      width={500}
      destroyOnClose={true}
      wrapClassName={style['add-or-update-modal']}
      confirmLoading={loading}
      onCancel={close}
      onOk={() => onOk({ ...params, userArr })}
    >
      <Form form={form} onValuesChange={onValuesChange}>
        <Row className={style.row}>
          <Col span={22}>
            <Form.Item label="上架单号" {...layout}>
              {params ? params.onShelfNum : '-'}
            </Form.Item>
          </Col>
          <Col span={22}>
            <Form.Item
              label={'指派用户'}
              name={'userIds'}
              {...layout}
              rules={[{ required: true, message: '请指派用户' }]}
            >
              <Select
                showSearch
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={handleSearch}
                notFoundContent={null}
                mode="multiple"
              >
                {userArr.map(d => (
                  <Option value={d.value} key={d.value}>
                    {d.text}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
});
