import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Image, ActivityIndicator, Alert} from 'react-native';
import {getLeaderboard} from '../api/leaderboard/Leaderboard';

// based on followers of creator , we will decide its points in Leaderboard
const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLeaderboard();
        if (data) {
          console.log("leaderboard",data)
          setLeaderboard(data.leaderboard);
        } else {
          console.error('Failed to fetch leaderboard');
        }
      } catch (error) {
        Alert.alert('Failed', error.message);

        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log()

  return (
    <View className="flex-1 bg-purple-50 p-[15px]">
      <Text className="text-2xl font-bold text-center text-primary mb-4">
        Top Creators
      </Text>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#441752" />
        </View>
      ) : (
     
        <ScrollView className="bg-white rounded-lg shadow-lg py-3 px-3 flex-1">
          {leaderboard?.length > 0 ? (
            leaderboard.map((creator, index) => (
              <View
                key={creator.creatorId}
                className="flex-row  justify-between p-2 border-b border-purple-50">
                <View className="flex-row ">
                
                       <Image
                    source={
                      creator?.image
                        ? {uri:creator?.image}
                        : require('../assets/Images/default-image.png')
                    }
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <View className='flex-col'>
                
                  <View>
                    <Text className="text-xl font-semibold text-primary">
                      {creator.name}
                    </Text>
                    <Text className="text-md text-secondary">
                      {creator.email} 
                    </Text>
                  </View>
                   
                  <View className='flex-row gap-3'>
                    <Text className='text-sm text-gray-400 font-medium'> • comments {creator?.totalComments ||0}</Text>
                    <Text className='text-sm text-gray-400 font-medium'> • likes {creator?.totalLikes||0}</Text>
                  </View>
                  </View>
                

                </View>
                <Text className="text-base font-bold text-purple-900">
                  {creator.totalPoints || 0} points
                </Text>
              </View>
            ))
          ) : (
            <View className="flex-1 items-center justify-center">
              <View className=" items-center justify-center mt-10">
                <Image
                  source={require('../assets/Images/out-of-stock.png')}
                  className="w-28 h-28  mb-4"
                  resizeMode="contain"
                />
                <Text className="text-lg text-center text-purple-900 font-semibold">
                  No top creators yet!
                </Text>
              </View>
            </View>
          )}
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


// ];


   // <ScrollView className="bg-white rounded-lg shadow-lg py-3 px-3 flex-1">
        //   {leaderboard.map((creator, index) => (
        //     <View key={creator.creatorId} className="flex-row items-center justify-between p-2 border-b border-purple-300">
        //       <View className="flex-row items-center">
        //         <Image source={require('../assets/Images/user.png')} className="w-12 h-12 rounded-full mr-4" />
        //         <View>
        //           <Text className="text-xl font-semibold text-primary">{creator.name}</Text>
        //           <Text className="text-md text-secondary">{creator.followerCount} Followers</Text>
        //         </View>
        //       </View>
        //       <Text className="text-xl font-bold text-purple-900">{creator.totalScore} pts</Text>
        //     </View>
        //   ))}
        // </ScrollView>