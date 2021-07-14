import React from 'react';
import { RecommendListType } from '@/services/homePage/homePage';
import styles from './style';

interface Props {
  recommendList?: RecommendListType[];
}

const TopRank = ({ recommendList }: Props) => {
  console.log('_topRank');
  return (
    <div className={styles.topRank}>
      <div className="rank-text">Top</div>
      <div className="rank-text">Rankings</div>
      <div className="rank-detail">Popular recommended products</div>
      <div className="rank-img">
        <div className="rank-img-left">
          <img
            src="https://cc-west-usa.oss-us-west-1.aliyuncs.com/20210524/1567661687644.png"
            alt=""
            className="img-left"
          />
        </div>
        <div className="rank-img-right">
          <img
            src="https://cc-west-usa.oss-us-west-1.aliyuncs.com/20210524/4660654949544.png"
            alt=""
            className="img-right margin-b-8"
          />
          <img
            src="https://cc-west-usa.oss-us-west-1.aliyuncs.com/20210524/1323254847909.png"
            alt=""
            className="img-right"
          />
        </div>
      </div>
    </div>
  );
};
export default TopRank;
