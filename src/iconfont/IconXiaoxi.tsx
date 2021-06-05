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

let IconXiaoxi: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 1004.8c54.5792 0 96.768-42.24 96.768-96.768H415.232c0 54.528 42.1888 96.768 96.768 96.768z m317.696-315.0336V438.0672c0-151.3472-107.3664-278.0672-247.296-311.5008v-31.6928c0-35.1744-19.3536-66.8672-52.7872-73.9328-48.4352-11.4176-88.0128 25.5488-88.0128 73.0624v33.4336c-139.9296 32.5632-247.296 159.2832-247.296 310.6304v251.6992L98.4064 788.3264v49.2544h827.1872v-49.2544l-95.8976-98.56z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconXiaoxi.defaultProps = {
  size: 18,
};

IconXiaoxi = React.memo ? React.memo(IconXiaoxi) : IconXiaoxi;

export default IconXiaoxi;
