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

let IconMarketing: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M0 0m204.8 0l614.4 0q204.8 0 204.8 204.8l0 614.4q0 204.8-204.8 204.8l-614.4 0q-204.8 0-204.8-204.8l0-614.4q0-204.8 204.8-204.8Z"
        fill={getIconColor(color, 0, '#4400FA')}
      />
      <Path
        d="M512 384c70.6048 0 128 57.3952 128 128 0 40.448-19.3024 78.3872-51.2 102.2976V716.8c0 28.2624-22.9376 51.2-51.2 51.2h-51.2c-28.2624 0-51.2-22.9376-51.2-51.2v-102.5024A128.1024 128.1024 0 0 1 384 512c0-70.6048 57.3952-128 128-128z m230.4 102.4a25.6 25.6 0 1 1 0 51.2h-51.2a25.6 25.6 0 1 1 0-51.2z m-409.6 0a25.6 25.6 0 1 1 0 51.2h-51.2a25.6 25.6 0 1 1 0-51.2z m-4.9664-152.2176a25.6 25.6 0 0 1 36.1984-0.6656l36.864 35.584a25.6 25.6 0 0 1-35.584 36.864l-36.864-35.584a25.6 25.6 0 0 1-0.6144-36.1984z m332.1344-0.6144a25.6 25.6 0 0 1 35.5328 36.7616l-36.864 35.584a25.4976 25.4976 0 0 1-36.1472-0.6144 25.6 25.6 0 0 1 0.6144-36.1984zM512 256a25.6 25.6 0 0 1 25.6 25.6v51.2a25.6 25.6 0 1 1-51.2 0v-51.2A25.6 25.6 0 0 1 512 256z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
    </Svg>
  );
};

IconMarketing.defaultProps = {
  size: 18,
};

IconMarketing = React.memo ? React.memo(IconMarketing) : IconMarketing;

export default IconMarketing;
