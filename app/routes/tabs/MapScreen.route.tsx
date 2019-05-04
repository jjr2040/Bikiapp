import { createStackNavigator } from "react-navigation";
import MapsHomePage from "../../pages/maps/MapsHome.page";
import SaveRoutePage from "../../pages/maps/SaveRoute.page";
import Config from "react-native-config";

export default createStackNavigator({
  MapHome: MapsHomePage,
  SaveRoute: SaveRoutePage
}, {
  defaultNavigationOptions: {
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: Config.COLOR_P3
    }
  }
})