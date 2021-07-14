import React, { useEffect, useState } from 'react';
import { CJView, CJText, CJImage } from '@/components/baseUI';
import { IconFont } from '@/global';
import { ProductList } from '@/services/homePage/homePage';
import styles from './style';

interface Props {
  dataSource: ProductList;
}

const GoodsCard = ({ dataSource }: Props) => {
  const [imgSrc, setImgSrc] = useState('');
  // const imgRef = useRef();
  useEffect(() => {
    // const dom = document.getElementById(dataSource.id);
    // console.log(dom, '$$$$');
    imgLoad();
  }, []);
  const imgLoad = () => {
    const imgDom: any = document.getElementById(dataSource.id);
    const observer = new IntersectionObserver((changes) => {
      console.log(changes, 'ssss');
      changes.forEach(({ target, isIntersecting }) => {
        // target是节点dom isIntersecting是否有交叉（有交叉就是一部分在可视区一部分不在可视区）
        // 第一次进入如果有交叉证明进入可视区这时候就可以解除
        if (isIntersecting) {
          // 关闭观察器
          observer.disconnect();
          // 停止观察
          observer.unobserve(target);
        }
        if (isIntersecting && dataSource.bigImage) {
          // 判断是否数据img存在，如果不存在继续使用默认图片
          setImgSrc(dataSource.bigImage);
        }
      });
    });
    observer.observe(imgDom);
  };
  return (
    <CJView className={styles.goodsCard}>
      <CJView className="goods-card-img">
        <CJImage className="goods-img" source={imgSrc} id={dataSource.id} />
        {dataSource.isVedio === 1 && (
          <CJView className="is-video">
            <IconFont type="icon-xingzhuangjiehe" className="video-icon" />
          </CJView>
        )}
      </CJView>
      <CJView className="goods-name">
        <CJText className="goods-name-text" />
      </CJView>
      {dataSource.addMarkStatus === 1 && (
        <CJView className="is-free">
          <CJView className="is-free-inner">
            <CJText className="free-shipping-text">Free Shipping</CJText>
          </CJView>
        </CJView>
      )}
      <CJView className="price-listed">
        <CJView className="price-listed-left">
          <CJText className="price-unit">$</CJText>
          <CJText className="price-range">{dataSource.sellPrice}</CJText>
        </CJView>
        <CJView className="price-listed-right">
          <CJText className="listed-text">{dataSource.listedNum} listed</CJText>
        </CJView>
      </CJView>
    </CJView>
  );
};
export default GoodsCard;
