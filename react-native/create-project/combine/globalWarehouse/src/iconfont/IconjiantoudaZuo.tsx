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

let IconjiantoudaZuo: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M690.8928 972.8c-19.2 0-38.2976-8.3456-51.3536-24.576l-317.7984-394.9568a65.8432 65.8432 0 0 1 0.7168-83.456l329.1136-394.9568a65.792 65.792 0 1 1 101.12 84.2752l-294.5536 353.5872 284.0576 352.9728A65.792 65.792 0 0 1 690.8928 972.8"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconjiantoudaZuo.defaultProps = {
  size: 18,
};

IconjiantoudaZuo = React.memo ? React.memo(IconjiantoudaZuo) : IconjiantoudaZuo;

export default IconjiantoudaZuo;
