import {useState} from 'react';
import Tags from '../ui/tags/Tags';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const tags = ['News', 'Comedy', 'Romentic', 'Informative'];

const TagList = () => {
  const [selectedTag, setSelectedTag] = useState('News');
  const navigation = useNavigation();

  return (
    <View className=" flex flex-row    p-3 ">
      <FlatList
        className="max-w-full flex "
        data={tags}
        contentContainerStyle={{paddingHorizontal: 10, columnGap: 7}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <View>
            <Tags
              label={item}
              isSelected={item === selectedTag}
              onPress={() => {
                setSelectedTag(item);
                navigation.navigate('Category-videos', { category: item }); // ✅ FIXED
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default TagList;
