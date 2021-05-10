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

let IconfenxiangShare: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M511.67173 1024C229.558894 1024 0 794.441106 0 512.32827 0 230.164262 229.558894 0.554196 511.67173 0.554196a51.17229 51.17229 0 1 1 0 102.34458c-225.720972 0-409.378322 183.65735-409.378322 409.378322S286.053102 921.65542 511.722902 921.65542s409.378322-183.65735 409.378322-409.378322a51.17229 51.17229 0 1 1 102.34458 0c0 282.164008-229.558894 511.722902-511.722902 511.722902"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M510.187733 652.693862a49.637121 49.637121 0 0 1-49.637121-49.637121c0-245.575821 224.492837-477.693329 461.983436-477.693329a49.637121 49.637121 0 1 1 0 99.274243c-182.99211 0-362.709193 187.444099-362.709193 378.419086a49.637121 49.637121 0 0 1-49.637122 49.688294"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M971.659446 198.079236a49.330088 49.330088 0 0 1-24.767388-6.652398l-171.938895-99.018381a49.637121 49.637121 0 0 1 49.637121-85.969448l171.938895 99.171899a49.585949 49.585949 0 0 1-24.869733 92.570673"
        fill={getIconColor(color, 2, '#333333')}
      />
      <Path
        d="M874.636784 373.497847a49.585949 49.585949 0 0 1-42.933551-74.455682l99.120726-171.938895a49.637121 49.637121 0 0 1 85.969447 49.585949l-99.171898 172.041239a49.483605 49.483605 0 0 1-42.984724 24.767389"
        fill={getIconColor(color, 3, '#333333')}
      />
    </Svg>
  );
};

IconfenxiangShare.defaultProps = {
  size: 18,
};

IconfenxiangShare = React.memo
  ? React.memo(IconfenxiangShare)
  : IconfenxiangShare;

export default IconfenxiangShare;
