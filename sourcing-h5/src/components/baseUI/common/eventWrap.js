import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

import { parseProps } from './index';

export default (props, type) => Component => {
  const { event, attr } = parseProps(props, type);
  const { onPress, ...eventRest } = event;
  const { rnStyle, rnClass, className, style } = props;

  if (onPress) {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <Component {...attr} {...eventRest} style={[className, rnClass, style, rnStyle]} />
      </TouchableWithoutFeedback>
    );
  }

  return <Component {...attr} {...eventRest} style={[className, rnClass, style, rnStyle]} />;
};
