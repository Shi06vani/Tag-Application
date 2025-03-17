import { useState } from "react";
import Tags from "../ui/tags/Tags";
import { FlatList, View } from "react-native";


const tags = ["All", "Mixes", "Music", "Graphic"];

const TagList = () => {
    const [selectedTag, setSelectedTag] = useState("All");

    return (
      <View className=" flex flex-row  space-x-2  p-3">
        <FlatList
          data={tags}
        
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Tags
              label={item} 
              isSelected={item === selectedTag} 
              onPress={() => setSelectedTag(item)}
            />
          )}
        />
      </View>
    );
  };
  
  export default TagList;