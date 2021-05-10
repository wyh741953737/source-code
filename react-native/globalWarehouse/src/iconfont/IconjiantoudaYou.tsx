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

let IconjiantoudaYou: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M333.1072 51.2c19.2 0 38.2976 8.3456 51.3536 24.576l317.7984 394.9568a65.8432 65.8432 0 0 1-0.7168 83.456l-329.1136 394.9568a65.792 65.792 0 1 1-101.12-84.2752l294.5536-353.5872-284.0576-352.9728A65.792 65.792 0 0 1 333.1072 51.2"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconjiantoudaYou.defaultProps = {
  size: 18,
};

IconjiantoudaYou = React.memo ? React.memo(IconjiantoudaYou) : IconjiantoudaYou;

export default IconjiantoudaYou;
