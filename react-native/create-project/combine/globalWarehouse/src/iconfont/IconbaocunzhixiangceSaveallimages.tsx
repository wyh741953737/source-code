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

let IconbaocunzhixiangceSaveallimages: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M901.589333 0H298.922667C231.466667 0 176.554667 58.666667 176.554667 130.730667v57.6a47.018667 47.018667 0 1 0 94.165333 0v-57.6c0-19.797333 12.885333-36.565333 28.16-36.565334h602.709333c15.317333 0 28.245333 16.768 28.245334 36.565334v585.984c0 19.797333-12.928 36.565333-28.245334 36.565333h-65.92a47.018667 47.018667 0 1 0 0 94.165333h65.92c67.498667 0 122.410667-58.666667 122.410667-130.730666V130.730667C1024 58.624 969.088 0 901.589333 0"
        fill={getIconColor(color, 0, '#4400FA')}
      />
      <Path
        d="M235.392 506.112a70.656 70.656 0 1 0-0.042667-141.269333 70.656 70.656 0 0 0 0.042667 141.269333m470.826667 423.722667H167.637333l329.813334-275.2c11.562667-9.813333 32.597333-9.813333 43.946666 0l211.882667 180.778666v47.36c0 25.984-21.077333 47.061333-47.061333 47.061334M141.226667 270.72h564.992c25.984 0 47.061333 21.077333 47.061333 47.061333v393.813334l-150.784-128.64c-46.634667-39.68-119.552-39.68-165.717333-0.298667l-342.613334 285.866667V317.781333c0-25.984 21.077333-47.061333 47.061334-47.061333m564.992-94.165333H141.226667A141.397333 141.397333 0 0 0 0 317.781333V882.773333A141.397333 141.397333 0 0 0 141.226667 1024h564.992a141.397333 141.397333 0 0 0 141.226666-141.226667V317.781333a141.397333 141.397333 0 0 0-141.226666-141.226666"
        fill={getIconColor(color, 1, '#4400FA')}
      />
    </Svg>
  );
};

IconbaocunzhixiangceSaveallimages.defaultProps = {
  size: 18,
};

IconbaocunzhixiangceSaveallimages = React.memo
  ? React.memo(IconbaocunzhixiangceSaveallimages)
  : IconbaocunzhixiangceSaveallimages;

export default IconbaocunzhixiangceSaveallimages;
