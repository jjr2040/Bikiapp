import { createStackNavigator } from "react-navigation";
import ProfileHomePage from "../../pages/profile/ProfileHome.page";
import Config from "react-native-config";

export default createStackNavigator({
  ProfileHome: ProfileHomePage
}, {
  defaultNavigationOptions: {
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: Config.COLOR_P3
    }
  }
})
