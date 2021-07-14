import React, { FC } from 'react';
import classnames from 'classnames';
import style from './index.less';

interface Props {
  value?: any;
  exclude?: any[];
  className?: string;
  successRender?: (value: any) => React.ReactNode;
}

const ReadText: FC<Props> = ({
  value,
  exclude,
  className,
  children,
  successRender,
}) => {
  const excludes = exclude || [undefined, null, ''];
  const cls = classnames({
    [style['read-text']]: true,
    [className || '']: !!className,
  });
  if (excludes.includes(value)) {
    return <span className={cls}>{children}</span>;
  }
  return (
    <span className={cls}>{successRender ? successRender(value) : value}</span>
  );
};

export default ReadText;
