import React from 'react'
import { Text, View ,Image,Animated } from 'react-native'
import { useEffect } from 'react';

import {useNavigation} from '@react-navigation/native';


const Splash =()=>{
  const navigation = useNavigation();

  const fadeAnim = new Animated.Value(0); 
  const scaleAnim = new Animated.Value(0.5); 

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        navigation.replace('Main');
      }, 1000);
    });
  }, []);


    return (
        <View className="flex-1 justify-center items-center bg-white">
        <Animated.View
          className="rounded-full p-7 border-2 border-[#441752]"
          style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}
        >
          <Image source={require('../assets/Images/Transparent-logo.png')} className="w-16 h-16" />
        </Animated.View>
      </View>
    )
}

export default Splash
