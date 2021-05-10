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

let IconduoxuanyixuanzhongMultipleselectionselected: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M0 0m102.4 0l819.2 0q102.4 0 102.4 102.4l0 819.2q0 102.4-102.4 102.4l-819.2 0q-102.4 0-102.4-102.4l0-819.2q0-102.4 102.4-102.4Z"
        fill={getIconColor(color, 0, '#4400FA')}
      />
      <Path
        d="M757.6064 243.5072l-318.464 339.4048L263.168 419.7888a60.5184 60.5184 0 0 0-88.8832 6.8096 65.8944 65.8944 0 0 0 6.3488 88.832l220.416 204.288a60.416 60.416 0 0 0 85.6576-3.072l359.7824-383.744a65.8432 65.8432 0 0 0 0.3072-89.088 60.416 60.416 0 0 0-89.1904-0.3072z"
        fill={getIconColor(color, 1, '#FEFEFE')}
      />
    </Svg>
  );
};

IconduoxuanyixuanzhongMultipleselectionselected.defaultProps = {
  size: 18,
};

IconduoxuanyixuanzhongMultipleselectionselected = React.memo
  ? React.memo(IconduoxuanyixuanzhongMultipleselectionselected)
  : IconduoxuanyixuanzhongMultipleselectionselected;

export default IconduoxuanyixuanzhongMultipleselectionselected;
