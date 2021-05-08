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

let IconTwitter2: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M313.6 960c-1.450667 0-3.072-0.042667-4.522667-0.170667a629.077333 629.077333 0 0 1-264.832-60.629333A76.8 76.8 0 0 1 0.853333 818.432a78.677333 78.677333 0 0 1 65.877334-66.133333c59.434667-9.642667 108.757333-26.752 144.469333-49.664C-9.386667 540.288-3.541333 297.258667 10.752 194.304a78.592 78.592 0 0 1 55.466667-64.042667c29.866667-8.96 60.928 0 81.408 22.912 87.381333 97.493333 174.677333 146.474667 277.077333 153.941334 2.986667-65.28 31.146667-128.128 80.170667-173.952a256.042667 256.042667 0 0 1 183.637333-69.034667 255.402667 255.402667 0 0 1 179.029333 80.085333c4.778667 5.376 22.613333 15.104 44.202667 5.546667a80.213333 80.213333 0 0 1 83.84 10.965333c23.381333 19.072 33.365333 49.152 26.069333 78.464a371.242667 371.242667 0 0 1-72.96 145.578667C939.093333 670.634667 703.146667 960 313.6 960z"
        fill={getIconColor(color, 0, '#4400FA')}
      />
    </Svg>
  );
};

IconTwitter2.defaultProps = {
  size: 18,
};

IconTwitter2 = React.memo ? React.memo(IconTwitter2) : IconTwitter2;

export default IconTwitter2;
