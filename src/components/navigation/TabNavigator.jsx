import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Header from '../Header';
import { TabsRoutes } from '../../routes/TabsRoutes';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <View className="flex-1">
      <Header />

      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            let iconSource;

            if (route.name === 'Home') {
              iconSource = focused
                ? require('../../assets/Images/home-dark.png')
                : require('../../assets/Images/home.png');
            } else if (route.name === 'Shorts') {
              iconSource = focused
                ? require('../../assets/Images/home-dark.png')
                : require('../../assets/Images/home.png');
            } else if (route.name === 'Add') {
              iconSource = focused
                ? require('../../assets/Images/plus.png')
                : require('../../assets/Images/plus.png');
            } else if (route.name === 'Subscription') {
              iconSource = focused
                ? require('../../assets/Images/home-dark.png')
                : require('../../assets/Images/home.png');
            } else if (route.name === 'User') {
              iconSource = focused
                ? require('../../assets/Images/home-dark.png')
                : require('../../assets/Images/home.png');
            }

            return (
              <Image
                source={iconSource}
                className="w-6 h-6 py-4 object-cover"
              />
            );
          },
          tabBarActiveTintColor: '#1427B7',
          tabBarInactiveTintColor: '#000000',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            height: 75,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            paddingTop: 13,
            paddingBottom: 13,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: {width: 0, height: -3},
            elevation: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
            paddingTop: 6,
          },
        })}>
        {TabsRoutes.map(tabs => (
          <Tab.Screen
            name={tabs.name}
            component={tabs.Component}
            options={tabs.options}
          />
        ))}
      </Tab.Navigator>
    </View>
  );
};

export default TabNavigator;
