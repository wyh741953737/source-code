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

let IconpingguoIphone: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
        fill={getIconColor(color, 0, '#000000')}
      />
      <Path
        d="M635.4432 528.0256c-0.6144-64.8192 52.736-95.8976 55.1424-97.4848-30.0032-44.032-76.8-50.0224-93.3888-50.688-39.7824-4.096-77.6192 23.4496-97.792 23.4496-20.1728 0-51.3536-22.8864-84.3264-22.272-43.3664 0.6144-83.3536 25.2416-105.6768 64.2048-45.056 78.336-11.5712 194.4064 32.3584 257.9456 21.504 31.1296 47.104 66.048 80.64 64.768 32.3584-1.28 44.5952-20.992 83.712-20.992 39.0656 0 50.0736 20.992 84.3264 20.3776 34.816-0.6656 56.832-31.744 78.1824-62.9248 24.6272-36.0448 34.816-71.0144 35.3792-72.8064-0.768-0.3584-67.8912-26.112-68.5568-103.5776z m-64.3072-190.2592c17.8176-21.7088 29.8496-51.7632 26.5728-81.7664-25.7024 1.024-56.832 17.152-75.264 38.7584-16.5376 19.2-30.976 49.8176-27.136 79.2064 28.672 2.2528 57.9584-14.592 75.776-36.1984z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
    </Svg>
  );
};

IconpingguoIphone.defaultProps = {
  size: 18,
};

IconpingguoIphone = React.memo
  ? React.memo(IconpingguoIphone)
  : IconpingguoIphone;

export default IconpingguoIphone;
