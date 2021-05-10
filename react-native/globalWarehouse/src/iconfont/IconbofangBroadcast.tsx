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

let IconbofangBroadcast: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 0C229.2224 0 0 229.2224 0 512s229.2224 512 512 512 512-229.2224 512-512S794.7776 0 512 0zM413.5424 769.6896V279.9104l356.1472 217.7024-356.1472 272.0768z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconbofangBroadcast.defaultProps = {
  size: 18,
};

IconbofangBroadcast = React.memo
  ? React.memo(IconbofangBroadcast)
  : IconbofangBroadcast;

export default IconbofangBroadcast;
