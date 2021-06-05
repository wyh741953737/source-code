import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// eslint-disable-next-line import/order
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { BannerType } from '@/services/homePage/homePage';
import styles from './style';

interface Props {
  bannerList?: BannerType[];
}
const SwiperBanner = ({ bannerList = [] }: Props) => {
  // console.log('轮播页面');
  SwiperCore.use([Navigation, Pagination, Autoplay]);

  return (
    <div className={styles.swiperBanner}>
      <Swiper
        navigation
        pagination={{ clickable: true }}
        autoplay={{ disableOnInteraction: false }}
      >
        {bannerList.map((item: BannerType) => (
          <SwiperSlide key={item.id} style={{ width: '100%' }}>
            <img
              src={item.image}
              alt=""
              style={{ width: '100%', height: '100%' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default SwiperBanner;
