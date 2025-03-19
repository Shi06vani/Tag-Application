import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { styled } from "nativewind";
import { useNavigation } from '@react-navigation/native';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

const UserProfile = () => {
  const navigation = useNavigation();
  const recentData = [{},{},{},{},{}];

  return (
    <View className='p-[8px]'>
<TouchableOpacity 
        onPress={() => navigation.navigate('Login')} 
        className='bg-green-500 p-3 rounded-lg w-full items-center mb-3'>
        <Text className='text-white text-lg'>Go to Login</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Signup')} 
        className='bg-green-500 p-3 rounded-lg w-full items-center mb-3'>
        <Text className='text-white text-lg'>Go to Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Brands-list')} 
        className='bg-green-500 p-3 rounded-lg w-full items-center mb-3'>
        <Text className='text-white text-lg'>All Brands</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Brands-requirement')} 
        className='bg-green-500 p-3 rounded-lg w-full items-center mb-3'>
        <Text className='text-white text-lg'>BrandRequirementScreen</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Your-requirement')} 
        className='bg-green-500 p-3 rounded-lg w-full items-center mb-3'>
        <Text className='text-white text-lg'>Your-requirement</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Leaderboard')} 
        className='bg-green-500 p-3 rounded-lg w-full items-center mb-3'>
        <Text className='text-white text-lg'>Leaderboard</Text>
      </TouchableOpacity>



{/* ========================================= */}
 <StyledView className="bg-white p-4">
      {/* Profile Section */}
      <StyledView className="flex-row items-center space-x-3">
        <StyledImage
          source={require(`../assets/Images/user.png`)}
          className="w-12 h-12 rounded-full"
        />
        <StyledView>
          <StyledText className="text-black text-lg font-bold">Rise and Shine</StyledText>
          <StyledText className="text-gray-500 text-sm">@Motivation--2024 • View channel</StyledText>
        </StyledView>
      </StyledView>

      {/* Buttons Section */}
      <StyledView className="mt-4">
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="flex flex-row gap-[10px]">

      <StyledTouchableOpacity className="flex-row items-center justify-center gap-[6px] px-[12px] py-[8px] pt-[-2px] bg-gray-200 rounded-full">
          <StyledImage 
          source={require(`../assets/Images/my-video.png`)}
          className="w-[18px] h-[18px]"
        />
          <StyledText className="text-black text-sm">Settings</StyledText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity className="flex-row items-center justify-center gap-[6px] px-[12px] py-[8px] pt-[4px] bg-gray-200 rounded-full">
          <StyledImage 
          source={require(`../assets/Images/my-video.png`)}
          className="w-[18px] h-[18px]"
        />
          <StyledText className="text-black text-sm">Switch account</StyledText>
        </StyledTouchableOpacity>

        <StyledTouchableOpacity className="flex-row items-center gap-[6px] px-[12px] py-[8px] pt-[-2px] bg-gray-200 rounded-full">
        <StyledImage
          source={require(`../assets/Images/clock.png`)}
          className="w-[18px] h-[18px]"
        />
          <StyledText className="text-black text-sm">Share Channel</StyledText>
        </StyledTouchableOpacity>
      
      </ScrollView>
      </StyledView>

    </StyledView>

      <Text className='text-[#000000] text-[16px] '>Recent</Text>

{/* <View className='p-[5px] flex flex-row gap-[10px] items-center w-full overflow-scroll'> */}
<View className="p-[5px] w-full">
<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="flex flex-row gap-[10px]">
{
  recentData.map((item, index) =>{
    return(
      <StyledView className="w-40 bg-white rounded-lg overflow-hidden" key={index}>
      {/* Thumbnail */}
      <StyledView className="relative">
        <StyledImage
          // source={{ uri: "https://your-thumbnail-url.com/image.jpg" }} 
          source={require('../assets/Images/heart-touching.png')}
          className="w-full h-24"
        />
        {/* Video Duration */}
        <StyledView className="absolute bottom-1 right-1 bg-black px-2 py-1 rounded-md">
          <StyledText className="text-white text-xs">0:50</StyledText>
        </StyledView>
      </StyledView>

      {/* Video Details */}
      <StyledView className="p-2">
        <StyledText className="text-black font-semibold text-sm">
          Heart Touching Nasheed #Shorts
        </StyledText>
        <StyledText className="text-gray-500 text-xs">An Naffe</StyledText>
      </StyledView>
    </StyledView>
    )
  })
}
</ScrollView>
    </View>

{/* ================================== */}

<StyledView className="bg-white m-[5px] mt-[12px] rounded-lg shadow-md">

<StyledView className="flex-row items-center px-4 py-3 gap-[8px] border-gray-200">
       <StyledImage
          source={require(`../assets/Images/clock.png`)}
          className="w-[24px] h-[24px]"
        />
     
      <StyledView className="flex-1">
        <StyledText className="text-black text-base">History</StyledText> 
      </StyledView>
    </StyledView>
      
    <StyledView className="flex-row items-center px-4 py-3 gap-[8px] border-b border-gray-200">
       <StyledImage 
          source={require(`../assets/Images/my-video.png`)}
          className="w-[24px] h-[24px]"
        />
     
      <StyledView className="flex-1">
        <StyledText className="text-black text-base">Your videos</StyledText> 
      </StyledView>
    </StyledView>

    {/* <StyledView className="flex-row items-center px-4 py-3 border-b border-gray-200">
       <StyledImage 
          source={require(`../assets/Images/clock.png`)}
          className="w-[24px] h-[24px]"
        />
     
      <StyledView className="flex-1">
        <StyledText className="text-black text-base">Watch later</StyledText> 
      </StyledView>
    </StyledView> */}

     
    </StyledView>

    </View>
  );
}

export default UserProfile;
