import React from 'react';

export default (props: any) => {
  const { h5Style, h5Class, className, style, ...args } = props;
  const _className = !!h5Class && !!className ? `${h5Class} ${className}` : h5Class || className;

  return React.createElement('span', {
    className: _className,
    style: { ...h5Style, ...style },
    ...args,
  });
};
