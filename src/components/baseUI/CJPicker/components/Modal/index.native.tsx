import React from 'react';
import { Modal } from 'react-native';

export default (props: any) => {
  const { children, ...args } = props;
  return <Modal {...args}>{children}</Modal>;
};
