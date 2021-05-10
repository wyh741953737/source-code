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

let IconwenhaoQuestionmark: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 716.8a51.2 51.2 0 1 1 0 102.4 51.2 51.2 0 1 1 0-102.4z m0-512c98.816 0 179.2 80.384 179.2 179.2 0 80.896-54.272 148.6336-128 170.8544V614.4a51.2 51.2 0 1 1-102.4 0v-102.4a51.2 51.2 0 0 1 51.2-51.2c42.3424 0 76.8-34.4576 76.8-76.8S554.3424 307.2 512 307.2s-76.8 34.4576-76.8 76.8a51.2 51.2 0 1 1-102.4 0C332.8 285.184 413.184 204.8 512 204.8z m0 716.8c-225.8432 0-409.6-183.7568-409.6-409.6s183.7568-409.6 409.6-409.6 409.6 183.7568 409.6 409.6-183.7568 409.6-409.6 409.6m0-921.6C229.6832 0 0 229.6832 0 512s229.6832 512 512 512 512-229.6832 512-512S794.3168 0 512 0"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconwenhaoQuestionmark.defaultProps = {
  size: 18,
};

IconwenhaoQuestionmark = React.memo
  ? React.memo(IconwenhaoQuestionmark)
  : IconwenhaoQuestionmark;

export default IconwenhaoQuestionmark;
