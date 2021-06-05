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

let IconBianzu: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M27.8016 405.76c17.92-31.8976 56.832-14.8992 115.7632-16.1024 35.1488-0.7168 104.064-0.7168 206.7968 0 6.1184-37.2736 14.2592-31.9232 24.4736 16.0768 8.0384 37.888-6.4768 91.5968 0 163.2 1.152 12.7488 10.0864 33.4336 26.8288 62.0544 84.0448-0.768 147.9168-17.9968 191.5904-51.6864 46.5408-35.8912 65.1264-209.664 19.3536-313.728-4.5568-10.3424-34.048 19.1232-60.2624 24.1152-25.1904 4.8128-47.2064-14.848-50.2272-24.1152a18.2528 18.2528 0 0 1 15.488-23.808c20.224-2.1248 45.4656-11.392 75.648-27.8272 49.5616-26.9824 56.832-55.68 80.0768-60.928 32.4608-7.3216 60.928-2.4064 85.376 14.72-12.672 45.824-24.9088 74.5472-36.7104 86.144-11.8016 11.5712-23.552 15.488-35.1744 11.6992l138.8544 283.392c46.6944 6.272 77.1328 12.928 91.3408 19.968 58.2912 28.8768 70.4 69.9648 67.4816 82.8928-14.2848 62.72-193.4336 19.0976-200.5504 37.2736-25.472 65.0496-93.3888 103.424-119.7056 81.9456-17.536-14.3104-26.368-34.3552-26.4448-60.1088l-307.8656 18.7392c-8.6528 49.7408-24.3456 84.3264-47.104 103.7568-22.7584 19.4048-62.1056 31.7952-118.016 37.1712-27.52-16.8448-44.6464-29.2352-51.4304-37.1712-5.504-6.4768-12.2112-19.4816-20.096-38.9888a76.8 76.8 0 0 1-5.5808-28.7744V678.912c-25.3952-11.5968-41.2928-20.6592-47.7184-27.136-23.5264-23.6544-22.3488-46.2336-22.016-57.344 2.048-74.6496 43.0848-100.0448 45.7728-125.952 0.9728-9.2928-30.5664-22.5536-35.9424-29.568-12.4672-16.2816-6.1696-22.2208 0-33.2032z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
      <Path
        d="M986.7008 751.104c0-21.9136-5.0432-43.3664-14.5664-62.7456 5.9136-0.9472 11.5968-3.0208 16.6912-6.144 11.9808-7.552 18.048-20.4288 18.048-38.2464 0-26.8288-19.5328-55.8592-52.2496-77.6192-22.5536-15.0272-60.4928-32.5888-117.4272-36.4288a147.2 147.2 0 0 0-14.5408-32.512l-0.0768-0.1536c-5.76-9.472-13.1072-20.4544-21.6064-33.1776-30.2848-45.2608-74.5728-111.5136-102.1184-192.896 3.1232 0.1536 6.272 0.2304 9.472 0.2304 24.8832 0 41.6256-5.2224 52.736-16.4608 14.3872-14.592 14.336-34.0736 14.2336-51.3536v-7.8336c0.1024-17.2288 0.1536-36.736-14.2336-51.3024-11.1104-11.264-27.8528-16.4608-52.736-16.4608-27.52 0-53.632 6.3232-73.6256 17.792-19.0208 10.9568-31.3856 26.2144-35.1488 43.008l-0.4352 0.1536c-35.328 15.3856-78.592 34.304-84.0704 36.9408-27.2384 13.184-30.7712 35.328-25.5232 50.304 7.6032 21.7856 32.8192 33.6384 58.7008 27.5712 16.128-3.7888 33.7408-15.3856 47.3088-26.0096 26.0352 78.0032 51.5328 208.8192 3.4304 280.3456-23.2448 34.56-61.0816 51.3792-115.6864 51.3792-5.0432 0-10.0608 0.0512-15.0016 0.1024-31.6672 0.3328-61.568 0.6144-72.448-13.7216-7.808-10.3424-13.184-36.608 5.632-103.0656a19.968 19.968 0 0 0 0.3584-9.6512 75.776 75.776 0 0 0-11.4432-25.6768c7.3216-6.016 11.8784-13.6192 11.8784-23.4496 0-14.2336-5.2224-30.3616-13.952-43.136-10.8544-15.8208-26.0096-24.9088-41.6-24.9088H55.552c-15.616 0-30.7456 9.088-41.6 24.9088C5.2224 403.6608 0 419.84 0 434.048c0 9.344 4.4544 22.4768 25.7024 32.0512 2.9184 1.3568 6.1952 2.5856 9.7792 3.84C21.0432 497.4336 0 548.0192 0 609.0752c0 27.904 17.152 52.2496 50.8928 72.2944 6.656 3.9424 13.9776 7.7568 22.016 11.4176a142.1056 142.1056 0 0 0-12.4416 58.3168c0 78.08 63.104 141.6192 140.6464 141.6192 77.568 0 140.6976-63.5392 140.6976-141.6192 0-1.6128-0.0512-3.2-0.1024-4.8128 41.3696 2.944 82.816 4.4032 124.288 4.4032 59.4688 0 113.4592-4.608 160.8448-13.6448 7.5776 44.0832 34.6624 54.2208 57.984 54.2208 10.3936 0 18.2272-2.5856 24.576-6.5024 15.0528 61.9008 70.6304 107.9552 136.6528 107.9552 77.568 0 140.6464-63.5392 140.6464-141.6192zM539.2384 265.0624a15.3344 15.3344 0 0 1-11.008-0.9728 22.8864 22.8864 0 0 1 3.8656-2.304c2.6112-1.28 18.5856-8.32 44.3904-19.6096-12.1344 10.112-27.0336 20.48-37.248 22.8864z m169.0624-97.3056c19.1232 0 23.9872 3.968 24.7808 4.7616 2.816 2.8416 2.7648 13.6192 2.7392 23.0912v8.192c0.0256 9.472 0.0768 20.2752-2.7392 23.1424-0.7936 0.768-5.6576 4.736-24.7808 4.736-43.008 0-70.5024-18.944-70.5024-32 0-13.0048 27.4944-31.9232 70.5024-31.9232z m-661.8368 245.76c3.84-5.632 7.6288-7.7568 9.088-7.7568h291.1488c1.4592 0 5.2224 2.1248 9.088 7.7568 3.1232 4.5312 5.4016 10.0864 6.4 15.232-5.3248 2.6368-18.8672 7.7568-49.8688 12.032-31.0784 4.3264-70.144 6.6048-112.9728 6.6048-96.8448 0-146.048-11.3408-159.36-18.3552 1.1008-5.5552 3.3024-10.8288 6.4768-15.5136zM302.336 751.104c0 56.1664-45.3632 101.8368-101.1712 101.8368-55.808 0-101.1968-45.696-101.1968-101.8368 0-15.36 3.4048-30.3872 9.9328-44.032a591.616 591.616 0 0 0 52.5312 14.4128c40.3712 9.216 88.064 16.512 139.5712 21.4784 0.256 2.688 0.3328 5.4016 0.3328 8.1408z m-131.1744-68.4032c-82.432-18.8672-131.6352-46.3872-131.6352-73.6256 0-60.672 24.8576-110.5408 36.096-129.9968 32.768 5.1712 76.3392 7.9872 123.7504 7.9872 51.0976 0 98.0736-3.2256 132.352-9.1136 6.3488-1.0752 12.8768-2.3552 19.3024-3.84 5.76 2.6624 9.1904 9.2416 10.9056 13.568-17.8688 65.4592-17.0496 106.3936 2.5344 132.2752 20.224 26.752 55.04 29.44 90.5472 29.44 4.5568 0 9.1392 0 13.6704-0.0512 4.8128-0.0512 9.728-0.1024 14.6176-0.1024 67.7376 0 117.6832-23.168 148.3776-68.864 60.2624-89.6 27.5456-244.8128-4.352-331.4944 2.3552 1.664 4.7872 3.2256 7.424 4.7104 6.1184 3.5328 12.8512 6.5792 20.0192 9.088 28.3648 96.3072 79.4112 172.672 113.4848 223.5904 8.2176 12.288 15.2832 22.8864 20.6336 31.6416 2.3808 3.9936 4.48 8.0896 6.2976 12.16a192.512 192.512 0 0 0-113.5104 51.456c-33.2288 31.232-52.9152 71.7568-56.3456 115.2768-46.3104 9.3696-99.8144 14.1056-159.3088 14.1056-108.9536 0-216.448-10.24-294.8608-28.1856v-0.0256z m513.6896 68.8128c-7.6288 0-10.3424-1.7408-12.1856-3.6096-2.5088-2.5856-8.3968-11.4432-8.3968-37.376 0-76.8 68.6592-141.6192 149.9136-141.6192 107.648 0 153.2416 53.6832 153.2416 75.0336 0 2.4832-0.256 4.0192-0.4096 4.864-1.5872 0.4864-5.4272 1.152-14.2592 1.152-4.1728 0-8.9088-0.128-13.952-0.256-6.144-0.1792-13.1072-0.3584-20.608-0.3584-27.4944 0-69.8112 2.4064-120.2688 23.296-65.536 27.136-87.3984 53.4528-100.48 69.1712-8.064 9.728-8.2944 9.728-12.5952 9.728z m60.032-0.4096a20.0192 20.0192 0 0 0-0.1024-1.9712c12.8-11.52 32.8192-25.088 68.1728-39.7056 43.4944-18.0224 79.0784-20.352 105.216-20.352 2.8416 0 5.5552 0.0512 8.192 0.1024a102.144 102.144 0 0 1 20.8896 61.9264c0 56.1664-45.3632 101.888-101.1712 101.888-55.808 0-101.1968-45.7472-101.1968-101.888z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M744.8576 751.104a20.0192 20.0192 0 0 0-0.1024-1.9456c12.8-11.52 32.8192-25.088 68.1728-39.7056 43.4944-18.0224 79.0784-20.352 105.216-20.352 2.8416 0 5.5552 0.0512 8.192 0.1024a102.144 102.144 0 0 1 20.8896 61.9264c0 56.1664-45.3632 101.888-101.1712 101.888-55.808 0-101.1968-45.7472-101.1968-101.888z"
        fill={getIconColor(color, 2, '#FF7700')}
      />
    </Svg>
  );
};

IconBianzu.defaultProps = {
  size: 18,
};

IconBianzu = React.memo ? React.memo(IconBianzu) : IconBianzu;

export default IconBianzu;
