import React from 'react';

export default (
  WebComponent: React.FunctionComponent,
  MobileComponent: React.FunctionComponent,
): React.FunctionComponent => (props: any) => <MobileComponent {...props} />;
