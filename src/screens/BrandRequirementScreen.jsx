import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';

const initialRequirements = [
  { id: '1', brand: 'Nike', title: 'Looking for Sports Influencers', details: 'Nike is searching for sports influencers to promote their latest running shoes.', budget: '$500 - $1000' },
  { id: '2', brand: 'Adidas', title: 'Fashion Collaborators Needed', details: 'Adidas is looking for fashion content creators to showcase new apparel.', budget: '$700 - $1500' },
];

const BrandRequirementScreen = () => {
  const [requirements, setRequirements] = useState(initialRequirements);
  const [search, setSearch] = useState('');
  
  const filteredRequirements = requirements.filter(req =>
    req.brand.toLowerCase().includes(search.toLowerCase()) ||
    req.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View className="flex-1 bg-purple-100 py-[10px] px-[15px]">
    <Text className="text-3xl font-bold text-center text-purple-800 mb-2">Brand Requirements</Text>
    <TextInput
      className="w-full p-3 border border-purple-300 rounded-[100px] mb-4 text-lg bg-white"
      placeholder="Search requirements..."
      value={search}
      onChangeText={setSearch}
    />
    <FlatList
      data={filteredRequirements}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View className="bg-white p-4 mb-3 rounded-2xl shadow-lg border-l-4 border-purple-600">
          <Text className="text-xl font-bold text-purple-700">{item.brand}</Text>
          <Text className="text-lg font-semibold text-gray-700 mt-1">{item.title}</Text>
          <Text className="text-gray-600 mt-2">{item.details}</Text>
          <Text className="text-purple-600 font-semibold mt-2">Budget: {item.budget}</Text>
          <TouchableOpacity className="bg-purple-700 p-3 rounded-lg mt-3 items-center">
            <Text className="text-white text-lg font-semibold">Apply Now</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  </View>
  );
};

export default BrandRequirementScreen;
