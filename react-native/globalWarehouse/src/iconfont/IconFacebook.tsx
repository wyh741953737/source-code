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

let IconFacebook: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M818.432 28.458667A28.032 28.032 0 0 0 790.912 0h-137.514667c-151.893333 0-275.029333 114.645333-275.029333 256v153.6H240.853333a27.989333 27.989333 0 0 0-27.52 28.458667v147.882666c0 15.701333 12.330667 28.458667 27.52 28.458667h137.514667v381.141333c0 15.701333 12.330667 28.458667 27.477333 28.458667h165.034667a28.032 28.032 0 0 0 27.52-28.458667V614.4H742.4c12.373333 0 23.210667-8.533333 26.581333-20.821333l39.68-147.925334c4.864-18.090667-8.32-36.053333-26.453333-36.053333h-183.893333V256c0-28.288 24.618667-51.2 55.04-51.2h137.514666a28.032 28.032 0 0 0 27.52-28.458667V28.458667z"
        fill={getIconColor(color, 0, '#3C599B')}
      />
    </Svg>
  );
};

IconFacebook.defaultProps = {
  size: 18,
};

IconFacebook = React.memo ? React.memo(IconFacebook) : IconFacebook;

export default IconFacebook;