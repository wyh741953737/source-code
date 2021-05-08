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

let IconyouxiangEmail: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M870.4 819.2H153.6c-28.202667 0-51.2-22.954667-51.2-51.2V268.8l378.88 284.16a50.944 50.944 0 0 0 61.44 0L921.6 268.8V768c0 28.245333-22.997333 51.2-51.2 51.2z m-34.133333-614.4L512 448 187.733333 204.8h648.533334z m34.133333-102.4H153.6A153.770667 153.770667 0 0 0 0 256v512c0 84.693333 68.906667 153.6 153.6 153.6h716.8c84.693333 0 153.6-68.906667 153.6-153.6V256c0-84.693333-68.906667-153.6-153.6-153.6z"
        fill={getIconColor(color, 0, '#4400FA')}
      />
    </Svg>
  );
};

IconyouxiangEmail.defaultProps = {
  size: 18,
};

IconyouxiangEmail = React.memo
  ? React.memo(IconyouxiangEmail)
  : IconyouxiangEmail;

export default IconyouxiangEmail;
