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

let IconElites: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 0c282.7776 0 512 229.2224 512 512s-229.2224 512-512 512S0 794.7776 0 512 229.2224 0 512 0z m0 64a448 448 0 1 0 0 896 448 448 0 0 0 0-896zM358.4 322.9696c0-8.704 7.0656-15.7696 15.7696-15.7696H665.6l-9.0112 18.944a62.976 62.976 0 0 1-56.9344 35.9936H461.6704a15.7696 15.7696 0 0 0-15.7184 15.7696v86.8352c0 8.704 7.0144 15.7696 15.7184 15.7696h82.3808c8.704 0 15.7696 7.0144 15.7696 15.7184v23.3472c0 8.704-7.0656 15.7696-15.7696 15.7696H461.6704a15.7696 15.7696 0 0 0-15.7184 15.7184v95.0272c0 8.704 7.0144 15.7696 15.7184 15.7696h110.8992c24.3712 0 46.4896 14.0288 56.9344 35.9936l9.0112 18.944H374.1696A15.7696 15.7696 0 0 1 358.4 701.0304V322.9696z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconElites.defaultProps = {
  size: 18,
};

IconElites = React.memo ? React.memo(IconElites) : IconElites;

export default IconElites;
