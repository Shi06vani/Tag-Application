import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const brands = [
  { id: '1', name: 'Nike', category: 'Sportswear', logo: require('../assets/Images/user.png') },
  { id: '2', name: 'Adidas', category: 'Sportswear', logo: require('../assets/Images/user.png') },
  { id: '3', name: 'Puma', category: 'Footwear', logo: require('../assets/Images/user.png') },
  { id: '4', name: 'Reebok', category: 'Apparel', logo: require('../assets/Images/user.png') },
];

const BrandListScreen = () => {
   const navigation = useNavigation();
  const [search, setSearch] = useState('');
  
  const filteredBrands = brands.filter(brand => 
    brand.name.toLowerCase().includes(search.toLowerCase()) ||
    brand.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View className="flex-1 bg-purple-50 p-[15px]">
      <Text className="text-2xl font-bold text-center text-primary mb-3">Popular Brands</Text>
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
          <TouchableOpacity className="bg-white px-3 py-3 mb-2 rounded-2xl shadow-lg flex-row items-center"
          onPress={() => navigation.navigate('Chat')} 
          >
            <Image source={item.logo} className="w-12 h-12 rounded-lg mr-4" />
            <View>
              <Text className="text-base font-semibold text-primary">{item.name}</Text>
              <Text className="text-secondary text-sm">{item.category}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// export { BrandListScreen };
export default BrandListScreen;