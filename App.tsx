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
import ChatScreen from './src/screens/ChatScreen';
import Shorts from './src/screens/Shorts';
import Splash from './src/screens/Splash';
import BrandDetails from './src/components/brand/BrandDetails';
import UploadFromGallery from './src/components/UploadFromGallery';
import RecordVideo from './src/components/RecordVideo';
import FullScreenVideo from "./src/components/FullScreenVideo"
import ShortsPlayer from './src/components/ShortsPlayer';
import Following from './src/screens/Following';
import Followers from './src/screens/Follwers';
import UpdateProfileScreen from './src/screens/UpdateProfile';
import UserListing from './src/screens/UserListing';
import BrandFollowing from './src/components/brand/BrandFollowing';
import BrandFollowers from './src/components/brand/BrandFollowers';
import UserDetails from './src/components/UserDetails';
import UserProfileDetailpage from './src/components/UserProfileDetailpage';
import CategoryVideos from './src/components/CategoryVideos';
import UserVideos from './src/components/UserVideos';
import MyShorts from './src/components/MyShorts';

const Stack = createNativeStackNavigator();


function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" >

        <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />

        <Stack.Screen name="Login" component={LoginScreen} options={{ title:"Signup" }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Brands-list" component={BrandListScreen} />
        <Stack.Screen name="Brands-requirement" component={BrandRequirementScreen} />
        <Stack.Screen name="Your-requirement" component={BrandRequirementForm} />
        <Stack.Screen name="Leaderboard" component={Leaderboard} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Brand-details" component={BrandDetails} />
        <Stack.Screen name="UploadFromGallery" component={UploadFromGallery} />
        <Stack.Screen name="RecordVideo" component={RecordVideo} />
        <Stack.Screen name="FullScreenVideo" component={FullScreenVideo} />
        <Stack.Screen name="FullScreenShorts" component={ShortsPlayer} />
        <Stack.Screen name="Following" component={Following} />
        <Stack.Screen name="Followers" component={Followers} />

        <Stack.Screen name="Update-Profile" component={UpdateProfileScreen} />
        <Stack.Screen name="User-listing" component={UserListing} />
        <Stack.Screen name="Brand-following" component={BrandFollowing} />
        <Stack.Screen name="Brand-followers" component={BrandFollowers} />
        <Stack.Screen name="User-Details" component={UserDetails} />
        <Stack.Screen name="Profile-details" component={UserProfileDetailpage} />

        <Stack.Screen name="Category-videos" component={CategoryVideos} />

        <Stack.Screen name="My-Videos" component={UserVideos} />
        <Stack.Screen name="My-Shorts" component={MyShorts} />

        

        {/* <Stack.Screen name="Shorts" component={Shorts} options={{ headerShown: true, }}/> */}

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




