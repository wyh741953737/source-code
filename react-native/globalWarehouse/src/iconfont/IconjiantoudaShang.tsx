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

let IconjiantoudaShang: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M51.2 690.8928c0-19.2 8.3456-38.2976 24.576-51.3536l394.9568-317.7984a65.8432 65.8432 0 0 1 83.456 0.7168l394.9568 329.1136a65.792 65.792 0 1 1-84.2752 101.12L511.2832 458.1376l-352.9728 284.0576A65.792 65.792 0 0 1 51.2 690.8928"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconjiantoudaShang.defaultProps = {
  size: 18,
};

IconjiantoudaShang = React.memo
  ? React.memo(IconjiantoudaShang)
  : IconjiantoudaShang;

export default IconjiantoudaShang;
