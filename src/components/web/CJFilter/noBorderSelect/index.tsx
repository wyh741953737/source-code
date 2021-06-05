import React, { useState } from 'react';
import { Tooltip } from 'antd';
import { IconFont } from '@/global';
import styles from './index.less';
import { OptionData } from '../type';

interface DataType {
  value: string;
  key: string;
}

interface Props {
  initValue?: string; // 默认展示的名称
  initKey?: string; // 默认选中的key
  onchange?: (a: string) => void; // 选择后的回调
  options?: OptionData[]; // 渲染下拉菜单dom的数据
}

const Index = ({
  initValue = '',
  initKey = '',
  options = [],
  onchange,
}: Props) => {
  const [visible, setVisible] = useState(false);
  const [defaultObj, setDefaultObj] = useState<DataType>({
    value: '',
    key: '',
  });
  /** 选择某一项的方法 */
  const setNowItem = (item: DataType) => {
    setDefaultObj(item);
    setVisible(false);
    onchange && onchange(item.key);
  };
  /** 下拉菜单数据 */
  const dropDom = (
    <div className="drop-menu">
      {options.map((item: DataType) => {
        const selectKey = defaultObj.key ? defaultObj.key : initKey;
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
  /** 下拉菜单的显隐 */
  const onVisibleChange = (visible: boolean) => {
    setVisible(visible);
  };
  return (
    <Tooltip
      title={dropDom}
      overlayClassName={styles.selectToolTip}
      visible={visible}
      placement="bottomLeft"
      onVisibleChange={(visible: boolean) => onVisibleChange(visible)}
    >
      <div className={styles['no-border-select']}>
        <span className="select-text">
          {defaultObj.value ? defaultObj.value : initValue}
        </span>
        <span className={`arrow ${visible && 'rotate-arrow'}`}>
          <IconFont type="icon-xiajiantou" />
        </span>
      </div>
    </Tooltip>
  );
};

export default Index;
