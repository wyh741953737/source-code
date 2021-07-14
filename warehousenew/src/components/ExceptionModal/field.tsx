import React, { useEffect, useState } from 'react';
import { Checkbox, Col, Form, Input, InputNumber, Row } from 'antd';
import style from './index.less';

type Value = {
  checked?: boolean;
  count?: number;
  remark?: string | undefined;
};
interface Props {
  title: string;
  value?: Value;
  onChange?: (v: Value) => void;
}
export default ({ title, value, onChange }: Props) => {
  const [checked, setChecked] = useState<boolean | undefined>(false);
  const [count, setCount] = useState<number | undefined>(0);
  const [remark, setRemark] = useState<string | undefined>();
  const onNameChange = (e: any) => {
    const checked = e.target.checked;
    setChecked(checked);
    onChange && onChange({ ...value, checked });
  };
  const onCountChange = (e: any) => {
    const count = isNaN(Number(e)) ? 0 : Number(e);
    setCount(count);
    onChange && onChange({ ...value, count });
  };
  const onRemarkChange = (e: any) => {
    const remark = e.target.value;
    setRemark(remark);
    onChange && onChange({ ...value, remark });
  };
  useEffect(() => {
    setChecked(value?.checked);
    setCount(value?.count);
    setRemark(value?.remark);
  }, [value]);
  return (
    <Row className={style.field}>
      <Col span={5}>
        <Form.Item labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
          <Checkbox checked={checked} onChange={onNameChange}>
            {title}
          </Checkbox>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          label="数量"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          required={checked}
        >
          <InputNumber
            placeholder="请输入"
            value={count}
            min={0}
            disabled={!checked}
            onChange={onCountChange}
            precision={0}
          />
        </Form.Item>
      </Col>
      <Col span={11}>
        <Form.Item
          label="备注"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
        >
          <Input
            placeholder="请输入"
            value={remark}
            disabled={!checked}
            maxLength={100}
            onChange={onRemarkChange}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};
