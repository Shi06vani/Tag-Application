// import React, { useEffect, useState } from "react";
// import { 
//   View, 
//   Text, 
//   TouchableOpacity, 
//   TextInput, 
//   ActivityIndicator, 
//   Alert, 
//   Platform, 
//   PermissionsAndroid 
// } from "react-native";
// import Video from "react-native-video";
// import { launchImageLibrary } from "react-native-image-picker";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const ShortsVideoUploade = ({ handleUpload, navigation }) => {
//   const [shortVideo, setShortVideo] = useState(null); 
//   const [shortTitle, setShortTitle] = useState("");
//   const [shortDescription, setShortDescription] = useState(""); // Updated state name
//   const [shortCategory, setShortCategory] = useState(""); // Updated state name
//   const [isUploading, setIsUploading] = useState(false); // Updated state name

//   useEffect(() => {
//     const checkAuth = async () => {
//       const userToken = await AsyncStorage.getItem("token");
//       if (!userToken) {
//         navigation.replace("Login");
//       }
//     };
//     checkAuth();
//   }, []);

//   const requestPermission = async () => {
//     if (Platform.OS === "android") {
//       try {
//         if (parseInt(Platform.Version, 10) >= 33) {
//           const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO
//           );
//           return granted === PermissionsAndroid.RESULTS.GRANTED;
//         } else {
//           const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
//           );
//           return granted === PermissionsAndroid.RESULTS.GRANTED;
//         }
//       } catch (err) {
//         console.warn("Permission request error:", err);
//         return false;
//       }
//     }
//     return true;
//   };

//   const pickShortVideo = async () => {
//     const hasPermission = await requestPermission();
//     if (!hasPermission) {
//       Alert.alert("Permission Denied", "You need to grant permission to access media.");
//       return;
//     }

//     const options = {
//       mediaType: "video",
//       quality: 1,
//       includeBase64: false,
//     };

//     launchImageLibrary(options, (response) => {
//       if (response.didCancel) {
//         console.log("User cancelled video picker");
//       } else if (response.errorCode) {
//         console.error("Picker Error: ", response.errorMessage);
//         Alert.alert("Error", response.errorMessage || "Failed to select video");
//       } else if (response.assets && response.assets.length > 0) {
//         console.log("Video selected:", response.assets[0]);
//         setShortVideo(response.assets[0]);
//       } else {
//         console.log("No video selected");
//         Alert.alert("Error", "No video was selected");
//       }
//     });
//   };

//   return (
//     <View className="bg-purple-50 flex-1 p-4 mt-16 items-center max-h-full">
//       {/* Video Preview / Picker */}
//       <TouchableOpacity
//         className="w-full h-64 bg-gray-100 rounded-lg items-center justify-center"
//         onPress={pickShortVideo}
//       >
//         {shortVideo ? (
//           <View className="w-full h-64 bg-black rounded-lg">
//             <Video
//               source={{ uri: shortVideo.uri }}
//               style={{ width: "100%", height: "100%" }}
//               controls
//               resizeMode="contain"
//             />
//           </View>
//         ) : (
//           <Text className="text-black font-semibold">Select a Short Video</Text>
//         )}
//       </TouchableOpacity>

//       {/* Input Fields */}
//       <TextInput
//         className="w-full p-3 mt-4 bg-white rounded-lg"
//         placeholder="Title"
//         value={shortTitle}
//         onChangeText={setShortTitle}
//       />
//       <TextInput
//         className="w-full p-3 mt-4 bg-white rounded-lg"
//         placeholder="Description"
//         value={shortDescription}
//         onChangeText={setShortDescription}
//         multiline
//         numberOfLines={3}
//       />
//       <TextInput
//         className="w-full p-3 mt-4 bg-white rounded-lg"
//         placeholder="Category"
//         value={shortCategory}
//         onChangeText={setShortCategory}
//       />

//       {/* Upload Button */}
//       <TouchableOpacity
//         className={`mt-4 px-6 py-3 rounded-lg ${shortVideo ? "bg-primary" : "bg-accent"}`}
//         onPress={() => handleUpload(shortVideo, shortTitle, shortDescription, shortCategory)}
//         disabled={!shortVideo || isUploading}
//       >
//         {isUploading ? (
//           <ActivityIndicator color="white" />
//         ) : (
//           <Text className="text-white font-bold">Upload Video</Text>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default ShortsVideoUploade;


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
import { useNavigation } from "@react-navigation/native";

const ShortsVideoUploade = () => {
  const [shortsVideo, setShortsVideo] = useState(null);
  const [shortTitle, setShortTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [shortCategory, setShortCategory] = useState("");
  const [uploading, setUploading] = useState(false);

  
  return (
    <View className="bg-purple-50 flex-1 p-4 mt-16 items-center max-h-full">
          {shortsVideo ? (
            <View className="w-full h-64 bg-black rounded-lg">
              <Video
                source={{ uri: shortsVideo.uri }}
                style={{ width: "100%", height: "100%" }}
                controls
                resizeMode="contain"
              />
            </View>
          ) : (
            <TouchableOpacity
              className="w-full h-64 bg-gray-100 rounded-lg items-center justify-center"
            >
              <Text className="text-black font-semibold">Select a short Video</Text>
            </TouchableOpacity>
          )}
          <TextInput
            className="w-full p-3 mt-4 bg-white rounded-lg"
            placeholder="Title"
            value={shortTitle}
            onChangeText={setShortTitle}
          />
          <TextInput
            className="w-full p-3 mt-4 bg-white rounded-lg"
            placeholder="Description"
            value={shortDescription}
            onChangeText={setShortDescription}
            multiline
            numberOfLines={3}
          />
          <TextInput
            className="w-full p-3 mt-4 bg-white rounded-lg"
            placeholder="Category"
            value={shortCategory}
            onChangeText={setShortCategory}
          />
          <TouchableOpacity
            className={`mt-4 px-6 py-3 rounded-lg ${shortsVideo ? "bg-primary" : "bg-accent"}`}
            onPress={() => handleUpload("shorts")}
            disabled={!shortsVideo || uploading}
          >
            {uploading ? <ActivityIndicator color="white" /> : <Text className="text-white font-bold">Upload Video</Text>}
          </TouchableOpacity>
        </View>
  );
};

export default ShortsVideoUploade;
