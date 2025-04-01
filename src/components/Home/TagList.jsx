import {useState} from 'react';
import Tags from '../ui/tags/Tags';
import {FlatList, View} from 'react-native';

const tags = ['News', 'Comedy', 'Romentic', 'Informative'];

const TagList = () => {
  const [selectedTag, setSelectedTag] = useState('News');

  return (
    <View className=" flex flex-row    p-3 ">
      <FlatList
        className="max-w-full flex "
        data={tags}
        contentContainerStyle={{paddingHorizontal: 10,columnGap: 7}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <View className=''>
            <Tags
              label={item}
              isSelected={item === selectedTag}
              onPress={() => setSelectedTag(item)}
            />
          </View>
        )}
      />
    </View>
  );
};

export default TagList;
