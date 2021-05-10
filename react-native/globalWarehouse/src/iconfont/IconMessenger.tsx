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

let IconMessenger: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 0c288.426667 0 512 211.328 512 496.64 0 285.354667-223.573333 496.64-512 496.64a557.738667 557.738667 0 0 1-148.224-19.626667 40.96 40.96 0 0 0-27.306667 2.005334l-101.632 44.842666a40.96 40.96 0 0 1-57.472-36.181333l-2.816-91.136a40.789333 40.789333 0 0 0-13.738666-29.184C61.184 774.954667 0 645.973333 0 496.64 0 211.328 223.573333 0 512 0z m307.456 382.165333c14.421333-22.912-13.738667-48.725333-35.285333-32.426666l-161.536 122.709333a30.72 30.72 0 0 1-36.992 0l-119.637334-89.6a76.8 76.8 0 0 0-111.104 20.48l-150.357333 238.592c-14.421333 22.869333 13.738667 48.682667 35.285333 32.341333l161.536-122.624a30.72 30.72 0 0 1 36.992 0l119.637334 89.6a76.8 76.8 0 0 0 111.104-20.48z"
        fill={getIconColor(color, 0, '#0084FF')}
      />
    </Svg>
  );
};

IconMessenger.defaultProps = {
  size: 18,
};

IconMessenger = React.memo ? React.memo(IconMessenger) : IconMessenger;

export default IconMessenger;
