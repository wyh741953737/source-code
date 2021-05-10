import React from 'react';
import { CJIcon } from '../components/baseUI';

export const stackNavigatorConfig = {
  headerMode: false,
  gestureDirection: 'horizontal',
};

export const tabNavigatorConfig = {
  initialRouteName: '/Demo1',
  tabBarOptions: {
    activeTintColor: '#4400FA',
    inactiveTintColor: 'gray',
    labelStyle: {
      fontSize: 13,
    },
  },
  screenOptions: ({ route }: any) => ({
    tabBarIcon: ({ focused, size }: any) => {
      let name, color;

      if (route.name === '/demo1') {
        name = 'iconyike-One';
        color = focused ? '#4400FA' : 'grey';
      } else if (route.name === '/demo2') {
        name = 'iconyuan-Circle';
        color = focused ? '#4400FA' : 'grey';
      } else if (route.name === '/demo3') {
        name = 'iconlianxi-Chat';
        color = focused ? '#4400FA' : 'grey';
      }

      return <CJIcon name={name} color={color} size={18} />;
    },
    unmountOnBlur: true,
  }),
};
