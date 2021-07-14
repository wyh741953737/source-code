import { useEffect, useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import { FormInstance } from 'antd/lib/form/hooks/useForm';

interface Condition {
  searchData: any;
  pageSize: number;
  current: number;
}

interface SearchForm<T = any> extends Condition {
  total: number;
  dataSource: Array<T>;
  loading: boolean;
  form: FormInstance<any>;
  search: (cond?: SearchProps, p?: any) => void;
  searchDataClear: (conf?: { noSearch?: boolean }) => void;
  resetSearchForm: () => void;
  onChange: (page: number, pageSize?: number | undefined) => void;
  setCurrent: (current: number) => void;
  setDataSource: (dataSource: Array<T>) => void;
}
interface SearchProps {
  nextSearchData?: object;
  nextPageNumber?: number;
  nextPageSize?: number;
}

interface PromiseResult<T> {
  current?: number;
  pageSize?: number;
  total?: number;
  dataSource: Array<T>;
}

interface Config {
  defaultSearchData?: {};
  /**
   * 是否进行自动请求，默认是进行的
   * 此参数为true的时候deps无效
   */
  noAutoFetch?: boolean;
  /**
   * 是否开启本地分页，默认不开启
   */
  localPage?: boolean;
}

export default function useSearchForm<T = any>(
  searchFun: (c: Condition, p?: any) => Promise<PromiseResult<T>>,
  deps?: Array<any>,
  config?: Config,
): SearchForm<T> {
  const [form] = useForm();
  const [searchData, setSearchData] = useState<{}>({
    ...config?.defaultSearchData,
  });
  const [pageSize, setPageSize] = useState<number>(10);
  const [current, setCurrent] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [dataSource, setDataSource] = useState<Array<T>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const search = async (searchProps?: SearchProps, p?: any) => {
    const { nextSearchData, nextPageNumber, nextPageSize } = searchProps || {};
    const newSearchData = { ...searchData, ...nextSearchData };
    if (nextSearchData && Object.keys(nextSearchData).length !== 0) {
      // 有变动就保存
      setSearchData(newSearchData);
      form.setFieldsValue(newSearchData);
      // 有变动就改为第一页
      setCurrent(1);
    }
    setLoading(true);
    try {
      // 发起请求
      const result = await searchFun(
        {
          searchData: newSearchData,
          current: nextPageNumber || current,
          pageSize: nextPageSize || pageSize,
        },
        p,
      );
      setDataSource(result.dataSource);
      result?.total && setTotal(Number(result?.total));
      result?.current && setCurrent(Number(result?.current));
      result?.pageSize && setPageSize(Number(result?.pageSize));
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  !config?.noAutoFetch &&
    useEffect(() => {
      search().catch();
    }, deps || []);

  const searchDataClear = (conf?: { noSearch?: boolean }) => {
    setSearchData({});
    form.resetFields();
    if (!conf?.noSearch) search().catch();
  };

  const resetSearchForm = () => {
    setPageSize(10);
    setCurrent(1);
    setTotal(0);
    setSearchData({});
    setDataSource([]);
    form.resetFields();
    config?.defaultSearchData && form.setFieldsValue(config?.defaultSearchData);
    setLoading(false);
  };

  const onChange = (page: number, pageSize?: number | undefined) => {
    if (config?.localPage) {
      setCurrent(page);
      pageSize && setPageSize(pageSize);
      return;
    }
    search({ nextPageNumber: page, nextPageSize: pageSize });
  };

  return {
    searchData,
    pageSize,
    current,
    total,
    dataSource,
    loading,
    form,
    search,
    searchDataClear,
    resetSearchForm,
    onChange,
    setCurrent,
    setDataSource,
  };
}
