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

let IconBianzu16Beifen: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1102 1024" width={size} height={size} {...rest}>
      <Path
        d="M973.020822 558.018078a254.179118 254.179118 0 0 0-71.677408-47.338596l54.112505-55.5303c38.595528-40.564687 59.547386-94.047061 59.547385-150.207493 0-56.160431-20.951858-110.272936-59.547385-150.91639l-6.773909-6.773909a194.001601 194.001601 0 0 0-264.576281-18.903932l-133.902851 135.320646-134.060384-135.320646a196.364593 196.364593 0 0 0-265.915309 18.273801l-6.773909 6.773909a218.734246 218.734246 0 0 0-59.547386 150.837624 211.88157 211.88157 0 0 0 58.917255 149.577361l405.961938 415.492671 4.095852-4.095852c12.130023 26.386738 29.064795 50.09542 49.386522 70.33838l-25.756607 26.386738-27.016869 27.095636-28.434665-27.095636-437.783557-449.283449A294.743805 294.743805 0 0 1 0.019692 304.232792c0-77.74242 29.143562-152.176652 82.54717-209.045981l6.773909-6.773909A280.408324 280.408324 0 0 1 473.72072 65.413118l77.112289 77.191056 77.191055-77.191056a278.75423 278.75423 0 0 1 382.883389 22.999784l6.773908 6.773909a304.747136 304.747136 0 0 1 0 417.46183l-44.660539 45.369437z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M634.719207 740.67732h380.284097v84.595096H634.719207z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M866.843738 592.517754v380.284097H782.169876V592.517754z"
        fill={getIconColor(color, 2, '#333333')}
      />
    </Svg>
  );
};

IconBianzu16Beifen.defaultProps = {
  size: 18,
};

IconBianzu16Beifen = React.memo
  ? React.memo(IconBianzu16Beifen)
  : IconBianzu16Beifen;

export default IconBianzu16Beifen;
