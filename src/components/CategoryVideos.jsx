import React from 'react';
import {View, Text, FlatList, Image, ScrollView} from 'react-native';

const videosData = {
  News: [
    {
      id: '1',
      title: 'Breaking News',
      thumbnail: 'https://picsum.photos/seed/news1/300/200',
    },
    {
      id: '2',
      title: 'Politics Today',
      thumbnail: 'https://picsum.photos/seed/news2/300/200',
    },
  ],
  Comedy: [
    {
      id: '3',
      title: 'Funny Clips',
      thumbnail: 'https://picsum.photos/seed/comedy1/300/200',
    },
    {
      id: '4',
      title: 'Stand-up Special',
      thumbnail: 'https://picsum.photos/seed/comedy2/300/200',
    },
  ],
  Romantic: [
    {
      id: '5',
      title: 'Love Story',
      thumbnail: 'https://picsum.photos/seed/romantic1/300/200',
    },
    {
      id: '6',
      title: 'Romantic Comedy',
      thumbnail: 'https://picsum.photos/seed/romantic2/300/200',
    },
  ],
  Informative: [
    {
      id: '7',
      title: 'Science Facts',
      thumbnail: 'https://picsum.photos/seed/info1/300/200',
    },
    {
      id: '8',
      title: 'History Uncovered',
      thumbnail: 'https://picsum.photos/seed/info2/300/200',
    },
  ],
};

const CategoryVideos = ({route}) => {
  const {category} = route.params;
  const videos = videosData[category] || [];

  return (
    <ScrollView>
      <View style={{flex: 1, padding: 20}}>
        <Text
          style={{
            fontSize: 20,
            color: '#441752',
            textAlign: 'center',
            marginBottom: 10,
          }}
          className="py-3 font-bold text-primary">
          {category} Videos
        </Text>
        <FlatList
          data={videos}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={{marginBottom: 20}}>
              <Image
                source={{uri: item?.thumbnail}}
                style={{width: '100%', height: 150, borderRadius: 10}}
              />
              <Text
                style={{color: 'black', textAlign: 'start', marginTop: 8}}
                className="text-sm font-bold">
                {item.title}
              </Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default CategoryVideos;
