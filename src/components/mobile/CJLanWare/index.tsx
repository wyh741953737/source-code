import React, { ReactElement } from 'react';
import { CJView, CJText, CJScrollView } from '@/components/baseUI';
import { IconFont } from '@/global';
import useHooks, { flagList, warehouseList, Flg } from './hooks';
import styles from './styles';

interface HProps {
  /** 子节点 */
  children: string | ReactElement;
  /** 列表高度 */
  height?: number | string;
}

/** 语言仓库切换组件 */
export default (props: HProps) => {
  const { children, height } = props;
  const {
    visible,
    showMenu,
    unshow,
    active,
    setActive,
    language,
    setLanguage,
    warehouse,
    setWarehouse,
  } = useHooks();
  return (
    <CJView className={styles.language_currency}>
      <CJView onClick={showMenu}>
        {children || (
          <IconFont
            type="icon-bianzu40"
            style={{ fontSize: 24, color: '#969696' }}
          />
        )}
      </CJView>
      {visible && <CJView className={styles.mask} />}
      <CJView
        className={`${styles.lan_cur_list} ${
          visible ? styles.show : styles.hide
        }`}
      >
        <CJView className={styles.menus} h5Style={{ height }}>
          <CJView className={styles.menu_title}>
            <CJText className={styles.title_text}>
              {i18n.t('mobile-language-warehouse-setting', 'Setting')}
            </CJText>
            <CJView className={styles.close_btn} onClick={unshow}>
              <IconFont className={styles.close_icon} type="icon-guanbi" />
            </CJView>
          </CJView>
          <CJView className={`${styles.tabs} ${styles[`tab_${active}`]}`}>
            <CJText
              onClick={() => setActive(1)}
              className={`${styles.each_tab} ${
                active === 1 ? styles.active : null
              }`}
            >
              {i18n.t('mobile-tab-warehouse', 'Change Warehouse')}
            </CJText>
            <CJText
              onClick={() => setActive(2)}
              className={`${styles.each_tab} ${
                active === 2 ? styles.active : null
              }`}
            >
              {i18n.t('mobile-tab-language', 'Change Language')}
            </CJText>
          </CJView>
          <CJScrollView className={styles.flg_list}>
            {active == 1 &&
              warehouseList.map((item: any) => (
                <CJView
                  onClick={() => {
                    setWarehouse(item);
                  }}
                  className={styles.flg_item}
                  key={item.name}
                >
                  <CJText className={styles.item_left}>{item.name}</CJText>
                  {warehouse.name === item.name && (
                    <IconFont
                      className={styles.item_right}
                      type="icon-lujing1"
                      style={{ color: '#ff7700', fontSize: 16 }}
                    />
                  )}
                </CJView>
              ))}
            {active == 2 &&
              flagList.map((item: Flg) => (
                <CJView
                  onClick={() => {
                    setLanguage(item);
                  }}
                  className={styles.flg_item}
                  key={item.name}
                >
                  <CJText className={styles.item_left}>{item.name}</CJText>
                  {language.name === item.name && (
                    <IconFont
                      className={styles.item_right}
                      type="icon-lujing1"
                      style={{ color: '#ff7700', fontSize: 16 }}
                    />
                  )}
                </CJView>
              ))}
          </CJScrollView>
        </CJView>
      </CJView>
    </CJView>
  );
};
