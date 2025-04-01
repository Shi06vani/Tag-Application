// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, Image } from "react-native";
// import { launchImageLibrary } from "react-native-image-picker";

// const UploadFromGallery = ({ navigation }) => {
//   const [video, setVideo] = useState(null);

// console.log(video)

//   const selectMedia = () => {
//     const options = {
//       mediaType: 'mixed',
//       includeBase64: false,
//       maxWidth: 1080,
//       maxHeight: 1080,
//     };

//     launchImageLibrary(options, (response) => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else {
//         console.log('Selected Media:', response);
//       }
//     });
//   };

//   return (
//     <View className="flex-1 bg-purple-50 w-full items-center justify-center">
//       <Text className="text-lg font-bold mb-5">Upload Video from Gallery</Text>

//       {video ? (
//         <View className="items-center mt-5">
//           <Image source={{ uri: video?.uri }} className="w-48 h-48 rounded-lg mb-3" />
//           <Text>{video.fileName}</Text>

//           <TouchableOpacity className="bg-red-500 px-4 py-2 rounded-lg mt-3" onPress={() => setVideo(null)}>
//             <Text className="text-white">Remove</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <TouchableOpacity className="bg-primary px-5 py-3 rounded-full mt-5" onPress={selectMedia}>
//           <Text className="text-white text-sm">Select Video from Gallery</Text>
//         </TouchableOpacity>
//       )}

//       {video && (
//         <TouchableOpacity className="bg-green-600 px-4 py-3 rounded-lg mt-4">
//           <Text className="text-white text-lg">Upload Video</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// export default UploadFromGallery;

import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';

const UploadFromGallery = ({navigation}) => {
  const [media, setMedia] = useState(null);

  const selectMedia = () => {
    const options = {
      mediaType: 'mixed',
      includeBase64: false,
      maxWidth: 1080,
      maxHeight: 1080,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        setMedia(response.assets[0]);
      }
    });
  };

  return (
    <View className="flex-1 bg-gray-100 items-center justify-center px-4">
      <Text className="text-2xl font-bold text-gray-800 mb-6">
        Upload Media
      </Text>

      {media ? (
        <View className="bg-white shadow-md rounded-xl p-4 w-full max-w-sm items-center">
          {media.type.includes('image') ? (
            <Image
              source={{uri: media.uri}}
              className="w-48 h-48 rounded-lg mb-3"
            />
          ) : (
            <Video
              source={{uri: media.uri}}
              className="w-48 h-48 rounded-lg mb-3"
              controls
            />
          )}
          <Text className="text-gray-700 font-medium">{media.fileName}</Text>
          <View className="flex-row gap-4 py-3">
            <TouchableOpacity
              className="bg-red-400 px-6 py-2 rounded-full mt-3"
              onPress={() => setMedia(null)}>
              <Text className="text-white text-sm font-semibold">Remove</Text>
            </TouchableOpacity>
            {media && (
              <TouchableOpacity className="bg-primary px-6 py-2 rounded-full shadow-lg mt-4">
                <Text className="text-white text-sm font-semibold">Upload</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : (
        <TouchableOpacity
          className="bg-primary px-6 py-3 rounded-full shadow-lg"
          onPress={selectMedia}>
          <Text className="text-white text-lg font-semibold">Select Media</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UploadFromGallery;
