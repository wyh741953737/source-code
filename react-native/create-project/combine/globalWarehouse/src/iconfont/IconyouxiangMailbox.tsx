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

let IconyouxiangMailbox: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M870.4 819.2H153.6c-28.2112 0-51.2-22.9376-51.2-51.2V268.8l378.88 284.16a50.944 50.944 0 0 0 61.44 0L921.6 268.8V768c0 28.2624-22.9888 51.2-51.2 51.2z m-34.1504-614.4L512 448 187.7504 204.8h648.4992zM870.4 102.4H153.6C68.9152 102.4 0 171.3152 0 256v512c0 84.6848 68.9152 153.6 153.6 153.6h716.8c84.6848 0 153.6-68.9152 153.6-153.6V256c0-84.6848-68.9152-153.6-153.6-153.6z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconyouxiangMailbox.defaultProps = {
  size: 18,
};

IconyouxiangMailbox = React.memo
  ? React.memo(IconyouxiangMailbox)
  : IconyouxiangMailbox;

export default IconyouxiangMailbox;
