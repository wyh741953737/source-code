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

let IconTwitter: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M307.413333 938.666667c377.898667 0 596.48-300.032 596.48-584.789334 0-7.850667 53.717333-54.997333 76.714667-153.258666 4.693333-19.968-14.293333-35.712-32.170667-27.306667-45.909333 21.546667-92.458667 4.48-112.682666-20.053333-77.824-86.784-207.914667-90.965333-290.688-9.386667-53.333333 52.693333-75.946667 131.072-59.434667 205.909333-174.762667 12.714667-294.741333-71.936-393.429333-188.074666-12.714667-15.061333-36.352-7.125333-38.997334 12.8-14.592 111.061333-19.2 381.013333 242.346667 536.064-45.397333 66.773333-134.314667 106.197333-233.301333 123.093333-21.888 3.797333-27.093333 34.816-7.082667 44.842667a559.274667 559.274667 0 0 0 252.245333 59.989333"
        fill={getIconColor(color, 0, '#55ACEE')}
      />
    </Svg>
  );
};

IconTwitter.defaultProps = {
  size: 18,
};

IconTwitter = React.memo ? React.memo(IconTwitter) : IconTwitter;

export default IconTwitter;
