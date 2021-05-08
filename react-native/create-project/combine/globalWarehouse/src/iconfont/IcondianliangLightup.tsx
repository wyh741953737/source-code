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

let IcondianliangLightup: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 204.8a307.2 307.2 0 1 1 0 614.4 307.2 307.2 0 0 1 0-614.4z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
      <Path
        d="M512 0C229.2224 0 0 229.2224 0 512s229.2224 512 512 512 512-229.2224 512-512S794.7776 0 512 0z m0 204.8a307.2 307.2 0 1 1 0 614.4 307.2 307.2 0 0 1 0-614.4z"
        fill={getIconColor(color, 1, '#4400FA')}
      />
    </Svg>
  );
};

IcondianliangLightup.defaultProps = {
  size: 18,
};

IcondianliangLightup = React.memo
  ? React.memo(IcondianliangLightup)
  : IcondianliangLightup;

export default IcondianliangLightup;
