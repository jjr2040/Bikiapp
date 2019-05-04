import { createStackNavigator } from "react-navigation";
import ExploreHomePage from "../../pages/explore/ExploreHome.page";
import Config from "react-native-config";

export default createStackNavigator({
  ExploreHome: ExploreHomePage
}, {
  defaultNavigationOptions: {
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: Config.COLOR_P3
    }
  }
})