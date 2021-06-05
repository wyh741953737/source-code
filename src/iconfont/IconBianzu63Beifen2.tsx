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

let IconBianzu63Beifen2: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M128 128m76.8 0l512 0q76.8 0 76.8 76.8l0 76.8q0 76.8-76.8 76.8l-512 0q-76.8 0-76.8-76.8l0-76.8q0-76.8 76.8-76.8Z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
      <Path
        d="M716.8 102.4a102.4 102.4 0 0 1 102.4 102.4v76.8a102.4 102.4 0 0 1-102.4 102.4H204.8a102.4 102.4 0 0 1-102.4-102.4V204.8a102.4 102.4 0 0 1 102.4-102.4h512z m0 51.2H204.8a51.2 51.2 0 0 0-51.072 47.36L153.6 204.8v76.8a51.2 51.2 0 0 0 47.36 51.072L204.8 332.8h512a51.2 51.2 0 0 0 51.072-47.36L768 281.6V204.8a51.2 51.2 0 0 0-47.36-51.072L716.8 153.6z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M896 179.2a25.6 25.6 0 0 1 25.4208 22.6048L921.6 204.8v142.2336a139.4176 139.4176 0 0 1-133.888 139.264l-5.5808 0.1024H460.8a25.6 25.6 0 0 1-2.9952-51.0208L460.8 435.2h321.3312a88.2432 88.2432 0 0 0 88.1408-83.328l0.128-4.864V204.8a25.6 25.6 0 0 1 25.6-25.6z"
        fill={getIconColor(color, 2, '#333333')}
      />
      <Path
        d="M448 435.2a25.6 25.6 0 0 1 25.4208 22.6048L473.6 460.8v153.6a25.6 25.6 0 0 1-51.0208 2.9952L422.4 614.4v-153.6a25.6 25.6 0 0 1 25.6-25.6z"
        fill={getIconColor(color, 3, '#333333')}
      />
      <Path
        d="M384 588.8m51.2 0l25.6 0q51.2 0 51.2 51.2l0 230.4q0 51.2-51.2 51.2l-25.6 0q-51.2 0-51.2-51.2l0-230.4q0-51.2 51.2-51.2Z"
        fill={getIconColor(color, 4, '#FF7700')}
      />
    </Svg>
  );
};

IconBianzu63Beifen2.defaultProps = {
  size: 18,
};

IconBianzu63Beifen2 = React.memo
  ? React.memo(IconBianzu63Beifen2)
  : IconBianzu63Beifen2;

export default IconBianzu63Beifen2;
