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

let IconjiahaoPlus: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 307.2a51.2 51.2 0 0 1 51.2 51.2v102.4h102.4a51.2 51.2 0 1 1 0 102.4h-102.4v102.4a51.2 51.2 0 1 1-102.4 0v-102.4H358.4a51.2 51.2 0 1 1 0-102.4h102.4V358.4a51.2 51.2 0 0 1 51.2-51.2z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconjiahaoPlus.defaultProps = {
  size: 18,
};

IconjiahaoPlus = React.memo ? React.memo(IconjiahaoPlus) : IconjiahaoPlus;

export default IconjiahaoPlus;
