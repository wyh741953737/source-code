/* eslint-disable react/no-string-refs */
/* eslint-disable prefer-spread */
import React, { Component } from 'react';
import BScroll from 'better-scroll';
import { ActivityIndicator } from 'antd-mobile';

// 滚动事件回调的参数
interface scrollData {
  scrollY: number;
}

interface IScrollProps {
  cssStyle?: React.CSSProperties;
  probeType?: number;
  click?: any;
  scrollX?: boolean;
  stopPropagation?: boolean;
  eventPassthrough?: boolean;
  // pullup?: boolean;
  // pullDownRefresh?: boolean;
  scrollbar?: boolean;
  onScrollToEnd?: (data: scrollData) => void;
  onScroll?: (scroll: Partial<BScroll>) => void;
  onFinishPullDown?: (fn: Function) => void;
  hasMore?: boolean;
  /** 是否清除 loading 效果 */
  clearLoading?: boolean;
}

export default class Scroll extends Component<IScrollProps> {
  // 滚动组件的实例
  scroll!: BScroll;

  // eslint-disable-next-line react/static-property-placement
  static defaultProps: {};

  // 本地状态
  state = {
    timer: 1,
  };

  timer: unknown;

  componentDidMount() {
    // 初始化
    this._initScroll();
  }

  componentDidUpdate() {
    setTimeout(() => this.scroll.refresh(), 20);
  }

  componentWillUnmount() {
    this.scroll.destroy();
  }

  getScroll = () => this.scroll;

  refresh() {
    if (this.scroll) {
      this.scroll.refresh();
    }
  }

  enable() {
    if (this.scroll) {
      this.scroll.enable();
    }
  }

  disable() {
    if (this.scroll) {
      this.scroll.disable();
    }
  }

  scrollTo(x: number, y: number, time?: number, easing?: object) {
    if (this.scroll) {
      // this.scroll.scrollTo.apply(this.scroll, arg);
      this.scroll.scrollTo(x, y, time, easing);
    }
  }

  scrollToElement(
    el: HTMLElement | string,
    time?: number,
    offsetX?: number | boolean,
    offsetY?: number | boolean,
    easing?: object,
  ) {
    if (this.scroll) {
      // this.scroll.scrollToElement.apply(this.scroll, arg);
      this.scroll.scrollToElement(el, time, offsetX, offsetY, easing);
    }
  }

  _initScroll() {
    const {
      probeType,
      click,
      scrollX,
      stopPropagation,
      eventPassthrough,
      // pullDownRefresh,
      scrollbar,
      onScrollToEnd,
      onScroll,
      onFinishPullDown,
    } = this.props;

    this.scroll = new BScroll(this.refs.scrollWrapper as Element, {
      scrollbar,
      probeType,
      click,
      scrollX,
      stopPropagation,
      eventPassthrough,
      pullDownRefresh: onFinishPullDown
        ? {
            threshold: 50,
            stop: 40,
          }
        : false,
    });

    // 上拉加载
    if (onScrollToEnd && typeof onScrollToEnd === 'function') {
      // 判断是否滚动到底部
      this.scroll.on('scrollEnd', () => {
        if (this.scroll.y <= this.scroll.maxScrollY + 70) {
          // 上拉加载页面节流
          if (this.state.timer) {
            clearTimeout(Number(this.timer));
            this.setState({ timer: 0 });
            onScrollToEnd!({ scrollY: this.scroll.y });
            this.timer = setTimeout(() => {
              this.setState({ timer: 1 });
            }, 2000);
          }
        }
      });
    }

    // 下拉刷新
    if (onFinishPullDown) {
      this.scroll.on('pullingDown', () => {
        if (onFinishPullDown && typeof onFinishPullDown === 'function') {
          onFinishPullDown(() => {
            this.scroll.refresh(); // DOM 结构发生变化后，重新初始化BScroll
            this.scroll.finishPullDown(); // 下拉刷新动作完成后调用此方法告诉BScroll完成一次下拉动作
          });
        }
      });
    }

    // 灵敏实时监听滚动
    if (probeType) {
      if (onScroll) {
        this.scroll.on('scroll', () => {
          onScroll({ ...this.scroll });
        });
      }
    }

    // fix：pc 端访问，pc 形式切换成移动端形式，需要初始化更新 refresh
    setTimeout(() => {
      this.scroll.refresh();
    }, 20);
  }

  render() {
    const {
      children,
      cssStyle,
      onFinishPullDown,
      hasMore,
      clearLoading,
    } = this.props;

    return (
      <>
        <div
          ref="scrollWrapper"
          className="scroll_wrapper"
          style={{
            position: 'fixed',
            overflow: 'hidden',
            width: '100%',
            ...cssStyle,
          }}
        >
          <div>
            {/* 顶部加载 */}
            {onFinishPullDown && (
              <div
                style={{
                  position: 'absolute',
                  top: -25,
                  textAlign: 'center',
                  left: '50%',
                  transform: 'translate(-50%)',
                }}
              >
                <ActivityIndicator />
              </div>
            )}

            {children}

            {/* 底部 */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                fontSize: '12px',
                color: '#c0c4cc',
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              {!clearLoading && hasMore ? (
                <ActivityIndicator animating />
              ) : (
                'No Data'
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

Scroll.defaultProps = {
  probeType: 1,
  scrollbar: true,
  click: true,
  scrollX: false,
  stopPropagation: false,
  eventPassthrough: false,
  clearLoading: false,
};
