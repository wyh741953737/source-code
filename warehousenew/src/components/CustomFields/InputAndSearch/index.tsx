import React, { FC, useEffect, useState } from 'react';
import { Input, Select, Spin } from 'antd';
import { InputProps } from 'antd/lib/input';
import { FileSearchOutlined } from '@ant-design/icons/lib';
import style from './index.less';
import useOptions, { Apply } from '@/hooks/useOptions';

interface Props extends InputProps {
  selectPlaceholder?: string;
  apply: Apply;
  onSelected?: (e: any) => void;
  paramsChanged?: (value: string) => any;
}

const InputAndSearch: FC<Props> = ({
  selectPlaceholder,
  apply,
  onSelected,
  paramsChanged,
  ...inputProps
}) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState();
  const [searchText, setSearchText] = useState();
  const [option] = useOptions(apply, {
    params: paramsChanged ? paramsChanged(searchText) : searchText,
    interval: 500,
  });
  return (
    <div className={style['input-and-search']}>
      <Input
        {...inputProps}
        addonAfter={<FileSearchOutlined onClick={() => setVisible(!visible)} />}
      />
      {visible && (
        <Select
          showSearch
          filterOption={false}
          placeholder={selectPlaceholder}
          value={value}
          autoFocus
          loading={option.loading}
          onChange={e => {
            onSelected && onSelected(option.menu.key(e));
            setValue(e);
          }}
          notFoundContent={option.loading ? <Spin size="small" /> : null}
          onSearch={e => setSearchText(e)}
          className={style.select}
        >
          {option.menu.map(item => (
            <Select.Option key={item.key} value={item.key}>
              {item.value}
            </Select.Option>
          ))}
        </Select>
      )}
    </div>
  );
};
export default InputAndSearch;
