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

let IconBold: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M557.866667 734.293333L584.576 0H439.509333l26.709334 734.293333h91.648zM511.445333 1024c23.210667 0 44.117333-10.069333 61.525334-28.672 16.213333-20.053333 24.405333-44.458667 24.405333-74.581333s-8.106667-54.528-24.405333-73.130667a75.093333 75.093333 0 0 0-61.44-28.672c-23.296 0-43.008 8.533333-59.306667 28.672-17.408 18.602667-25.514667 43.008-25.514667 73.130667 0 28.672 8.106667 53.077333 25.6 73.130666 16.213333 20.053333 35.925333 30.122667 59.136 30.122667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconBold.defaultProps = {
  size: 18,
};

IconBold = React.memo ? React.memo(IconBold) : IconBold;

export default IconBold;
