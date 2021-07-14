import { useState } from 'react';
import { ProductList } from '@/services/homePage/homePage';
import { SearchParams } from '@/pages/homePage/interface';
import api from '@/services/homePage';
import _ from 'lodash';

interface Props {
  /** 是否是移动端 */
  isMobile?: boolean;
  /** 仓库id */
  warehouse?: string;
  /** 路由 */
  history?: any;
  countryCode: string;
}
export default ({ isMobile, warehouse, history, countryCode }: Props) => {
  // 商品搜索列表数据
  const [sourceData, setSourceData] = useState<ProductList[]>([]);
  const [searchVal, setSearchVal] = useState<SearchParams>({
    sortByParam: {
      feildType: '0',
      isAsc: '0',
    },
    categoryId: history.location.query.id,
    countryCode,
    page: 1,
    size: 6,
  });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [topHeight, setTopHeight] = useState(0);

  // 搜索列表
  const searchData = async (data: SearchParams, isReset?: boolean) => {
    if (loading) return;
    setLoading(true);
    setSearchVal(data);
    try {
      const resp = await api.searchGoods(
        data.countryCode ? data : { ...data, countryCode: warehouse },
      );

      if (resp.success) {
        setLoading(false);
        const listTotal = Number(resp.data.totalRecords);
        const temp = resp?.data?.content[0].productList;
        setCurrentPage(Number(resp.data.pageNumber));
        setTotal(Number(resp.data.totalRecords));
        if (isReset) {
          setSourceData(temp);
          return;
        }
        if (sourceData.length !== listTotal) {
          setSourceData((v) => [...v, ...temp]);
        }
      }
    } catch (e) {
      setLoading(false);
    }
  };

  const scrollFun = () => {
    // 判断数据长度跟总数一致，就不再触发
    if (sourceData.length && total === sourceData.length) return;
    const { clientHeight, scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;
    const topHeight = scrollTop + clientHeight;
    setTopHeight(scrollTop);
    if (topHeight > scrollHeight - 62) {
      searchData({
        ...searchVal,
        page: currentPage + 1,
      });
    }
  };
  const debScroll = _.debounce(scrollFun, 1000);
  return {
    sourceData,
    currentPage,
    loading,
    searchData,
    scrollFun,
    debScroll,
    topHeight,
  };
};
