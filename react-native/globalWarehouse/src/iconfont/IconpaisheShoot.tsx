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

let IconpaisheShoot: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 537.6c-42.3424 0-76.8 34.4576-76.8 76.8s34.4576 76.8 76.8 76.8 76.8-34.4576 76.8-76.8-34.4576-76.8-76.8-76.8m0 256A179.4048 179.4048 0 0 1 332.8 614.4 179.4048 179.4048 0 0 1 512 435.2a179.4048 179.4048 0 0 1 179.2 179.2 179.4048 179.4048 0 0 1-179.2 179.2z m-102.4-614.4c0-14.1312 11.52-25.6 25.6-25.6h153.6a25.6 25.6 0 0 1 25.6 25.6V256H409.6V179.2zM870.4 256h-153.6V179.2A128.1536 128.1536 0 0 0 588.8 51.2h-153.6A128.1536 128.1536 0 0 0 307.2 179.2V256H153.6a153.7536 153.7536 0 0 0-153.6 153.6v409.6c0 84.6848 68.9152 153.6 153.6 153.6h716.8c84.6848 0 153.6-68.9152 153.6-153.6V409.6c0-84.6848-68.9152-153.6-153.6-153.6z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconpaisheShoot.defaultProps = {
  size: 18,
};

IconpaisheShoot = React.memo ? React.memo(IconpaisheShoot) : IconpaisheShoot;

export default IconpaisheShoot;
