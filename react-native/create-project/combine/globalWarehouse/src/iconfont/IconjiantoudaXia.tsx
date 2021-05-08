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

let IconjiantoudaXia: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M972.8 333.1072c0 19.2-8.3456 38.2976-24.576 51.3536l-394.9568 317.7984a65.8432 65.8432 0 0 1-83.456-0.7168L74.9056 372.4288a65.792 65.792 0 1 1 84.2752-101.12l353.5872 294.5536 352.9728-284.0576A65.792 65.792 0 0 1 972.8 333.1072"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconjiantoudaXia.defaultProps = {
  size: 18,
};

IconjiantoudaXia = React.memo ? React.memo(IconjiantoudaXia) : IconjiantoudaXia;

export default IconjiantoudaXia;
