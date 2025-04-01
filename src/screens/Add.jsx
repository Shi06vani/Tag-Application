// import React, {useState} from 'react';
// import {View, Text, Button, TouchableOpacity, Image} from 'react-native';
// import {launchImageLibrary} from 'react-native-image-picker';
// import {useNavigation} from '@react-navigation/native';
// import UploadFromGallery from '../components/UploadFromGallery';

// const pickImage = () => {
//   let options = {
//     mediaType: 'photo',
//     quality: 1,
//   };

//   launchImageLibrary(options, response => {
//     if (response.didCancel) {
//       console.log('User cancelled image picker');
//     } else if (response.errorMessage) {
//       console.log('Error:', response.errorMessage);
//     } else {
//       setImage(response.assets[0].uri);
//     }
//   });
// };

// const Add = () => {
//   const [activeTab, setActiveTab] = useState('Short Shorts');

//   const [image, setImage] = useState(null);

//   const navigation = useNavigation();

//   return (
   

//     <View className="flex-1 bg-gray-100 items-center justify-center">
//       {activeTab === 'Long Shorts' ? (
//         <UploadFromGallery />
//       ) : (
//         <UploadFromGallery />
//       )}

//       <View className="absolute bottom-4 w-full flex justify-center items-center ">
//         <View className="flex-row gap-6">
//           <TouchableOpacity
//             className={`px-4 py-2 rounded-full ${
//               activeTab === 'Long Shorts' ? 'bg-[#441752]' : 'bg-[#A888B5]'
//             }`}
//             onPress={() => setActiveTab('Long Shorts')}>
//             <Text
//               className={`${
//                 activeTab === 'Long Shorts' ? 'text-white' : 'text-white'
//               } font-bold`}>
//               Long Shorts
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             className={`px-4 py-2 rounded-full ${
//               activeTab === 'Short Shorts' ? 'bg-[#441752]' : 'bg-[#A888B5]'
//             }`}
//             onPress={() => setActiveTab('Short Shorts')}>
//             <Text
//               className={`${
//                 activeTab === 'Short Shorts' ? 'text-white' : 'text-white'
//               } font-bold`}>
//               Short Shorts
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default Add;


// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
// import { launchImageLibrary } from "react-native-image-picker";
// import Video from "react-native-video";
// import BASE_URL from "../../config";

// const Add = () => {
//   const [activeTab, setActiveTab] = useState("Shorts");
//   const [videoUri, setVideoUri] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   const pickVideo = () => {
//     let options = {
//       mediaType: "video",
//       quality: 1,
//     };

//     launchImageLibrary(options, (response) => {
//       if (response.didCancel) {
//         Alert.alert("Cancelled", "You did not select any video.");
//       } else if (response.errorMessage) {
//         Alert.alert("Error", response.errorMessage);
//       } else {
//         setVideoUri(response.assets[0].uri);
//       }
//     });
//   };

//   const uploadVideo = async () => {
//     if (!videoUri) {
//       Alert.alert("No Video", "Please select a video before uploading.");
//       return;
//     }

//     setUploading(true);

//     const formData = new FormData();
//     formData.append("video", {
//       uri: videoUri,
//       type: "video/mp4",
//       name: "upload.mp4",
//     });

//     try {
//       const response = await fetch(`${BASE_URL}/api/upload-video`, {
//         method: "POST",
//         body: formData,
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       const result = await response.json();
//       setUploading(false);

//       if (response.ok) {
//         Alert.alert("Success", "Video uploaded successfully!");
//         setVideoUri(null);
//       } else {
//         Alert.alert("Upload Failed", result.message || "Try again later.");
//       }
//     } catch (error) {
//       setUploading(false);
//       Alert.alert("Error", "Failed to upload video.");
//     }
//   };

//   return (
//     <View className="flex-1 bg-gray-100 items-center justify-center p-4">
//       {/* Video Preview */}
//       {videoUri ? (
//         <View className="w-full h-64 bg-black rounded-lg">
//           <Video
//             source={{ uri: videoUri }}
//             style={{ width: "100%", height: "100%" }}
//             controls
//           />
//         </View>
//       ) : (
//         <TouchableOpacity
//           className="w-full h-64 bg-gray-300 rounded-lg items-center justify-center"
//           onPress={pickVideo}
//         >
//           <Text className="text-black font-semibold">Select a Video</Text>
//         </TouchableOpacity>
//       )}

//       {/* Upload Button */}
//       <TouchableOpacity
//         className={`mt-4 px-6 py-3 rounded-lg ${videoUri ? "bg-blue-600" : "bg-gray-400"}`}
//         onPress={uploadVideo}
//         disabled={!videoUri || uploading}
//       >
//         {uploading ? <ActivityIndicator color="white" /> : <Text className="text-white font-bold">Upload Video</Text>}
//       </TouchableOpacity>

//       {/* Tab Switching */}
//       <View className="absolute bottom-4 w-full flex justify-center items-center">
//         <View className="flex-row gap-6">
//           <TouchableOpacity
//             className={`px-4 py-2 rounded-full ${activeTab === "Long Shorts" ? "bg-[#441752]" : "bg-[#A888B5]"}`}
//             onPress={() => setActiveTab("Long Shorts")}
//           >
//             <Text className="text-white font-bold">Long Shorts</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             className={`px-4 py-2 rounded-full ${activeTab === "Shorts" ? "bg-[#441752]" : "bg-[#A888B5]"}`}
//             onPress={() => setActiveTab("Shorts")}
//           >
//             <Text className="text-white font-bold">Shorts</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default Add;




import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  PermissionsAndroid,
  Alert,
  Platform,
  ScrollView
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Video from "react-native-video";
import BASE_URL from "../../config";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Add = () => {
  const [activeTab, setActiveTab] = useState("Long Shorts");
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const storedId = await AsyncStorage.getItem("loginuser_id");
      setUserId(storedId);
    };

    fetchUserId();
  }, []);

  
  // Request permissions for Android
  const requestPermission = async () => {
    if (Platform.OS === "android") {
      try {
        if (parseInt(Platform.Version, 10) >= 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } else {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
      } catch (err) {
        console.warn("Permission request error:", err);
        return false;
      }
    }
    return true; 
  };

  const pickVideo = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      Alert.alert("Permission Denied", "You need to grant permission to access media.");
      return;
    }

    const options = {
      mediaType: "video",
      quality: 1,
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled video picker");
      } else if (response.errorCode) {
        console.error("Picker Error: ", response.errorMessage);
        Alert.alert("Error", response.errorMessage || "Failed to select video");
      } else if (response.assets && response.assets.length > 0) {
        console.log("Video selected:", response.assets[0]);
        setVideoFile(response.assets[0]);
      } else {
        console.log("No video selected");
        Alert.alert("Error", "No video was selected");
      }
    });
  };






  const handleUpload = async (type) => {
    console.log("type",type)
    if (!videoFile) {
      Alert.alert("No Video", "Please select a video to upload.");
      return;
    }
    if (!title || !description || !category) {
      Alert.alert("Missing Details", "Please fill in all fields.");
      return;
    }

    setUploading(true);

    // const userId = await AsyncStorage.getItem("loginuser_id");
    
    if (!userId) {
      Alert.alert("Error", "User ID not found. Please log in again.");
      setUploading(false);
      return;
    }


    const formData = new FormData();



    formData.append("videoFile", {
      uri: videoFile.uri,
      type: videoFile.type || "video/mp4",
      name: videoFile.fileName || "upload.mp4",
    });
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("type",type);
    formData.append("creatorId", userId);

    try {
      const response = await fetch(`${BASE_URL}/videos/post/creator`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploading(false);
      const responseData = await response.json();

      if (response.ok) {
        Alert.alert("Success", responseData.message || "Video uploaded successfully!");
        setVideoFile(null);
        setTitle("");
        setDescription("");
        setCategory("");
      } else {
        Alert.alert("Upload Failed", responseData.message || "Please try again later.");
      }
    } catch (error) {
      setUploading(false);
      console.error("Error uploading video:", error);
      Alert.alert("Upload Failed", "Please try again later.");
    }
  };

  return (
    <View className="flex-1">

      {
        activeTab==="Long Shorts" && (

          <View  className=" bg-purple-50  flex-1 p-4 mt-16 items-center max-h-full">
          {videoFile ? (
            <View className="w-full h-64 bg-black rounded-lg">
              <Video
                source={{ uri: videoFile.uri }}
                style={{ width: "100%", height: "100%" }}
                controls
                resizeMode="contain"
              />
            </View>
          ) : (
            <TouchableOpacity
              className="w-full h-64 border border-slate-100 bg-gray-100 rounded-lg items-center justify-center shadow-2xl"
              onPress={pickVideo}
            >
              <Text className="text-black font-semibold">Select a Video</Text>
            </TouchableOpacity>
          )}
    
          <TextInput
            className="w-full p-3 mt-4 bg-white rounded-lg"
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            className="w-full p-3 mt-4 bg-white rounded-lg"
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
          />
          <TextInput
            className="w-full p-3 mt-4 bg-white rounded-lg"
            placeholder="Category"
            value={category}
            onChangeText={setCategory}
          />
    
          <TouchableOpacity
            className={`mt-4 px-6 py-3 rounded-lg ${videoFile ? "bg-primary" : "bg-accent"}`}
            onPress={()=>handleUpload("shorts")}
            disabled={!videoFile || uploading}
          >
            {uploading ? <ActivityIndicator color="white" /> : <Text className="text-white font-bold">Upload Video</Text>}
          </TouchableOpacity>
          </View>

        )
      }

      {
        activeTab === "Shorts" && (
          <View  className=" bg-purple-50  flex-1 p-4 mt-16 items-center max-h-full">
          {videoFile ? (
            <View className="w-full h-64 bg-black rounded-lg">
              <Video
                source={{ uri: videoFile.uri }}
                style={{ width: "100%", height: "100%" }}
                controls
                resizeMode="contain"
              />
            </View>
          ) : (
            <TouchableOpacity
              className="w-full h-64 bg-gray-100 rounded-lg items-center justify-center"
              onPress={pickVideo}
            >
              <Text className="text-black font-semibold">Select a short Video</Text>
            </TouchableOpacity>
          )}
    
          <TextInput
            className="w-full p-3 mt-4 bg-white rounded-lg"
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            className="w-full p-3 mt-4 bg-white rounded-lg"
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
          />
          <TextInput
            className="w-full p-3 mt-4 bg-white rounded-lg"
            placeholder="Category"
            value={category}
            onChangeText={setCategory}
          />
    
          <TouchableOpacity
            className={`mt-4 px-6 py-3 rounded-lg ${videoFile ? "bg-primary" : "bg-accent"}`}
            onPress={()=>handleUpload("video")}
            disabled={!videoFile || uploading}
          >
            {uploading ? <ActivityIndicator color="white" /> : <Text className="text-white font-bold">Upload Video</Text>}
          </TouchableOpacity>
          </View>
        )
      }
      
   
    

      <View className="absolute bottom-4 w-full flex justify-center items-center">
        <View className="flex-row gap-6">
          <TouchableOpacity
            className={`px-4  py-2 rounded-full ${activeTab === "Long Shorts" ? "bg-[#441752]" : "bg-[#A888B5]"}`}
            onPress={() => setActiveTab("Long Shorts")}
          >
            <Text className="text-white font-bold">Long Shorts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`px-4 py-2 rounded-full ${activeTab === "Shorts" ? "bg-[#441752]" : "bg-[#A888B5]"}`}
            onPress={() => setActiveTab("Shorts")}
          >
            <Text className="text-white font-bold">Short Shorts</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
};

export default Add;

