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

let IconqingchuClear: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M819.2 870.4a51.2 51.2 0 0 1-51.2 51.2H256a51.2 51.2 0 0 1-51.2-51.2V307.2h614.4v563.2zM409.6 119.1936C409.6 111.2576 420.5568 102.4 435.2 102.4h153.6c14.6432 0 25.6 8.8064 25.6 16.7936V204.8H409.6V119.1936zM972.8 204.8h-256V119.1936C716.8 53.4528 659.4048 0 588.8 0h-153.6C364.5952 0 307.2 53.4528 307.2 119.1936V204.8H51.2c-28.16 0-51.2 23.04-51.2 51.2s23.04 51.2 51.2 51.2h51.2v563.2c0 84.6848 68.9152 153.6 153.6 153.6h512c84.6848 0 153.6-68.9152 153.6-153.6V307.2h51.2c28.16 0 51.2-23.04 51.2-51.2s-23.04-51.2-51.2-51.2z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconqingchuClear.defaultProps = {
  size: 18,
};

IconqingchuClear = React.memo ? React.memo(IconqingchuClear) : IconqingchuClear;

export default IconqingchuClear;
