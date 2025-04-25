// import React, {useState} from 'react';
// import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';

// const BrandRequirementForm = () => {
//   const [brandName, setBrandName] = useState('');
//   const [title, setTitle] = useState('');
//   const [details, setDetails] = useState('');
//   const [budget, setBudget] = useState('');

//   const handleSubmit = () => {
//     if (!brandName || !title || !details || !budget) {
//       Alert.alert('Error', 'All fields are required');
//       return;
//     }
//     Alert.alert('Success', 'Requirement posted successfully');
//   };

//   return (
//     <View className="flex-1 bg-purple-100 p-5">
//       <Text className="text-3xl font-bold text-center text-primary mb-4">
//         Post a Requirement
//       </Text>
//       <TextInput
//         className="w-full p-3 border border-purple-300 rounded-lg mb-4 text-lg bg-white"
//         placeholder="Brand Name"
//         value={brandName}
//         onChangeText={setBrandName}
//       />
//       <TextInput
//         className="w-full p-3 border border-purple-300 rounded-lg mb-4 text-lg bg-white"
//         placeholder="Requirement Title"
//         value={title}
//         onChangeText={setTitle}
//       />
//       <TextInput
//         className="w-full p-3 border border-purple-300 rounded-lg mb-4 text-lg bg-white text-start pt-3"
//         placeholder="Details"
//         value={details}
//         onChangeText={setDetails}
//         multiline
//         numberOfLines={6}
//       />
//       <TextInput
//         className="w-full p-3 border border-purple-300 rounded-lg mb-4 text-lg bg-white"
//         placeholder="Budget (e.g., $500 - $1000)"
//         value={budget}
//         onChangeText={setBudget}
//       />
//       <TouchableOpacity
//         onPress={handleSubmit}
//         className="bg-primary p-4 rounded-lg w-full items-center">
//         <Text className="text-white text-lg font-semibold">
//           Submit Requirement
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default BrandRequirementForm;


import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import BASE_URL from "../../config"

const BrandRequirementForm = () => {
  const [brandId, setBrandId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState('');
  const [totalNeed, setTotalNeed] = useState('');

  const handleSubmit = async () => {
    if (!brandId || !title || !description || !category || !budget || !totalNeed) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/api/requirements/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brandId,
          title,
          description,
          category,
          budget: Number(budget),
          totalNeed: Number(totalNeed),
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to post requirement');
      }
      
      Alert.alert('Success', 'Requirement posted successfully');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View className="flex-1 bg-purple-50 p-5">
      <Text className="text-2xl font-bold text-center text-primary mb-4">
        Post a Requirement
      </Text>
    
      <TextInput
        className="w-full p-3 border border-purple-300 rounded-lg mb-4 text-lg bg-white"
        placeholder="Requirement Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        className="w-full p-3 border border-purple-300 rounded-lg mb-4 text-lg bg-white text-start pt-3"
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={6}
      />
      <TextInput
        className="w-full p-3 border border-purple-300 rounded-lg mb-4 text-lg bg-white"
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        className="w-full p-3 border border-purple-300 rounded-lg mb-4 text-lg bg-white"
        placeholder="Budget (e.g., 500)"
        value={budget}
        onChangeText={setBudget}
        keyboardType="numeric"
      />
      <TextInput
        className="w-full p-3 border border-purple-300 rounded-lg mb-4 text-lg bg-white"
        placeholder="Total Need"
        value={totalNeed}
        onChangeText={setTotalNeed}
        keyboardType="numeric"
      />
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-primary p-4 rounded-lg w-full items-center">
        <Text className="text-white text-lg font-semibold">
          Submit Requirement
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BrandRequirementForm;
