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

let IconjianhaoMinussign: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M307.2 460.8m51.2 0l307.2 0q51.2 0 51.2 51.2l0 0q0 51.2-51.2 51.2l-307.2 0q-51.2 0-51.2-51.2l0 0q0-51.2 51.2-51.2Z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconjianhaoMinussign.defaultProps = {
  size: 18,
};

IconjianhaoMinussign = React.memo
  ? React.memo(IconjianhaoMinussign)
  : IconjianhaoMinussign;

export default IconjianhaoMinussign;
