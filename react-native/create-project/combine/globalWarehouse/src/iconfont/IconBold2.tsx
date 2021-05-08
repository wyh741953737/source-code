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

let IconBold2: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M350.293333 1024l52.309334-288.426667h154.112L504.405333 1024h114.944l52.309334-288.426667h172.714666V624.64H692.309333l39.936-220.16H896v-111.786667H752.896L806.570667 0H691.626667l-53.76 292.608H483.157333L536.832 0H421.802667l-53.76 292.608H180.394667v111.786667h167.253333l-39.936 220.16H128V735.573333h158.976L234.666667 1024h115.626666z m227.072-399.445333H423.253333l39.850667-220.16h154.197333l-39.936 220.16z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconBold2.defaultProps = {
  size: 18,
};

IconBold2 = React.memo ? React.memo(IconBold2) : IconBold2;

export default IconBold2;
