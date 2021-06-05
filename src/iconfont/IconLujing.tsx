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

let IconLujing: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1274 1024" width={size} height={size} {...rest}>
      <Path
        d="M1194.659698 314.884137c0-52.565027-13.994585-103.764728-38.997106-149.332463a283.47568 283.47568 0 0 0-50.85837-67.41294l-7.338624-6.911959A311.208851 311.208851 0 0 0 875.770891 0.005973c-72.191579 0-140.713846 23.893194-196.009523 67.327608l-83.114182 79.956866L514.130334 67.418913A315.560826 315.560826 0 0 0 318.035478 0.005973a309.928859 309.928859 0 0 0-221.609374 91.220802l-7.423957 6.997292c-20.650546 20.309215-37.546448 42.751751-50.773037 67.327607a307.795538 307.795538 0 0 0-38.314443 149.332463c0 63.914294 19.114555 124.159276 55.295678 174.676314 10.23994 14.762581 21.333209 28.757166 34.559798 41.386425l47.786388 46.33573L539.900851 968.533657l27.98917 27.306507 29.439828 28.159836 0.853328-0.682663 0.682663 0.682663c14.677248-13.311922 24.234525-23.125198 29.439828-28.159836l27.98917-27.306507 402.173654-391.251051 47.786388-46.33573a302.334236 302.334236 0 0 0 88.404818-216.062739z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconLujing.defaultProps = {
  size: 18,
};

IconLujing = React.memo ? React.memo(IconLujing) : IconLujing;

export default IconLujing;
