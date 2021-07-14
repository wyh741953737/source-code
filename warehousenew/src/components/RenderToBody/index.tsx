import React, { Component, ReactElement } from 'react';
import ReactDom from 'react-dom';

interface Props {
  children: ReactElement;
}

/**
 * 在render中把指定的元素渲染到body节点
 */
export default class RenderToBody extends Component<Props> {
  private popup: any;
  /**
   * 直接渲染到body地下，不会自动移除
   * @param children
   */
  static directly = (children: ReactElement): Function => {
    const popup = document.createElement('div');
    document.body.appendChild(popup);
    ReactDom.render(children, popup);
    return () => {
      ReactDom.unmountComponentAtNode(popup);
      document.body.removeChild(popup);
    };
  };

  componentDidMount(): void {
    //新建一个div标签并塞进body
    this.popup = document.createElement('div');
    document.body.appendChild(this.popup);
    this._renderLayer();
  }

  componentDidUpdate(): void {
    this._renderLayer();
  }

  componentWillUnmount(): void {
    //在组件卸载的时候，保证弹层也被卸载掉
    ReactDom.unmountComponentAtNode(this.popup);
    document.body.removeChild(this.popup);
  }

  _renderLayer(): void {
    //将弹层渲染到body下的div标签
    ReactDom.render(this.props.children, this.popup);
  }

  render() {
    return null;
  }
}

export const renderToBody = function() {};
