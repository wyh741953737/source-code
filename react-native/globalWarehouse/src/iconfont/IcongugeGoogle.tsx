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

let IcongugeGoogle: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 0C229.2224 0 0 229.2224 0 512s229.2224 512 512 512 512-229.2224 512-512S794.7776 0 512 0z"
        fill={getIconColor(color, 0, '#E8E8E8')}
      />
      <Path
        d="M512 30.1056a481.8944 481.8944 0 1 1 0 963.7888A481.8944 481.8944 0 0 1 512 30.1056z"
        fill={getIconColor(color, 1, '#FEFEFE')}
      />
      <Path
        d="M336.7424 512c0-19.1488 3.2768-37.4784 9.0624-54.6816l-101.376-75.776A289.3312 289.3312 0 0 0 213.6576 512c0 46.8992 11.0592 91.136 30.8224 130.3552l101.2736-75.9296A170.9056 170.9056 0 0 1 336.7424 512"
        fill={getIconColor(color, 2, '#FBBC05')}
      />
      <Path
        d="M514.7648 337.9712c42.3936 0 80.7424 14.7456 110.848 38.8096l87.6032-85.6576a303.7184 303.7184 0 0 0-198.4512-73.5744c-119.04 0-221.3376 66.6112-270.336 163.9936l101.376 75.776c23.3984-69.4272 89.9584-119.296 168.96-119.296"
        fill={getIconColor(color, 3, '#EA4335')}
      />
      <Path
        d="M514.7648 686.0288c-79.0528 0-145.6128-49.92-168.96-119.3472l-101.376 75.776c48.9984 97.3824 151.296 163.9936 270.336 163.9936 73.4208 0 143.5648-25.4976 196.1984-73.3696l-96.256-72.8064c-27.0848 16.7424-61.2864 25.7536-99.9936 25.7536"
        fill={getIconColor(color, 4, '#34A853')}
      />
      <Path
        d="M802.2528 512c0-17.408-2.7648-36.1472-6.8608-53.5552h-280.6784v113.7664h161.536a132.5056 132.5056 0 0 1-61.44 88.064l96.1536 72.8064c55.296-50.2272 91.2896-125.0816 91.2896-221.0816"
        fill={getIconColor(color, 5, '#4285F4')}
      />
    </Svg>
  );
};

IcongugeGoogle.defaultProps = {
  size: 18,
};

IcongugeGoogle = React.memo ? React.memo(IcongugeGoogle) : IcongugeGoogle;

export default IcongugeGoogle;
