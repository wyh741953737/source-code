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

let IconGerenzhongxin: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M498.517333 0a282.965333 282.965333 0 0 1 167.424 511.032889c192.853333 62.179556 331.093333 230.172444 331.093334 439.523555l-0.341334 6.599112a56.32 56.32 0 0 1-55.921777 49.720888H56.263111a56.32 56.32 0 0 1-56.263111-56.32c0-209.351111 138.24-377.344 331.093333-439.523555A282.965333 282.965333 0 0 1 498.517333 0z m0 565.873778c-212.878222 0-388.096 152.632889-414.321777 349.411555v0.568889c0 5.859556 4.209778 10.126222 9.500444 10.126222h810.154667c5.802667-0.682667 9.557333-5.404444 8.988444-10.695111-25.6-192.625778-193.991111-342.869333-400.782222-349.184z m0-485.034667a202.126222 202.126222 0 1 0 0 404.195556 202.126222 202.126222 0 0 0 0-404.195556z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconGerenzhongxin.defaultProps = {
  size: 18,
};

IconGerenzhongxin = React.memo
  ? React.memo(IconGerenzhongxin)
  : IconGerenzhongxin;

export default IconGerenzhongxin;
