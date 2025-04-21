import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {brandRequirements} from '../api/brandRequirements/Requiements';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const initialRequirements = [
//   {
//     id: '1',
//     brand: 'Nike',
//     title: 'Looking for Sports Influencers',
//     details:
//       'Nike is searching for sports influencers to promote their latest running shoes.',
//     budget: '$500 - $1000',
//     founded: '1964',
//     category: 'Sportswear',
//     website: 'https://www.nike.com',
//     location: 'Beaverton, Oregon, USA',
//     logo: "../assets/Images/nike.png",
//   },
//   {
//     id: '2',
//     brand: 'Adidas',
//     title: 'Fashion Collaborators Needed',
//     details:
//       'Adidas is looking for fashion content creators to showcase new apparel.',
//     budget: '$700 - $1500',
//     founded: '1949',
//     category: 'Sportswear & Fashion',
//     website: 'https://www.adidas.com',
//     location: 'Herzogenaurach, Germany',
//     logo:require("../assets/Images/adidas.png"),
//   },
// ];

const initialRequirements = [
  {
    id: '1',
    brand: 'Nike',
    title: 'Looking for Sports Influencers',
    details:
      'Nike is searching for sports influencers to promote their latest running shoes.',
    budget: '$500 - $1000',
    founded: '1964',
    category: 'Sportswear',
    website: 'https://www.nike.com',
    location: 'Beaverton, Oregon, USA',
    logo: require('../assets/Images/nike.png'),
    brandVideos: [
      'https://www.example.com/videos/nike_ad.mp4',
      'https://www.example.com/videos/nike_campaign.mp4',
    ],
    shorts: [
      'https://www.example.com/shorts/nike_short1.mp4',
      'https://www.example.com/shorts/nike_short2.mp4',
    ],
  },
  {
    id: '2',
    brand: 'Adidas',
    title: 'Fashion Collaborators Needed',
    details:
      'Adidas is looking for fashion content creators to showcase new apparel.',
    budget: '$700 - $1500',
    founded: '1949',
    category: 'Sportswear & Fashion',
    website: 'https://www.adidas.com',
    location: 'Herzogenaurach, Germany',
    logo: require('../assets/Images/adidas.png'),
    brandVideos: [
      'https://www.example.com/videos/adidas_ad.mp4',
      'https://www.example.com/videos/adidas_promo.mp4',
    ],
    shorts: [
      'https://www.example.com/shorts/adidas_short1.mp4',
      'https://www.example.com/shorts/adidas_short2.mp4',
    ],
  },
];

const BrandRequirementScreen = ({navigation}) => {
  const [requirements, setRequirements] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      const loginUser = await AsyncStorage.getItem('loginuser_id');

      if (!loginUser) {
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      }
    };

    const getRequirements = async () => {
      const data = await brandRequirements();
      if (data) {
        setRequirements(data);
      }
      setLoading(false);
    };
    checkLogin();
    getRequirements();
  }, []);

  const filteredRequirements = requirements.filter(
    req =>
      req?.brand?.toLowerCase().includes(search.toLowerCase()) ||
      req?.title?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    // <View className="flex-1 bg-purple-50 py-20 px-[15px] ">
    //   <Text className="text-2xl font-bold text-center text-primary mb-2">
    //     Brand Requirements
    //   </Text>
    //   <TextInput
    //     className="w-full p-3 border border-purple-300 rounded-[100px] mb-4 text-lg bg-white"
    //     placeholder="Search requirements..."
    //     value={search}
    //     onChangeText={setSearch}
    //   />
    //   <FlatList
    //     data={filteredRequirements}
    //     keyExtractor={item => item.id}
    //     renderItem={({item}) => (
    //       <View className="bg-white p-4 mb-3 rounded-2xl shadow-lg border-l-4 border-accent">
    //         <TouchableOpacity onPress={() =>  navigation.navigate("Brand-details",{ brand: item})}>
    //           <Text className="text-xl font-bold text-primary">
    //             {item.brand}
    //           </Text>
    //         </TouchableOpacity>
    //         <Text className="text-lg font-semibold text-secondary mt-1">
    //           {item.title}
    //         </Text>
    //         <Text className="text-gray-600 mt-2">{item.details}</Text>
    //         <Text className="text-primary font-semibold mt-2">
    //           Budget: {item.budget}
    //         </Text>
    //         <TouchableOpacity className="bg-primary p-2.5 rounded-lg mt-3 items-center">
    //           <Text className="text-white text-base font-semibold">
    //             Apply Now
    //           </Text>
    //         </TouchableOpacity>
    //       </View>
    //     )}
    //   />
    // </View>
    <View className="flex-1 bg-purple-50 py-20 px-[15px]">
      <Text className="text-2xl font-bold text-center text-primary mb-2">
        Brand Requirements
      </Text>
      <TextInput
        className="w-full p-3 border border-purple-300 rounded-[100px] mb-4 text-lg bg-white"
        placeholder="Search requirements..."
        value={search}
        onChangeText={setSearch}
      />
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#441752" />
        </View>
      ) : (
        <FlatList
          data={filteredRequirements}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <View className="bg-white p-4 mb-3 rounded-2xl shadow-lg border-l-4 border-primary">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Brand-details', {
                    brandid: item?.brandId?._id,
                  })
                }>
                <Text className="text-xl font-bold text-primary">
                  {item.title}
                </Text>
              </TouchableOpacity>
              <Text className="text-gray-600 mt-2">{item.description}</Text>
              <Text className="text-primary font-semibold mt-2">
                category: {item.category}
              </Text>

              <Text className="text-primary font-semibold mt-2">
                Budget: {item.budget}
              </Text>
              <Text className="text-primary font-semibold mt-2">
                Total need: {item.totalNeed}
              </Text>
              <View className="flex-row gap-2">
                <View className='w-[50%]'>
                  <TouchableOpacity
                    className="bg-primary p-2.5 rounded-lg mt-3 items-center w-full"
                    onPress={() =>
                      navigation.navigate('Brand-details', {
                        brandid: item?.brandId?._id,
                      })
                    }>
                    <Text className="text-white text-base font-semibold">
                      Apply 
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className='w-[50%]'>
                  <TouchableOpacity
                    className="bg-primary p-2.5 rounded-lg mt-3 items-center "
                    onPress={() =>
                      navigation.navigate('Chat', {
                        brandid: item?.brandId?._id,
                      })
                    }>
                    <Text className="text-white text-base font-semibold">
                      Chat
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default BrandRequirementScreen;
