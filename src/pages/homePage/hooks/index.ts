import { useEffect, useState } from 'react';
import {
  BannerType,
  CateList,
  CountryType,
  ProductList,
  RecommendListType,
  ThirdCategoriesList,
} from '@/services/homePage/homePage';
import {
  AllCategories,
  OptionData,
  SearchParams,
  BaseInfo,
} from '@/pages/homePage/interface';
import api from '@/services/homePage';
import _ from 'lodash';

interface Props {
  /** 是否是移动端 */
  isMobile?: boolean;
}
export default ({ isMobile }: Props) => {
  // 获取推荐商品  list
  const [recommendList, setRecommendList] = useState<RecommendListType[]>([]);
  // banner 列表
  const [bannerList, setBannerList] = useState<BannerType[]>([]);
  // 基础配置信息
  const [baseInfo, setBaseInfo] = useState<BaseInfo>({});
  // 商品搜索列表数据
  const [sourceData, setSourceData] = useState<ProductList[]>([]);
  // 三级类目列表
  const [categoriesList, setCategoriesList] = useState<ThirdCategoriesList[]>(
    [],
  );
  // 热门分类列表
  const [hotList, setHotList] = useState<CateList[]>([]);
  // 类目列表树
  const [allCategories, setAllCategories] = useState<AllCategories[]>([]);
  // 获取国家地区列表
  const [countryList, setCountryList] = useState<OptionData[]>([]);
  // 存储搜索条件
  const [searchVal, setSearchVal] = useState<SearchParams>({
    page: 1,
    size: isMobile ? 6 : 24,
  });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    getRecommendGoods();
    getBannerInfo();
    basciInfo();
    getTreeData();
    getHotKind();
    getCountryData();
  }, []);
  // 获取推荐商品 列表
  const getRecommendGoods = async () => {
    const temp = {
      warehouse: 'US',
    };
    const resp = await api.getRecommendList(temp);
    if (resp.success) {
      setRecommendList(resp.data.list);
    }
  };
  // 获取banner list
  const getBannerInfo = async () => {
    const temp = {
      warehouse: 'US',
    };
    const resp = await api.getBannerList(temp);
    if (resp.success) {
      setBannerList(resp.data.list);
    }
  };
  // 获取 首页基础信息
  const basciInfo = async () => {
    const temp = {
      warehouse: 'US',
    };
    const resp = await api.getHomePageInfo(temp);
    if (resp.success) {
      setBaseInfo(resp.data);
    }
  };
  // 获取热门分类
  const getHotKind = async () => {
    const temp = {
      warehouse: 'US',
    };
    const resp = await api.getHostList(temp);
    if (resp.success) {
      setHotList(resp.data.list);
    }
  };
  // 搜索列表
  const searchData = async (data: SearchParams) => {
    setLoading(true);
    setSearchVal(data);
    const resp = await api.searchGoods(data);
    if (resp.success) {
      setLoading(false);
      const listTotal = Number(resp.data.totalRecords);
      if (sourceData.length !== listTotal) {
        const temp = resp?.data?.content[0].productList;
        setSourceData((v) => [...v, ...temp]);
      }
      setCurrentPage(Number(resp.data.pageNumber));
      setTotal(Number(resp.data.totalRecords));
      setCategoriesList(resp?.data?.content[0].relatedCategoryList);
    }
  };
  // 列表选项过滤,调用搜索fun
  const filterSearch = (searchParams: SearchParams) => {
    const temp = {
      ...searchParams,
      page: 1,
      size: 24,
    };
    searchData(temp);
  };
  // 获取类目树
  const getTreeData = async () => {
    const resp = await api.getCategoriesTree({ pid: '' });
    if (resp.success) {
      setAllCategories(JSON.parse(resp.data));
    }
  };
  // 获取国家地区列表
  const getCountryData = async () => {
    const resp = await api.getCountryList();
    if (resp.success) {
      const temp = resp.data.map((item: CountryType) => ({
        ...item,
        value: item.nameEn,
        key: item.countryCode,
      }));
      setCountryList(temp);
    }
  };
  const scrollFun = () => {
    if (loading) return;
    // 判断数据长度跟总数一致，就不再触发
    if (sourceData.length && total === sourceData.length) return;
    const { clientHeight, scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;
    // 可是区域的高度加上向上滚动的距离
    const topHeight = scrollTop + clientHeight;
    // console.log(scrollTop, clientHeight, scrollHeight);
    if (topHeight > scrollHeight - 62) {
      searchData({
        ...searchVal,
        page: currentPage + 1,
      });
    }
  };
  const debScroll = _.debounce(scrollFun, 500);
  const debPullDown = _.debounce(() => searchData({ page: 1, size: 6 }), 500);
  return {
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
    searchVal,
    loading,
    searchData,
    debPullDown,
  };
};
