import { createStackNavigator } from "react-navigation";
import MapsHomePage from "../../pages/maps/MapsHome.page";
import SaveRoutePage from "../../pages/maps/SaveRoute.page";
import Config from "react-native-config";
import { BikeServiceForm } from "../../pages/bikiservices/BikeServiceForm.page";

export default createStackNavigator({
  MapHome: Config.BIKIAPP_AGENT != 'enterprise' ? MapsHomePage : BikeServiceForm,
  SaveRoute: SaveRoutePage
}, {
  defaultNavigationOptions: {
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: Config.COLOR_P3
    }
  }
})