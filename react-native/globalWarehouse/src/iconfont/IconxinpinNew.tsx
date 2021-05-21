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

let IconxinpinNew: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
        fill={getIconColor(color, 0, '#FEFEFE')}
      />
      <Path
        d="M315.7504 788.8384v-122.368h0.6144l84.6336 122.368h17.5104V640H401.408v121.088h-0.6144L316.5696 640h-17.92v148.8384h17.1008z m175.7184 2.9184a50.176 50.176 0 0 0 34.4064-12.0832 48.64 48.64 0 0 0 14.592-25.4464h-16.6912a37.6832 37.6832 0 0 1-10.8032 16.896 33.4336 33.4336 0 0 1-21.504 6.656 30.5664 30.5664 0 0 1-24.1664-9.984c-5.8368-6.656-8.96-16.0768-9.7792-28.16h84.992c-0.3584-18.7392-4.5568-33.536-12.4928-43.9808-8.704-11.6736-21.8624-17.5104-39.168-17.5104a45.2608 45.2608 0 0 0-37.12 16.896c-9.1648 10.5984-13.5168 23.9616-13.5168 39.7824 0 17.5104 4.608 31.2832 14.1824 41.728 9.1648 9.984 21.6576 15.2064 37.0688 15.2064z m33.792-65.024H457.9328a41.5232 41.5232 0 0 1 10.24-25.2416 30.1568 30.1568 0 0 1 23.0912-9.3696c20.48 0 31.8976 11.4688 33.9968 34.6112z m77.312 62.1056l25.4464-86.7328 24.9856 86.7328h15.872l36.6592-107.776h-18.3296l-26.4704 87.3472-24.9856-87.3472h-15.6672l-24.9856 87.3472-26.4704-87.3472h-18.3808l36.7104 107.776h15.616z"
        fill={getIconColor(color, 1, '#303133')}
      />
      <Path
        d="M473.1904 374.272c78.1824 0 148.6848 35.072 193.3312 91.392-20.5312-83.0464-99.4304-145.0496-193.3312-145.0496a21.7088 21.7088 0 0 1-21.9648-21.4528v-41.2672l-105.8304 89.6 105.8304 90.368v-42.1376c0-11.8784 9.8304-21.4528 21.9648-21.4528m214.3232 203.8272a21.8624 21.8624 0 0 1-21.3504-16.384c-19.5072-78.2848-88.2176-134.8096-171.008-143.36v24.064c0 15.104-9.216 28.6208-24.0128 35.1232A45.3632 45.3632 0 0 1 423.424 471.04L312.32 376.1152a37.888 37.888 0 0 1-13.6192-28.672 37.888 37.888 0 0 1 13.568-28.672L423.424 223.8464a45.3632 45.3632 0 0 1 47.7696-6.5024 38.6048 38.6048 0 0 1 24.0128 35.1744v26.112c123.392 10.5984 220.416 109.568 220.416 229.7344 0 17.408-2.304 35.328-6.7584 53.3504a21.8112 21.8112 0 0 1-21.2992 16.384"
        fill={getIconColor(color, 2, '#4400FA')}
      />
    </Svg>
  );
};

IconxinpinNew.defaultProps = {
  size: 18,
};

IconxinpinNew = React.memo ? React.memo(IconxinpinNew) : IconxinpinNew;

export default IconxinpinNew;