import React from "react";
import { View, Text, TouchableOpacity } from "react-native";


const Tags = ({ label, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      className={`px-4 py-2 rounded-full  border ${
        isSelected ? "bg-[#3B3B3B] border-[#3B3B3B]" : "bg-[#ECECEC] border-gray-300"
      }`}
      onPress={onPress}
    >
      <Text className={`text-xs ${isSelected ? "text-white" : "text-[#000000]"}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};


export default Tags