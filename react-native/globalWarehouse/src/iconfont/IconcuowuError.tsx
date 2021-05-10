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

let IconcuowuError: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M656.7936 584.3968L584.3968 512l72.3968-72.3968a51.3536 51.3536 0 0 0 0-72.3968 51.3536 51.3536 0 0 0-72.3968 0L512 439.6032 439.6032 367.2064a51.3536 51.3536 0 0 0-72.3968 0 51.3536 51.3536 0 0 0 0 72.3968L439.6032 512l-72.3968 72.3968a51.3536 51.3536 0 0 0 0 72.3968 51.3536 51.3536 0 0 0 72.3968 0L512 584.3968l72.3968 72.3968a51.3536 51.3536 0 0 0 72.3968 0 51.3536 51.3536 0 0 0 0-72.3968M102.4 512c0-225.8432 183.7568-409.6 409.6-409.6s409.6 183.7568 409.6 409.6-183.7568 409.6-409.6 409.6-409.6-183.7568-409.6-409.6m921.6 0c0-282.3168-229.6832-512-512-512S0 229.6832 0 512s229.6832 512 512 512 512-229.6832 512-512"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconcuowuError.defaultProps = {
  size: 18,
};

IconcuowuError = React.memo ? React.memo(IconcuowuError) : IconcuowuError;

export default IconcuowuError;
