import React, { useState, useRef } from 'react';
import { IconFont } from '@/global';
import styles from './styles';

interface WProps {
  onSearch: (arg: string) => void;
}

/** 搜索组件 */
const CJSearch = (props: WProps): any => {
  const { onSearch } = props;
  const inputTimerRef: any = useRef();
  const searchRef: any = useRef();
  const [val, setVal] = useState<any>();

  function handleSearch() {
    searchRef.current && clearTimeout(searchRef.current);
    searchRef.current = setTimeout(() => {
      onSearch && onSearch(val);
    }, 100);
  }

  function handleChange(e: any) {
    inputTimerRef.current && clearTimeout(inputTimerRef.current);
    inputTimerRef.current = setTimeout(() => {
      setVal(e.target.value);
    }, 100);
  }

  function handleKeyDown(e: any) {
    if (e.keyCode != 13) return;
    handleSearch();
  }
  return (
    <div className={styles.cjSearch}>
      <div className={`${styles.w1200} ${styles.innerBox}`}>
        <div className={styles.logo}>
          <a href="">
            <img src={require('@/assets/images/logo.png')} alt="" />
          </a>
        </div>
        <div className={styles.search}>
          <input
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            placeholder="Search winning products by keyword, SKU, 1688/Taobao/Aliexpress URL"
            className={styles.inputRestyle}
            type="text"
          />
          <div onClick={handleSearch} className={styles.searchBtn}>
            <IconFont
              type="icon-bianzu40"
              style={{ color: '#ffffff', fontSize: '24px' }}
            />
          </div>
        </div>
        <div className={styles.queue}>
          <IconFont
            type="icon-xingzhuang"
            style={{ color: '#ffffff', fontSize: '16px' }}
          />
          <span className={styles.queueText}>Queue</span>
          <span className={styles.num}>999</span>
        </div>
      </div>
    </div>
  );
};

export default CJSearch;
