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

let IconBianzu25Beifen2: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M463.5648 665.6h102.912l48.1024 204.8h-199.7568z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
      <Path
        d="M486.5536 492.6464l-101.7088 384A25.6 25.6 0 0 0 409.6 908.8h204.8a25.6 25.6 0 0 0 24.7296-32.256l-103.1168-384c-6.784-25.3184-42.752-25.2416-49.4592 0.1024z m24.9088 105.9072L581.0176 857.6h-138.1632l68.608-259.0464z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M768 857.6a25.6 25.6 0 0 1 2.9952 51.0208L768 908.8H256a25.6 25.6 0 0 1-2.9952-51.0208L256 857.6h512zM819.2 76.8a102.4 102.4 0 0 1 102.4 102.4v384a102.4 102.4 0 0 1-102.4 102.4H204.8a102.4 102.4 0 0 1-102.4-102.4V179.2a102.4 102.4 0 0 1 102.4-102.4h614.4z m0 51.2H204.8a51.2 51.2 0 0 0-51.072 47.36L153.6 179.2v384a51.2 51.2 0 0 0 47.36 51.072L204.8 614.4h614.4a51.2 51.2 0 0 0 51.072-47.36L870.4 563.2V179.2a51.2 51.2 0 0 0-47.36-51.072L819.2 128z"
        fill={getIconColor(color, 2, '#333333')}
      />
      <Path
        d="M128 128h768l-11.2896 497.9712H141.568z"
        fill={getIconColor(color, 3, '#FFFFFF')}
      />
      <Path
        d="M128 460.8h768l-25.6 179.2-716.8-9.9072z"
        fill={getIconColor(color, 4, '#FF7700')}
      />
      <Path
        d="M819.2 80.7936H204.8a102.4 102.4 0 0 0-102.4 102.4v376.0128a102.4 102.4 0 0 0 102.4 102.4h614.4a102.4 102.4 0 0 0 102.4-102.4V183.1936a102.4 102.4 0 0 0-102.4-102.4z m0 51.2a51.2 51.2 0 0 1 51.2 51.2v376.0128a51.2 51.2 0 0 1-51.2 51.2H204.8a51.2 51.2 0 0 1-51.2-51.2V183.1936a51.2 51.2 0 0 1 51.2-51.2h614.4z"
        fill={getIconColor(color, 5, '#333333')}
      />
    </Svg>
  );
};

IconBianzu25Beifen2.defaultProps = {
  size: 18,
};

IconBianzu25Beifen2 = React.memo
  ? React.memo(IconBianzu25Beifen2)
  : IconBianzu25Beifen2;

export default IconBianzu25Beifen2;
