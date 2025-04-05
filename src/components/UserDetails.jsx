import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {userProfileInfo} from '../api/userDetail/User';
import {getFollowCounts} from '../api/useFollow/FollowUser';
import LinearGradient from 'react-native-linear-gradient';
import { BrandVideos } from '../api/brandRequirements/Requiements';
import Video from 'react-native-video';

export default function UserDetails({route}) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const {userId} = route.params;
  const [followCounts, setFollowCounts] = useState(null);
  const [activeTab, setActiveTab] = useState('Videos');
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await userProfileInfo(userId);
      setUserData(data?.user);
      setLoading(false);
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFollowCounts(userId);
      setFollowCounts(data);
    };

    fetchData();
  }, [userId]);


   useEffect(() => {
      const getBrandVideos = async () => {
        const videoData = await BrandVideos(userId);
        if (videoData) {
          setVideos(videoData.videos);
        }
        setLoadingVideos(false);
      };
  
      getBrandVideos();
    }, [userId]);

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
    <ScrollView className="flex-1">
      {/* Header Section */}
      {/* <View className="bg-primary pb-8 pt-12 items-center rounded-b-3xl shadow-lg">
          <Image
            source={require("../assets/Images/user.png")}
            className="w-28 h-28 rounded-full border-4 border-white"
          />
          <Text className="text-xl font-bold text-white mt-3">{userData?.name}</Text>
          <Text className="text-gray-200 text-sm">{userData?.email}</Text>
        </View> */}
      <View>
        <LinearGradient
          colors={['#6a0080', '#441752']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          className="pb-8 pt-7 items-center rounded-b-full shadow-lg">
          <Image
            source={require('../assets/Images/user.png')}
            className="w-24 h-24 rounded-full border-4 border-white"
          />
          <Text className="text-xl font-bold text-white mt-3">
            {userData?.name}
          </Text>
          <Text className="text-gray-200 text-sm">{userData?.email}</Text>
        </LinearGradient>
      </View>
      ;
      <View className="p-5">
        {/* Role & Topic Card */}
        <View className="bg-purple-50 p-5 rounded-2xl shadow-md mb-4">
          <View className="flex-row items-center">
            {/* <Ionicons name="person" size={22} color="#441752" /> */}
            <Text className="text-black font-semibold ml-2">
              Role:{' '}
              {userData?.role.charAt(0).toUpperCase() + userData?.role.slice(1)}
            </Text>
          </View>
          <Text className="text-gray-600 mt-1">Topic: {userData?.topic}</Text>
        </View>

        {/* Following & Followers */}
        <View className="flex-row justify-between">
          <View className="bg-purple-50 p-5 rounded-2xl shadow-md w-[48%] items-center">
            <Text className="text-gray-700 text-lg font-bold">
              {followCounts?.following}
            </Text>
            <Text className="text-black font-semibold mt-2">Following</Text>
          </View>
          <View className="bg-purple-50 p-5 rounded-2xl shadow-md w-[48%] items-center">
            <Text className="text-gray-700 text-lg font-bold">
              {followCounts?.followers}
            </Text>
            <Text className="text-black font-semibold mt-2">Followers</Text>
          </View>
        </View>

        {/* tabs */}
        <View className="py-3">
          <View className="flex-row justify-around gap-1 items-center py-3 ">
            <TouchableOpacity
              className={`px-4 py-2 rounded-full w-[45%] ${
                activeTab === 'Videos' ? 'bg-[#441752]' : 'bg-accent'
              }`}
              onPress={() => setActiveTab('Videos')}>
              <Text className="text-white text-center font-bold">Videos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`px-4 py-2 rounded-full w-[45%] ${
                activeTab === 'Shorts' ? 'bg-[#441752]' : 'bg-accent'
              }`}
              onPress={() => setActiveTab('Shorts')}>
              <Text className="text-white text-center font-bold">Shorts</Text>
            </TouchableOpacity>
          </View>
          {activeTab === 'Videos' && (
            
            <View className="flex-1 px-2">
            <FlatList
              data={videos}
              // horizontal={true}
              keyExtractor={item => item._id}
              renderItem={({item}) => (
                <View className="">
                  <Video
                    source={{uri: item.videoUrl}}
                    style={{height: 200, marginTop: 15}}
                    controls={true}
                    resizeMode="cover"
                    paused={true}
                    className="rounded-lg w-full shadow-lg overflow-hidden"
                  />
                  <Text className="text-base font-bold text-black">
                    {item.title}
                  </Text>
                  <Text className="text-gray-500">{item.description}</Text>
                </View>
              )}
              ListEmptyComponent={() => (
                <View className="flex-1 items-center justify-center mt-10">
                  <Text className="text-gray-500 text-lg">No videos</Text>
                </View>
              )}
            />
          </View>
          )}

          {activeTab === 'Shorts' && (
            <View className="flex-1 px-2">
              <FlatList
                data={videos}
               
                keyExtractor={item => item._id}
                renderItem={({item}) => (
                  <View className=" mb-5">
                    <Video
                      source={{uri: item.videoUrl}}
                      style={{height: 200, marginTop: 10}}
                      controls={true}
                      resizeMode="cover"
                      paused={true}
                      className="rounded-lg w-full shadow-lg overflow-hidden"
                    />
                    <Text className="text-base font-bold text-black">
                      {item.title}
                    </Text>
                    <Text className="text-gray-500">{item.description}</Text>
                  </View>
                )}
                ListEmptyComponent={() => (
                  <View className="flex-1 items-center justify-center mt-10">
                    <Text className="text-gray-500 text-lg">No Shorts</Text>
                  </View>
                )}
              />
            </View>
          
          )}
        </View>
      </View>
    </ScrollView>
  );
}

// <View className="flex-1 bg-white">
//       {userData ? (
//         <ScrollView className="p-5">
//           <View className="items-center mb-5">
//             <Image
//               source={require('../assets/Images/user.png')}
//               className="w-24 h-24 rounded-full"
//             />
//             <Text className="text-xl font-bold text-black mt-3">
//               {userData?.name}
//             </Text>
//             <Text className="text-gray-500 text-sm">{userData?.bio}</Text>
//           </View>

//           <View className="bg-gray-100 p-4 rounded-lg mb-5">
//             <Text className="text-black font-semibold">
//               Company: {userData?.companyName}
//             </Text>
//             <Text className="text-blue-500">{userData.website}</Text>
//           </View>

//           <View className="bg-gray-100 p-4 rounded-lg mb-5">
//             <Text className="text-black font-semibold">
//               Role: {userData.role}
//             </Text>
//             <Text className="text-gray-700">Topic: {userData.topic}</Text>
//           </View>

//           <View className="bg-gray-100 p-4 rounded-lg">
//             <Text className="text-black font-semibold">
//               Following: 2
//             </Text>
//           </View>
//         </ScrollView>
//       ) : (
//         <View className="flex-1 items-center justify-center">
//           <Text className="text-gray-500">Loading user details...</Text>
//         </View>
//       )}
//     </View>

// <View className="flex-1 bg-white">
//   <View className="flex-1 bg-white">
//     {userData ? (
//       <ScrollView className="p-5">
//         <View className="items-center mb-5">
//           <Image
//             source={require('../assets/Images/user.png')}
//             className="w-24 h-24 rounded-full"
//           />
//           <Text className="text-xl font-bold text-black mt-3">
//             {userData?.name}
//           </Text>
//           <Text className="text-gray-500 text-sm">{userData?.email}</Text>
//         </View>

//         {/* User Role & Topic */}
//         <View className="bg-gray-100 p-4 rounded-lg mb-5">
//           <Text className="text-black font-semibold">
//             Role:{' '}
//             {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
//           </Text>
//           <Text className="text-gray-700">Topic: {userData.topic}</Text>
//         </View>

//         {/* Following Count */}
//         <View className="bg-gray-100 p-4 rounded-lg mb-5">
//           <Text className="text-black font-semibold">
//             Following: {followCounts?.following}
//           </Text>
//         </View>
//         <View className="bg-gray-100 p-4 rounded-lg mb-5">
//           <Text className="text-black font-semibold">
//             Following: {followCounts?.followers}
//           </Text>
//         </View>
//       </ScrollView>
//     ) : (
//       <View className="flex-1 items-center justify-center">
//         <ActivityIndicator size="large" color="#441752" />
//         <Text className="text-gray-500 mt-3">Loading user details...</Text>
//       </View>
//     )}
//   </View>
// </View>

// <View className="flex-1 px-2">
            //   <FlatList
            //     data={videos}
            //     horizontal={true}
            //     keyExtractor={item => item._id}
            //     renderItem={({item}) => (
            //       <View className="px-2">
            //         <Video
            //           source={{uri: item.videoUrl}}
            //           style={{height: 200, marginTop: 10}}
            //           controls={true}
            //           resizeMode="cover"
            //           paused={true}
            //           className="rounded-lg w-32 shadow-lg overflow-hidden"
            //         />
            //         <Text className="text-base font-bold text-black">
            //           {item.title}
            //         </Text>
            //         <Text className="text-gray-500">{item.description}</Text>
            //       </View>
            //     )}
            //   />
            // </View>