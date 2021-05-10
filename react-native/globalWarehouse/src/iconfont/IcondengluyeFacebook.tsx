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

let IcondengluyeFacebook: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 0C229.2224 0 0 229.2224 0 512s229.2224 512 512 512 512-229.2224 512-512S794.7776 0 512 0z"
        fill={getIconColor(color, 0, '#E8E8E8')}
      />
      <Path
        d="M512 30.1056a481.8944 481.8944 0 1 1 0 963.7888A481.8944 481.8944 0 0 1 512 30.1056z"
        fill={getIconColor(color, 1, '#3C599B')}
      />
      <Path
        d="M539.8016 729.9072H448.9216V510.208h-45.4144v-75.776h45.4144v-45.4656c0-61.7472 25.6-98.5088 98.4576-98.5088h60.672v75.776h-37.888c-28.3648 0-30.208 10.5984-30.208 30.3104l-0.1536 37.888h68.7104l-8.0896 75.776h-60.6208v219.648z"
        fill={getIconColor(color, 2, '#FFFFFF')}
      />
    </Svg>
  );
};

IcondengluyeFacebook.defaultProps = {
  size: 18,
};

IcondengluyeFacebook = React.memo
  ? React.memo(IcondengluyeFacebook)
  : IcondengluyeFacebook;

export default IcondengluyeFacebook;
