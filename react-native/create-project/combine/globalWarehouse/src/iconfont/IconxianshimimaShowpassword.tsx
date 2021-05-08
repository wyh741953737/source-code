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

let IconxianshimimaShowpassword: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 588.8512c-42.3424 0-76.8-34.4576-76.8-76.8s34.4576-76.8 76.8-76.8 76.8 34.4576 76.8 76.8-34.4576 76.8-76.8 76.8m0-256c-98.816 0-179.2 80.384-179.2 179.2s80.384 179.2 179.2 179.2 179.2-80.384 179.2-179.2-80.384-179.2-179.2-179.2m11.264 435.0976c-220.4672 5.12-364.288-183.4496-412.0064-256.1024 52.5312-82.176 184.832-250.4192 389.5296-255.6416 219.5968-5.632 364.2368 183.4496 411.9552 256.1024-52.48 82.176-184.832 250.368-389.4784 255.6416m493.9776-281.344c-32.6656-56.9344-213.0944-342.3232-519.0656-332.8-283.0336 7.168-447.6416 256.512-491.3664 332.8a51.1488 51.1488 0 0 0 0 50.944C39.0144 593.7152 213.0944 870.4 513.28 870.4l12.5952-0.1536c282.9824-7.2192 447.6416-256.512 491.3664-332.8a51.4048 51.4048 0 0 0 0-50.8928"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconxianshimimaShowpassword.defaultProps = {
  size: 18,
};

IconxianshimimaShowpassword = React.memo
  ? React.memo(IconxianshimimaShowpassword)
  : IconxianshimimaShowpassword;

export default IconxianshimimaShowpassword;
