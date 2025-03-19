import React from "react";
import { View, Text, TouchableOpacity } from "react-native";


const Tags = ({ label, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      className={`px-4 py-2 rounded-full  border ${
        isSelected ? "bg-[#441752] border-[#8174A0]" : "bg-[#f9eaff] border-[#A888B5]"
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