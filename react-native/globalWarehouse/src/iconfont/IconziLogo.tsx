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

let IconziLogo: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M21.6576 307.2h455.1168c11.9808 0 21.6576 9.728 21.6576 21.6576v335.9232c0 11.9808-9.728 21.6576-21.6576 21.6576H21.6576A21.6576 21.6576 0 0 1 0 664.7808v-335.872C0 316.928 9.728 307.2 21.6576 307.2z m183.808 212.5312l-6.7584-114.9952h-36.5568l-41.984 114.4832L117.76 404.736H75.776l9.216 184.2176h44.4416l39.424-104.3968 7.424 104.3968h44.4928l66.3552-184.2176h-43.52l-38.144 114.9952z m196.7616-8.8576l5.7856-33.024H339.456l6.912-38.8096h81.0496l6.0416-34.304h-124.928l-32.256 184.2176h124.672l6.0416-34.2016h-80.896l7.7312-43.8784h68.4032z"
        fill={getIconColor(color, 0, '#4400FA')}
      />
      <Path
        d="M541.7984 588.9536l31.744-184.2176 53.9648 0.1024a67.7376 67.7376 0 0 1 66.816 46.9504c4.2496 12.7488 5.5808 26.4704 3.8912 41.2672l-0.8704 7.68c-2.048 16.0256-7.68 31.3344-16.384 44.9536a94.0032 94.0032 0 0 1-33.4336 31.5392c-13.4656 7.6288-28.672 11.6224-44.0832 11.7248h-61.6448z m69.632-152.4224l-20.224 116.1728 12.6976 0.1024a43.3152 43.3152 0 0 0 35.84-17.2544c9.0624-11.52 14.3872-29.1328 16.0768-52.8384l0.256-4.1472c0.6144-13.568-1.536-23.8592-6.3488-30.8736a25.8048 25.8048 0 0 0-21.7088-11.0592l-16.64-0.1024z m217.1904 152.4224h-124.2624l4.5056-28.928 65.2288-59.9552 8.96-8.8576c14.0288-13.9776 20.4288-27.136 19.2512-39.4752-0.9216-9.6768-5.9392-14.592-15.104-14.848a19.968 19.968 0 0 0-16.4352 7.7824 39.5776 39.5776 0 0 0-8.3968 20.992l-41.1648 0.256c0.6144-11.1616 4.1984-21.9648 10.4448-31.232 6.3488-9.472 15.0528-17.1008 25.2416-22.1184 10.4448-5.2736 22.016-7.9872 33.6896-7.8336 17.92 0.3072 31.744 5.12 41.5744 14.3872 9.8304 9.216 14.08 21.76 12.8 37.5808a60.7232 60.7232 0 0 1-9.216 27.136 140.288 140.288 0 0 1-23.6032 27.8016l-19.1488 17.4592-28.4672 27.136 69.2736 0.3072-5.1712 32.4096z m177.1008-63.488a63.5904 63.5904 0 0 1-12.6976 33.4336 71.68 71.68 0 0 1-29.0304 22.528 92.1088 92.1088 0 0 1-38.9632 7.4752c-19.2-0.4096-34.304-6.4-45.312-18.0736-11.0592-11.6224-17.0496-27.4432-18.0736-47.36-0.768-13.312 0.768-27.7504 4.5056-43.4176 3.7376-15.6672 9.8304-29.3376 18.2784-40.96 8.4992-11.5712 18.432-20.2752 29.952-26.0608 11.4688-5.7856 24.064-8.5504 37.6832-8.2944 20.0192 0.3072 35.84 6.1952 47.5136 17.6128 11.6736 11.3664 18.0224 27.136 18.9952 47.104l-43.008-0.1024c0.1536-10.9056-1.8944-18.7392-6.0928-23.3984-4.1984-4.6592-10.8544-7.168-19.968-7.4752-22.7328-0.768-36.5568 16.4352-41.5232 51.6608a278.528 278.528 0 0 0-3.4304 34.048c-0.4096 20.1728 7.2704 30.5664 23.04 31.1296 10.1376 0.3584 18.2784-2.0992 24.32-7.3216a36.352 36.352 0 0 0 11.6224-22.0672l42.1888-0.512z"
        fill={getIconColor(color, 1, '#000000')}
      />
    </Svg>
  );
};

IconziLogo.defaultProps = {
  size: 18,
};

IconziLogo = React.memo ? React.memo(IconziLogo) : IconziLogo;

export default IconziLogo;