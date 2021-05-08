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

let IconzhaopianPhotos: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M870.4 0a153.6 153.6 0 0 1 153.6 153.6v716.8a153.6 153.6 0 0 1-153.6 153.6H153.6a153.6 153.6 0 0 1-153.6-153.6V153.6a153.6 153.6 0 0 1 153.6-153.6z m0 102.4H153.6a51.2 51.2 0 0 0-51.2 51.2v716.8a51.2 51.2 0 0 0 51.2 51.2h716.8a51.2 51.2 0 0 0 51.2-51.2V153.6a51.2 51.2 0 0 0-51.2-51.2z m-173.1584 412.2112L870.4 682.1888V819.2a51.2 51.2 0 0 1-51.2 51.2H153.6l404.48-358.8096a102.4 102.4 0 0 1 139.1616 3.0208zM281.6 256a76.8 76.8 0 1 1 0 153.6 76.8 76.8 0 0 1 0-153.6z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconzhaopianPhotos.defaultProps = {
  size: 18,
};

IconzhaopianPhotos = React.memo
  ? React.memo(IconzhaopianPhotos)
  : IconzhaopianPhotos;

export default IconzhaopianPhotos;
