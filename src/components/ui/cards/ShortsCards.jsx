import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {styled} from 'nativewind';
// import LinearGradient from 'react-native-linear-gradient';
// import {Entypo} from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

const ShortsCard = ({image, title, views, onPress}) => {
  console.log('Image prop:', image);
  return (
    <StyledTouchableOpacity
      className="w-40 h-60 overflow-hidden  relative"
      onPress={onPress}>
      <Image
        source={require('../../../assets/Images/shortsimage.png')}
        className="w-full h-full"
      />

      <StyledView className="absolute bottom-3 left-3 right-3">
        <StyledText className="text-white font-bold text-sm" numberOfLines={2}>
          {title}
        </StyledText>
        <StyledText className="text-white font-medium text-xs mt-1">
          {views} views
        </StyledText>
      </StyledView>
      <StyledTouchableOpacity className="absolute top-2 right-2">
        <Image
          source={require('../../../assets/Images/more-vertical.png')}
          className="w-7 h-7"
        />
      </StyledTouchableOpacity>
    </StyledTouchableOpacity>
  );
};

export default ShortsCard;
