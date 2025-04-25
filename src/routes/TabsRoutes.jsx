import Add from '../screens/Add';
import BrandListScreen from '../screens/BrandListScreen';
import BrandRequirementScreen from '../screens/BrandRequirementScreen';
import Home from '../screens/Home';
import Leaderboard from '../screens/Leaderboard';
import Shorts from '../screens/Shorts';
import UserProfile from '../screens/UserProfile';

export const TabsRoutes = [
  {
    name: 'Home',
    Component: Home,
    options: {headerShown: false},
  },
  {
    name: 'Shorts',
    Component: Shorts,
    options: {headerShown: false},
  },
  {
    name: 'Add',
    Component: Add,
    options: {headerShown: false, tabBarLabel: 'Add'},
  },
  {
    name: 'BrandRequirement',
    Component: BrandRequirementScreen,
    options: {headerShown: false},
  },
  {
    name: 'User',
    Component: UserProfile,
    options: {headerShown: false},
  },
];
