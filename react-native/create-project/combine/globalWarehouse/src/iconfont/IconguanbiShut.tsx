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

let IconguanbiShut: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M598.8864 512l263.7312-263.7312a61.3888 61.3888 0 1 0-86.8864-86.8864L512 425.1136 248.2688 161.3824a61.3888 61.3888 0 1 0-86.8864 86.8864L425.1136 512l-263.7312 263.7824a61.3888 61.3888 0 1 0 86.8864 86.8352L512 598.8864l263.7312 263.7312a61.2864 61.2864 0 0 0 86.8864 0c24.064-24.0128 24.064-62.8224 0-86.8352L598.8864 512z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconguanbiShut.defaultProps = {
  size: 18,
};

IconguanbiShut = React.memo ? React.memo(IconguanbiShut) : IconguanbiShut;

export default IconguanbiShut;
