import React, { useState } from 'react';
import { Tooltip } from 'antd';
import { IconFont } from '@/global';
import { OptionData } from '@/components/web/CJFilter/type';
import styles from './index.less';

interface DataType {
  value: string;
  key: string;
}

interface Props {
  initValue: string; // 默认展示的名称
  initKey: string; // 默认选中的key
  onchange?: (a: any) => void; // 选择后的回调
  options?: OptionData[];
  nodeCheck?: (a: string) => void; // 点击节点fun
  isLast?: boolean; // 是否最后一个
}

const MultiLevel = ({
  initValue = '',
  initKey = '',
  options = [],
  isLast = false,
  nodeCheck,
  onchange,
}: Props) => {
  const [visible, setVisible] = useState(false);
  const [defaultObj, setDefaultObj] = useState<DataType>({
    value: '',
    key: '',
  });
  const setNowItem = (item: DataType) => {
    setDefaultObj(item);
    setVisible(false);
    onchange && onchange(item);
  };
  /** 下拉菜单的显隐 */
  const onVisibleChange = (visible: boolean) => {
    setVisible(visible);
  };
  return (
    <div className={styles.multiLevel}>
      {isLast &&
        !!options.length &&
        toolTipRender({
          defaultObj,
          initKey,
          setNowItem,
          options,
          visible,
          onVisibleChange,
          initValue,
        })}
      {isLast &&
        !options.length &&
        noToolTipRender({
          initValue,
          visible,
          realLast: true,
          initKey,
          nodeCheck,
        })}
      {!isLast && noToolTipRender({ initValue, visible, initKey, nodeCheck })}
    </div>
  );
};

export default MultiLevel;

interface ToolTipRender {
  realLast?: boolean; // 是否最后一个
  initValue?: string; // 默认展示的name
  visible: boolean; // 菜单是否展开
  initKey: string; // 默认的key
  nodeCheck?: (a: string) => void;
}

const toolTipRender = ({
  defaultObj,
  initKey,
  setNowItem,
  options,
  visible,
  onVisibleChange,
  initValue,
}: any) => {
  const dropDom = (
    <div className="drop-menu">
      {options.map((item: DataType) => {
        const selectKey = defaultObj.key;
        return (
          <div
            className={`drop-menu-item ${
              selectKey === item.key && 'drop-menu-item-active'
            }`}
            onClick={() => setNowItem(item)}
            key={item.key}
          >
            {item.value}
          </div>
        );
      })}
    </div>
  );
  return (
    <Tooltip
      title={dropDom}
      overlayClassName={styles.multiLevelToolTip}
      visible={visible}
      placement="bottomLeft"
      onVisibleChange={(visible: boolean) => onVisibleChange(visible)}
    >
      <div className={styles['multi-level-select']}>
        <span className="select-text">{initValue}</span>
        <span className={`arrow ${visible && 'rotate-arrow'}`}>
          <IconFont type="icon-xiajiantou" />
        </span>
      </div>
    </Tooltip>
  );
};

const noToolTipRender = ({
  initValue,
  initKey,
  realLast,
  nodeCheck,
}: ToolTipRender) => (
  <div
    className={styles['multi-level-select']}
    onClick={() => {
      nodeCheck && nodeCheck(initKey);
    }}
  >
    <span className={`select-text ${!realLast && 'real-last-text'}`}>
      {initValue}
    </span>
    {!realLast && (
      <span className="arrow rotate-arrow">
        <IconFont
          type="icon-bianzu12"
          style={{ transform: 'rotate(-90deg)' }}
        />
      </span>
    )}
  </div>
);
