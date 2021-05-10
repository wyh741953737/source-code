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

let IconhuodongtongzhiMessagenotification: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M578.7136 110.3872a47.36 47.36 0 0 1 47.872-2.6624 45.9776 45.9776 0 0 1 25.088 40.2432v728.1664a45.2096 45.2096 0 0 1-13.6704 32.3072 47.4624 47.4624 0 0 1-59.2896 5.2224l-298.3936-200.0384H46.4896a46.6944 46.6944 0 0 1-32.8192-13.312 45.2608 45.2608 0 0 1-13.6704-32.256V355.9936c0-25.1904 20.8384-45.568 46.4896-45.568h233.8304l298.3936-200.0384z m223.232 99.584a47.2576 47.2576 0 0 1 65.536-6.0416C968.5504 285.5936 1024 395.0592 1024 512c0 116.9408-55.552 226.3552-156.5184 308.1216a47.2576 47.2576 0 0 1-65.536-6.0416 44.8 44.8 0 0 1 6.2464-64c79.104-64.256 122.7264-148.7872 122.7264-238.08 0-89.344-43.6224-173.9264-122.7264-237.9776a44.8512 44.8512 0 0 1-6.2464-64.1024zM738.816 339.968a47.36 47.36 0 0 1 65.4336 6.9632c76.2368 92.5184 76.2368 237.568 0 330.1888a47.2576 47.2576 0 0 1-65.4336 6.8608 44.9024 44.9024 0 0 1-7.0656-64c48.1792-58.5216 48.1792-157.4912 0-215.9616a44.9024 44.9024 0 0 1 7.0656-64z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconhuodongtongzhiMessagenotification.defaultProps = {
  size: 18,
};

IconhuodongtongzhiMessagenotification = React.memo
  ? React.memo(IconhuodongtongzhiMessagenotification)
  : IconhuodongtongzhiMessagenotification;

export default IconhuodongtongzhiMessagenotification;
