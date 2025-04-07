import React, {useCallback, useEffect, useState} from 'react';
import BASE_URL from '../../config';
import {Share} from 'react-native';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {styled} from 'nativewind';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);
import axios from 'axios';

const UserProfile = () => {
  const recentData = [{}, {}, {}, {}, {}];
  const [role, setRole] = useState(null);
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const  [userId,setUserId] = useState(null)

  const fetchUserData = async (setUserData, setLoading) => {
    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem('loginuser_id');

      if (!userId) {
        navigation.navigate("Login")
      }
      setUserId(userId)
  
      const response = await fetch(`${BASE_URL}/api/auth/profile/${userId}`);
      const data = await response.json();
      setUserData(data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    setLoading(false);
  };
  

  useEffect(() => {
    if (!userData && !loading) {
      navigation.replace('Login'); 
    }
  }, [userData]);

  useEffect(() => {
    const fetchRole = async () => {
      const storedRole = await AsyncStorage.getItem("role");
      setRole(storedRole);
    };

    fetchRole();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUserData(setUserData, setLoading);
    }, []),
  );



  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#441752"
        className="flex-1 justify-center items-center"
      />
    );
  }

  const shareProfile = async () => {
    try {
      const shareOptions = {
        title: 'Check out this tag App!',
       
      };

      await Share.share(shareOptions);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleLogin =async()=>{
    await AsyncStorage.removeItem("token")
    await AsyncStorage.removeItem("loginuser_id")
    await AsyncStorage.removeItem("role")
    await AsyncStorage.removeItem("category")

    navigation.navigate("Login")
  }

  return (
    <ScrollView>
      <View className="p-[8px]">
        <TouchableOpacity
          onPress={() => navigation.navigate('Brands-list')}
          className="bg-secondary p-3 rounded-lg w-full items-center mb-3">
          <Text className="text-primary text-lg">All Brands</Text>
        </TouchableOpacity>

       

        <StyledView className="bg-white p-4 rounded-lg">
          <View className="p-[8px]">
            <View className="flex-row justify-between">
              

              {/* <TouchableOpacity onPress={shareProfile}>
                <View className="bg-slate-100 px-2 py-1 rounded-md">
                  <Text>Share Profile</Text>
                </View>
              </TouchableOpacity> */}
            </View>

            <StyledView className="bg-white p-4 rounded-lg shadow-md">
              <StyledView className="flex-row items-center space-x-3">
                <StyledTouchableOpacity onPress={()=> navigation.navigate("Profile-details",{userId:userId})}>
                <StyledImage
                  source={require('../assets/Images/user.png')}
                  className="w-12 h-12 rounded-full"
                />
                </StyledTouchableOpacity>
               
                <StyledView>
                  <StyledText className="text-black text-lg font-bold">
                    {userData?.name}
                  </StyledText>
                  <StyledText className="text-gray-500 text-sm">
                    {userData?.email}
                  </StyledText>
                  <StyledText className="text-gray-500 text-sm">
                    {userData?.role} - {userData?.companyName}
                  </StyledText>
                </StyledView>
              </StyledView>
              <StyledText className="text-gray-600 mt-2">
                {userData?.bio}
              </StyledText>
              <StyledText className="text-gray-600 mt-2">
                {userData?.topic}
              </StyledText>
            </StyledView>
          </View>

          {/* Buttons Section */}
          <StyledView className="mt-4">
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              className="flex flex-row gap-[10px]">
              {/* <StyledTouchableOpacity className="flex-row items-center justify-center gap-[6px] px-[12px] py-[8px] text-white pt-[-2px] bg-accent 0 rounded-full">
                <StyledImage
                  tintColor={'white'}
                  source={require(`../assets/Images/my-video.png`)}
                  className="w-[18px] h-[18px]"
                />
                <StyledText className="text-white text-sm">Settings</StyledText>
              </StyledTouchableOpacity>
              <StyledTouchableOpacity className="flex-row items-center justify-center gap-[6px] px-[12px] py-[8px] pt-[4px] bg-accent 0 rounded-full">
                <StyledImage
                  tintColor={'white'}
                  source={require(`../assets/Images/my-video.png`)}
                  className="w-[18px] h-[18px]"
                />
                <StyledText className="text-white text-sm">
                  Switch account
                </StyledText>
              </StyledTouchableOpacity> */}
               <StyledTouchableOpacity
                className="flex-row items-center gap-[6px] px-[12px] py-[8px] pt-[-2px] bg-accent 0 rounded-full"
                onPress={() => navigation.navigate('Leaderboard')}>
                <StyledImage
                  tintColor={'white'}
                  source={require(`../assets/Images/clock.png`)}
                  className="w-[18px] h-[18px]"
                />
                <StyledText className="text-white text-sm">
                  Leaderboard
                </StyledText>
              </StyledTouchableOpacity>

              <StyledTouchableOpacity
                className="flex-row items-center gap-[6px] px-[12px] py-[8px] pt-[-2px] bg-accent 0 rounded-full"
                   onPress={() =>
                  navigation.navigate('Update-Profile', {data: userData})
                }>
                <StyledImage
                  tintColor={'white'}
                  source={require(`../assets/Images/clock.png`)}
                  className="w-[18px] h-[18px]"
                />
                <StyledText className="text-white text-sm">
                  Update Profile
                </StyledText>
              </StyledTouchableOpacity>

                <StyledTouchableOpacity className="flex-row items-center justify-center gap-[6px] px-[12px] py-[8px] pt-[4px] bg-accent 0 rounded-full" onPress={handleLogin}>
                <StyledImage
                  tintColor={'white'}
                  source={require(`../assets/Images/my-video.png`)}
                  className="w-[18px] h-[18px]"
                />
                <StyledText className="text-white text-sm">
                  Logout
                </StyledText>
              </StyledTouchableOpacity>

             
            </ScrollView>
          </StyledView>
        </StyledView>

        {/* <View className="bg-white mt-2 p-1 rounded-lg">
          <Text className="text-[#000000] text-[16px] ">Recent</Text>

          <View className="p-[5px] w-full">
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              className="flex flex-row gap-[10px]">
              {recentData.map((item, index) => {
                return (
                  <StyledView
                    className="w-40 bg-white rounded-lg overflow-hidden"
                    key={index}>
                    <StyledView className="relative">
                      <StyledImage
                        source={require('../assets/Images/heart-touching.png')}
                        className="w-full h-24"
                      />
                      <StyledView className="absolute bottom-1 right-1 bg-black px-2 py-1 rounded-md">
                        <StyledText className="text-white text-xs">
                          0:50
                        </StyledText>
                      </StyledView>
                    </StyledView>

                    <StyledView className="p-2">
                      <StyledText className="text-black font-semibold text-sm">
                        Heart Touching Nasheed #Shorts
                      </StyledText>
                      <StyledText className="text-gray-500 text-xs">
                        An Naffe
                      </StyledText>
                    </StyledView>
                  </StyledView>
                );
              })}
            </ScrollView>
          </View>
        </View> */}

        <View>
          <ScrollView className="">
            <View className="">
              <StyledView className="bg-white  mt-[12px] rounded-lg shadow-md">
                {/* <StyledView className="flex-row items-center px-4 py-3 gap-[8px] ">
                  <StyledImage
                    source={require(`../assets/Images/clock.png`)}
                    className="w-[24px] h-[24px]"
                  />

                  <StyledView className="">
                    <StyledText className="text-black text-base">
                      History
                    </StyledText>
                  </StyledView>
                </StyledView> */}

                {role === 'brand' && (
                  <StyledTouchableOpacity
                    onPress={() => navigation.navigate('Your-requirement')}>
                    <StyledView className="flex-row items-center px-4 py-3 gap-[8px]">
                      <StyledImage
                        source={require('../assets/Images/clock.png')}
                        className="w-[24px] h-[24px]"
                      />
                      <StyledView>
                        <StyledText className="text-black text-base">
                          Post Requirement
                        </StyledText>
                      </StyledView>
                    </StyledView>
                  </StyledTouchableOpacity>
                )}

                <StyledTouchableOpacity onPress={()=> navigation.navigate("My-Videos")}>
                  <StyledView className="flex-row items-center px-4 py-3 gap-[8px]">
                    <StyledImage
                      source={require(`../assets/Images/my-video.png`)}
                      className="w-[24px] h-[24px]"
                    />

                    <StyledView className="">
                      <StyledText className="text-black text-base">
                        My videos
                      </StyledText>
                    </StyledView>
                  </StyledView>
                </StyledTouchableOpacity>



                <StyledTouchableOpacity  onPress={()=> navigation.navigate("My-Shorts")} >
                  <StyledView className="flex-row items-center px-4 py-3 gap-[8px]">
                    <StyledImage
                      source={require(`../assets/Images/my-video.png`)}
                      className="w-[24px] h-[24px]"
                    />

                    <StyledView className="">
                      <StyledText className="text-black text-base">
                        My shorts
                      </StyledText>
                    </StyledView>
                  </StyledView>
                </StyledTouchableOpacity>

                {/* <TouchableOpacity
                  onPress={() => navigation.navigate('Following')}>
                  <StyledView className="flex-row items-center px-4 py-3 gap-[8px]">
                    <StyledImage
                      source={require(`../assets/Images/my-video.png`)}
                      className="w-[24px] h-[24px]"
                    />

                    <StyledView className="">
                      <StyledText className="text-black text-base">
                        Following
                      </StyledText>
                    </StyledView>
                  </StyledView>
                </TouchableOpacity>
                <StyledTouchableOpacity
                  onPress={() => navigation.navigate('Followers')}>
                  <StyledView className="flex-row items-center px-4 py-3 gap-[8px] ">
                    <StyledImage
                      source={require(`../assets/Images/my-video.png`)}
                      className="w-[24px] h-[24px]"
                    />

                    <StyledView className="">
                      <StyledText className="text-black text-base">
                        Followers
                      </StyledText>
                    </StyledView>
                  </StyledView>
                </StyledTouchableOpacity> */}
              </StyledView>
            </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default UserProfile;

// const fetchUserData = async () => {
//   setLoading(true);
//   try {
//     const response = await fetch(
//       `${BASE_URL}/api/auth/profile/67e053780ca3791a112bfc9a`,
//     );
//     const data = await response.json();
//     setUserData(data.user);
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//   }
//   setLoading(false);
// };


// message: `Hey, check out this profile:
        
// // Name: ${userData?.name}
// // Company: ${userData?.companyName}
// // Website: ${userData?.website}

// // You can visit their profile here: https://yourwebsite.com/user/${userData?._id}`,