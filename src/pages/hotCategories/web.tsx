import React, { useEffect, useState } from 'react';
import {
  CJHeader,
  CJSearch,
  CJCard,
  CJFooter,
  CJLoading,
} from '@/components/web/index';
import { withRouter } from 'react-router-dom';
import api from '@/services/homePage';
import { ProductList } from '@/services/homePage/homePage';
import _ from 'lodash';
import styles from './style';

interface SearchParams {
  /** 当前页 */
  page: number;
  /** 当前条数 */
  size: number;
  /** 分类id */
  categoryId: string;
  /** 搜索关键词 */
  keyWord: string;
}

const HotCategories = ({ history }: any) => {
  const [dataSource, setDataSource] = useState<ProductList[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [keyWord, setKeyWord] = useState('');
  console.log(history, '&&&&&');
  const { query } = history.location;
  const title = query.name;
  useEffect(() => {
    // 这里调用初始化接口
    const temp = {
      keyWord: '',
      page: 1,
      size: 24,
      categoryId: query.id,
    };
    getData(temp);
  }, []);
  /** 获取热门分类列表数据 */
  const getData = async (data: SearchParams) => {
    const resp = await api.searchGoods(data);
    if (resp.success) {
      // 判断当前数据是否少于总数据，如果少的话就把新请求数据拼接上
      const listTotal = Number(resp.data.totalRecords);
      if (dataSource.length !== listTotal) {
        const temp = resp?.data?.content[0].productList;
        setDataSource((v) => [...v, ...temp]);
        // setDataSource([...dataSource, ...temp]);
      }
      setLoading(false);
      setCurrentPage(data.page);
      setTotal(listTotal);
    }
  };
  // 搜索列表
  const onSearch = (text: string) => {
    setKeyWord(text);
    getData({
      keyWord: text,
      page: 1,
      size: 24,
      categoryId: query.id,
    });
  };
  // 判断是否滚动到底部
  const scrollFun = () => {
    if (loading) return;
    // 判断数据长度跟总数一致，就不再触发
    if (dataSource.length && total === dataSource.length) return;
    const { clientHeight, scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;
    // 可是区域的高度加上向上滚动的距离
    const topHeight = scrollTop + clientHeight;
    console.log(scrollTop, clientHeight, scrollHeight);
    if (topHeight > scrollHeight - 62) {
      // 判断是否滚动到底部，这里要除掉底部footer的高度
      setLoading(true);
      console.log(currentPage, 'ssss');
      getData({
        page: currentPage + 1,
        size: 24,
        categoryId: query.id,
        keyWord,
      }).finally(() => {
        setLoading(false);
      });
    }
  };
  const debScroll = _.debounce(scrollFun, 500);
  useEffect(() => {
    window.addEventListener('scroll', debScroll);
    return () => window.removeEventListener('scroll', debScroll);
  }, [currentPage]);
  return (
    <div className={styles.hotCategories}>
      <div className="header">
        <CJHeader />
      </div>
      <div className="header-search">
        <CJSearch onSearch={onSearch} />
      </div>
      <div className="categories-title">
        <div className="categories-title-inner">{title}</div>
      </div>
      <div className="categories-content">
        <div className="categories-content-inner">
          {dataSource.map((item: ProductList) => (
            <div className="categories-content-inner-item" key={item.id}>
              <CJCard data={item} />
            </div>
          ))}
        </div>
      </div>
      {loading && <CJLoading />}
      <CJFooter />
    </div>
  );
};
export default withRouter(HotCategories) as any;
