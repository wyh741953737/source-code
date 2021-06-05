import React, { useEffect, useRef, useState } from 'react';
import { Tooltip, Button, message } from 'antd';
import { IconFont } from '@/global';
import freeShip from '@/assets/images/freeShip.png';
import card from '@/assets/images/card.png';
import collectedPng from '@/assets/images/collected.png';
import notCollected from '@/assets/images/notCollected.png';
import { ProductList } from '@/services/homePage/homePage.d';
import api from '@/services/searchPage/index';
import _ from 'lodash';
import styles from './index.less';

interface WProps {
  data: ProductList;
  // 类名
  className?: string;
}

/** 卡片 */
export default (props: WProps) => {
  const { data, className } = props;
  const [url, setUrl] = useState<string>(
    'https://cjdropshipping.com/egg/image/img_default.jpg', // 默认图片
  );
  const [inventoryList, setInventoryList] = useState<Array<any>>([]);
  /** 是否收藏 */
  const [collected, setCollected] = useState<boolean>(
    Boolean(Number(data.isCollect)),
  );
  /** 是否请求过仓库库存 */
  const [mouseHovered, setMouseHovered] = useState<boolean>(false);
  /** 图片节点 */
  const imgRef: any = useRef();

  useEffect(() => {
    lazyLoad();
  }, []);

  /** 懒加载 */
  function lazyLoad(): void {
    const image = imgRef.current;
    const observer = new IntersectionObserver((changes) => {
      changes.forEach(
        ({ target, isIntersecting }) => {
          if (isIntersecting) {
            console.log('进入可视区');
            setUrl(data.bigImage);
            observer.unobserve(target);
          }
        },
        {
          threshold: [0.01],
        },
      );
    });
    observer.observe(image);
  }

  /** 鼠标滑过View Inventory获取仓库库存 */
  const getMouseHoverData = async () => {
    if (mouseHovered) return;
    setMouseHovered(true);
    const result = await api.getWarehouseInfo({ pid: data.id });
    // 这里要过滤，只显示对应仓库下的数量
    setInventoryList(result.data);
  };

  /** 点击Add to queue */
  const ableToAddToQueue = async () => {
    if (Number(data.listedNum) > 0) {
      message.info(
        'Please check the product in Queue. It has been added to Queue.',
      );
    } else {
      const result = await api.addToQueueRequest([data.id]);
      result.code === 200 && message.info('Added to Queue successfully');
    }
  };

  /** 收藏 */
  const handleCollect = async () => {
    const result = await api.collectRequest({ productId: data.id });
    result.code == 200 && setCollected(!collected);
  };

  // 点击list
  const list = () => {};

  /** 根据货币转换价格 */
  const calculatePrice = (price: string) => {
    const unit = 0.628;
    const symbol = 'US';
    if (!price) return;
    if (price.indexOf('-') > -1) {
      const priceArr = price.split('-');
      const min = (unit * Number(priceArr[0])).toFixed(2);
      const max = (unit * Number(priceArr[1])).toFixed(2);
      return `${symbol} ${min}-${max}`;
    } else {
      const priceSingle = Number(price).toFixed(2);
      return `${symbol} priceSingle`;
    }
  };

  return (
    <div className={`${styles.card} ${className ? className : ''}`}>
      <div
        className={`${styles.content} ${
          data.isCollect == '1' ? styles.listed : ''
        }`}
        key={data.id}
      >
        <div className={styles.publish}>
          <IconFont type="icon-lujing1" className={styles.icon} />
        </div>
        <div className={styles.warp} onClick={list}>
          <img
            ref={imgRef}
            className={styles.image}
            src={url}
            data-src={data.bigImage}
            alt=""
          />
          {Number(data.isVedio) === 1 ? (
            <IconFont type="icon-xingzhuangjiehe" className={styles.radio} />
          ) : null}
        </div>
        <div className={styles.moveBox}>
          <div className={styles.description} onClick={list}>
            {data.nameEn}
          </div>
          <div className={styles.lists}>
            <div className={styles.count}>Lists: {data.listedNum}</div>
            <div className={styles.icon}>
              {data.addMarkStatus == 1 && (
                <Tooltip
                  placement="top"
                  title="Free Shipping"
                  overlayStyle={{ fontSize: '12px' }}
                >
                  <img className={styles.freeImg} src={freeShip} alt="" />
                </Tooltip>
              )}
              <img className={styles.cardImg} src={card} alt="" />
            </div>
            <div className={styles.collect} onClick={handleCollect}>
              <img
                className={styles.collectImg}
                src={collected ? collectedPng : notCollected}
                alt=""
              />
            </div>
          </div>
          <div className={styles.salePrice}>
            {data.nowPrice && (
              <div className={styles.nowPrice}>
                {calculatePrice(data.nowPrice)}
              </div>
            )}
            {data.sellPrice && (
              <del className={styles.oldProce}>
                {calculatePrice(data.sellPrice)}
              </del>
            )}
          </div>
          <div className={styles.viewInventory}>
            <Tooltip
              placement="topLeft"
              title={
                inventoryList && inventoryList.length > 0 ? (
                  <div style={{ width: '163px' }}>
                    {inventoryList.map((item) => (
                      <div
                        key={item.areaId}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span>{item.areaEn}</span>
                        <span>{item.num}</span>
                      </div>
                    ))}
                  </div>
                ) : null
              }
              overlayStyle={{ fontSize: '12px' }}
            >
              <Button
                className={styles.inventory}
                onMouseOver={getMouseHoverData}
              >
                View Inventory
              </Button>
            </Tooltip>
            <div className={styles.listBtn} onClick={list}>
              List
            </div>
          </div>

          <div className={styles.addQueue} onClick={ableToAddToQueue}>
            <IconFont
              type={Number(data.listedNum) > 0 ? 'icon-lujing1' : 'icon-jiahao'}
              className={styles.queueIcon}
            />
            <span>Add to Queue</span>
          </div>
        </div>
      </div>
    </div>
  );
};
