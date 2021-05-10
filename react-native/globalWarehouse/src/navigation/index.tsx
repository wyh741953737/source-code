import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import stackNavigationComponent from './common';
import { stackNavigatorConfig } from './config';
import { screens } from './screens';
import I18n from '../i18n';

const Stack = createStackNavigator();

function App() {
  const navigationRef = useRef(null);

  useEffect(() => {
    // console.log(navigationRef.current);
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      {/*@ts-ignore*/}
      <Stack.Navigator {...stackNavigatorConfig}>
        {screens.map(({ component, ...arg }, index) => (
          <Stack.Screen
            {...arg}
            key={index}
            component={stackNavigationComponent(
              I18n(component, navigationRef),
              navigationRef,
            )}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
