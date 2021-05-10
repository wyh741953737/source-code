import React from 'react';

export default (props: any) => {
  const { children, h5Class, h5Style, className, style, ...args } = props;

  const _className =
    !!h5Class && !!className ? `${h5Class} ${className}` : h5Class || className;

  const _props = {
    className: _className,
    style: { ...h5Style, ...style },
    ...args,
  };

  return <div {..._props}>{children}</div>;
};
