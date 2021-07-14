import React, { useEffect } from 'react';
import { IconFont } from '@/global';
import useHooks, { Flg, CurrencyObj, flagList } from './hooks';
import styles from './styles';

interface WProps {}

/** 选择语言组件 */
const CJLanguage: React.FC = (props: WProps) => {
  const {} = props;
  const {
    visible,
    lanVisible,
    curVisible,
    language,
    tempLanguage,
    currency,
    tempCurrency,
    currencyList,
    showMenu,
    close,
    showLanguage,
    showCurrency,
    clickDropdown,
    selectLanguage,
    selectCurrency,
    getFlgSrc,
    saveLanCur,
  } = useHooks();

  useEffect(() => {
    document.body.addEventListener('click', close);
    return (): void => {
      document.body.removeEventListener('click', close);
    };
  }, []);

  return (
    <div onClick={showMenu} className={styles.cjLanguage}>
      <div className={styles.languageTitle}>
        <span className={styles.right10}>Language</span>
        <img
          className={`${styles.flag} ${styles.right10}`}
          src={getFlgSrc(language)}
          alt=""
        />
        <span> /&nbsp;&nbsp;{currency.currency}</span>
        <span
          className={`${styles.arrow} ${
            visible ? styles.arrowUp : styles.arrowDown
          }`}
        />
      </div>
      <div
        onClick={clickDropdown}
        className={`${styles.dropdownMenu} ${
          visible ? styles.dropdownVisible : styles.dropdownHide
        }`}
      >
        <div className={styles.outerBox}>
          <div className={styles.label}>Language</div>
          <div onClick={showLanguage} className={styles.component}>
            <span className={styles.selected}>
              <img
                className={`${styles.flag} ${styles.right10}`}
                src={getFlgSrc(tempLanguage)}
                alt=""
              />
              <span>{tempLanguage.name}</span>
            </span>
            <span
              className={`${styles.arrow} ${
                lanVisible ? styles.arrowUp : styles.arrowDown
              }`}
            />
            <div className={styles.languageList}>
              {flagList.map((item: Flg) => (
                <div
                  onClick={(): void => selectLanguage(item)}
                  key={item.name}
                  className={styles.languageItem}
                >
                  {item.name === tempLanguage.name && (
                    <IconFont
                      className={styles.right10}
                      type="icon-lujing1"
                      style={{ color: '#ff7700', fontSize: 16 }}
                    />
                  )}
                  {item.name !== tempLanguage.name && (
                    <span className={`${styles.empty} ${styles.right10}`} />
                  )}
                  <img
                    className={`${styles.flag} ${styles.right10}`}
                    src={getFlgSrc(item)}
                    alt=""
                  />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.label}>Currency</div>
          <div onClick={showCurrency} className={styles.component}>
            <span>{tempCurrency.currency}</span>
            <span
              className={`${styles.arrow} ${
                curVisible ? styles.arrowUp : styles.arrowDown
              }`}
            />
            <div className={styles.currencyList}>
              {currencyList.map((item: CurrencyObj) => (
                <div
                  onClick={(): void => selectCurrency(item)}
                  key={item.currency}
                  className={styles.languageItem}
                >
                  {item.currency === tempCurrency.currency && (
                    <IconFont
                      className={styles.right10}
                      type="icon-lujing1"
                      style={{ color: '#ff7700', fontSize: 16 }}
                    />
                  )}
                  {item.currency !== tempCurrency.currency && (
                    <span className={`${styles.empty} ${styles.right10}`} />
                  )}
                  {item.currency}
                </div>
              ))}
            </div>
          </div>
          <div onClick={saveLanCur} className={styles.btn}>
            Confirm
          </div>
        </div>
      </div>
    </div>
  );
};

export default CJLanguage;
