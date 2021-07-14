import React, { useEffect } from 'react';
import Banner from '@/pages/homePage/_banner';
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
import styles from './style';
import Hooks from './hooks';

const HomePage: React.FC = ({ history }: any) => {
  const {
    filterSearch,
    recommendList,
    bannerList,
    baseInfo,
    sourceData,
    categoriesList,
    hotList,
    allCategories,
    countryList,
    debScroll,
    currentPage,
    loading,
    searchData,
  } = Hooks({ isMobile: false });
  // 点击搜索按钮
  const onSearch = (text: string) => {
    history.push({
      pathname: '/StationSearchPage',
      query: {
        search: text,
      },
    });
  };
  useEffect(() => {
    searchData({
      page: 1,
      size: 24,
    });
  }, []);
  useEffect(() => {
    window.addEventListener('scroll', debScroll);
    return () => {
      window.removeEventListener('scroll', debScroll);
    };
  }, [currentPage]);
  return (
    <div className={styles.homePage}>
      <div className="header">
        <CJHeader />
      </div>
      <div className="header-search">
        <CJSearch onSearch={onSearch} />
      </div>
      <div className="banner-content">
        <div className="banner-content-inner">
          <Banner
            bannerList={bannerList}
            recommendList={recommendList}
            baseInfo={baseInfo}
            hotList={hotList}
          />
        </div>
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
