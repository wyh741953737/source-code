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

let IconBianzu61Beifen4: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1049 1024" width={size} height={size} {...rest}>
      <Path
        d="M310.912 146.944l70.912-24.6784c60.416 69.0176 107.5968 103.5264 141.4912 103.5264 18.688 0 64.8448 2.4832 100.5056-29.44 11.1872-10.0096 23.5008-34.7136 36.9152-74.0864l57.0368 8.2688a76.8 76.8 0 0 1 44.7488 23.1936l264.9088 279.808-142.08 142.3104L801.4848 512v292.6592a76.8 76.8 0 0 1-76.8 76.8H343.3472a76.8 76.8 0 0 1-76.8-76.8V512l-89.4208 83.8912L25.6 456.96l252.8256-288.128a76.8 76.8 0 0 1 32.512-21.888z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
      <Path
        d="M368.896 102.4l-6.5024 0.1792a127.5648 127.5648 0 0 0-70.8352 25.8304l-3.2256 2.56 2.4064-1.4336a76.8 76.8 0 0 0-18.2272 13.9008L21.7088 401.7408a76.8 76.8 0 0 0 0.768 107.8272l80.896 80.8448 3.6608 3.456a76.8 76.8 0 0 0 104.9344-3.456l28.928-28.9536v283.3664a76.8 76.8 0 0 0 76.8 76.8h425.6256l4.5056-0.128A76.8 76.8 0 0 0 820.1216 844.8l-0.0256-286.2848 14.8992 14.8992 4.0448 3.7632c31.2064 26.3168 76.3136 24.4992 104.576-3.7632l80.64-80.64 3.712-3.9936c26.1888-31.0272 24.576-75.8272-3.2768-104.1408L774.4 130.0992l-4.352-4.096-4.5312-3.5584a76.8 76.8 0 0 0-34.8672-14.4896l-2.176-0.2048 2.816 0.768a127.9232 127.9232 0 0 0-39.168-6.0928L654.336 102.4a25.6 25.6 0 0 0-25.216 21.12 102.4256 102.4256 0 0 1-201.6256 0A25.6 25.6 0 0 0 402.2784 102.4H368.896z m304.4864 53.6064L674.1248 153.6h17.9712c6.0928 0 12.032 0.7168 17.8176 2.0992l8.6528 2.3296 3.0208 0.4096a25.2672 25.2672 0 0 1 14.5152 5.9136l2.6368 2.4832 249.4464 253.7216a25.6 25.6 0 0 1 1.3568 34.4064l-2.2528 2.432-79.872 79.872a25.6 25.6 0 0 1-34.56 1.4848L870.4 536.4992l-57.8048-57.856c-16.128-16.128-43.6992-4.6848-43.6992 18.1248V844.8a25.6 25.6 0 0 1-25.6 25.6H317.696a25.6 25.6 0 0 1-25.6-25.6V499.6608c0-22.8096-27.5968-34.2272-43.7248-18.0992l-72.6272 72.6528a25.6 25.6 0 0 1-36.224 0l-80.8448-80.8448a25.6 25.6 0 0 1-0.256-35.9424l250.8032-258.304a25.6 25.6 0 0 1 6.0672-4.6592l4.1728-2.8672 4.2496-3.328a76.4416 76.4416 0 0 1 45.184-14.6432L382.464 153.6l0.768 2.4064a153.7024 153.7024 0 0 0 290.1504 0z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M291.7888 756.1216h478.208v75.3664c0.6144 18.2528-3.2256 29.8752-11.52 34.9184a25.7792 25.7792 0 0 1-11.648 3.9168H325.8112c-10.2144 1.3056-18.432 0-24.704-3.9168s-9.3952-10.496-9.3184-19.6608v-90.624z"
        fill={getIconColor(color, 2, '#FF7700')}
      />
    </Svg>
  );
};

IconBianzu61Beifen4.defaultProps = {
  size: 18,
};

IconBianzu61Beifen4 = React.memo
  ? React.memo(IconBianzu61Beifen4)
  : IconBianzu61Beifen4;

export default IconBianzu61Beifen4;