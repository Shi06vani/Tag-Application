    import { View } from "react-native";
    import Video from "react-native-video";

    const FullScreenVideo = ({ route }) => {
        const { videoUri } = route.params;

        console.log(videoUri)
        
        return (
          <View className="flex-1 bg-black justify-center">
            <Video
              source={{ uri: videoUri }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
              controls
            />
          </View>
        );
      };

      export default FullScreenVideo
    