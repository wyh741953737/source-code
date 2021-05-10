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

let IconyikeOne: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M33.128448 360.5504l306.9952-46.6944L477.339648 22.528a38.0416 38.0416 0 0 1 69.376 0l137.216 291.328 307.0464 46.6944a38.0416 38.0416 0 0 1 22.1184 11.776 41.984 41.984 0 0 1-0.768 57.344l-222.0544 226.816 52.4288 320.1536a41.8816 41.8816 0 0 1-3.84 25.7024 37.7856 37.7856 0 0 1-52.224 16.9472L512.053248 868.1472l-274.5856 151.1424a36.864 36.864 0 0 1-24.576 4.096c-20.992-3.84-35.1232-24.7296-31.488-46.7456l52.4288-320.2048L11.726848 429.7216a41.1648 41.1648 0 0 1-11.264-23.1936 40.1408 40.1408 0 0 1 32.6656-45.9776z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconyikeOne.defaultProps = {
  size: 18,
};

IconyikeOne = React.memo ? React.memo(IconyikeOne) : IconyikeOne;

export default IconyikeOne;
