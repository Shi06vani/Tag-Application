/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Text, View } from 'react-native';
import TabNavigator from './src/components/navigation/TabNavigator';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import BrandListScreen from './src/screens/BrandListScreen';
import BrandRequirementScreen from './src/screens/BrandRequirementScreen';
import BrandRequirementForm from './src/screens/BrandRequirementForm';
import Leaderboard from './src/screens/Leaderboard';
import Shorts from './src/screens/Shorts';


const Stack = createNativeStackNavigator();


function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup">
        <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={() => <View><Text>hdgfhg</Text></View>} />

        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Brands-list" component={BrandListScreen} />
        <Stack.Screen name="Brands-requirement" component={BrandRequirementScreen} />
        <Stack.Screen name="Your-requirement" component={BrandRequirementForm} />
        <Stack.Screen name="Leaderboard" component={Leaderboard} />
        <Stack.Screen name="Shorts" component={Shorts} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;





























































// const MainScreen = ({ activeTab }: any) => {
//   switch (activeTab) {
//     case "Home":
//       return <Home />;
//     case "Shorts":
//       return <Shorts />;
//     case "Subscription":
//       return <Subscription />;
//     case "User":
//       return <UserProfile />;
//     default:
//       return <Home />;
//   }
// };




// <NavigationContainer>
// <Header/>
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Main">
//         {() => <MainScreen activeTab={activeTab} />}
//       </Stack.Screen>
//       <Stack.Screen name="DailyDevotion" component={() => <View><Text>Hello</Text></View>} />

//     </Stack.Navigator>
//     <FooterTabs  navigation={{ navigate: setActiveTab }} />

// </NavigationContainer>






// <NavigationContainer>
//   <Stack.Navigator initialRouteName="Home">

//     {TabsRoutes.map((tabs, index) =>
//       <Stack.Screen
//         key={index}
//         name={tabs.name}
//         component={tabs.Component}
//         options={tabs.options}

//       />
//     )
//     }

//   </Stack.Navigator>
//   <FooterTabs navigation={navigation} />

// </NavigationContainer>




