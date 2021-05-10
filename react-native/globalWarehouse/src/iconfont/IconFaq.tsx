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

let IconFaq: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M0 0m204.8 0l614.4 0q204.8 0 204.8 204.8l0 614.4q0 204.8-204.8 204.8l-614.4 0q-204.8 0-204.8-204.8l0-614.4q0-204.8 204.8-204.8Z"
        fill={getIconColor(color, 0, '#4400FA')}
      />
      <Path
        d="M537.6 533.4016V563.2a25.6 25.6 0 1 1-51.2 0v-51.2a25.6 25.6 0 0 1 25.6-25.6 38.4 38.4 0 0 0 0-76.8 38.4 38.4 0 0 0-38.4 38.4 25.6 25.6 0 1 1-51.2 0C422.4 398.592 462.592 358.4 512 358.4s89.6 40.192 89.6 89.6c0 40.448-27.136 74.2912-64 85.4016M512 665.6a25.6 25.6 0 1 1 0-51.2 25.6 25.6 0 0 1 0 51.2m0-409.6c-141.1584 0-256 114.8416-256 256s114.8416 256 256 256 256-114.8416 256-256-114.8416-256-256-256"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
    </Svg>
  );
};

IconFaq.defaultProps = {
  size: 18,
};

IconFaq = React.memo ? React.memo(IconFaq) : IconFaq;

export default IconFaq;
