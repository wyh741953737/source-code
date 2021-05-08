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

let IconsousuoSearch: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M461.24544 0a460.8 460.8 0 0 1 360.0896 748.3904l186.9312 188.3648a51.2 51.2 0 0 1-67.84 76.3904l-4.8128-4.2496-186.7264-188.0576A460.8 460.8 0 1 1 461.24544 0z m0 102.4a358.4 358.4 0 1 0 0 716.8A358.4 358.4 0 0 0 461.24544 102.4z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconsousuoSearch.defaultProps = {
  size: 18,
};

IconsousuoSearch = React.memo ? React.memo(IconsousuoSearch) : IconsousuoSearch;

export default IconsousuoSearch;
