export default jest.mock('react-navigation', () => {
  return {
      createAppContainer: jest.fn().mockReturnValue(function NavigationContainer() {return null;}),
      createDrawerNavigator: jest.fn(),
      createBottomTabNavigator: jest.fn(),
      createMaterialTopTabNavigator: jest.fn(),
      createStackNavigator: jest.fn(),
      StackActions: {
          push: jest.fn().mockImplementation(x => ({...x,  "type": "Navigation/PUSH"})),
          replace: jest.fn().mockImplementation(x => ({...x,  "type": "Navigation/REPLACE"})),
      },
      NavigationActions: {
          navigate: jest.fn().mockImplementation(x => x),
          getParam: jest.fn().mockReturnValue('')
      }
  }
});