import React from 'react';
import { TouchableHighlight } from 'react-native';
import { CJView, CJText } from '@/components/baseUI';
import i18n from 'i18next';
import { IconFont } from '@/global';
import styles from './styles';

interface IProps {}
interface HotItemProps {
  icon: string;
  name: string;
  handleClick: () => void;
}

const hotList: HotItemProps[] = [
  {
    icon: 'icon-bianzu25beifen2',
    name: 'Comouter&Office',
    handleClick: () => {
      console.log(1);
      location.href = 'https://www.baidu.com';
    },
  },
  {
    icon: 'icon-bianzu26beifen',
    name: 'Bag&Shoes',
    handleClick: () => {
      console.log(2);
    },
  },
  {
    icon: 'icon-bianzu56',
    name: 'Health&BeautyHair',
    handleClick: () => {
      console.log(3);
    },
  },
  {
    icon: 'icon-bianzu59',
    name: 'Women’s Clothing',
    handleClick: () => {
      console.log(4);
    },
  },
  {
    icon: 'icon-bianzu41beifen3',
    name: 'Phones & Accessories',
    handleClick: () => {
      console.log(5);
    },
  },
  {
    icon: 'icon-bianzu63beifen2',
    name: 'Home Improvenment',
    handleClick: () => {
      console.log(6);
    },
  },
];

export default (props: IProps) => {
  const {} = props;
  return (
    <CJView className={styles.hot_types}>
      <CJText className={styles.title}>
        {i18n.t('CJhotlist.title', 'Trending Categories')}
      </CJText>
      <CJView className={styles.list_box}>
        {hotList.map((item: HotItemProps) => (
          <HotItem {...item} />
        ))}
      </CJView>
    </CJView>
  );
};

const HotItem = (props: HotItemProps) => {
  const { name, icon, handleClick } = props;
  return (
    <CJView onClick={handleClick} className={styles.hot_item}>
      <CJView className={styles.item_bg}>
        <IconFont type={icon} />
      </CJView>
      <CJText className={styles.item_name}>{name}</CJText>
    </CJView>
  );
};
