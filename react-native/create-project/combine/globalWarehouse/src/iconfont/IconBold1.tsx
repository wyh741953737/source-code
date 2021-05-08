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

let IconBold1: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M719.36 1024l173.226667-125.269333-238.933334-314.026667L1024 480.597333l-64.512-203.093333-354.986667 135.850667L622.762667 0H408.576L426.666667 406.186667 65.706667 267.946667 0 467.626667l364.373333 104.106666L117.077333 892.757333l174.421334 120.490667 212.650666-329.557333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconBold1.defaultProps = {
  size: 18,
};

IconBold1 = React.memo ? React.memo(IconBold1) : IconBold1;

export default IconBold1;
