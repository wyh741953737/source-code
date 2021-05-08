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

let Icon8Bold: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512.636767 1023.829362c103.065489 0 185.569072-25.595734 247.596067-76.957841C822.25983 895.509415 853.230668 826.059657 853.230668 738.436927c0-52.89785-14.674888-100.335277-44.024663-142.312281-29.349775-41.977004-71.156141-75.08082-125.504416-99.226129A269.608399 269.608399 0 0 0 790.947715 406.886852a224.389268 224.389268 0 0 0 39.41743-130.367605c0-84.892518-28.667222-152.209298-85.916347-201.950342C687.284992 24.827862 609.729918 0 511.954214 0 414.690425 0 337.391308 24.827862 280.142183 74.568905 222.978377 124.309948 194.311154 191.626729 194.311154 276.519247c0 48.802533 12.968505 92.229962 38.990835 130.367605 25.93701 38.052325 61.429762 68.084653 106.222297 90.011665-53.409765 22.780203-94.874854 55.457424-124.565906 97.861023A245.37777 245.37777 0 0 0 170.67776 738.436927c0 87.110815 31.141476 156.475254 93.33911 208.093318 62.282953 51.532745 145.127812 77.299117 248.619897 77.299117z m0-592.029329c-44.365939 0-79.517414-13.395101-105.539744-40.35594-25.93701-26.875521-38.990835-63.136144-38.990834-108.78187 0-46.072321 12.883186-82.503583 38.649558-109.208465 25.766372-26.619563 60.832528-40.014664 105.198467-40.014665 44.365939 0 79.688052 14.077654 105.88102 42.062323 26.278287 28.155307 39.332111 63.818697 39.332111 107.160807 0 45.645726-12.968505 81.906349-38.990835 108.78187-25.93701 26.96084-61.173804 40.355941-105.539743 40.35594z m0 459.272788c-52.471255 0-93.595067-14.589568-123.371438-43.854024-29.86169-29.179137-44.707215-68.169972-44.707216-116.972505 0-49.741043 15.101483-89.670388 45.389769-119.788035 30.288285-30.117647 70.729545-45.21913 121.323779-45.21913 50.508915 0 91.206132 15.186802 122.006332 45.560406 30.714881 30.373604 46.072321 70.132311 46.072322 119.446759 0 50.594234-14.674888 90.096984-43.939344 118.42293-29.349775 28.240627-70.30295 42.403599-122.774204 42.403599z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Icon8Bold.defaultProps = {
  size: 18,
};

Icon8Bold = React.memo ? React.memo(Icon8Bold) : Icon8Bold;

export default Icon8Bold;
