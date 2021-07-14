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

let IconBoke: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M724.736 625.7152a241.2544 241.2544 0 1 0-449.3824-66.6624 24.576 24.576 0 1 0 48.2816-9.5232 192 192 0 1 1 150.8352 150.8352 24.576 24.576 0 0 0-9.5232 48.2816 241.2544 241.2544 0 0 0 259.7888-122.88z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M512 590.7456a78.7456 78.7456 0 1 0 0-157.4912 78.7456 78.7456 0 0 0 0 157.4912z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M510.3616 498.2784a300.3904 300.3904 0 0 0-190.3616 279.552 24.6272 24.6272 0 0 0 49.2544 0 251.136 251.136 0 0 1 159.232-233.728 24.6272 24.6272 0 1 0-18.0736-45.824h-0.0512z"
        fill={getIconColor(color, 2, '#333333')}
      />
      <Path
        d="M512 0c282.7776 0 512 229.2224 512 512s-229.2224 512-512 512S0 794.7776 0 512 229.2224 0 512 0z m0 64a448 448 0 1 0 0 896 448 448 0 0 0 0-896z"
        fill={getIconColor(color, 3, '#333333')}
      />
    </Svg>
  );
};

IconBoke.defaultProps = {
  size: 18,
};

IconBoke = React.memo ? React.memo(IconBoke) : IconBoke;

export default IconBoke;
