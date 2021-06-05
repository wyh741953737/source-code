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

let IconTicket: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 0c282.7776 0 512 229.2224 512 512s-229.2224 512-512 512S0 794.7776 0 512 229.2224 0 512 0z m0 64a448 448 0 1 0 0 896 448 448 0 0 0 0-896z m189.0304 321.28l54.3232 54.272a25.6 25.6 0 0 1 0 36.2496L465.7152 765.44a25.6 25.6 0 0 1-36.1984 0l-54.272-54.272a51.2 51.2 0 0 0-72.448-72.448l-54.272-54.272a25.6 25.6 0 0 1 0-36.2496L538.112 258.56a25.6 25.6 0 0 1 36.2496 0l54.272 54.272a51.2 51.2 0 0 0 72.3968 72.448z m-108.544 36.1984a102.4 102.4 0 0 1-26.5728-98.9184l-6.0416-6.0416a5.12 5.12 0 0 0-7.2704 0L306.432 562.688a5.12 5.12 0 0 0 0 7.2192l6.0416 6.0928a102.4 102.4 0 0 1 125.44 125.44l6.0928 6.0416a5.12 5.12 0 0 0 7.2192 0l246.2208-246.1696a5.12 5.12 0 0 0 0-7.2192l-6.0928-6.0928a102.4 102.4 0 0 1-98.9184-26.5216h0.0512zM418.6112 501.1456L491.008 428.7488a25.6 25.6 0 0 1 36.1984 36.1984l-72.3968 72.3968a25.6 25.6 0 1 1-36.1984-36.1984z m57.9072 57.9072l72.448-72.3968a25.6 25.6 0 0 1 36.1984 36.1984l-72.448 72.3968a25.6 25.6 0 1 1-36.1984-36.1984z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconTicket.defaultProps = {
  size: 18,
};

IconTicket = React.memo ? React.memo(IconTicket) : IconTicket;

export default IconTicket;
