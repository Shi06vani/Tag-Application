import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, TextInput, Image, TouchableOpacity, Alert} from 'react-native';
import {searchVideos} from '../../api/useVideo.jsx/Video';

const SearchInput = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  const handleSearch = async () => {
    if (!searchText) {
      Alert.alert('Failed', 'Enter search text');
    } else {
      const results = await searchVideos(searchText);
      if (results) {
        // setFilterVideos(results);
        setSearchText('');
        navigation.navigate('Filter-Videos', {filterVideos: results});
      } else {
        Alert.alert('error', 'filter video not found');
      }
    }
  };

  return (
    <View className=" flex flex-row items-center justify-between  border border-[#441752] py-0.5 px-2 rounded-full mx-3">
      <TextInput
        placeholderTextColor="#441752"
        placeholder="Search..."
        value={searchText}
        onChangeText={setSearchText}
        className="px-4 py-2 rounded-lg text-base text-black"
      />
      <TouchableOpacity onPress={handleSearch}>
        <Image
          source={require('../../assets/Images/search.png')}
          className=" h-6 w-6  pr-3 font-bold"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
