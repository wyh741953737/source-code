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

let IconZizhanghu: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M864.028444 0c69.632 0 126.577778 55.068444 131.242667 124.757333l0.284445 9.102223v756.224c0 70.883556-54.044444 128.910222-122.538667 133.632l-8.988445 0.284444H214.129778c-69.632 0-126.577778-55.068444-131.242667-124.757333l-0.284444-9.102223v-257.365333H52.053333a23.608889 23.608889 0 0 1-23.608889-23.608889v-5.290666c0-13.027556 10.581333-23.608889 23.608889-23.608889h30.549334V443.676444L52.053333 443.733333A23.608889 23.608889 0 0 1 28.444444 420.124444v-5.290666c0-13.084444 10.581333-23.608889 23.608889-23.608889l30.549334-0.056889V133.916444c0-70.883556 54.044444-128.910222 122.538666-133.632L214.129778 0h649.898666z m0 78.791111H214.129778a54.499556 54.499556 0 0 0-53.816889 48.696889l-0.341333 6.428444v257.251556h30.549333c13.027556 0 23.608889 10.638222 23.608889 23.665778v5.290666c0 13.027556-10.581333 23.608889-23.608889 23.608889l-30.549333-0.056889V580.266667h30.549333c13.027556 0 23.608889 10.581333 23.608889 23.608889v5.290666c0 13.084444-10.581333 23.608889-23.608889 23.608889h-30.549333v257.308445c0 28.273778 20.935111 51.598222 47.843555 54.784l6.314667 0.341333h649.898666c27.761778 0 50.631111-21.276444 53.816889-48.696889l0.341334-6.428444V133.916444a54.613333 54.613333 0 0 0-54.158223-55.182222z m-324.949333 170.666667c91.136 0 165.034667 75.207111 165.034667 167.992889 0 55.466667-26.396444 104.675556-67.072 135.281777a262.428444 262.428444 0 0 1 159.914666 242.858667 25.998222 25.998222 0 0 1-25.770666 26.225778 25.998222 25.998222 0 0 1-25.770667-26.225778c0-116.053333-92.387556-210.090667-206.336-210.090667-113.948444 0-206.336 94.037333-206.336 210.090667a25.998222 25.998222 0 0 1-25.770667 26.225778 25.998222 25.998222 0 0 1-25.770666-26.225778 262.712889 262.712889 0 0 1 159.857778-242.972444 168.448 168.448 0 0 1-67.015112-135.168c0-92.728889 73.898667-167.992889 165.034667-167.992889z m0 52.508444c-62.691556 0-113.493333 51.712-113.493333 115.484445 0 63.829333 50.801778 115.541333 113.493333 115.541333s113.493333-51.712 113.493333-115.484444c0-63.829333-50.801778-115.541333-113.493333-115.541334z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconZizhanghu.defaultProps = {
  size: 18,
};

IconZizhanghu = React.memo ? React.memo(IconZizhanghu) : IconZizhanghu;

export default IconZizhanghu;
