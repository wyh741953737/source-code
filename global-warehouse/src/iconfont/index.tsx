/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconBianzu41Beifen3 from './IconBianzu41Beifen3';
import IconBianzu8Beifen2 from './IconBianzu8Beifen2';
import IconBianzu from './IconBianzu';
import IconBianzu61Beifen4 from './IconBianzu61Beifen4';
import IconBianzu63Beifen2 from './IconBianzu63Beifen2';
import IconBianzu53Beifen2 from './IconBianzu53Beifen2';
import IconBianzu64 from './IconBianzu64';
import IconBianzu65Beifen2 from './IconBianzu65Beifen2';
import IconBianzu56 from './IconBianzu56';
import IconBianzu25Beifen2 from './IconBianzu25Beifen2';
import IconBianzu26Beifen from './IconBianzu26Beifen';
import IconBianzu47Beifen from './IconBianzu47Beifen';
import IconBianzu59 from './IconBianzu59';
import IconLujing from './IconLujing';
import IconBianzu16Beifen from './IconBianzu16Beifen';
import IconTutorial from './IconTutorial';
import IconBoke from './IconBoke';
import IconElites from './IconElites';
import IconTicket from './IconTicket';
import IconXiaoxi from './IconXiaoxi';
import IconWuliu from './IconWuliu';
import IconTuichu from './IconTuichu';
import IconGongyingshangpingjia from './IconGongyingshangpingjia';
import IconGerenzhongxin from './IconGerenzhongxin';
import IconZhanghu from './IconZhanghu';
import IconZizhanghu from './IconZizhanghu';

export type IconNames =
  | 'icon-bianzu41beifen3'
  | 'icon-bianzu8beifen2'
  | 'icon-bianzu'
  | 'icon-bianzu61beifen4'
  | 'icon-bianzu63beifen2'
  | 'icon-bianzu53beifen2'
  | 'icon-bianzu64'
  | 'icon-bianzu65beifen2'
  | 'icon-bianzu56'
  | 'icon-bianzu25beifen2'
  | 'icon-bianzu26beifen'
  | 'icon-bianzu47beifen'
  | 'icon-bianzu59'
  | 'icon-lujing'
  | 'icon-bianzu16beifen'
  | 'icon-tutorial'
  | 'icon-boke'
  | 'icon-elites'
  | 'icon-ticket'
  | 'icon-xiaoxi'
  | 'icon-wuliu'
  | 'icon-tuichu'
  | 'icon-gongyingshangpingjia'
  | 'icon-gerenzhongxin'
  | 'icon-zhanghu'
  | 'icon-zizhanghu';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'icon-bianzu41beifen3':
      return <IconBianzu41Beifen3 key="1" {...rest} />;
    case 'icon-bianzu8beifen2':
      return <IconBianzu8Beifen2 key="2" {...rest} />;
    case 'icon-bianzu':
      return <IconBianzu key="3" {...rest} />;
    case 'icon-bianzu61beifen4':
      return <IconBianzu61Beifen4 key="4" {...rest} />;
    case 'icon-bianzu63beifen2':
      return <IconBianzu63Beifen2 key="5" {...rest} />;
    case 'icon-bianzu53beifen2':
      return <IconBianzu53Beifen2 key="6" {...rest} />;
    case 'icon-bianzu64':
      return <IconBianzu64 key="7" {...rest} />;
    case 'icon-bianzu65beifen2':
      return <IconBianzu65Beifen2 key="8" {...rest} />;
    case 'icon-bianzu56':
      return <IconBianzu56 key="9" {...rest} />;
    case 'icon-bianzu25beifen2':
      return <IconBianzu25Beifen2 key="10" {...rest} />;
    case 'icon-bianzu26beifen':
      return <IconBianzu26Beifen key="11" {...rest} />;
    case 'icon-bianzu47beifen':
      return <IconBianzu47Beifen key="12" {...rest} />;
    case 'icon-bianzu59':
      return <IconBianzu59 key="13" {...rest} />;
    case 'icon-lujing':
      return <IconLujing key="14" {...rest} />;
    case 'icon-bianzu16beifen':
      return <IconBianzu16Beifen key="15" {...rest} />;
    case 'icon-tutorial':
      return <IconTutorial key="16" {...rest} />;
    case 'icon-boke':
      return <IconBoke key="17" {...rest} />;
    case 'icon-elites':
      return <IconElites key="18" {...rest} />;
    case 'icon-ticket':
      return <IconTicket key="19" {...rest} />;
    case 'icon-xiaoxi':
      return <IconXiaoxi key="20" {...rest} />;
    case 'icon-wuliu':
      return <IconWuliu key="21" {...rest} />;
    case 'icon-tuichu':
      return <IconTuichu key="22" {...rest} />;
    case 'icon-gongyingshangpingjia':
      return <IconGongyingshangpingjia key="23" {...rest} />;
    case 'icon-gerenzhongxin':
      return <IconGerenzhongxin key="24" {...rest} />;
    case 'icon-zhanghu':
      return <IconZhanghu key="25" {...rest} />;
    case 'icon-zizhanghu':
      return <IconZizhanghu key="26" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
