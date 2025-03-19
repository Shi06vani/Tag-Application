import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Header from '../Header';
import {TabsRoutes} from '../../routes/TabsRoutes';
import {
  useNavigation,
  useNavigationState,
  useIsFocused,
  useRoute,
} from '@react-navigation/native';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const navigation = useNavigation();
  const route = useRoute();

  console.log(route);

  return (
    <View className="flex-1 bg-white relative">
     <View className=' '>
     <Header />
     </View>
    
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            let iconSource;

            if (route.name === 'Home') {
              iconSource = focused
                ? require('../../assets/Images/home-dark.png')
                : require('../../assets/Images/home.png');
            } else if (route.name === 'Leaderboard') {
              iconSource = focused
                ? require('../../assets/Images/home-dark.png')
                : require('../../assets/Images/home.png');
            } else if (route.name === 'Add') {
              iconSource = focused
                ? require('../../assets/Images/plus.png')
                : require('../../assets/Images/plus.png');
            } else if (route.name === 'Brand') {
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
                className="w-8 h-6 py-4 object-cover"
              />
            );
          },
          tabBarActiveTintColor: '#441752',
          tabBarInactiveTintColor: '#000000',
          tabBarStyle:
            route.name === 'Shorts'
              ? {display: 'none'}
              : {
                  fontWeight: "bold",
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


   {/* {route.name !== 'Shorts' ? (
        <Header />
      ) : (
        <View className='absolute top-0' style={{ height: 60, backgroundColor: 'white', justifyContent: 'center', paddingHorizontal: 15 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require("../../assets/Images/plus.png")}/>
          </TouchableOpacity>
        </View>
      )} */}