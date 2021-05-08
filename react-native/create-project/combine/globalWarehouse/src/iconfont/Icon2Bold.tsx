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

let Icon2Bold: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M853.333333 1024v-134.570667H395.093333l241.322667-264.362666c63.232-70.314667 108.8-133.12 136.533333-188.330667 27.818667-55.296 41.813333-108.117333 41.813334-158.549333 0-86.954667-27.733333-155.050667-83.114667-204.288C676.266667 24.661333 600.661333 0 504.917333 0 438.442667 0 379.733333 13.653333 328.96 40.96A285.44 285.44 0 0 0 211.712 155.733333C184.32 204.970667 170.666667 260.352 170.666667 321.877333h164.693333c0-57.770667 14.762667-103.338667 44.117333-136.618666 29.354667-33.28 70.741333-50.005333 124.074667-50.005334 44.714667 0 80.298667 14.848 106.666667 44.373334 26.453333 29.696 39.765333 68.522667 39.765333 116.650666 0 36.522667-10.069333 72.96-30.208 109.226667-20.138667 36.352-53.845333 81.493333-101.376 135.68l-328.789333 366.933333V1024H853.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Icon2Bold.defaultProps = {
  size: 18,
};

Icon2Bold = React.memo ? React.memo(Icon2Bold) : Icon2Bold;

export default Icon2Bold;
