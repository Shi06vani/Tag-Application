import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {userProfileInfo} from '../api/userDetail/User';
import {getFollowCounts} from '../api/useFollow/FollowUser';

export default function UserProfileDetailpage({route}) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const {userId} = route.params;
  const [followCounts, setFollowCounts] = useState(null);

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
    <View className="flex-1 bg-white">
      {userData ? (
        <ScrollView className="p-5">
          <View className="items-center mb-5">
            <Image
              source={require('../assets/Images/user.png')}
              className="w-24 h-24 rounded-full"
            />
            <Text className="text-xl font-bold text-black mt-3">
              {userData?.name}
            </Text>
            <Text className="text-gray-500 text-sm">{userData?.bio}</Text>
          </View>
         

          {/* Company & Website */}
          <View className="bg-gray-100 p-4 rounded-lg mb-5">
            <Text className="text-black font-semibold">
              Company: {userData?.companyName}
            </Text>
            <Text className="text-blue-500">{userData.website}</Text>
          </View>

          {/* User Role & Topic */}
          <View className="bg-gray-100 p-4 rounded-lg mb-5">
            <Text className="text-black font-semibold">
              Role: {userData.role}
            </Text>
            <Text className="text-gray-700">Topic: {userData.topic}</Text>
          </View>

          <View className="bg-gray-100 p-4 rounded-lg mb-5">
            <Text className="text-black font-semibold">
              Followers: {followCounts?.followers}
            </Text>
          </View>

          <View className="bg-gray-100 p-4 rounded-lg">
            <Text className="text-black font-semibold">
              Following: {followCounts?.following}
            </Text>
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500">Loading user details...</Text>
        </View>
      )}
    </View>
  );
}
