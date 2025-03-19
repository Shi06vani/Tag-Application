import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import ShortsCard from '../ui/cards/ShortsCards';

const shortsData = [
  {
    id: 1,
    image: '../../assets/Images/shortsimage.png',
    title: 'DIY Toys | Satisfying And Relaxing | DIY TikTok Compilation..',
    views: '24M',
  },
  {
    id: 2,
    image: '../../assets/Images/shortsimage.png',
    title: 'Another Awesome Video',
    views: '12M',
  },
  {
    id: 3,
    image: '../../assets/Images/shortsimage.png',
    title: 'Amazing Craft Ideas You Should Try',
    views: '8.5M',
  },
  {
    id: 4,
    image: '../../assets/Images/shortsimage.png',
    title: 'Satisfying ASMR Compilation',
    views: '10M',
  },
];

const HomeShorts = () => {
  return (
    <View className='bg-white h-full'>
      <View className="flex flex-row gap-3 py-[15px] px-3">
        <Image source={require('../../assets/Images/shorts.png')} />
        <Text className="text-base font-medium">Storts </Text>
      </View>
      <View>
        <ScrollView horizontal={true} className="flex flex-row ">
          {shortsData.map((shorts, index) => (
            <View className="flex flex-row mx-1" key={index}>
              <ShortsCard
                
                image={shorts.image}
                title={shorts.title}
                views={shorts.views}
                onPress={() => console.log('Another Card Pressed')}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeShorts;
