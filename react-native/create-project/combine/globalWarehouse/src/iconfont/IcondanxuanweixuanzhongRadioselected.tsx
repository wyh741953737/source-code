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

let IcondanxuanweixuanzhongRadioselected: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 0C229.2224 0 0 229.2224 0 512s229.2224 512 512 512 512-229.2224 512-512S794.7776 0 512 0z m0 102.4a409.6 409.6 0 1 1 0 819.2 409.6 409.6 0 0 1 0-819.2z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IcondanxuanweixuanzhongRadioselected.defaultProps = {
  size: 18,
};

IcondanxuanweixuanzhongRadioselected = React.memo
  ? React.memo(IcondanxuanweixuanzhongRadioselected)
  : IcondanxuanweixuanzhongRadioselected;

export default IcondanxuanweixuanzhongRadioselected;
