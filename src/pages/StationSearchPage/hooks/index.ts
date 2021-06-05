import { useEffect, useState } from 'react';
import {
  CateList,
  ProductList,
  ThirdCategoriesList,
  CountryType,
} from '@/services/homePage/homePage';
import { ListItem } from '@/components/mobile/CJFilter/CategoryCard';
import {
  AllCategories,
  OptionData,
  SearchParams,
} from '@/pages/homePage/interface';
import api from '@/services/homePage';
import _ from 'lodash';

interface Props {
  /** 判断是PC端还是移动端 */
  isMobile?: boolean;
}
export default ({ isMobile }: Props) => {
  // 商品搜索列表数据
  const [sourceData, setSourceData] = useState<ProductList[]>([]);
  // 三级类目列表
  const [categoriesList, setCategoriesList] = useState<ThirdCategoriesList[]>(
    [],
  );
  // 类目列表树
  const [allCategories, setAllCategories] = useState<AllCategories[]>([]);
  // 获取国家地区列表
  const [countryList, setCountryList] = useState<OptionData[]>([]);
  // 存储搜索条件
  const [searchVal, setSearchVal] = useState<SearchParams>({
    page: 1,
    size: isMobile ? 6 : 24,
  });
  const [filterData, setFilterData] = useState<Array<ListItem>>([]);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    getTreeData();
    getCountryData();
  }, []);

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
      setFilterData(resp?.data?.content[0].relatedCategoryList);
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

  const scrollFun = () => {
    if (loading) return;
    if (sourceData.length && total === sourceData.length) return;
    const { clientHeight, scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;
    const topHeight = scrollTop + clientHeight;
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
    sourceData,
    categoriesList,
    allCategories,
    countryList,
    debScroll,
    currentPage,
    searchVal,
    loading,
    searchData,
    filterData,
    debPullDown,
  };
};
