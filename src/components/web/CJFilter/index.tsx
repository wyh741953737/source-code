import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { IconFont } from '@/global';
import CascaderSelect from '@/components/web/CJFilter/cascaderSelect';
import Categories from '@/components/web/CJFilter/categories';
import styles from './style/index.less';
import NoborderSelect from './noBorderSelect';
import { OptionsType, AllCategories, OptionData } from './type';

const typeData = [
  { key: '', value: 'Sort All Types' },
  { key: '4', value: 'Supplier Products' },
  { key: '10', value: 'Product Videos' },
];

interface SortData {
  /** sort类型 */
  feildType: string;
  /** 升序降序 */
  isAsc: string;
}
interface Props {
  onchange?: (a: any) => void;
  categoriesList?: OptionsType[];
  allCategories?: AllCategories[];
  countryList?: OptionData[];
}
const FilterConditions = ({
  onchange,
  categoriesList = [],
  allCategories = [],
  countryList = [],
}: Props) => {
  const [addMarkStatus, setAddMarkStatus] = useState('0');
  // sort数据
  const [sortByParam, setSortByParam] = useState<SortData>({
    feildType: '1',
    isAsc: '0',
  });
  /** 类目id */
  const [categoryId, setCategoriesId] = useState('');
  /** 类目数据(三级类目) */
  const [cascaderData, setCascaderData] = useState<string[]>([]);
  /** 仓库id */
  const [countryCode, setCountryCode] = useState('');
  /** 类型 id */
  const [productType, setProductType] = useState('');
  /** 价格最小值 */
  const [startSellPrice, setStartSellPrice] = useState('');
  /** 价格最大值 */
  const [endSellPrice, setEndSellPrice] = useState('');
  const setSort = (data: SortData) => {
    setSortByParam(data);
    // 调用函数
    getDataCallback(data);
  };
  const choosePrice = () => {
    // let temp = {type: '1', isAsc: '0'}
    let temp = { feildType: 'price', isAsc: '0' };
    if (sortByParam.feildType === 'price') {
      // 表示不是第一次点击price
      temp = {
        feildType: 'price',
        isAsc: sortByParam.isAsc === '1' ? '0' : '1',
      };
    }
    setSortByParam(temp);
    getDataCallback({ sortByParam: temp });
  };
  useEffect(() => {
    console.log('这里是搜索条件过滤组件');
  }, []);
  /** 类目选择回调 */
  const categoriesChange = (id: string) => {
    // 调用查询接口
    setCategoriesId(id);
    getDataCallback({ categoriesId: id });
  };
  /** 三级类目选择的回调 */
  const cascaderChange = (keys: string[]) => {
    // console.log(keys, 'sssss');
    // 调用查询接口
    const id = keys[keys.length - 1];
    setCascaderData(keys);
    setCategoriesId(id);
    // getDataCallback({ cascaderData: keys, categoriesId: id });
    getDataCallback({ categoryId: id });
  };
  /** 选择仓库 */
  const warehouseChange = (key: string) => {
    // 调用查询接口
    setCountryCode(key);
    getDataCallback({ countryCode: key });
  };
  /** 选择type */
  const typeChange = (key: string) => {
    // 调用查询接口
    setProductType(key);
    getDataCallback({ productType: key });
  };
  /** 获取价格最小值 */
  const getPriceMin = (e: any) => {
    // console.log(e.target.value, '^^^^');
    setStartSellPrice(e.target.value);
  };
  /** 获取价格最大值 */
  const getPriceMax = (e: any) => {
    // console.log(e.target.value, '^^^^');
    setEndSellPrice(e.target.value);
  };
  /** 是否选择 free shipping */
  const freeShippingChange = (sign: string) => {
    setAddMarkStatus(sign);
    getDataCallback({ addMarkStatus: sign });
  };
  /** 点击confirm按钮 */
  const confirmFilter = () => {
    // 调用查询接口
    getDataCallback({});
  };
  const getDataCallback = (tranformData: any) => {
    const data = {
      categoryId,
      // cascaderData,
      countryCode,
      productType,
      startSellPrice,
      endSellPrice,
      sortByParam,
      ...tranformData,
    };
    onchange && onchange(data);
  };
  return (
    <div className={styles.filterConditions}>
      {categoriesList?.length ? (
        <div className="filter-categories filter-item">
          <span className="filter-label">CATEGORIES:</span>
          <Categories options={categoriesList} onchange={categoriesChange} />
        </div>
      ) : (
        <div className="filter-area filter-item">
          <span className="filter-label">You are in:</span>
          <CascaderSelect options={allCategories} onchange={cascaderChange} />
        </div>
      )}
      <div className="filter-kind filter-item">
        <span className="filter-label">Filter by:</span>
        <NoborderSelect
          initValue="Ship from All Warehouses"
          initKey=""
          options={countryList}
          onchange={warehouseChange}
        />
        <div className="filter-not-first">
          <NoborderSelect
            initValue="Sort All Types"
            initKey=""
            options={typeData}
            onchange={typeChange}
          />
        </div>
        <div className="filter-not-first">
          <span className="price">Price</span>
          <Input
            placeholder="Min"
            className="min-max-int"
            onChange={getPriceMin}
          />
          <span className="split">-</span>
          <Input
            placeholder="Max"
            className="min-max-int"
            onChange={getPriceMax}
          />
          <div className="confirm-btn" onClick={confirmFilter}>
            Confirm
          </div>
        </div>
        <div className="filter-not-first">
          <div
            className="radio"
            onClick={() =>
              freeShippingChange(addMarkStatus === '1' ? '0' : '1')
            }
          >
            <div
              className={`radio-inner ${
                addMarkStatus === '1' && 'radio-inner-show'
              }`}
            />
          </div>
          <span className="free-text">Free Shipping</span>
        </div>
      </div>
      <div className="filter-sort filter-item">
        <span className="filter-label">Sort by:</span>
        <span
          className={`filter-sort-item ${
            sortByParam.feildType === '1' && 'filter-sort-item-active'
          }`}
          onClick={() => setSort({ feildType: '1', isAsc: '0' })}
        >
          <span className="sort-item-span">Best Match</span>
        </span>
        <span
          className={`filter-sort-item ${
            sortByParam.feildType === '2' && 'filter-sort-item-active'
          }`}
          onClick={() => setSort({ feildType: '2', isAsc: '0' })}
        >
          <span className="sort-item-span">Lists</span>
          <IconFont type="icon-xia2" className="list-icon" />
        </span>
        <span className="filter-sort-item" onClick={choosePrice}>
          <span
            className={`sort-item-span ${
              sortByParam.feildType === 'price' && 'sort-item-span-active'
            }`}
          >
            Price
          </span>
          <span className="sort-item-icon">
            <IconFont
              type="icon-shang1"
              className={`price-icon1 ${
                sortByParam.feildType === 'price' &&
                sortByParam.isAsc === '1' &&
                'price-icon1-active'
              }`}
            />
            <IconFont
              type="icon-xia2"
              className={`price-icon2 ${
                sortByParam.feildType === 'price' &&
                sortByParam.isAsc === '0' &&
                'price-icon2-active'
              }`}
            />
          </span>
        </span>
        <span
          className={`filter-sort-item ${
            sortByParam.feildType === '3' && 'filter-sort-item-active'
          }`}
          onClick={() => setSort({ feildType: '3', isAsc: '0' })}
        >
          <span className="sort-item-span">Newest</span>
        </span>
      </div>
    </div>
  );
};

export default FilterConditions;
