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

let IconxiazaishangDownload: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M275.8144 397.6704l192-175.872c2.8672-2.6112 6.4512-3.8912 9.6768-5.9392 3.4304-2.2016 6.5024-4.864 10.3424-6.4C495.616 206.4384 503.808 204.8 512 204.8c8.3456 0 16.6912 1.6384 24.4736 4.7104 7.8336 3.1744 14.9504 7.68 20.8384 13.312l191.8976 184.32c25.088 24.0128 25.088 62.8736 0 86.8352-24.9344 24.064-65.4336 24.064-90.4704 0L576 414.5664V757.76c0 33.9968-28.672 61.44-64 61.44s-64-27.4432-64-61.44V409.8048l-83.8144 76.8c-25.6 23.3472-66.048 22.528-90.4704-2.048a59.6992 59.6992 0 0 1 2.0992-86.8864"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconxiazaishangDownload.defaultProps = {
  size: 18,
};

IconxiazaishangDownload = React.memo
  ? React.memo(IconxiazaishangDownload)
  : IconxiazaishangDownload;

export default IconxiazaishangDownload;
