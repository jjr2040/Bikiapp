import { createBottomTabNavigator } from "react-navigation";
import ExploreScreenRoute from "./tabs/ExploreScreen.route";
import MapScreenRoute from "./tabs/MapScreen.route";
import ProfileScreenRoute from "./tabs/ProfileScreen.route";
import { Icon } from "native-base";
import React from "react";
import Config from "react-native-config";

export default createBottomTabNavigator({
  Explore: ExploreScreenRoute,
  Map: MapScreenRoute,
  Profile: ProfileScreenRoute
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName: string = '';

      if (routeName == 'Explore') {
        iconName = 'globe';
      } else if ( routeName === 'Map' ) {
        iconName = 'map';
      } else if ( routeName == 'Profile') {
        iconName = 'user';
      }

      return <Icon type="FontAwesome" name={iconName} style={{ color: tintColor }} />
    }
  }),
  tabBarOptions: {
    activeTintColor: Config.COLOR_S0,
    inactiveTintColor: Config.COLOR_S4,
  }
})