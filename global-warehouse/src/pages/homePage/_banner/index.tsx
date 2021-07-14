import React from 'react';
import SwiperBanner from '@/pages/homePage/_swiperBanner';
import TopRank from '@/pages/homePage/_topRank';
import HotKind from '@/pages/homePage/_hotKind';
import { withRouter } from 'umi';
import {
  BannerType,
  RecommendListType,
  CateList,
} from '@/services/homePage/homePage';
import styles from './style';

interface Props {
  bannerList: BannerType[];
  recommendList: RecommendListType[];
  baseInfo: any;
  hotList: CateList[];
  history: any;
}

const Banner: any = ({
  bannerList,
  recommendList,
  baseInfo,
  hotList,
  history,
}: Props) => {
  // console.log(bannerList, recommendList, baseInfo, hotList, '%%%%%');
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
  const showDefault = !!bannerList?.length && hotList?.length === 6;
  const showDom1 =
    !!bannerList?.length && hotList?.length > 2 && hotList?.length < 6;
  const showDom2 = !!bannerList?.length && !hotList?.length;
  const showDom3 = !bannerList?.length && hotList?.length === 6;
  return (
    <div className={styles.banner}>
      <div className="banner-text">
        <div className="text-title">{baseInfo?.title}</div>
        <div className="text-description">{baseInfo?.subtitle}</div>
      </div>
      {showDefault &&
        renderDefault({ bannerList, recommendList, hotList, goPage })}
      {showDom1 && renderDom1({ bannerList, recommendList, hotList, goPage })}
      {showDom2 && renderDom2({ bannerList, recommendList, hotList, goPage })}
      {showDom3 && renderDom3({ bannerList, recommendList, hotList, goPage })}
    </div>
  );
};

interface RenderProps {
  bannerList: BannerType[];
  recommendList: RecommendListType[];
  hotList: CateList[];
  goPage: (a: CateList) => void;
}
/** 有banner有六个热门分类 */
const renderDefault = ({
  bannerList,
  recommendList,
  goPage,
  hotList,
}: RenderProps) => (
  <div className="banner-center">
    <div className="banner-center-top">
      <div className="center-top-left">
        <SwiperBanner bannerList={bannerList} />
      </div>
      <div className="center-top-right">
        <TopRank recommendList={recommendList} />
      </div>
    </div>
    <div className="banner-center-bottom">
      {hotList.map((item: CateList) => (
        <HotKind key={item.id} data={item} goPage={goPage} />
      ))}
    </div>
  </div>
);
/** 有banner有3-6个热门分类 */
const renderDom1 = ({ bannerList, goPage, hotList }: RenderProps) => (
  <div className="banner-center banner-center-1">
    <div className="banner-center-top">
      <div className="center-top-left">
        <SwiperBanner bannerList={bannerList} />
      </div>
      <div className="center-top-right">
        <div className="top-right-text">
          <div className="text-big">TOP</div>
          <div className="text-big">Rankings</div>
          <div className="text-small">Popular recommended products</div>
        </div>
        <div className="hot-kinds">
          {hotList.slice(0, 3).map((item: CateList) => (
            <HotKind key={item.id} data={item} goPage={goPage} />
          ))}
        </div>
      </div>
    </div>
  </div>
);
/** 无banner有6个热门分类 */
const renderDom3 = ({ recommendList, goPage, hotList }: RenderProps) => (
  <div className="banner-center banner-center-3">
    <div className="banner-center-top">
      <div className="center-top-right">
        <TopRank recommendList={recommendList} />
      </div>
      <div className="center-top-left">
        <div className="center-top-left-one">
          {hotList.slice(0, 3).map((item: CateList) => (
            <HotKind
              key={item.id}
              data={item}
              goPage={goPage}
              isVertical={false}
            />
          ))}
        </div>
        <div className="center-top-left-one">
          {hotList.slice(2, 6).map((item: CateList) => (
            <HotKind
              key={item.id}
              data={item}
              goPage={goPage}
              isVertical={false}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);
/** 有banner没有热门分类 */
const renderDom2 = ({ bannerList }: RenderProps) => (
  <div className="banner-center banner-center-2">
    <div className="banner-center-top">
      <div className="center-top-left">
        <SwiperBanner bannerList={bannerList} />
      </div>
    </div>
  </div>
);

export default withRouter(Banner) as any;
