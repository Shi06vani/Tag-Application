import React from "react";
import { View } from "react-native";
import Video from "react-native-video";
import { styled } from "nativewind";

const StyledView = styled(View);

const ShortsPlayer = ( videoUri) => {
    console.log(videoUri)
  return (
    <StyledView className="flex-1 bg-black justify-center items-center">
      <Video
        source={{ uri: videoUri }}
        className="w-full h-full"
        resizeMode="cover"
        controls={true}
        repeat
        fullscreen={true}
        muted={false}
      />
    </StyledView>
  );
};

export default ShortsPlayer;
