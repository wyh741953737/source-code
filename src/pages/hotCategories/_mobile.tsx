import React, { useEffect, useState } from 'react';
import { CJFragment, CJView, CJScrollView } from '@/components/baseUI';
import GoodsCard from '@/components/mobile/CJGoodsCard';
import { ListItem } from '@/components/mobile/CJFilter/CategoryCard';
import { CJHeader } from '@/components/mobile';
import styles from './style';
import Hooks from '@/pages/StationSearchPage/hooks';

const HotCatoriesMobile = () => {
  const { sourceData, debScroll, currentPage, debPullDown, searchData } = Hooks(
    { isMobile: true },
  );

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

  // 搜索栏返回
  const handleBack = () => {
    history.go(-1);
  };
  return (
    <CJScrollView className={styles.hotCategoriesMobile}>
      <CJHeader
        title="Home & Garden & Furniture"
        onBack={handleBack}
        isBack={true}
      />
      <CJFragment>
        {/* 商品列表 */}
        <CJView className="product-list">
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
export default HotCatoriesMobile;
