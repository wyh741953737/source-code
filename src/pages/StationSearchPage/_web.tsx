import React, { useEffect, useState } from 'react';
import {
  CJHeader,
  CJSearch,
  CJFooter,
  CJFilter,
  CJCard,
  CJLoading,
} from '@/components/web';
import { withRouter } from 'react-router-dom';
import { ProductList } from '@/services/homePage/homePage';
import Hooks from './hooks';
import styles from './style';

const HomePage: React.FC = ({ location }: any) => {
  console.log('====', location.query.search);
  const {
    filterSearch,
    sourceData,
    categoriesList,
    allCategories,
    countryList,
    debScroll,
    currentPage,
    loading,
    searchData,
  } = Hooks({ isMobile: false });
  const [keyWord, setKeyWord] = useState<string>();

  // 点击搜索按钮
  const onSearch = (text: string) => {
    setKeyWord(text);
    searchData({
      keyWord: text,
      page: 1,
      size: 24,
    });
  };

  useEffect(() => {
    const keyWord = location?.query?.search;
    searchData({
      keyWord,
      page: 1,
      size: 24,
    });
  }, [location]);

  useEffect(() => {
    window.addEventListener('scroll', debScroll);
    return () => {
      window.removeEventListener('scroll', debScroll);
    };
  }, [currentPage]);

  return (
    <div className={styles.seachPage}>
      <div className="header">
        <CJHeader />
      </div>
      <div className="header-search">
        <CJSearch onSearch={onSearch} />
      </div>
      <div className="filter-content">
        <div className="filter-inner">
          <CJFilter
            onchange={filterSearch}
            allCategories={allCategories}
            categoriesList={categoriesList}
            countryList={countryList}
          />
        </div>
      </div>
      <div className="keyWords">Search results for "{keyWord}"</div>
      <div className="goods-content">
        <div className="goods-content-inner">
          {sourceData.map((item: ProductList) => (
            <div className="goods-content-inner-item" key={item.id}>
              <CJCard data={item} />
            </div>
          ))}
        </div>
      </div>
      <CJLoading loading={loading} />
      <CJFooter />
    </div>
  );
};
export default withRouter(HomePage) as any;
