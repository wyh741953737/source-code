import React, { ReactElement } from 'react';
import {
  CJScrollView,
  CJView,
  CJButton,
  CJText,
  CJInput,
} from '@/components/baseUI';
import { IconFont } from '@/global';
import { PRODUCTTYPE, DISCOUNT } from '@/enum.config';
import CategoryCard from './CategoryCard';
import useHooks from './hooks';
import styles from './styles';

interface HProps {
  children: ReactElement;
  /** 筛选 */
  handleOk: (arg?: any) => void;
  /** 取消筛选 */
  handleCancel?: (arg?: any) => void;
  /** 类目列表 */
  data: Array<any>;
}

export default (props: HProps) => {
  const { children, handleOk, data, handleCancel } = props;
  const {
    visible,
    showMenu,
    unshow,
    type,
    setFilterType,
    discount,
    setFilterDiscount,
    category,
    setCategory,
  } = useHooks();

  function handleConfirm() {
    handleOk &&
      handleOk({
        categoryId: category?.id,
        max: 1,
        min: 0,
        type,
        discount,
      });
    unshow();
  }

  function cancel() {
    handleCancel && handleCancel();
    unshow();
  }

  return (
    <CJView className={styles.filter_component}>
      <CJView onClick={showMenu}>
        {children || (
          <IconFont
            type="icon-bianzu40"
            style={{ fontSize: 24, color: '#969696' }}
          />
        )}
      </CJView>
      <CJView
        className={`${styles.filter_menu} ${
          visible ? styles.show : styles.hide
        }`}
      >
        <CJView className={`${styles.filter_inner_box} `}>
          <CJView className={styles.filter_detail}>
            <CJScrollView className={styles.detail_scroll}>
              <CategoryCard data={data} handleChange={setCategory} />
              <CJView className={styles.seperate_line} />
              <CJView className={styles.filter_item}>
                <CJView className={styles.filter_title}>
                  <CJText>{i18n.t('mobile-filter-price', 'Price')}</CJText>
                </CJView>
                <CJView className={styles.price_range}>
                  <CJInput
                    placeholder="Min"
                    size="large"
                    className={styles.input_price}
                  />
                  <CJView className={styles.range_line} />
                  <CJInput
                    placeholder="Max"
                    size="large"
                    className={styles.input_price}
                  />
                </CJView>
              </CJView>
              <CJView className={styles.seperate_line} />
              <CJView className={styles.filter_item}>
                <CJView className={styles.filter_title}>
                  <CJText>
                    {i18n.t('mobile-filter-type', 'Filter by Types')}
                  </CJText>
                </CJView>
                <CJView className={styles.filter_type}>
                  {PRODUCTTYPE.map((item) => (
                    <CJText
                      onClick={() => setFilterType(item.key as number)}
                      className={`${styles.category_item} ${
                        type === item.key ? styles.selected : ''
                      }`}
                      key={item.key}
                    >
                      {item.value}
                    </CJText>
                  ))}
                </CJView>
              </CJView>
              <CJView className={styles.seperate_line} />
              <CJView className={styles.filter_item}>
                <CJView className={styles.filter_title}>
                  <CJText>
                    {i18n.t(
                      'mobile-filter-discount',
                      'Special Services & Discount',
                    )}
                  </CJText>
                </CJView>
                <CJView className={styles.filter_type}>
                  {DISCOUNT.map((item) => (
                    <CJText
                      key={item.key}
                      onClick={() => setFilterDiscount(item.key as number)}
                      className={`${styles.category_item} ${
                        discount === item.key ? styles.selected : ''
                      }`}
                    >
                      {item.value}
                    </CJText>
                  ))}
                </CJView>
              </CJView>
            </CJScrollView>
            <CJView className={styles.detail_btn}>
              <CJButton className={styles.btn_first} onClick={cancel}>
                {i18n.t('mobile-filter-reset', 'Reset')}
              </CJButton>
              <CJButton onClick={handleConfirm} className={styles.btn_last}>
                {i18n.t('mobile-filter-confirm', 'Confirm')}
              </CJButton>
            </CJView>
          </CJView>
        </CJView>
      </CJView>
    </CJView>
  );
};
