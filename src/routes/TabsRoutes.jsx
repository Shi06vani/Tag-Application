import Add from "../screens/Add"
import BrandListScreen from "../screens/BrandListScreen"
import Home from "../screens/Home"
import Leaderboard from "../screens/Leaderboard"
import Shorts from "../screens/Shorts"
import Subscription from "../screens/Subscription"
import UserProfile from "../screens/UserProfile"

export const TabsRoutes = [
  {
    name: "Home",
    Component: Home,
    options: { headerShown: false }
  },
  {
    name: "Leaderboard",
    Component: Leaderboard,
    options: { headerShown: false  }

  },
  {
    name: "Add",
    Component: Add,
    options: { headerShown: false,tabBarLabel: 'Add' }

  },
  {
    name: "Brand",
    Component: BrandListScreen,
    options: { headerShown: false }

  },
  {
    name: "User",
    Component: UserProfile,
    options: { headerShown: false }
  },
]