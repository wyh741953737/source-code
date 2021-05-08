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

let Icon1Bold: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M725.333333 1024V0h-22.101333L298.666667 146.517333V290.133333l254.293333-85.504V1024z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Icon1Bold.defaultProps = {
  size: 18,
};

Icon1Bold = React.memo ? React.memo(Icon1Bold) : Icon1Bold;

export default Icon1Bold;
