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

let IconxiazaixiaDownload: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M748.1856 626.3296l-192 175.872c-2.8672 2.6112-6.4512 3.8912-9.6768 5.9392-3.4304 2.2016-6.5024 4.864-10.3424 6.4A66.7648 66.7648 0 0 1 512 819.2a67.072 67.072 0 0 1-24.4736-4.7104 64 64 0 0 1-20.8384-13.312l-191.8976-184.32a59.648 59.648 0 0 1 0-86.8352 65.8432 65.8432 0 0 1 90.4704 0l82.7392 79.4112V266.24c0-33.9968 28.672-61.44 64-61.44s64 27.4432 64 61.44v347.9552l83.8144-76.8c25.6-23.3472 66.048-22.528 90.4704 2.048 24.4736 24.576 23.4496 63.488-2.0992 86.8864"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconxiazaixiaDownload.defaultProps = {
  size: 18,
};

IconxiazaixiaDownload = React.memo
  ? React.memo(IconxiazaixiaDownload)
  : IconxiazaixiaDownload;

export default IconxiazaixiaDownload;
