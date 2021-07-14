import React, { useEffect, useState } from 'react';
import { Space, Button } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';
import style from './index.less';

type Key = string | number;
type Option = {
  key: Key;
  value: string;
  code?: string;
};
interface Props {
  options: Array<Option>;
  value?: Key | Array<Key>;
  onChange?: (value: Key | Array<Key> | undefined) => void;
  multiple?: boolean;
  size?: SizeType;
  hideAll?: boolean;
  isHuth?: boolean;
}

/**
 * 平铺方式的select控件
 */
const TileSelect: React.FC<Props> = ({
  options,
  value,
  onChange,
  multiple,
  size,
  hideAll,
  isHuth = false,
}) => {
  const [val, setVal] = useState();
  useEffect(() => {
    setVal(value);
  }, [value]);
  const onClick = (key: Key) => {
    if (!multiple) {
      setVal(key);
      onChange && onChange(key);
      return;
    }
    let nextValue: Array<Key> =
      val instanceof Array ? [...val] : [val].filter(Boolean);
    if (nextValue.find(n => n === key)) {
      nextValue = nextValue.filter(n => n !== key);
    } else {
      nextValue.push(key);
    }
    setVal(nextValue);
    onChange && onChange(nextValue);
  };
  const onClickAll = () => {
    setVal(undefined);
    onChange && onChange(undefined);
  };
  const selectStatus = (key: Key) => {
    if (!multiple) return val === key;
    return (val || []).includes(key);
  };

  return (
    <div className={style['tile-select']}>
      {!hideAll && (
        <Button
          size={size}
          type={val === undefined ? 'primary' : 'default'}
          onClick={onClickAll}
        >
          全部
        </Button>
      )}
      {options.map(item => {
        if (isHuth && 'code' in item) {
          // 权限控制
          return (
            <AuthJudge code={item?.code || ''}>
              <Button
                key={item.key}
                size={size}
                onClick={() => onClick(item.key)}
                type={selectStatus(item.key) ? 'primary' : 'default'}
              >
                {item.value}
              </Button>
            </AuthJudge>
          );
        }
        return (
          <Button
            key={item.key}
            size={size}
            onClick={() => onClick(item.key)}
            type={selectStatus(item.key) ? 'primary' : 'default'}
          >
            {item.value}
          </Button>
        );
      })}
    </div>
  );
};
export default TileSelect;
