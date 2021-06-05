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

let IconBianzu47Beifen: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M332.8 76.8m25.6 0l281.6 0q25.6 0 25.6 25.6l0 819.2q0 25.6-25.6 25.6l-281.6 0q-25.6 0-25.6-25.6l0-819.2q0-25.6 25.6-25.6Z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
      <Path
        d="M598.4 51.2a102.4 102.4 0 0 1 102.4 102.4v716.8a102.4 102.4 0 0 1-102.4 102.4h-198.4a102.4 102.4 0 0 1-102.4-102.4v-106.3168V271.2576 153.6a102.4 102.4 0 0 1 102.4-102.4h198.4z m0 51.2h-198.4A51.2 51.2 0 0 0 348.928 149.76L348.8 153.6v716.8a51.2 51.2 0 0 0 47.36 51.072l3.84 0.128h198.4a51.2 51.2 0 0 0 51.072-47.36l0.128-3.84v-73.6768V234.3936 153.6a51.2 51.2 0 0 0-47.36-51.072L598.3744 102.4z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M512 512m-307.2 0a307.2 307.2 0 1 0 614.4 0 307.2 307.2 0 1 0-614.4 0Z"
        fill={getIconColor(color, 2, '#FFFFFF')}
      />
      <Path
        d="M499.2 166.4C690.0736 166.4 844.8 321.1264 844.8 512s-154.7264 345.6-345.6 345.6S153.6 702.8736 153.6 512 308.3264 166.4 499.2 166.4z m0 51.2C336.6144 217.6 204.8 349.4144 204.8 512s131.8144 294.4 294.4 294.4S793.6 674.5856 793.6 512 661.7856 217.6 499.2 217.6z"
        fill={getIconColor(color, 3, '#333333')}
      />
      <Path
        d="M484.8128 324.8128a25.6 25.6 0 0 1 25.4208 22.6048l0.1792 2.9952v172.8a25.6 25.6 0 0 1-51.0464 2.9696l-0.1792-2.9696v-172.8a25.6 25.6 0 0 1 25.6-25.6z"
        fill={getIconColor(color, 4, '#FF7700')}
      />
      <Path
        d="M686.4128 526.4128a25.6 25.6 0 0 1-22.6304 25.4208l-2.9696 0.1536h-172.8a25.6 25.6 0 0 1-2.9952-51.0208l2.9952-0.1792h172.8a25.6 25.6 0 0 1 25.6 25.6z"
        fill={getIconColor(color, 5, '#FF7700')}
      />
    </Svg>
  );
};

IconBianzu47Beifen.defaultProps = {
  size: 18,
};

IconBianzu47Beifen = React.memo
  ? React.memo(IconBianzu47Beifen)
  : IconBianzu47Beifen;

export default IconBianzu47Beifen;
