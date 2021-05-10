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

let IcondengdaiEnroute: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M537.6 384a51.2 51.2 0 0 1 51.2 51.2v102.3488l102.4 0.0512a51.2 51.2 0 0 1 0 102.4h-153.6a51.2 51.2 0 0 1-51.2-51.2v-153.6a51.2 51.2 0 0 1 51.2-51.2z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M614.4 0a51.2 51.2 0 0 1 0 102.4h-51.2v54.1696a435.3024 435.3024 0 0 1 383.7952 419.1744l0.2048 13.056A435.2 435.2 0 1 1 460.8 156.5696V102.4L409.6 102.4a51.2 51.2 0 1 1 0-102.4h204.8z m-102.4 256a332.8 332.8 0 1 0 0 665.6 332.8 332.8 0 0 0 0-665.6z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IcondengdaiEnroute.defaultProps = {
  size: 18,
};

IcondengdaiEnroute = React.memo
  ? React.memo(IcondengdaiEnroute)
  : IcondengdaiEnroute;

export default IcondengdaiEnroute;
