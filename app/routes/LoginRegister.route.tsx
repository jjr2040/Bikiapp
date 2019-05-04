import { createStackNavigator } from 'react-navigation'
import RegisterFormScreen from '../pages/user/RegisterForm.page'
import LoginFormScreen from '../pages/user/LoginForm.page'
import VerifyCodeScreen from '../pages/user/VerifyCodeForm.page'
import Config from 'react-native-config';

const LoginRegisterStack = createStackNavigator({
  Register: {
    screen: RegisterFormScreen
  },
  Login: LoginFormScreen,
  VerifyCode: VerifyCodeScreen
}, {
  defaultNavigationOptions: {
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: Config.COLOR_P3
    }
  }
});

export default LoginRegisterStack
