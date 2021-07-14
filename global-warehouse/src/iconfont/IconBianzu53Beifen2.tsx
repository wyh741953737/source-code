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

let IconBianzu53Beifen2: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M558.8224 128c161.9456 0 293.248 134.7328 297.2416 301.9776l0.1024 7.8592v370.7648h-51.2V437.8368c0-140.672-106.752-254.72-239.2832-258.56L558.848 179.2h-70.912c-133.376 0-242.3808 111.6672-246.0416 251.392l-0.1024 7.2448v370.7648h-51.2V437.8368c0-168.2432 128.8192-305.5616 289.792-309.76L487.936 128h70.8864z"
        fill={getIconColor(color, 0, '#FF7700')}
      />
      <Path
        d="M76.8 563.2m76.8 0l51.2 0q76.8 0 76.8 76.8l0 153.6q0 76.8-76.8 76.8l-51.2 0q-76.8 0-76.8-76.8l0-153.6q0-76.8 76.8-76.8Z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
      <Path
        d="M768 563.2m76.8 0l51.2 0q76.8 0 76.8 76.8l0 153.6q0 76.8-76.8 76.8l-51.2 0q-76.8 0-76.8-76.8l0-153.6q0-76.8 76.8-76.8Z"
        fill={getIconColor(color, 2, '#FFFFFF')}
      />
      <Path
        d="M175.6672 548.1984h73.2672a51.2 51.2 0 0 1 51.2 51.2V844.8a51.2 51.2 0 0 1-51.2 51.2H175.6672A124.4672 124.4672 0 0 1 51.2 771.5328v-98.8672a124.4672 124.4672 0 0 1 124.4672-124.4672z m73.2672 51.2H175.6672A73.2672 73.2672 0 0 0 102.4 672.6656v98.8672A73.2672 73.2672 0 0 0 175.6672 844.8h73.2672v-245.4016zM871.0656 548.1984h-73.2672a51.2 51.2 0 0 0-51.2 51.2V844.8a51.2 51.2 0 0 0 51.2 51.2h73.2672a124.4672 124.4672 0 0 0 124.4672-124.4672v-98.8672a124.4672 124.4672 0 0 0-124.4672-124.4672z m-73.2672 51.2h73.2672a73.2672 73.2672 0 0 1 73.2672 73.2672v98.8672A73.2672 73.2672 0 0 1 871.0656 844.8h-73.2672v-245.4016z"
        fill={getIconColor(color, 3, '#333333')}
      />
    </Svg>
  );
};

IconBianzu53Beifen2.defaultProps = {
  size: 18,
};

IconBianzu53Beifen2 = React.memo
  ? React.memo(IconBianzu53Beifen2)
  : IconBianzu53Beifen2;

export default IconBianzu53Beifen2;
