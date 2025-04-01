import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Header from '../Header';
import {TabsRoutes} from '../../routes/TabsRoutes';
import {useEffect} from 'react';

import {useNavigation, useRoute} from '@react-navigation/native';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const navigation = useNavigation();
  const route = useRoute();

  console.log(route);

  useEffect(() => {
    if (route.name === 'Shorts') {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({tabBarStyle: {height: 75}});
    }
  }, [route.name]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10}}>
        <Header />
      </View>

      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            let iconSource;

            if (route.name === 'Home') {
              iconSource = focused
                ? require('../../assets/Images/home-primary.png')
                : require('../../assets/Images/home-tab.png');
            } else if (route.name === 'Shorts') {
              iconSource = focused
                ? require('../../assets/Images/shorts-primary.png')
                : require('../../assets/Images/shorts-tab.png');
            } else if (route.name === 'Add') {
              iconSource = focused
                ? require('../../assets/Images/add-primary.png')
                : require('../../assets/Images/add-tab.png');
            } else if (route.name === 'BrandRequirement') {
              iconSource = focused
                ? require('../../assets/Images/brand-primary.png')
                : require('../../assets/Images/brand-tab.png');
            } else if (route.name === 'User') {
              iconSource = focused
                ? require('../../assets/Images/user-primary.png')
                : require('../../assets/Images/user-tab.png');
            }

            return (
              <Image
                source={iconSource}
                style={{width: 35, height: 35, resizeMode: 'contain'}}
              />
            );
          },
          tabBarActiveTintColor: '#441752',
          tabBarInactiveTintColor: '#000000',
          tabBarStyle:
            route.name === 'Shorts'
              ? {display: 'none'}
              : {
                  fontWeight: 'bold',
                  // backgroundColor: '#ffffff',
                  height: 75,
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  paddingTop: 10,
                  paddingBottom: 10,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: -3},
                },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
            paddingTop: 6,
          },
        })}>
        {TabsRoutes.map((tabs, index) => (
          <Tab.Screen
            key={index}
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

{
  /* {route.name !== 'Shorts' ? (
        <Header />
      ) : (
        <View className='absolute top-0' style={{ height: 60, backgroundColor: 'white', justifyContent: 'center', paddingHorizontal: 15 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require("../../assets/Images/plus.png")}/>
          </TouchableOpacity>
        </View>
      )} */
}
