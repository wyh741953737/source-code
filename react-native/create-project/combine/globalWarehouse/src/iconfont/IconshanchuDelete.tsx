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

let IconshanchuDelete: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 0c282.3168 0 512 229.6832 512 512s-229.6832 512-512 512S0 794.3168 0 512 229.6832 0 512 0zM367.2064 367.2064a51.3536 51.3536 0 0 0 0 72.3968L439.6032 512l-72.3968 72.3968a51.3536 51.3536 0 0 0 0 72.3968 51.3536 51.3536 0 0 0 72.3968 0L512 584.3968l72.3968 72.3968a51.3536 51.3536 0 0 0 72.3968 0 51.3536 51.3536 0 0 0 0-72.3968L584.3968 512l72.3968-72.3968a51.3536 51.3536 0 0 0 0-72.3968 51.3536 51.3536 0 0 0-72.3968 0L512 439.6032 439.6032 367.2064a51.3536 51.3536 0 0 0-72.3968 0z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconshanchuDelete.defaultProps = {
  size: 18,
};

IconshanchuDelete = React.memo
  ? React.memo(IconshanchuDelete)
  : IconshanchuDelete;

export default IconshanchuDelete;
