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

let Icon9Bold: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M343.296 1024c169.301333-1.365333 296.618667-49.749333 381.952-145.066667C810.666667 783.530667 853.333333 645.12 853.333333 463.616v-46.933333c0-126.72-30.890667-227.84-92.757333-303.36C698.709333 37.802667 614.997333 0 509.44 0c-67.584 0-127.061333 14.933333-178.346667 44.885333A303.530667 303.530667 0 0 0 212.394667 170.666667C184.576 224.597333 170.666667 284.672 170.666667 350.976 170.666667 451.925333 197.973333 533.333333 252.672 595.285333c54.613333 61.952 128 92.928 220.16 92.928 78.165333 0 146.432-29.696 204.970667-89.173333-6.741333 96.768-37.632 168.277333-92.757334 214.528-55.210667 46.336-134.314667 70.144-237.397333 71.509333h-25.173333V1024h20.821333zM509.44 556.885333c-50.346667 0-90.624-19.285333-120.832-58.026666-30.208-38.656-45.226667-89.6-45.226667-152.746667 0-60.757333 14.933333-111.104 44.885334-150.954667 29.952-39.765333 70.144-59.733333 120.490666-59.733333s91.306667 22.613333 123.050667 67.754667c31.573333 45.141333 47.445333 104.789333 47.445333 178.944v65.621333c-16.810667 34.133333-40.533333 60.842667-71.253333 80.213333-30.72 19.285333-63.488 29.013333-98.56 29.013334z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Icon9Bold.defaultProps = {
  size: 18,
};

Icon9Bold = React.memo ? React.memo(Icon9Bold) : Icon9Bold;

export default Icon9Bold;
