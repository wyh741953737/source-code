/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconduihaoCheckmark: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M402.5856 819.2a51.2 51.2 0 0 1-37.3248-16.128l-248.9856-265.216a51.2 51.2 0 1 1 74.5984-70.0416l211.2 224.768 430.4896-471.0912a51.2 51.2 0 0 1 75.6224 69.0176l-467.8144 512a51.0976 51.0976 0 0 1-37.376 16.6912h-0.4096z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconduihaoCheckmark.defaultProps = {
  size: 18,
};

IconduihaoCheckmark = React.memo
  ? React.memo(IconduihaoCheckmark)
  : IconduihaoCheckmark;

export default IconduihaoCheckmark;
