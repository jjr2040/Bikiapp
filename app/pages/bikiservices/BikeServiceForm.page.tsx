import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { BikeService } from '../../redux/bike-services/types';
import { Text, Button, Container, Content, Form, H1, Item, Label, Input, Footer, FooterTab, Toast } from 'native-base';
import { createBikeService } from '../../utils/api/BikeServicesApi';

interface BikeServiceFormProps {
  navigation: NavigationScreenProp<NavigationState>;
}

interface BikeServiceFormState {
  service: BikeService;
  errorMessage?: string;
  loading: boolean;
}

export class BikeServiceForm extends Component<BikeServiceFormProps, BikeServiceFormState> {

  static navigationOptions = {
    title: 'Crea un nuevo servicio'
  }

  state = {
    loading: false,
    service: {
      phone: '',
      address: '',
      description: '',
      type: '',
      name: '',
      price: 0
    },
    errorMessage: undefined
  }

  renderError() {
    if (this.state.errorMessage) {
      return ( 
        <View style={{ flex: 1, alignContent: 'center', alignItems: 'center'}} >
          <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>
        </View> 
      );
    }
  }

  saveService() {
    const { service } = this.state;
    
    this.setState({loading: true});

    createBikeService(service).then( (res: any) => {
      const newService: BikeService = {
        phone: '',
        address: '',
        description: '',
        type: '',
        name: '',
        price: 0
      };
      this.setState({loading: false, service: newService});
      Toast.show({
        text: 'Servicio creado',
        buttonText: 'Ok',
        duration: 2000
      });
    }).catch( (error: any) => {
      this.setState({errorMessage: error.response.data.Error});
      this.setState({loading: false});
    });
  }

  saveButton() {

    if (this.state.loading) {
      return (
        <View style={styles.fill} ><ActivityIndicator size={'small'} /></View>
      );
    }

    return (
      <Button full primary onPress={this.saveService.bind(this)}>
        <Text style={{color: 'white'}}>Guardar</Text>
      </Button>
    );
  }

  render() {
    return (
      <Container>
        <Content padder>
          <Form>
            {this.renderError()}
            <Item floatingLabel>
              <Label>Nombre</Label>
              <Input value={this.state.service.name} 
                onChangeText={ text => {  
                  let service = this.state.service;
                  service.name = text;
                  this.setState({service: service});
                }} />
            </Item>
            <Item floatingLabel>
              <Label>Teléfono</Label>
              <Input value={this.state.service.phone}  onChangeText={ text => {  
                let service = this.state.service;
                service.phone = text;
                this.setState({service: service});
              }} />
            </Item>
            <Item floatingLabel>
              <Label>Descripción</Label>
              <Input value={this.state.service.description}  onChangeText={ text => {  
                let service = this.state.service;
                service.description = text;
                this.setState({service: service});
              }} />
            </Item>
            <Item floatingLabel>
              <Label>Tipo</Label>
              <Input value={this.state.service.type} onChangeText={ text => {  
                let service = this.state.service;
                service.type = text;
                this.setState({service: service});
              }} />
            </Item>
            <Item floatingLabel>
              <Label>Dirección</Label>
              <Input value={this.state.service.address} onChangeText={ text => {  
                let service = this.state.service;
                service.address = text;
                this.setState({service: service});
              }} />
            </Item>
            <Item floatingLabel>
              <Label>Precio</Label>
              <Input value={ '' + this.state.service.price} onChangeText={ text => {  
                let service = this.state.service;
                service.price = text == '' ? 0 : parseFloat(text);
                this.setState({service: service});
              }} />
            </Item>
          </Form>
        </Content>
        <Footer>
          <FooterTab>
            {this.saveButton()}
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mainButton: {
    color: 'white'
  },
  fill: {
    ...StyleSheet.absoluteFillObject
  }
})

const mapStateToProps = (state: any) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(BikeServiceForm)
