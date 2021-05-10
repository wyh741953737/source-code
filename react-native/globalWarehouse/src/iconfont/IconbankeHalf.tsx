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

let IconbankeHalf: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M33.181115 360.522762l306.970796-46.690688L477.357003 22.527233a38.038576 38.038576 0 0 1 69.370485 0l137.205092 291.304841 307.021992 46.690688a38.038576 38.038576 0 0 1 22.116641 11.775064 41.980663 41.980663 0 0 1-0.767938 57.339442l-222.036749 226.797969 52.424633 320.12815a41.878271 41.878271 0 0 1-3.839695 25.700357 37.782596 37.782596 0 0 1-52.219849 16.945853L512.067843 868.079212l-274.563772 151.130385a36.86107 36.86107 0 0 1-24.574046 4.095674c-20.990331-3.839695-35.120408-24.727634-31.485497-46.741884l52.424632-320.179346L11.781216 429.688464a41.161528 41.161528 0 0 1-11.263105-23.191756 40.137609 40.137609 0 0 1 32.663004-45.973946z"
        fill={getIconColor(color, 0, '#E4E4E4')}
      />
      <Path
        d="M33.181115 360.573958l306.970796-46.741884L477.357003 22.527233A37.629008 37.629008 0 0 1 512.067843 0.001024v868.129384l-274.563772 151.130385a36.86107 36.86107 0 0 1-24.574046 4.095674c-20.990331-3.839695-35.120408-24.727634-31.485497-46.741884l52.424632-320.179346L11.781216 429.688464a41.161528 41.161528 0 0 1-11.263105-23.191756 40.137609 40.137609 0 0 1 32.663004-45.92275z"
        fill={getIconColor(color, 1, '#FFC832')}
      />
    </Svg>
  );
};

IconbankeHalf.defaultProps = {
  size: 18,
};

IconbankeHalf = React.memo ? React.memo(IconbankeHalf) : IconbankeHalf;

export default IconbankeHalf;
