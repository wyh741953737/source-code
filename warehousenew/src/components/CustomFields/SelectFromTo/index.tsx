import React, { useEffect, useState } from 'react';
import style from './index.less';
import { Select } from 'antd';
import Enum from '@/utils/enum';

type value = [any, any] | undefined;
interface SelectFromToProps {
  value?: value;
  onChange?: (v: value) => void;
  options: Enum;
  [name: string]: any;
}
export default (props: SelectFromToProps) => {
  const { value, onChange, options, id, ...selectProps } = props;
  const [val, setVal] = useState(value);
  useEffect(() => {
    setVal(value);
  }, [value]);
  const onValChange = (e: value) => {
    props.onChange && props.onChange(e);
    setVal(e);
  };
  return (
    <div className={style['custom-select-from-to']}>
      <span className={style.title}>从</span>
      <Select
        placeholder="请选择"
        value={val && val[0]}
        onChange={e => onValChange([e, val && val[1]])}
        {...selectProps}
      >
        {props.options.map(item => (
          <Select.Option key={String(item.key)} value={String(item.key)}>
            {item.value}
          </Select.Option>
        ))}
      </Select>
      <span className={style.title}>到</span>
      <Select
        placeholder="请选择"
        value={val && val[1]}
        onChange={e => onValChange([val && val[0], e])}
        {...selectProps}
      >
        {props.options.map(item => (
          <Select.Option key={String(item.key)} value={String(item.key)}>
            {item.value}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};
