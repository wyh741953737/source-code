import React, { useRef } from 'react';
// @ts-ignore
import uuid from 'react-uuid';
import { CJView } from '@/components/baseUI';
import Scroll from './Scroll';
import styles from './styles.less';

interface IProps {
  numColumns?: 1 | 2 | number | undefined;
  /* 数据源 */
  dataSource: any[] | null;
  /* 是否可上拉加载商品数据 */
  hasMore: boolean;
  /* 上拉加载商品数据函数 */
  loadMore: () => void;
  /* 下拉刷新函数 */
  refresh: () => void;
  /* render项 */
  renderRow: (data: any, index: number) => React.ReactNode;
  /* 空数据展示 */
  emptyDataComponent?: React.ReactNode;
  /* 列表头部组件 */
  ListHeaderComponent?: React.ReactNode;
  /* 埋点用的 pageId */
  pageId?: string;
  /* 埋点用的 eventId, 如果不传则默认为 `${pageId}-01` */
  eventId?: string;
  waterFall?: boolean;
}

export default (props: IProps) => {
  const {
    numColumns,
    loadMore,
    hasMore,
    refresh,
    renderRow,
    emptyDataComponent,
    ListHeaderComponent,
    dataSource,
    waterFall,
  } = props;
  const buriedPointKeyRef = useRef(new Date());

  if (!dataSource) {
    return null;
  }

  // scroll props属性
  const scrollProps = {
    hasMore,
    onScrollToEnd: () => typeof loadMore === 'function' && loadMore(),
    onFinishPullDown: (cb: any) => {
      typeof refresh === 'function' && refresh();
      buriedPointKeyRef.current = new Date();
      cb();
    },
    cssStyle: { top: 44, bottom: 0 },
    clearLoading: dataSource.length === 0,
  };

  // 内容区域
  const content = () => (
    <CJView
      h5Class={`list_view_content ${styles.content} ${
        numColumns === 2 && !waterFall
          ? styles.columns_2
          : styles.columns_2_waterFall
      }`}
    >
      {ListHeaderComponent}
      {dataSource.map((item: any, index: number) => (
        <CJView
          key={uuid()}
          h5Class={
            numColumns === 2 && !waterFall
              ? styles.columns_2_item
              : styles.columns_2_item_waterFall
          }
        >
          {renderRow(item, index)}
        </CJView>
      ))}
      {dataSource.length === 0 ? emptyDataComponent : null}
    </CJView>
  );
  return <Scroll {...scrollProps}>{content()}</Scroll>;
};
