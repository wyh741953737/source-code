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

let IcontianjiaAddto: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M665.6 460.8h-102.4V358.4c0-28.16-23.04-51.2-51.2-51.2s-51.2 23.04-51.2 51.2v102.4H358.4c-28.16 0-51.2 23.04-51.2 51.2s23.04 51.2 51.2 51.2h102.4v102.4c0 28.16 23.04 51.2 51.2 51.2s51.2-23.04 51.2-51.2v-102.4h102.4c28.16 0 51.2-23.04 51.2-51.2s-23.04-51.2-51.2-51.2m-153.6 460.8c-225.8432 0-409.6-183.7568-409.6-409.6s183.7568-409.6 409.6-409.6 409.6 183.7568 409.6 409.6-183.7568 409.6-409.6 409.6m0-921.6C229.6832 0 0 229.6832 0 512s229.6832 512 512 512 512-229.6832 512-512S794.3168 0 512 0"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IcontianjiaAddto.defaultProps = {
  size: 18,
};

IcontianjiaAddto = React.memo ? React.memo(IcontianjiaAddto) : IcontianjiaAddto;

export default IcontianjiaAddto;
