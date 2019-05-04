import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { setCurrentUser } from '../../redux/user/actions'
import { User } from '../../redux/user/types';
import { Container, Content, Form, Label, Input, Item, Button, Text } from 'native-base';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { verifyUser } from '../../utils/api/UserApi'

export interface VerifyCodeFormProps {
  currentUser?: User;
  setCurrentUser: (user: User) => void;
  navigation: NavigationScreenProp<NavigationState>;
}

interface VerifyCodeFormState {
  code: string;
  loading: boolean;
  errorMessage?: string;
  isCodeValid: boolean;
  codeError: boolean;
  email: string;
} 

export class VerifyCodeForm extends Component<VerifyCodeFormProps, VerifyCodeFormState> {

  static navigationOptions = {
      title: 'Verifica el código'
  }

  constructor(props: VerifyCodeFormProps) {
    super(props);
    this.state = {
      code: '',
      loading: false,
      isCodeValid: false,
      codeError: false,
      email: props.navigation.getParam('email', '')
    };
  }

  verifyUser() {
    if ( this.state.isCodeValid ) {
      const { currentUser, setCurrentUser, navigation } = this.props;
      const { email, code} = this.state;
      this.setState({loading: true});
      verifyUser(email, code).then( res => {
        currentUser!.email_verified = true
        setCurrentUser(currentUser!);
        this.setState({loading: false});
        navigation.dismiss();
      }).catch( error => {
        this.setState({
          loading: false,
          errorMessage: error.response.data.Error
        })
      });
    } else {
      this.setState({
        codeError: true
      });
    }
  }

  onCodeChanged(text: string) {
    const isCodeValid = text.length > 0;
    this.setState({
      code: text,
      isCodeValid: isCodeValid,
      codeError: !isCodeValid
    });
  }

  showVerifyButton() {
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator size={'small'}/>
        </View>
      );
    }

    return (
      <Button primary block onPress={this.verifyUser.bind(this)}>
        <Text>Verificar</Text>
      </Button>
    );
  }

  render() {
    return (
      <Container>
        <Content style={{ paddingLeft: 10, paddingRight: 10 }}>
          <Form>
            <Item floatingLabel error={this.state.codeError}>
              <Label>Código de verificación</Label>
              <Input onChangeText={ this.onCodeChanged.bind(this) }/>
            </Item>
            {this.showVerifyButton()}
          </Form>
        </Content>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyCodeForm)
