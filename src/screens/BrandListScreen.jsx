import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';

const brands = [
  { id: '1', name: 'Nike', category: 'Sportswear', logo: require('../assets/Images/user.png') },
  { id: '2', name: 'Adidas', category: 'Sportswear', logo: require('../assets/Images/user.png') },
  { id: '3', name: 'Puma', category: 'Footwear', logo: require('../assets/Images/user.png') },
  { id: '4', name: 'Reebok', category: 'Apparel', logo: require('../assets/Images/user.png') },
];

const BrandListScreen = () => {
  const [search, setSearch] = useState('');
  
  const filteredBrands = brands.filter(brand => 
    brand.name.toLowerCase().includes(search.toLowerCase()) ||
    brand.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View className="flex-1 bg-purple-100 p-[15px]">
      <Text className="text-3xl font-bold text-center text-primary mb-3">Popular Brands</Text>
      <TextInput
        className="w-full p-3 border border-gray-300 rounded-lg mb-3 text-lg bg-white"
        placeholder="Search brands..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredBrands}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity className="bg-white px-3 py-2 mb-2 rounded-2xl shadow-lg flex-row items-center">
            <Image source={item.logo} className="w-16 h-16 rounded-lg mr-4" />
            <View>
              <Text className="text-xl font-semibold text-primary">{item.name}</Text>
              <Text className="text-secondary">{item.category}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// export { BrandListScreen };
export default BrandListScreen;