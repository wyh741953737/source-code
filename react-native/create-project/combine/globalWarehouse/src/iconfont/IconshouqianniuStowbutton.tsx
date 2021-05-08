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

let IconshouqianniuStowbutton: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
        fill={getIconColor(color, 0, '#4400FA')}
      />
      <Path
        d="M626.3296 626.3296c-20.992 20.992-55.296 20.992-76.2368 0L512 588.2368l-38.0928 38.0928c-20.992 20.992-55.296 20.992-76.2368 0-20.992-20.992-20.992-55.296 0-76.2368L435.7632 512l-38.0928-38.0928c-20.992-20.992-20.992-55.296 0-76.2368 20.992-20.992 55.296-20.992 76.2368 0l38.0928 38.0928 38.0928-38.0928c20.992-20.992 55.296-20.992 76.2368 0 20.992 20.992 20.992 55.296 0 76.2368l-38.0928 38.0928 38.0928 38.0928c20.992 20.992 20.992 55.296 0 76.2368"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
    </Svg>
  );
};

IconshouqianniuStowbutton.defaultProps = {
  size: 18,
};

IconshouqianniuStowbutton = React.memo
  ? React.memo(IconshouqianniuStowbutton)
  : IconshouqianniuStowbutton;

export default IconshouqianniuStowbutton;
