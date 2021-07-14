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

let IconTutorial: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 0c282.7776 0 512 229.2224 512 512s-229.2224 512-512 512S0 794.7776 0 512 229.2224 0 512 0z m0 64a448 448 0 1 0 0 896 448 448 0 0 0 0-896zM335.3088 691.5072l258.8672-105.472 0.1024-0.256-145.7152-145.7664-113.2544 251.4944z m376.0128-410.7776a25.6 25.6 0 0 1 34.048 32.8192l-115.456 293.5808a25.6 25.6 0 0 1-14.1824 14.336l-300.544 122.368a25.6 25.6 0 0 1-32.9728-34.1504l131.1744-291.7376a25.6 25.6 0 0 1 13.1072-13.0048l284.8256-124.2112z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconTutorial.defaultProps = {
  size: 18,
};

IconTutorial = React.memo ? React.memo(IconTutorial) : IconTutorial;

export default IconTutorial;
