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

let IconInstagram: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M511.829153 249.299938A262.273249 262.273249 0 0 0 249.171964 511.957127a262.273249 262.273249 0 0 0 262.657189 262.657188A262.273249 262.273249 0 0 0 774.486342 511.957127a262.273249 262.273249 0 0 0-262.657189-262.657189z m0 433.382228A171.066319 171.066319 0 0 1 341.104113 511.957127a171.066319 171.066319 0 0 1 170.72504-170.72504A171.066319 171.066319 0 0 1 682.511533 511.957127a171.066319 171.066319 0 0 1-170.68238 170.725039z m273.407491-505.34953c-33.957304 0-61.344979 27.387675-61.344979 61.344979 0 33.914644 27.387675 61.344979 61.344979 61.34498 33.957304 0 61.344979-27.302355 61.344979-61.34498a61.259659 61.259659 0 0 0-61.344979-61.344979zM1023.833632 511.957127c0-70.687504 0.639899-140.777769-3.327474-211.294633-3.967373-81.992385-22.695083-154.727566-82.632285-214.664768C877.808692 25.932545 805.201491 7.375475 723.251766 3.450762 652.564262-0.559272 582.473997 0.037967 511.957133 0.037967c-70.687504 0-140.777769-0.639899-211.294633 3.327475C218.670114 7.375475 145.934934 26.060525 85.997732 85.997726 25.932551 146.062908 7.375481 218.670108 3.450768 300.662494-0.559266 371.349998 0.037973 441.397603 0.037973 511.957127c0 70.559524-0.639899 140.777769 3.327475 211.294633 3.967373 81.992385 22.652423 154.727566 82.589624 214.664767 60.065181 60.065181 132.672382 78.622251 214.664768 82.589625C371.350004 1024.473525 441.397609 1023.876286 511.957133 1023.876286c70.687504 0 140.735109 0.639899 211.294633-3.327474 81.949725-3.967373 154.684906-22.652423 214.622107-82.589625 60.065181-60.065181 78.664911-132.672382 82.632285-214.664767 4.095353-70.559524 3.327475-140.607129 3.327474-211.294633z m-112.707535 301.989644c-9.385185 23.292322-20.604746 40.697573-38.692556 58.657404a163.814131 163.814131 0 0 1-58.657404 38.649896c-67.360029 26.790436-227.292107 20.775386-301.946984 20.775386s-234.757595 5.97239-302.117624-20.647406a162.747633 162.747633 0 0 1-58.657404-38.649897 163.814131 163.814131 0 0 1-38.649896-58.657403C85.741773 746.586742 91.756823 586.612004 91.756823 511.957127s-5.97239-234.757595 20.647406-302.117624c9.342525-23.292322 20.604746-40.697573 38.649896-58.657404a165.520528 165.520528 0 0 1 58.657404-38.649896c67.402689-26.662456 227.462747-20.647406 302.117624-20.647406s234.714935-5.97239 302.074964 20.647406c23.334982 9.342525 40.740233 20.604746 58.657404 38.649896 18.08781 18.08781 29.350032 35.365082 38.692556 58.657404 26.619796 67.402689 20.604746 227.462747 20.604746 302.117624s6.01505 234.629615-20.732726 301.989644z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
    </Svg>
  );
};

IconInstagram.defaultProps = {
  size: 18,
};

IconInstagram = React.memo ? React.memo(IconInstagram) : IconInstagram;

export default IconInstagram;
