import React, { useRef, useState } from 'react';
import { CJInput, CJView } from '@/components/baseUI';
import { IconFont } from '@/global';
import { CJFilter } from '@/components/mobile';
import { ListItem } from '@/components/mobile/CJFilter/CategoryCard';
import { history } from 'umi';
import styles from './styles';

interface HProps {
  /** 返回按钮 */
  handleBack?: () => void;
  /** 搜索/筛选 */
  handleOk: (arg?: any) => void;
  /** 取消筛选 */
  handleCancel?: (arg?: any) => void;
  /** 类目列表 */
  categoryData: Array<ListItem>;
}

/** 筛选条件 */
interface SearchArg {
  /** 类目id */
  categoryId: string;
  /** 金额最大值 */
  max: number;
  /** 金额最小值 */
  min: number;
  /** 商品类型 */
  type: number;
  /** 优惠政策 */
  discount: number;
  /** 关键字 */
  keyWord?: string;
  /** 其他字段 */
  [name: string]: any;
}

export default (props: HProps) => {
  const { handleBack, handleOk, categoryData, handleCancel } = props;
  const [filterParams, setFilterParams] = useState<SearchArg>({} as SearchArg);
  const keywordRef: any = useRef();

  /** 回车 */
  function handleEnter() {
    handleOk && handleOk(filterParams);
  }

  /** 保存搜索关键字 */
  function handleSaveKeyword(e: any) {
    keywordRef.current && clearTimeout(keywordRef.current);
    keywordRef.current = setTimeout(() => {
      setFilterParams((v) => ({ ...v, keyWord: e.target.value }));
    }, 50);
  }

  /** 返回 */
  function goBack() {
    if (handleBack) {
      handleBack();
      return;
    }
    history.go(-1);
  }

  /** 搜索 */
  function handleSearch(arg: SearchArg) {
    const latestParams = { ...filterParams, ...arg };
    setFilterParams(latestParams);
    handleOk && handleOk(latestParams);
  }

  return (
    <CJView className={styles.search}>
      <IconFont onClick={goBack} type="icon-fanhui" className={styles.back} />
      <CJInput
        prefix={<IconFont type="icon-sousuo" style={{ color: '#999' }} />}
        allowClear
        className={styles.input}
        onChange={handleSaveKeyword}
        onPressEnter={handleEnter}
        inputType="search"
      />
      <CJFilter
        data={categoryData}
        handleOk={handleSearch}
        handleCancel={handleCancel}
      >
        <IconFont type="icon-shaixuan" className={styles.filter} />
      </CJFilter>
    </CJView>
  );
};
