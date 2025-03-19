import React, {useState} from 'react';
import {View, Text, Button, TouchableOpacity, Image} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
const pickImage = () => {
  let options = {
    mediaType: 'photo', // Only allow photos
    quality: 1, // High-quality images
  };

  launchImageLibrary(options, response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorMessage) {
      console.log('Error:', response.errorMessage);
    } else {
      setImage(response.assets[0].uri);
    }
  });
};

const Add = () => {
  const [activeTab, setActiveTab] = useState('Short Shorts');

  const [image, setImage] = useState(null);

  return (
    // <View className="flex-1 bg-gray-100">
    //   {/* Sound and Timer */}
    //   <View className="absolute top-10 w-full flex-row justify-between px-4">
    //   <TouchableOpacity className=" px-4 py-2 rounded-full flex-row">
    //         <Image source={require("../assets/Images/close.png")} className='w-6 h-6 mx-2'/>
    //     </TouchableOpacity>
    //     <TouchableOpacity className="bg-gray-800 px-4 py-2.5 rounded-full flex-row">
    //         <Image source={require("../assets/Images/music-note.png")} className='w-5 h-5 mx-3'/>
    //       <Text className="text-white">Add sound</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity className="bg-gray-800 px-4 py-2.5 rounded-full">
    //       <Text className="text-white">15s</Text>
    //     </TouchableOpacity>
    //   </View>

    //   {/* Right side controls */}
    //   <View className="absolute right-4 top-32 rounded-b-full rounded-t-full py-6 px-3 bg-gray-800 space-y-7">
    //     <TouchableOpacity>
    //       <Image
    //         source={require('../assets/Images/sync.png')}
    //         className="w-7 h-7"
    //         color="white"
    //       />
    //     </TouchableOpacity>
    //     <TouchableOpacity>
    //       <Image
    //         source={require('../assets/Images/tachometer-fast.png')}
    //         className="w-7 h-7"
    //         color="white"
    //       />
    //     </TouchableOpacity>

    //     <TouchableOpacity>
    //       <Image
    //         source={require('../assets/Images/filter.png')}
    //         className="w-7 h-7"
    //         color="white"
    //       />
    //     </TouchableOpacity>

    //     <TouchableOpacity>
    //       <Image
    //         source={require('../assets/Images/three-oclock-alarm.png')}
    //         name="th-large"
    //         className="w-7 h-7"
    //         color="white"
    //       />
    //     </TouchableOpacity>

    //     <TouchableOpacity>
    //       <Image
    //         source={require('../assets/Images/down-arrow.png')}
    //         name="th-large"
    //         className="w-7 h-7"
    //         color="white"
    //       />
    //     </TouchableOpacity>
    //   </View>

    //   {/* Record Button */}
    //   <View className="absolute bottom-20 w-full flex-row justify-center ">
    //     {/* <TouchableOpacity className="w-16 h-16  rounded-lg border-4 border-white overflow-hidden object-cover">
    //         <Image source={require("../assets/Images/user.png")} className='w-full h-full object-cover'/>
    //     </TouchableOpacity> */}
    //     <TouchableOpacity className="w-16 h-16 bg-red-500 rounded-full border-4 border-white" />

    //   </View>

    //   {/* Bottom Menu */}
    //   <View className="absolute  bottom-4 w-full flex justify-center items-center ">
    //     <View className=" justify-center items-center flex-row gap-10">
    //       <TouchableOpacity className='bg-gray-200 px-4 py-2 rounded-full'>
    //         <Text className="text-gray-600 font-bold">Long Shorts</Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity className='bg-gray-200 px-4 py-2 rounded-full'>
    //         <Text className="text-gray-600 font-bold">Short Shorts</Text>
    //       </TouchableOpacity>
    //       {/* <TouchableOpacity className='bg-gray-200 px-4 py-2 rounded-full'>
    //         <Text className="text-gray-600 font-bold">Live</Text>
    //       </TouchableOpacity> */}
    //     </View>
    //   </View>
    // </View>

    <View className="flex-1 bg-gray-100 items-center justify-center">
      {activeTab === 'Long Shorts' ? (
        <View>
          <Text className="text-xl font-bold mb-4">Upload or Record long Shorts</Text>

          {/* Upload from Gallery */}
          <TouchableOpacity className="bg-[#441752] px-6 py-3 rounded-full mb-4 flex-row items-center">
            <Image
              source={require('../assets/Images/bell1.png')}
              className="w-6 h-6 mr-2"
            />
            <Text className="text-white">Upload from Gallery</Text>
          </TouchableOpacity>

          {/* Record New Video */}
          <TouchableOpacity className="bg-[#8174A0] px-6 py-3 rounded-full mb-4 flex-row items-center">
            <Image
              source={require('../assets/Images/camera.png')}
              className="w-6 h-6 mr-2"
            />
            <Text className="text-white">Record Video</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text className="text-xl font-bold mb-4">Upload or Record short Shorts</Text>

          {/* Upload from Gallery */}
          <TouchableOpacity className="bg-[#441752] px-6 py-3 rounded-full mb-4 flex-row items-center">
            <Image
              source={require('../assets/Images/bell1.png')}
              className="w-6 h-6 mr-2"
            />
            <Text className="text-white">Upload from Gallery</Text>
          </TouchableOpacity>

          {/* Record New Video */}
          <TouchableOpacity className="bg-[#8174A0] px-6 py-3 rounded-full mb-4 flex-row items-center">
            <Image
              source={require('../assets/Images/camera.png')}
              className="w-6 h-6 mr-2"
            />
            <Text className="text-white">Record Video</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom Tabs */}
      <View className="absolute bottom-4 w-full flex justify-center items-center ">
        <View className="flex-row gap-6">
          <TouchableOpacity
            className={`px-4 py-2 rounded-full ${
              activeTab === 'Long Shorts' ? 'bg-[#441752]' : 'bg-[#A888B5]'
            }`}
            onPress={() => setActiveTab('Long Shorts')}>
            <Text
              className={`${
                activeTab === 'Long Shorts' ? 'text-white' : 'text-white'
              } font-bold`}>
              Long Shorts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`px-4 py-2 rounded-full ${
              activeTab === 'Short Shorts' ? 'bg-[#441752]' : 'bg-[#A888B5]'
            }`}
            onPress={() => setActiveTab('Short Shorts')}>
            <Text
              className={`${
                activeTab === 'Short Shorts' ? 'text-white' : 'text-white'
              } font-bold`}>
              Short Shorts
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Add;
