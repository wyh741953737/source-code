import React, { useEffect, useState } from 'react';
import { CJFragment, CJView, CJText, CJScrollView } from '@/components/baseUI';
import { CJNavigation, CJBanner } from '@/components/mobile';
import classnames from 'classnames';
import HotCategories from '@/components/mobile/CJHotCategories';
import GoodsCard from '@/components/mobile/CJGoodsCard';
import { CateList } from '@/services/homePage/homePage';
import { history } from 'umi';
import styles from './style';
import Hooks from './hooks';

const HomePageMobile = () => {
  // console.log('@@@', 'mobileHomePage');
  const {
    bannerList,
    baseInfo,
    sourceData,
    hotList,
    debScroll,
    currentPage,
    debPullDown,
    searchData,
  } = Hooks({ isMobile: true });
  useEffect(() => {
    searchData({ page: 1, size: 6 });
  }, []);
  useEffect(() => {
    window.addEventListener('scroll', debScroll);
    return () => {
      window.removeEventListener('scroll', debScroll);
    };
  }, [currentPage]);
  useEffect(() => {
    window.addEventListener('pullingDown', debPullDown);
    return () => {
      window.removeEventListener('pullingDown', debPullDown);
    };
  }, [currentPage]);
  const hasBanner = !!bannerList?.length;
  const mobileBannerCls = classnames({
    'mobile-banner': true,
    'mobile-banner-long': hasBanner,
  });
  const bannerCls = classnames({
    'banner-content': true,
  });
  const bannerTextCenter = classnames({
    'has-banner-text': true,
    'has-banner-text-center': !hasBanner,
  });
  const mobileBanner = bannerList?.map((item) => ({
    ...item,
    src: item.image,
  }));
  const goPage = (params: CateList) => {
    // console.log(params, '******');
    const temp = params.nameLanguageJson.find((item) => item.language === 'en');
    history.push({
      pathname: '/hotCategories',
      query: {
        id: params.dspId,
        name: temp?.name,
      },
    });
  };
  return (
    <CJScrollView>
      <CJFragment className={styles.mobileHomePage}>
        <CJView>
          <CJNavigation />
        </CJView>
        <CJView className={mobileBannerCls}>
          <CJView className={bannerCls}>
            <CJView className={bannerTextCenter}>
              <CJView>
                <CJText className="big-text">{baseInfo?.title}</CJText>
                <CJText className="small-text">{baseInfo?.subtitle}</CJText>
              </CJView>
            </CJView>
            {hasBanner && (
              <CJView className="banner-show">
                <CJBanner data={mobileBanner} />
              </CJView>
            )}
          </CJView>
        </CJView>
        {/* 热门分类 */}
        {hotList?.length > 2 && (
          <CJView className="hot-categories">
            <CJView className="hot-categories-title">
              <CJText>Trending Categories</CJText>
            </CJView>
            <CJView className="hot-categories-content">
              <CJView className="hot-categories-inner">
                <CJView className="inner-top">
                  {hotList.slice(0, 3).map((item: any) => (
                    <CJView className="inner-item" key={item.id}>
                      <HotCategories data={item} goPage={goPage} />
                    </CJView>
                  ))}
                </CJView>
                {hotList.length === 6 && (
                  <CJView className="inner-bottom">
                    {hotList.slice(3, 6).map((item: any) => (
                      <CJView className="inner-item" key={item.id}>
                        <HotCategories data={item} />
                      </CJView>
                    ))}
                  </CJView>
                )}
              </CJView>
            </CJView>
          </CJView>
        )}
        {/* 商品列表 */}
        <CJView className="product-list">
          <CJView className="product-list-head">
            <CJText>Trending Categories</CJText>
          </CJView>
          <CJView className="product-list-content">
            {sourceData.map((item) => (
              <CJView className="product-list-item" key={item.id}>
                <GoodsCard dataSource={item} />
              </CJView>
            ))}
          </CJView>
        </CJView>
      </CJFragment>
    </CJScrollView>
  );
};
export default HomePageMobile;
