import React, {useState, useEffect} from 'react';
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view';
import {createWatchElementInViewAreaList} from '@cckj/react-native-tracking';
import {CJView} from '../baseUI';

//https://github.com/huanxsd/react-native-refresh-list-view/blob/master/README.md

interface IProps {
  /* 是否有更多 */
  hasMore: boolean;
  /* 列表数据 */
  dataSource: any[];
  /* 下拉刷新函数 */
  refresh: () => void;
  /* 上拉加载商品数据函数 */
  loadMore: () => void;
  /* 头部组件 */
  ListHeaderComponent?: React.ReactNode;
  /* 空数据展示 */
  emptyDataComponent?: React.ReactNode;
  /* 渲染行 */
  renderRow: (item: object, index: number) => React.ReactNode;
  /* 剩余参数 */
  [key: string]: any;
}

export default (props: IProps) => {
  const {
    dataSource,
    refresh,
    loadMore,
    hasMore,
    renderRow,
    emptyDataComponent,
    ...args
  } = props;
  const [refreshState, setRefreshState] = useState<number>(RefreshState.Idle);
  const [listData, setListData] = useState<any[]>([]);
  const [loadType, setLoadType] = useState<string>();

  useEffect(() => {
    // onHeaderRefresh();
  }, []);

  useEffect(() => {
    if (Array.isArray(dataSource)) {
      if (loadType === 'loadMore') {
        setListData(dataSource);
        if (dataSource.length === 0) {
          setRefreshState(RefreshState.NoMoreData);
        } else {
          setRefreshState(RefreshState.Idle);
        }
      } else {
        setListData(dataSource);
        if (dataSource.length === 0) {
          setRefreshState(RefreshState.EmptyData);
        } else {
          setRefreshState(RefreshState.Idle);
        }
      }
    }
  }, [dataSource]);

  const getData = (type: string) => {
    if (type === 'refresh' && refresh && typeof refresh === 'function') {
      setRefreshState(RefreshState.HeaderRefreshing);
      refresh();
    }
    if (type === 'loadMore' && refresh && typeof refresh === 'function') {
      setRefreshState(RefreshState.FooterRefreshing);
      loadMore();
    }
    setLoadType(type);
  };

  const keyExtractor = (item: any, index: number) => index.toString();

  // 下拉刷新回调方法
  const onHeaderRefresh = () => {
    getData('refresh');
  };

  // 上拉翻页回调方法
  const onFooterRefresh = () => {
    if (hasMore) {
      getData('loadMore');
    } else {
      setRefreshState(RefreshState.NoMoreData);
    }
  };

  const WatchElementInViewAreaList = createWatchElementInViewAreaList({
    // 完整的配置查看 https://reactnative.dev/docs/flatlist#viewabilityconfig
    minimumViewTime: 50, // 节点在可视区域至少停留1秒才进行上报
    itemVisiblePercentThreshold: 66, // 节点需要在可视区域露出的百分比，2/3 = 100 / 3 * 2
  });

  return (
    <CJView rnStyle={{height: '100%'}}>
      <WatchElementInViewAreaList
        {...args}
        data={dataSource}
        renderItem={({item, index}: any) => renderRow(item, index)}
        refreshState={refreshState}
        keyExtractor={keyExtractor}
        onHeaderRefresh={onHeaderRefresh}
        onFooterRefresh={onFooterRefresh}
        footerEmptyDataComponent={emptyDataComponent}
        // 可选
        footerRefreshingText="- Loading -"
        footerFailureText="我擦嘞，居然失败了 =.=!"
        footerNoMoreDataText="No More"
        footerEmptyDataText="No Data">
        <RefreshListView />
      </WatchElementInViewAreaList>
    </CJView>
  );
};
