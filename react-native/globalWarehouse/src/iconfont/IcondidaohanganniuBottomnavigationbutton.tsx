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

let IcondidaohanganniuBottomnavigationbutton: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
        fill={getIconColor(color, 0, '#4400FA')}
      />
      <Path
        d="M673.6896 512c0 29.6448-24.2688 53.9136-53.9136 53.9136h-53.8624v53.8624c0 29.696-24.2688 53.9136-53.9136 53.9136a54.0672 54.0672 0 0 1-53.9136-53.9136v-53.8624H404.224A54.0672 54.0672 0 0 1 350.3104 512c0-29.6448 24.2688-53.9136 53.9136-53.9136h53.8624V404.224c0-29.696 24.2688-53.9136 53.9136-53.9136s53.9136 24.2688 53.9136 53.9136v53.8624h53.8624c29.696 0 53.9136 24.2688 53.9136 53.9136"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
    </Svg>
  );
};

IcondidaohanganniuBottomnavigationbutton.defaultProps = {
  size: 18,
};

IcondidaohanganniuBottomnavigationbutton = React.memo
  ? React.memo(IcondidaohanganniuBottomnavigationbutton)
  : IcondidaohanganniuBottomnavigationbutton;

export default IcondidaohanganniuBottomnavigationbutton;
