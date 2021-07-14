import React from 'react';
import { platform } from '../tools/base';

export default (
  WebComponent: React.FunctionComponent,
  MobileComponent: React.FunctionComponent,
): React.FunctionComponent => {
  if (platform.isH5) {
    return (props: any) => <MobileComponent {...props} />;
  }

  return (props: any) => <WebComponent {...props} />;
};
