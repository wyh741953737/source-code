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

let Icon4Bold: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M764.842667 1024V796.16H896V659.029333H764.842667V0h-181.76L128 692.053333l5.12 104.106667H588.8V1024h176.042667zM588.8 659.029333H312.746667l262.997333-405.162666 13.056-22.442667v427.52z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Icon4Bold.defaultProps = {
  size: 18,
};

Icon4Bold = React.memo ? React.memo(Icon4Bold) : Icon4Bold;

export default Icon4Bold;
