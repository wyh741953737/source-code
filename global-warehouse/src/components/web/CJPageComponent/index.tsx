import React from 'react';

interface Props {
  /**
   * 页面title
   */
  title: ((props: any) => string) | string;
}

const PageComponent =
  ({ title }: Props) =>
  (WrapperComponent: any) =>
  (props: any) => {
    setTimeout(() => {
      document.title = typeof title === 'string' ? title : title(props);
    }, 100);
    if (!WrapperComponent) return null;
    return <WrapperComponent {...props} />;
  };

export default PageComponent;
