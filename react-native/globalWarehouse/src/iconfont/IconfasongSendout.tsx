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

let IconfasongSendout: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M972.6976 128.7168L38.656 489.1648c-52.6336 20.3264-51.3024 49.8176 2.7136 65.8432l225.6896 66.9696 91.7504 273.0496c11.9808 35.7376 43.3664 43.264 70.2464 16.6912l118.3744-117.248 233.6768 171.2128c30.3616 22.272 61.5936 10.5472 69.7856-26.368l170.496-768.4096c8.192-36.864-13.568-55.7056-48.64-42.1888z m-142.1312 173.7216l-386.7648 349.952a50.944 50.944 0 0 0-14.6432 28.3648l-17.6128 165.376c-1.9456 18.5856-8.3456 19.3536-14.2848 1.536l-77.056-232.3968a22.2208 22.2208 0 0 1 9.1648-25.088l493.6192-297.984c32.2048-19.3024 35.6352-14.7456 7.5776 10.24z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconfasongSendout.defaultProps = {
  size: 18,
};

IconfasongSendout = React.memo
  ? React.memo(IconfasongSendout)
  : IconfasongSendout;

export default IconfasongSendout;
