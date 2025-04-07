import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, ScrollView, ActivityIndicator} from 'react-native';
import Video from 'react-native-video';
import { styled } from 'nativewind';
import BASE_URL from "../../config"

const StyledView = styled(View);
const StyledText = styled(Text);



const CategoryVideos = ({route}) => {
  const {category} = route.params;
  // const videos = videosData[category] || [];
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);


   

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
  
      try {
        // Use the category from route params, not hardcoded "Music"
        const response = await fetch(`${BASE_URL}/api/videos/list`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'video',
            category: category,  // Use the dynamic category from route
          }),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch videos');
        }
  
        // Make sure data is in the expected format
        setVideos(Array.isArray(data) ? data : []);
        
      } catch (error) {
        console.error('Error fetching posted videos:', error.message);
      }
  
      setLoading(false);
    };
  
    fetchVideos();
  }, [category]);
  

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#441752"
        className="flex-1 justify-center items-center"
      />
    );
  }



  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 30 }} className="px-4 bg-white">
      <StyledText className="text-xl font-bold text-center text-purple-900 my-6">
        {category} Videos
      </StyledText>

      <FlatList
        data={videos}
        keyExtractor={(item) => item._id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <StyledView className="bg-purple-50 rounded-2xl mb-5 p-4 shadow-2xl ">
            
            {/* Video Player */}
            <Video
              source={{ uri: item.videoUrl }}
              style={{ width: '100%', height: 200, borderRadius: 12, backgroundColor: '#000' }}
              resizeMode="cover"
              controls
              paused
            />

            {/* Video Info */}
            <StyledView className="mt-4">
              <StyledText className="text-lg font-semibold text-black">
                {item.title}
              </StyledText>
              <StyledText className="text-sm text-gray-700 mt-1">
                {item.description}
              </StyledText>
              <StyledText className="text-sm text-gray-500 mt-2">
                Creator: {item?.creatorId?.name || 'Unknown'}
              </StyledText>
              <StyledText className="text-xs text-gray-400">
                Category: {item.category}
              </StyledText>
            </StyledView>
          </StyledView>
        )}
      />
    </ScrollView>
   
  );
};

export default CategoryVideos;


 // <ScrollView>
    //   <View style={{flex: 1, padding: 20}}>
    //     <Text
    //       style={{
    //         fontSize: 20,
    //         color: '#441752',
    //         textAlign: 'center',
    //         marginBottom: 10,
    //       }}
    //       className="py-3 font-bold text-primary">
    //       {category} Videos
    //     </Text>
    //     <FlatList
    //       data={videos}
    //       keyExtractor={item => item.id}
    //       renderItem={({item}) => (
    //         <View style={{marginBottom: 20}}>
    //           <Image
    //             source={{uri: item?.thumbnail}}
    //             style={{width: '100%', height: 150, borderRadius: 10}}
    //           />
    //           <Text
    //             style={{color: 'black', textAlign: 'start', marginTop: 8}}
    //             className="text-sm font-bold">
    //             {item.title}
    //           </Text>
    //         </View>
    //       )}
    //     />
    //   </View>
    // </ScrollView>