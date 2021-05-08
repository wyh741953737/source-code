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

let IconchenggongSuccess: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M650.496 327.3728l-193.7408 254.464-83.6096-106.8544a51.1488 51.1488 0 1 0-80.64 63.0784l124.416 159.0784a51.2 51.2 0 0 0 40.3968 19.6096h0.3584a50.8928 50.8928 0 0 0 40.3456-20.1728l233.9328-307.2a51.1488 51.1488 0 1 0-81.4592-61.952M512 921.6c-225.8432 0-409.6-183.7568-409.6-409.6s183.7568-409.6 409.6-409.6 409.6 183.7568 409.6 409.6-183.7568 409.6-409.6 409.6m0-921.6C229.2224 0 0 229.2736 0 512s229.2224 512 512 512 512-229.2736 512-512S794.7776 0 512 0"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconchenggongSuccess.defaultProps = {
  size: 18,
};

IconchenggongSuccess = React.memo
  ? React.memo(IconchenggongSuccess)
  : IconchenggongSuccess;

export default IconchenggongSuccess;
