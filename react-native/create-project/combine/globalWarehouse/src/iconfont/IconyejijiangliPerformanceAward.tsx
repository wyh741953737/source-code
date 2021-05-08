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

let IconyejijiangliPerformanceAward: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M757.4528 0a260.8128 260.8128 0 1 1 0 521.6256 260.8128 260.8128 0 0 1 0-521.6256z m55.9104 130.4064c-27.904 0-45.3632 17.3568-55.9104 34.7136-10.5984-17.408-28.0576-34.7136-55.9104-34.7136-25.088 0-45.568 19.5072-45.568 43.4688 0 5.12 1.1264 9.9328 2.816 14.4896h-5.632c-14.6432 0-26.112 14.0288-26.112 31.8464v52.224c0 16.0256 9.216 28.8256 21.7088 31.3344v63.2832c0 13.312 11.776 24.1664 26.2656 24.1664h164.864c14.4384 0 26.2144-10.8544 26.2144-24.1664V303.7696c12.4416-2.5088 21.7088-15.36 21.7088-31.3344V220.16c0-17.92-11.4176-31.8976-26.0608-31.8976h-5.6832a40.96 40.96 0 0 0 2.816-14.4896c0-23.9616-20.4288-43.4688-45.568-43.4688v0.0512z m23.7568 173.824v58.0096h-65.1776V304.2816h65.1776v-0.0512z m-94.1568 0v58.0096h-65.2288V304.2816h65.2288v-0.0512z m0-86.8864v57.9584h-86.528a11.3664 11.3664 0 0 1-0.4608-2.8672V220.16c0-1.2288 0.2048-2.2016 0.4096-2.9184h86.5792z m115.5072 0a12.3904 12.3904 0 0 1 0.4096 2.8672v52.224a11.6736 11.6736 0 0 1-0.4096 2.8672h-86.528V217.344h86.528z m-156.8768-57.9584c18.176 0 29.3376 15.7696 35.4816 28.9792h-35.5328c-9.1136 0-16.5888-6.5024-16.5888-14.4896 0-7.9872 7.4752-14.4896 16.64-14.4896z m111.7184 0c9.1136 0 16.5376 6.5024 16.5376 14.4896 0 7.9872-7.3728 14.4896-16.5376 14.4896h-35.584c6.0416-13.2096 17.2032-28.9792 35.584-28.9792zM469.6064 520.6528c0-1.8944-0.6144-3.6352-1.0752-5.4784-0.4096-1.536-0.5632-3.0208-1.2288-4.4032-0.6144-1.3312-1.6384-2.4576-2.5088-3.7376-1.0752-1.536-2.048-3.1744-3.4816-4.4544-0.256-0.2048-0.3584-0.5632-0.6144-0.768-0.9216-0.8192-2.0992-1.1264-3.072-1.7408-1.5872-1.024-3.1232-2.048-4.9152-2.7648-1.7408-0.5632-3.4816-0.768-5.2736-1.024-1.28-0.1536-2.3552-0.768-3.6864-0.768H313.344a26.112 26.112 0 1 0 0 52.224h73.728l-105.2672 122.7264-111.5136-66.9184a26.0096 26.0096 0 0 0-33.4848 5.632L6.4 765.7472a26.112 26.112 0 0 0 40.0896 33.3824l116.1216-139.264 111.2064 66.7136a26.112 26.112 0 0 0 33.28-5.376l110.592-129.024v59.904a26.112 26.112 0 1 0 52.1216 0v-130.4576c0-0.3072-0.1536-0.5632-0.2048-0.9216M56.32 886.7328h130.4064v130.4064H56.32V886.784zM317.1328 834.56H447.488v182.528H317.1328v-182.528z m260.8128-78.2848h130.4064v260.8128h-130.4064v-260.8128z m260.7616-130.4064h130.4576v391.2192H838.656v-391.168z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconyejijiangliPerformanceAward.defaultProps = {
  size: 18,
};

IconyejijiangliPerformanceAward = React.memo
  ? React.memo(IconyejijiangliPerformanceAward)
  : IconyejijiangliPerformanceAward;

export default IconyejijiangliPerformanceAward;
