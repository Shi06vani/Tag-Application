import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import { getLeaderboard } from '../api/leaderboard/Leaderboard';

// based on followers of creator , we will decide its points in Leaderboard
const Leaderboard = () => {

  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLeaderboard(); 
        if (data.success) {
          setLeaderboard(data.leaderboard);
        } else {
          console.error('Failed to fetch leaderboard');
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
   
    <View className="flex-1 bg-purple-100 p-[15px]">
      <Text className="text-2xl font-bold text-center text-primary mb-4">Top Creators</Text>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#441752" />
        </View>
      ) : (
        <ScrollView className="bg-white rounded-lg shadow-lg py-3 px-3 flex-1">
          {leaderboard.map((creator, index) => (
            <View key={creator.creatorId} className="flex-row items-center justify-between p-2 border-b border-purple-300">
              <View className="flex-row items-center">
                <Image source={require('../assets/Images/user.png')} className="w-12 h-12 rounded-full mr-4" />
                <View>
                  <Text className="text-xl font-semibold text-primary">{creator.name}</Text>
                  <Text className="text-md text-secondary">{creator.followerCount} Followers</Text>
                </View>
              </View>
              <Text className="text-xl font-bold text-purple-900">{creator.totalScore} pts</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Leaderboard;


 // <View className="flex-1 bg-purple-100 p-[15px]">
    //   <Text className="text-2xl font-bold text-center text-primary mb-4">Top Creators</Text>
    //   <ScrollView className="bg-white rounded-lg shadow-lg py-3 px-3 flex-1">
    //     {creators.map((creator, index) => (
    //       <View key={index} className="flex-row items-center justify-between p-2 border-b border-purple-300">
    //         <View className="flex-row items-center">
    //           <Image source={require(`../assets/Images/user.png`)} className="w-12 h-12 rounded-full mr-4" />
    //           <View>
    //             <Text className="text-xl font-semibold text-primary">{index + 1}. {creator.name}</Text>
    //             <Text className="text-md text-secondary">{creator.followers}K Followers</Text>
    //           </View>
    //         </View>
    //         <Text className="text-xl font-bold text-purple-900">{creator.points} pts</Text>
    //       </View>
    //     ))}
    //   </ScrollView>
    // </View>


    
// const creators = [
//   { name: 'John Doe', points: 1200, followers: 50, profilePic: '../assets/Images/user.png' },
//   { name: 'Jane Smith', points: 1100, followers: 45, profilePic: '../assets/Images/user.png' },
//   { name: 'Alex Johnson', points: 1050, followers: 40, profilePic: '../assets/Images/user.png' },
//   { name: 'Chris Brown', points: 980, followers: 35, profilePic: '../assets/Images/user.png' },
//   { name: 'Emma Wilson', points: 950, followers: 30, profilePic: '../assets/Images/user.png' },
//   { name: 'John Doe', points: 1200, followers: 50, profilePic: '../assets/Images/user.png' },
//   { name: 'Jane Smith', points: 1100, followers: 45, profilePic: '../assets/Images/user.png' },
//   { name: 'Alex Johnson', points: 1050, followers: 40, profilePic: '../assets/Images/user.png' },
//   { name: 'Chris Brown', points: 980, followers: 35, profilePic: '../assets/Images/user.png' },
//   { name: 'Emma Wilson', points: 950, followers: 30, profilePic: '../assets/Images/user.png' },
//   { name: 'Emma Wilson', points: 950, followers: 30, profilePic: '../assets/Images/user.png' },
//   { name: 'John Doe', points: 1200, followers: 50, profilePic: '../assets/Images/user.png' },
//   { name: 'Jane Smith', points: 1100, followers: 45, profilePic: '../assets/Images/user.png' },
//   { name: 'Alex Johnson', points: 1050, followers: 40, profilePic: '../assets/Images/user.png' },
//   { name: 'Chris Brown', points: 980, followers: 35, profilePic: '../assets/Images/user.png' },
//   { name: 'Emma Wilson', points: 950, followers: 30, profilePic: '../assets/Images/user.png' },
// ];
