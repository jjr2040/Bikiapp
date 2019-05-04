import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { User, NetworkError } from '../../redux/user/types';
import { Container, Content, Form, Item, Label, Input, Button, Text, Footer } from 'native-base';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { loginUser } from '../../utils/api/UserApi';
import { setCurrentUser } from '../../redux/user/actions'

export interface LoginFormProps {
  currentUser?: User;
  setCurrentUser: (user: User) => void;
  navigation: NavigationScreenProp<NavigationState>;
}

interface LoginFormState {
  email: string;
  password: string;
  loading: boolean;
  errorMessage?: string;
}

export class LoginForm extends Component<LoginFormProps, LoginFormState> {

  static navigationOptions = {
      title: 'Inicia sesión'
  }

  constructor(props: LoginFormProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      errorMessage: undefined
    }; 
  }

  onEmailValueChanged = (text: string) => {
    const validEmail = text.length > 0
    this.setState({
      email: text
    });
  }

  onPasswordValueChanged = (text: string) => {
    const validPassword = text.length > 0
    this.setState({
      password: text
    });
  }

  loginUser() {
    const { navigation } = this.props;
    const { email, password } = this.state;
    this.setState({loading: true});
    loginUser(email, password).then( res => {
      this.props.setCurrentUser(res.data.user);
      this.setState({loading: false});
      navigation.dismiss();
    }).catch( error => {

      if (error.response.data.Code == 'UserNotConfirmedException') {
        navigation.navigate('VerifyCode', { email: this.state.email });
      } else {
        this.setState({
          errorMessage: error.response.data.Error
        });
      }
      this.setState({loading: false});
    });
  }

  showLoginButton() {
    if (this.state.loading) {
      return (
        <View style={{ marginTop: 20, marginBottom: 20 }} >
          <ActivityIndicator size={'small'}/>
        </View>
      );
    }

    return (
      <Button primary full onPress={this.loginUser.bind(this)}>
        <Text>Iniciar sesión</Text>
      </Button>
    );
  }

  showError() {
    if (this.state.errorMessage) {
      return ( 
        <View style={{ flex: 1, alignContent: 'center', alignItems: 'center'}} >
          <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>
        </View> 
      );
    }
  }

  render() {
    return (
      <Container>
        <Content style={{ paddingLeft: 10, paddingRight: 10 }}>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input 
                keyboardType={'email-address'} 
                autoCapitalize={'none'} 
                onChangeText={this.onEmailValueChanged.bind((this))}/>
            </Item>
            <Item floatingLabel>
              <Label>Contraseña</Label>
              <Input secureTextEntry onChangeText={this.onPasswordValueChanged.bind(this)} />
            </Item>
          </Form>
        </Content>
        <Footer>
          {this.showError()}
          {this.showLoginButton()}
        </Footer>
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  currentUser: state.user.currentUser
})

const mapDispatchToProps = {
  setCurrentUser
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
