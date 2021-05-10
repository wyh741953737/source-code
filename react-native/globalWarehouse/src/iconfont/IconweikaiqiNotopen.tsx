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

let IconweikaiqiNotopen: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M0 512c0-169.6256 128.6656-307.2 287.9488-307.2h448.0512c76.3904 0 149.6576 32.3584 203.6736 89.9584C993.6896 352.3584 1024 430.592 1024 512c0 169.6256-128.6144 307.2-287.9488 307.2H288c-76.3904 0-149.6576-32.3072-203.6736-89.9584C30.3104 671.6416 0 593.4592 0 512z"
        fill={getIconColor(color, 0, '#C0C4CC')}
      />
      <Path
        d="M307.2 716.8a204.8 204.8 0 1 0 0-409.6 204.8 204.8 0 0 0 0 409.6z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
    </Svg>
  );
};

IconweikaiqiNotopen.defaultProps = {
  size: 18,
};

IconweikaiqiNotopen = React.memo
  ? React.memo(IconweikaiqiNotopen)
  : IconweikaiqiNotopen;

export default IconweikaiqiNotopen;
