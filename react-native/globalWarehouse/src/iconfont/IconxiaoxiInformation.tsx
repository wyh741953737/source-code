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

let IconxiaoxiInformation: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M180.224 716.8l60.416-60.5696c19.3024-19.3536 29.952-45.056 29.952-72.3968V344.4224c0-69.4784 30.208-135.8848 82.944-182.0672a238.592 238.592 0 0 1 191.3344-57.856c119.1936 15.872 209.0496 123.5968 209.0496 250.6752v228.6592c0 27.3408 10.6496 53.0432 29.952 72.3456L844.288 716.8H180.224z m434.3808 119.808c0 46.08-46.8992 84.992-102.4 84.992s-102.4-38.912-102.4-84.992V819.2h204.8v17.408z m333.9264-160.4096l-92.16-92.3648V355.1744c0-178.2272-128.1536-329.6256-297.984-352.1024a344.1664 344.1664 0 0 0-272.3328 82.2784 344.4736 344.4736 0 0 0-117.8624 259.072v239.4112l-92.2624 92.3648a83.456 83.456 0 0 0-18.1248 91.2384c13.056 31.4368 43.4176 51.712 77.4144 51.712h172.1856v17.408c0 103.424 91.8528 187.4432 204.8 187.4432 112.9984 0 204.8-83.968 204.8-187.392V819.2h172.2368c33.9968 0 64.3072-20.2752 77.312-51.712a83.456 83.456 0 0 0-18.0224-91.2384z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconxiaoxiInformation.defaultProps = {
  size: 18,
};

IconxiaoxiInformation = React.memo
  ? React.memo(IconxiaoxiInformation)
  : IconxiaoxiInformation;

export default IconxiaoxiInformation;
