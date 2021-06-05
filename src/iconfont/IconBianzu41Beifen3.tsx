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

let IconBianzu41Beifen3: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M204.8 102.4m76.8 0l460.8 0q76.8 0 76.8 76.8l0 665.6q0 76.8-76.8 76.8l-460.8 0q-76.8 0-76.8-76.8l0-665.6q0-76.8 76.8-76.8Z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
      <Path
        d="M716.8 76.8H307.2a128 128 0 0 0-128 128v614.4a128 128 0 0 0 128 128h409.6a128 128 0 0 0 128-128V204.8a128 128 0 0 0-128-128zM307.2 128h409.6a76.8 76.8 0 0 1 76.8 76.8v614.4a76.8 76.8 0 0 1-76.8 76.8H307.2a76.8 76.8 0 0 1-76.8-76.8V204.8a76.8 76.8 0 0 1 76.8-76.8z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M844.8 655.0528H179.2V819.2a128 128 0 0 0 128 128h409.6a128 128 0 0 0 128-128v-164.1472z m-614.4 51.2h563.2V819.2a76.8 76.8 0 0 1-76.8 76.8H307.2l-4.5056-0.128A76.8 76.8 0 0 1 230.4 819.2v-112.9472z"
        fill={getIconColor(color, 2, '#333333')}
      />
      <Path
        d="M505.984 801.1264m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z"
        fill={getIconColor(color, 3, '#FF7700')}
      />
    </Svg>
  );
};

IconBianzu41Beifen3.defaultProps = {
  size: 18,
};

IconBianzu41Beifen3 = React.memo
  ? React.memo(IconBianzu41Beifen3)
  : IconBianzu41Beifen3;

export default IconBianzu41Beifen3;
