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

let IconyincangmimaHidepassword: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M1017.2416 537.4976a799.8976 799.8976 0 0 1-149.1456 185.8048l-72.2432-72.2944a685.9776 685.9776 0 0 0 116.8896-138.752c-47.7184-72.704-192.256-261.7344-411.9552-256.1536-30.72 0.8192-59.5456 5.632-87.04 12.9024l-80.896-80.896a479.0272 479.0272 0 0 1 165.3248-34.304c305.92-9.6256 486.4 275.7632 519.0656 332.6976 9.0112 15.7696 9.0112 35.2256 0 50.944z m-407.04 217.4976l80.896 80.896a478.72 478.72 0 0 1-177.8176 34.5088C213.0944 870.4 39.0144 593.664 6.8096 537.4976a51.1488 51.1488 0 0 1 0-50.944 798.976 798.976 0 0 1 149.0944-185.856l72.192 72.2944a687.7184 687.7184 0 0 0-116.8384 138.752c47.7184 72.704 191.5904 261.2736 412.0064 256.1536a373.248 373.248 0 0 0 86.9376-12.9024zM512 588.8c-42.3424 0-76.8-34.3552-76.8-76.8 0-1.2288 0.512-2.4576 0.6144-3.7888l80.0256 80.0256c-1.3312 0.1024-2.56 0.5632-3.84 0.5632zM138.5984 66.1504a51.2 51.2 0 0 0-72.3968 72.448l288.256 288.256A176.8448 176.8448 0 0 0 332.8 512c0 98.816 80.384 179.2 179.2 179.2 30.208 0 59.136-7.5264 85.1456-21.6576l288.256 288.256A50.944 50.944 0 0 0 921.6 972.8a51.1488 51.1488 0 0 0 36.1984-87.3984l-819.2-819.2z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconyincangmimaHidepassword.defaultProps = {
  size: 18,
};

IconyincangmimaHidepassword = React.memo
  ? React.memo(IconyincangmimaHidepassword)
  : IconyincangmimaHidepassword;

export default IconyincangmimaHidepassword;
