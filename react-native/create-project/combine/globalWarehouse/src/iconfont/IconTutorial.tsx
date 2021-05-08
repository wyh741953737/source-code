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

let IconTutorial: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M0 0m204.8 0l614.4 0q204.8 0 204.8 204.8l0 614.4q0 204.8-204.8 204.8l-614.4 0q-204.8 0-204.8-204.8l0-614.4q0-204.8 204.8-204.8Z"
        fill={getIconColor(color, 0, '#4400FA')}
      />
      <Path
        d="M699.7504 288A68.608 68.608 0 0 1 768 356.9152v310.1696a68.608 68.608 0 0 1-68.2496 68.9152H324.2496A68.608 68.608 0 0 1 256 667.0848V356.864a68.608 68.608 0 0 1 68.2496-68.9152h375.5008z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
      <Path
        d="M457.0624 407.4496l154.624 95.8464a10.24 10.24 0 0 1 0 17.408l-154.624 95.8976a10.24 10.24 0 0 1-15.6672-8.704V416.1536a10.24 10.24 0 0 1 15.6672-8.704z"
        fill={getIconColor(color, 2, '#4400FA')}
      />
    </Svg>
  );
};

IconTutorial.defaultProps = {
  size: 18,
};

IconTutorial = React.memo ? React.memo(IconTutorial) : IconTutorial;

export default IconTutorial;
