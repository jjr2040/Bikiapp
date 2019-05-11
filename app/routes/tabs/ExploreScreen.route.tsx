import { createStackNavigator } from "react-navigation";
import ExploreHomePage from "../../pages/explore/ExploreHome.page";
import Config from "react-native-config";
import ServiceListPage from "../../pages/explore/ServiceList.page";

export default createStackNavigator({
  ExploreHome: Config.BIKIAPP_AGENT != 'enterprise' ? ExploreHomePage : ServiceListPage
}, {
  defaultNavigationOptions: {
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: Config.COLOR_P3
    }
  }
})