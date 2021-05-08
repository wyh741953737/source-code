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

let IcondailiFreeSuppliers: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M916.097024 479.5904l100.7616 104.3456a25.6 25.6 0 0 1-0.6144 36.2496 25.6 25.6 0 0 1-36.2496-0.6144l-58.4192-60.5184-0.256 3.0208c-20.0704 208.0256-198.8608 371.3024-415.744 371.3024-188.5696 0-353.8944-125.5936-402.944-302.08a24.32 24.32 0 0 1 18.688-30.6176 24.2688 24.2688 0 0 1 28.416 16.7424c42.8544 156.3648 189.0816 267.6736 355.84 267.6736 191.8976 0 350.0032-144.896 367.0016-329.216l-61.7472 57.5488a25.6512 25.6512 0 0 1-34.9696-37.5296l104.2944-97.28a25.6 25.6 0 0 1 35.9424 0.9728z m-446.5664-121.856l18.0224 16.384a25.6 25.6 0 0 1 0.8192 37.12l-29.3376 29.184a20.224 20.224 0 0 0-2.6624 25.3952l2.56 3.2256a65.1776 65.1776 0 0 0 92.16 0 23.4496 23.4496 0 0 1 33.0752 0l88.2176 87.8592a12.288 12.288 0 0 1 3.584 8.7552 14.848 14.848 0 0 1 0 2.2528l-21.6064 21.6064-29.696-29.5936a14.848 14.848 0 0 0-25.1904 10.4448c0 3.8912 1.536 7.68 4.3008 10.3936l29.2864 29.8496-18.5856 18.5344-29.696-29.5424a14.7968 14.7968 0 0 0-26.9312 8.192 14.6944 14.6944 0 0 0 6.144 12.0832l29.3888 29.7472-18.5856 19.2-29.696-29.5936a14.848 14.848 0 0 0-25.1904 10.4448c0 3.8912 1.536 7.68 4.3008 10.4448l29.696 29.5424-18.6368 18.5344a12.032 12.032 0 0 1-7.0656 3.328 12.288 12.288 0 0 1-7.168-3.328l-196.608-199.936a25.6 25.6 0 0 1-0.1536-35.84l109.568-113.5104a25.6 25.6 0 0 1 35.6864-1.1776z m49.0496-270.6944c188.5696 0 353.8944 125.5424 402.944 302.08a24.32 24.32 0 0 1-18.688 30.5664 24.2688 24.2688 0 0 1-28.416-16.6912c-42.8544-156.3648-189.0816-267.6736-355.84-267.6736-191.8976 0-350.0032 144.896-367.0016 329.216l61.7472-57.5488a25.6512 25.6512 0 0 1 34.9696 37.5296l-104.2944 97.28a25.6 25.6 0 0 1-35.9424-0.9728L7.297024 436.48a25.6 25.6 0 0 1 0.6144-36.2496 25.6 25.6 0 0 1 36.2496 0.6144l58.368 60.4672 0.3072-2.9696C122.906624 250.368 301.645824 87.04 518.580224 87.04z m102.6048 273.92l124.2624 119.9104a12.2368 12.2368 0 0 1 3.584 8.8064 11.5712 11.5712 0 0 1-3.5328 8.704l0.1024-0.256-46.4384 46.336a40.0384 40.0384 0 0 0-5.6832-8.4992l-105.7792-105.0112a14.5408 14.5408 0 0 0-3.584-16.0256 14.7968 14.7968 0 0 0-20.9408 0l-33.3824 33.28c-18.4832 17.8176-32.8704 19.712-43.1104 5.632l99.1744-93.1328a25.6 25.6 0 0 1 35.328 0.256z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IcondailiFreeSuppliers.defaultProps = {
  size: 18,
};

IcondailiFreeSuppliers = React.memo
  ? React.memo(IcondailiFreeSuppliers)
  : IcondailiFreeSuppliers;

export default IcondailiFreeSuppliers;
