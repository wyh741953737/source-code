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

let IconBianzu26Beifen: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M201.7792 281.6h596.6592a25.6 25.6 0 0 1 25.0624 20.3264c51.6096 245.76 77.44 410.0096 77.44 492.7744 0 82.7904-25.856 132.1984-77.5168 148.224a25.6 25.6 0 0 1-8.0896 1.152l-629.4016-12.0832a25.6 25.6 0 0 1-14.08-4.5568c-29.0816-20.1728-43.6224-64.4096-43.6224-132.736 0-71.808 16.0512-235.3664 48.128-490.7008A25.6 25.6 0 0 1 201.8048 281.6z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
      <Path
        d="M512 102.4a204.8768 204.8768 0 0 1 198.4 153.728c4.1728 16.3328-400.9216 15.9744-396.6464-0.512A204.8768 204.8768 0 0 1 512 102.4z m0 51.2a153.6768 153.6768 0 0 0-144.896 102.5536c-5.0432 14.2592 295.424 15.872 289.7664-0.128A153.6512 153.6512 0 0 0 512 153.6z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M721.664 230.4H302.848a153.6 153.6 0 0 0-152.2432 133.3248l-57.9328 435.2A153.6 153.6 0 0 0 244.9408 972.8h534.2464a153.6 153.6 0 0 0 152.2688-173.7216l-57.5232-435.2A153.6 153.6 0 0 0 721.664 230.4z m0 51.2a102.4 102.4 0 0 1 101.5296 88.9856l57.4976 435.2A102.4 102.4 0 0 1 779.1872 921.6H244.9152a102.4 102.4 0 0 1-101.4784-115.9168l57.9072-435.2A102.4 102.4 0 0 1 302.848 281.6h418.816z"
        fill={getIconColor(color, 2, '#333333')}
      />
      <Path
        d="M819.2 282.0608a25.6 25.6 0 0 1 25.6 25.6c0 129.9712-150.6816 230.4-332.8 230.4s-332.8-100.4288-332.8-230.4a25.6 25.6 0 1 1 51.2 0c0 96.256 124.416 179.2 281.6 179.2s281.6-82.944 281.6-179.2a25.6 25.6 0 0 1 25.6-25.6z"
        fill={getIconColor(color, 3, '#333333')}
      />
      <Path
        d="M512 537.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"
        fill={getIconColor(color, 4, '#FF7700')}
      />
    </Svg>
  );
};

IconBianzu26Beifen.defaultProps = {
  size: 18,
};

IconBianzu26Beifen = React.memo
  ? React.memo(IconBianzu26Beifen)
  : IconBianzu26Beifen;

export default IconBianzu26Beifen;
