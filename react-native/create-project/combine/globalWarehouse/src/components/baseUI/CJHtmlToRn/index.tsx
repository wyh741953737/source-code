import React from 'react';
import { CJView } from '../index';

export default (props: any) => {
  const { content, ...args } = props;

  const _props = {
    dangerouslySetInnerHTML: { __html: content },
    ...args,
  };

  return <CJView {..._props} />;
};
