import Home from "../screens/Home"
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
    name: "Shorts",
    Component: Shorts,
    options: { headerShown: false }

  },
  {
    name: "Add",
    Component: Shorts,
    options: { headerShown: false }

  },
  {
    name: "Subscription",
    Component: Subscription,
    options: { headerShown: false }

  },
  {
    name: "User",
    Component: UserProfile,
    options: { headerShown: false }
  },
]