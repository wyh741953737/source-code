import React, { FC, FunctionComponent, useState } from 'react';
import { Select, Form } from 'antd';
import useChanged from '@/hooks/useChanged';

interface Props extends Omit<FunctionComponent, 'children'> {
  /**
   * 前置选择
   */
  options: Array<{
    /**
     * 建议使用对应字段的key作为key
     */
    key: string;
    /**
     * 对应字段名称
     */
    value: string;
    /**
     * 对应选中key的placeholder
     */
    placeholder?: string;
  }>;
  /**
   * 初始化选择的key
   */
  initialOptionKey?: string;
  /**
   * 每次前置选择发生变化的回调
   * @param option
   */
  onOptionChange?: (option: string) => void;
  children: React.ReactElement | Array<React.ReactElement>;

  [n: string]: any;
}

const GangedFormItem: FC<Props> = ({
  children,
  options,
  initialOptionKey,
  onOptionChange,
  ...args
}) => {
  const [option, setOption] = useState<string>(
    initialOptionKey || options[0]?.key,
  );
  useChanged(() => {
    onOptionChange && onOptionChange(option);
  }, [option]);
  const index = options.findIndex(o => o.key === option);
  const label = (
    <Select
      value={option}
      onChange={setOption}
      style={{ transform: 'translateX(5px)' }}
    >
      {options.map(o => (
        <Select.Option key={o.key} value={o.key}>
          {o.value}
        </Select.Option>
      ))}
    </Select>
  );
  let Element: React.ReactElement = <div />;
  if (Array.isArray(children)) Element = children[index] as React.ReactElement;
  else Element = children;
  return (
    <Form.Item
      {...args}
      key={option}
      label={label}
      name={option}
      colon={false}
      htmlFor={''}
    >
      {React.cloneElement(Element, {
        ...Element.props,
        placeholder: options.find(o => o.key === option)?.placeholder,
      })}
    </Form.Item>
  );
};

export default GangedFormItem;
