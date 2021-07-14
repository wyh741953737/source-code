import React, { useEffect, useState } from 'react';
import { CJFragment, CJView, CJScrollView } from '@/components/baseUI';
import GoodsCard from '@/components/mobile/CJGoodsCard';
import { ListItem } from '@/components/mobile/CJFilter/CategoryCard';
import { CJSearch } from '@/components/mobile';
import styles from './style';
import Hooks from './hooks';

const PositionSearchMobile = () => {
  const {
    sourceData,
    debScroll,
    currentPage,
    debPullDown,
    searchData,
    filterData,
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

  // 搜索栏返回
  const handleBack = () => {
    history.go(-1);
  };
  // 搜索
  const handleOk = (data: any) => {
    const { keyWord, categoryId, min, max, type, discount } = data;
    console.log(data);
    const params = {
      keyWord,
      categoryId,
      startSellPrice: min,
      endSellPrice: max,
      productType: type,
      addMarkStatus: discount,
      size: 6,
      page: 1,
    };
    console.log('====', params);
    searchData(params);
  };
  // 取消筛选
  const handleCancel = () => {
    const temp = {
      page: 1,
      size: 6,
    };
    searchData(temp);
  };
  return (
    <CJScrollView className={styles.positionSearchMobile}>
      <CJView className={styles.header}>
        <CJSearch
          handleBack={handleBack}
          handleOk={handleOk}
          categoryData={filterData}
          handleCancel={handleCancel}
        />
      </CJView>
      <CJFragment className={styles.positionSearch}>
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
export default PositionSearchMobile;
