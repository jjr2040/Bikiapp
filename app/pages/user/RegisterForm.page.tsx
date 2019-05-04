import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { User, NetworkError } from '../../redux/user/types'
import { NavigationState, NavigationScreenProp } from 'react-navigation'
import { Form, Item, Label, Input, Button, Text, Container, Content, Picker, Icon } from 'native-base'
import { registerUser } from '../../utils/api/UserApi'
import { setCurrentUser } from '../../redux/user/actions'
import Config from 'react-native-config';

interface RegisterFormProps {
  setCurrentUser: (user: User) => void;
  navigation: NavigationScreenProp<NavigationState>;
  currentUser?: User;
}

interface RegisterFormState {
  city?: string;
  organizationName?: string;
  nit?: string;
  email: string;
  password: string;
  errorMessage?: string;
  loading: boolean;
  validEmail: boolean;
  validPassword: boolean;
  showEmailError: boolean;
  showPasswordError: boolean;
}

export class RegisterForm extends Component<RegisterFormProps, RegisterFormState> {

  static navigationOptions = {
    title: 'Bienvenido'
  }

  constructor(props: RegisterFormProps) {
    super(props);
    this.state = {
      city: '',
      email: '',
      password: '',
      errorMessage: undefined,
      loading: false,
      validEmail: false,
      validPassword: false,
      showEmailError: false,
      showPasswordError: false
    };
  }

  onCityValueChanged(value: string) {
    this.setState({
      city: value
    });
  }

  onNitValueChanged(value: string) {
    this.setState({nit: value});
  }

  onOrganizationNameChanged(value: string) {
    this.setState({organizationName: value});
  }

  onEmailValueChanged = (text: string) => {
    const validEmail = text.length > 0
    this.setState({
      email: text,
      validEmail: validEmail,
      showEmailError: !validEmail
    });
  }

  onPasswordValueChanged = (text: string) => {
    const validPassword = text.length > 0
    this.setState({
      password: text,
      validPassword: validPassword,
      showPasswordError: !validPassword
    });
  } 

  goToLogin() {
    this.props.navigation.navigate('Login');
  }

  register() {
    const { validEmail, validPassword } = this.state;
    if ( validEmail && validPassword ) {
      const { email, password, city, nit, organizationName } = this.state;

      const user: User = {
        email: email,
        city: city,
        password: password,
        email_verified: false,
        nit: nit,
        name: organizationName
      };

      this.setState({loading: true});
      registerUser(user).then( () => {
        this.props.setCurrentUser(user);
        this.setState({loading: false});
        this.props.navigation.navigate('VerifyCode', { email: this.state.email });
      }).catch( error => {
        this.setState({
          errorMessage: error.response.data.Error,
          loading: false 
        });
      });
    } else {
      this.setState({
        showEmailError: true,
        showPasswordError: true
      });
    }
  }

  showRegisterButton() {
    if (this.state.loading) {
      return (
        <View style={{ marginTop: 20, marginBottom: 20 }} >
          <ActivityIndicator size={'small'}/>
        </View>
      );
    }

    return (
      <Button primary block onPress={this.register.bind(this)} style={{ marginTop: 20, marginBottom: 20 }}>
        <Text>Registrarse</Text>
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

  renderCityExtraFields() {
    return (
      <Item style={{paddingTop: 30}}>
        <Label>Ciudad</Label>
        <Picker 
            mode='dropdown'
            placeholder='Selecciona tu ciudad'
            iosHeader='Selecciona tu ciudad'
            iosIcon={<Icon name='arrow-down' />}
            style={{ width: undefined }}
            selectedValue={this.state.city}
            onValueChange={this.onCityValueChanged.bind(this)}>
              <Picker.Item label='Bogotá' value='bogota' />
              <Picker.Item label='Cali' value='cali' />
          </Picker>
      </Item>
    );
  }

  renderEnterpriseExtraFields() {
    return (
      <View>
          <Item floatingLabel>
          <Label>Nit</Label>
          <Input onChangeText={ this.onNitValueChanged.bind(this) } />
        </Item>
        <Item floatingLabel>
          <Label>Empresa</Label>
          <Input onChangeText={ this.onOrganizationNameChanged.bind(this) } />
        </Item>
      </View>
    );
  }

  renderExtraFields() {
    const agent = Config.BIKIAPP_AGENT;
    if ( agent === 'city') {
      return this.renderCityExtraFields();
    } else if ( agent === 'enterprise' ) {
      return this.renderEnterpriseExtraFields();
    }
  }

  render() {
    return (
      <Container>
        <Content style={{ paddingLeft: 10, paddingRight: 10 }}>
          <Form style={{ marginBottom: 20 }}>
            <Item floatingLabel error={this.state.showEmailError} >
              <Label>Email</Label>
              <Input keyboardType='email-address' autoCapitalize={'none'} onChangeText={ this.onEmailValueChanged.bind(this) }/>
            </Item>
            <Item floatingLabel error={this.state.showPasswordError}>
              <Label>Contraseña</Label>
              <Input secureTextEntry onChangeText={ this.onPasswordValueChanged.bind(this) }/>
            </Item>
            { this.renderExtraFields() }
            {this.showError()}
            {this.showRegisterButton()}
          </Form>
          <View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
            <Text>ó</Text>
            <Text style={{ marginTop: 10, marginBottom: 20 }}>¿Ya tienes cuenta?</Text>
            <Button primary block onPress={this.goToLogin.bind(this)}><Text>Iniciar sesión</Text></Button>
          </View>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    currentUser: state.user.currentUser
  }
}

const mapDispatchToProps = {
  setCurrentUser
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
