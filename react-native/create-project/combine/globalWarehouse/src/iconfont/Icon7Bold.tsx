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

let Icon7Bold: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M459.605333 1024L853.333333 94.976V0H170.666667v137.130667h509.44L287.061333 1024z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Icon7Bold.defaultProps = {
  size: 18,
};

Icon7Bold = React.memo ? React.memo(Icon7Bold) : Icon7Bold;

export default Icon7Bold;
