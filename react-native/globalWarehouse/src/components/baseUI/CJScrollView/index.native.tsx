import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';

interface IProps {
  /* 自定义行内样式 */
  style?: object;
  /* 自定义class样式 */
  className?: object;
  /* 自定义class样式(rn) */
  rnClass?: object;
  /* 自定义行内样式(rn) */
  rnStyle?: object;
  /* 子元素 */
  children?: string | React.ReactNode;
  /* 下拉刷新事件 */
  onRefresh?: () => Promise<any>;
  /* 剩余参数 */
  [key: string]: any;
}

export default (props: IProps) => {
  const {
    children,
    rnClass,
    className,
    style,
    rnStyle,
    onRefresh,
    ...args
  } = props;
  const [refreshing, setRefreshing] = React.useState(false);

  const _onRefresh = React.useCallback(() => {
    setRefreshing(true);
    typeof onRefresh === 'function' &&
      onRefresh().then(() => setRefreshing(false));
  }, []);

  const _props = {
    style: [{ flex: 1 }, className, rnClass, style, rnStyle],
    refreshControl:
      typeof onRefresh === 'function' ? (
        <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
      ) : undefined,
    ...args,
  };

  return <ScrollView {..._props}>{children}</ScrollView>;
};
