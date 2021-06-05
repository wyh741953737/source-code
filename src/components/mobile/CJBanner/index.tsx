import React, { ReactElement } from 'react';
import { CJImage, CJView } from '@/components/baseUI';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import styles from './styles';

/** 轮播图数据节点 */
interface DataItem {
  /** 图片地址 */
  src: string;
  /** 点击图片的回调 */
  handleClick?: (arg: DataItem) => void;
}

interface HProps {
  /** 轮播图数据 */
  data: Array<DataItem>;
}

/** 轮播图组件 */
export default (props: HProps): ReactElement => {
  const { data = [] } = props;
  SwiperCore.use([Pagination, Autoplay]);
  return (
    <CJView className={styles.mobile_banner}>
      <Swiper
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
      >
        {data.map((item: DataItem, index: number) => (
          <SwiperSlide key={index}>
            <CJImage
              onClick={(): void => {
                item.handleClick && item.handleClick(item);
              }}
              source={item.src}
              className={styles.banner_item}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </CJView>
  );
};
