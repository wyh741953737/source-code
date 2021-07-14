import React, { FC, useEffect, useState } from 'react';
import { InputNumber } from 'antd';
import style from './index.less';
import { InputNumberProps } from 'antd/lib/input-number';

type Value = [number | undefined, number | undefined] | undefined;

interface Props {
  placeholders?: [string, string];
  linkStr?: string;
  value?: Value;
  onChange?: (v: Value) => void;
  inputNumberProps?: InputNumberProps;
}

const NumberRange: FC<Props> = ({
  placeholders = [],
  linkStr,
  value,
  onChange,
  inputNumberProps,
}) => {
  const [val, setVal] = useState<Value>(value);
  useEffect(() => {
    setVal(value);
  }, [value]);
  const onValueChange = (e: any, index: number) => {
    if (index) {
      onChange && onChange([val && val[0], e]);
      setVal([val && val[0], e]);
    } else {
      onChange && onChange([e, val && val[1]]);
      setVal([e, val && val[1]]);
    }
  };
  return (
    <div className={style['number-range']}>
      <InputNumber
        placeholder={placeholders[0] || '请输入下限'}
        value={val && val[0]}
        onChange={e => onValueChange(e, 0)}
        {...inputNumberProps}
      />
      <span className={style.link}>{linkStr || '-'}</span>
      <InputNumber
        placeholder={placeholders[1] || '请输入上限'}
        value={val && val[1]}
        onChange={e => onValueChange(e, 1)}
        {...inputNumberProps}
      />
    </div>
  );
};
export default NumberRange;
export const NumberRangeValidator = async function(rules: any, value: Value) {
  if (!value) return;
  const [min, max] = value || [];
  if (!min) return Promise.reject('请输入下限');
  if (!max) return Promise.reject('请输入上限');
  if (min >= max) return Promise.reject('上限必须大于下限');
};
