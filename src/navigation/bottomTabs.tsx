import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { bottomTabScreens } from './screens';
import stackNavigationComponent from './common';
import { tabNavigatorConfig } from './config';

const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator {...tabNavigatorConfig}>
      {bottomTabScreens.map(({ component, ...arg }, index) => {
        return (
          // @ts-ignore
          <Tab.Screen
            {...arg}
            key={index}
            component={stackNavigationComponent(component)}
          />
        );
      })}
    </Tab.Navigator>
  );
};
