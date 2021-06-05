import React, { useState } from 'react';
import classnames from 'classnames';
import styles from './index.less';
import { OptionsType } from '../type';

interface Props {
  options: OptionsType[];
  onchange?: (a: string) => void;
}

const Categories = ({ options, onchange }: Props) => {
  /** 当前选中的key */
  const [activeKey, setActiveKey] = useState('');
  const [showMore, setShowMore] = useState(false);
  const leftCls = classnames({
    'categories-left': true,
    'categories-left-auto': showMore,
  });
  const selectCategories = (id: string) => {
    if (activeKey !== id) {
      setActiveKey(id);
      onchange && onchange(id);
    }
  };
  return (
    <div className={styles.categories}>
      <div className={leftCls}>
        {options.map((item: OptionsType) => {
          const cls = classnames({
            'categories-left-item': true,
            'categories-left-item-active': activeKey === item.id,
          });
          return (
            <div
              className={cls}
              key={item.id}
              onClick={() => selectCategories(item.id)}
            >
              {item.name}
            </div>
          );
        })}
      </div>
      <div className="categories-right" onClick={() => setShowMore(!showMore)}>
        <div className="less-or-more">{showMore ? 'Less' : 'More'}</div>
      </div>
    </div>
  );
};
export default Categories;
