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

let IconBold3: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M597.589333 1024V805.973333h249.514667V717.056H597.589333V593.749333l1.536-1.450666h247.978667V503.466667h-196.266667L938.666667 0H743.765333L512 440.32 280.234667 0H85.333333l287.914667 503.466667H178.346667V592.213333h246.613333l1.450667 1.450667v123.306667H178.346667v88.917333h248.064V1024z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconBold3.defaultProps = {
  size: 18,
};

IconBold3 = React.memo ? React.memo(IconBold3) : IconBold3;

export default IconBold3;
