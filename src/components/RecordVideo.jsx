// // import React, { useRef, useState } from "react";
// // import { View, TouchableOpacity } from "react-native";
// // import { RNCamera } from "react-native-camera";

// // const RecordVideo = ({ navigation }) => {
// //   const cameraRef = useRef(null);
// //   const [isRecording, setIsRecording] = useState(false);

// //   const startRecording = async () => {
// //     if (cameraRef.current && !isRecording) {
// //       setIsRecording(true);
// //       try {
// //         const data = await cameraRef.current.recordAsync();
// //         console.log("Video Path:", data.uri);
// //       } catch (error) {
// //         console.error(error);
// //       }
// //       setIsRecording(false);
// //     }
// //   };

// //   const stopRecording = () => {
// //     if (cameraRef.current && isRecording) {
// //       cameraRef.current.stopRecording();
// //     }
// //   };

// //   return (
// //     <View className="flex-1 bg-black">
// //       <RNCamera ref={cameraRef} className="flex-1" type={RNCamera.Constants.Type.back} captureAudio={true} />

// //       <View className="absolute bottom-10 self-center">
// //         <TouchableOpacity className={`w-16 h-16 rounded-full ${isRecording ? "bg-red-800" : "bg-red-500"}`} 
// //           onPress={isRecording ? stopRecording : startRecording} 
// //         />
// //       </View>
// //     </View>
// //   );
// // };

// // export default RecordVideo;


// import React, { useRef, useState, useEffect } from "react";
// import { View, TouchableOpacity, Text } from "react-native";
// import { Camera, useCameraDevices } from "react-native-vision-camera";
// import { PermissionsAndroid, Platform } from 'react-native';
// const RecordVideo = ({ navigation }) => {
//   const cameraRef = useRef(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const devices = useCameraDevices();
//   const device = devices.back;

//   useEffect(() => {
//     const checkPermissions = async () => {
//       const cameraPermission = await Camera.requestCameraPermission();
//       const micPermission = await Camera.requestMicrophonePermission();

//       if (cameraPermission !== "authorized" || micPermission !== "authorized") {
//         console.warn("Permissions not granted");
//       }
//     };

//     checkPermissions();
//   }, []);

//   const startRecording = async () => {
//     if (!cameraRef.current || !device) return;

//     setIsRecording(true);
//     try {
//       const video = await cameraRef.current.startRecording({
//         flash: "off",
//         onRecordingFinished: (video) => {
//           console.log("Video Path:", video.path);
//           setIsRecording(false);
//         },
//         onRecordingError: (error) => {
//           console.error(error);
//           setIsRecording(false);
//         },
//       });
//     } catch (error) {
//       console.error(error);
//       setIsRecording(false);
//     }
//   };

//   const stopRecording = () => {
//     if (cameraRef.current && isRecording) {
//       cameraRef.current.stopRecording();
//     }
//   };

//   if (!device) return <Text className="text-white text-center">No Camera Found</Text>;

//   return (
//     <View className="flex-1 bg-black">
//       <Camera ref={cameraRef} style={{ flex: 1 }} device={device} isActive={true} video={true} audio={true} />

//       <View className="absolute bottom-10 self-center">
//         <TouchableOpacity
//           className={`w-16 h-16 rounded-full ${isRecording ? "bg-red-800" : "bg-red-500"}`}
//           onPress={isRecording ? stopRecording : startRecording}
//         />
//       </View>
//     </View>
//   );
// };

// export default RecordVideo;



import React, { useRef, useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Alert, ActivityIndicator } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";

const RecordVideo = ({ navigation }) => {
  const cameraRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [loading, setLoading] = useState(true);

  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    const checkPermissions = async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      const micPermission = await Camera.requestMicrophonePermission();

      if (cameraPermission === "authorized" && micPermission === "authorized") {
        setPermissionsGranted(true);
      } else {
        Alert.alert("Permissions Required", "Camera & Microphone permissions are needed to record a video.");
      }
      setLoading(false);
    };

    checkPermissions();
  }, []);

  const startRecording = async () => {
    if (!cameraRef.current || !device || !permissionsGranted) return;

    setIsRecording(true);
    try {
      cameraRef.current.startRecording({
        flash: "off",
        onRecordingFinished: (video) => handleRecordingFinished(video),
        onRecordingError: (error) => handleRecordingError(error),
      });
    } catch (error) {
      handleRecordingError(error);
    }
  };

  const stopRecording = () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
    }
  };

  const handleRecordingFinished = (video) => {
    console.log("Video Path:", video.path);
    setIsRecording(false);
  };

  const handleRecordingError = (error) => {
    console.error("Recording Error:", error);
    Alert.alert("Recording Error", "Something went wrong while recording.");
    setIsRecording(false);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "black" }}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={{ color: "white", marginTop: 10 }}>Checking permissions...</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "black" }}>
        <Text style={{ color: "white" }}>No Camera Found</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Camera
        ref={cameraRef}
        style={{ flex: 1 }}
        device={device}
        isActive={true}
        video={true}
        audio={true}
      />

      <View style={{ position: "absolute", bottom: 50, alignSelf: "center" }}>
        <TouchableOpacity
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: isRecording ? "#ff3333" : "#ff0000",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={isRecording ? stopRecording : startRecording}
          disabled={!permissionsGranted}
        />
      </View>
    </View>
  );
};

export default RecordVideo;
