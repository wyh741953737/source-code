import React from 'react';
import { CJText, CJView } from '@/components/baseUI';
import { IconFont } from '@/global';
import useHooks from './hooks';
import styles from './index.less';

/** 类目节点 */
export interface ListItem {
  /** 类目名称 */
  name: string;
  /** 其他参数 */
  [name: string]: any;
}

// export interface DataProps {
//   /** 类目标题 */
//   // title?: string;
//   /** 子类目数组 */
//   list: Array<ListItem>;
// }
interface HProps {
  /** 类目数据 */
  data: Array<ListItem>;
  /** 筛选变更 */
  handleChange: (arg?: ListItem) => void;
}

/** 类目卡片 */
export default (props: HProps) => {
  const { data = [], handleChange } = props;
  const { open, handleSetOpen, select, setSelect } = useHooks();

  function selectCagegory(item: ListItem) {
    let selected: ListItem | undefined = item;
    if (select.name === item.name) {
      selected = undefined;
    }
    setSelect(selected);
    handleChange(selected);
  }

  return (
    <CJView className={styles.category_card}>
      <CJView className={styles.title_box}>
        <CJText className={styles.title}>
          {i18n.t('category-card-title', 'Related Categories')}
        </CJText>
        <IconFont
          onClick={handleSetOpen}
          type="icon-xiajiantou"
          className={`${styles.icon_arrow_down} ${
            open ? styles.arrow_reverse : null
          }`}
        />
      </CJView>
      <CJView className={styles.category_box}>
        {data.map((item: ListItem, index: number) => {
          if (!open && index >= 4) return null;
          return (
            <CJText
              onClick={() => selectCagegory(item)}
              key={index}
              className={`${styles.category_item} ${
                select?.name === item.name ? styles.selected : null
              }`}
            >
              {item.name}
            </CJText>
          );
        })}
      </CJView>
    </CJView>
  );
};
