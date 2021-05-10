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

let IconduoxuanweixuanzhongMultipleselectionselectionnotselected: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M870.4 0H153.6a153.6 153.6 0 0 0-153.6 153.6v716.8a153.6 153.6 0 0 0 153.6 153.6h716.8a153.6 153.6 0 0 0 153.6-153.6V153.6a153.6 153.6 0 0 0-153.6-153.6zM153.6 102.4h716.8a51.2 51.2 0 0 1 51.2 51.2v716.8a51.2 51.2 0 0 1-51.2 51.2H153.6a51.2 51.2 0 0 1-51.2-51.2V153.6a51.2 51.2 0 0 1 51.2-51.2z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconduoxuanweixuanzhongMultipleselectionselectionnotselected.defaultProps = {
  size: 18,
};

IconduoxuanweixuanzhongMultipleselectionselectionnotselected = React.memo
  ? React.memo(IconduoxuanweixuanzhongMultipleselectionselectionnotselected)
  : IconduoxuanweixuanzhongMultipleselectionselectionnotselected;

export default IconduoxuanweixuanzhongMultipleselectionselectionnotselected;
