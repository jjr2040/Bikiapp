import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { Route, RouteProperty, RoutePropertyDef } from '../../redux/routes/types'
import { saveRoute } from '../../redux/routes/actions'
import MapView, { LatLng, PROVIDER_GOOGLE, Polyline, Region } from 'react-native-maps';
import { Button, Text, Content, Container, Form, Footer, H1, Label, Input, Item, FooterTab } from 'native-base';
import { createRoute } from '../../utils/api/RoutesApi';
import firebase from 'react-native-firebase'
import Config from 'react-native-config';

interface SaveRouteProps {
  saveRoute: (route: Route) => void;
  navigation: NavigationScreenProp<NavigationState>;
}

interface SaveRouteState {
  route: Route;
  region: Region;
  loading: boolean;
  routePropertiesDefs: RoutePropertyDef[];
  errorMessage?: string;
}

export class SaveRoute extends Component<SaveRouteProps, SaveRouteState> {

  static navigationOptions = {
    title: 'Guarda tu ruta'
  }
  
  constructor(props: SaveRouteProps) {
    super(props);
    const coordinates = props.navigation.getParam('coordinates', []);
    const firstCoordinate: LatLng = coordinates[0];
    const lastCoordinate: LatLng = coordinates[coordinates.length-1];
    const latDelta = Math.abs(firstCoordinate.latitude - lastCoordinate.latitude)*1.1;
    const lngDelta = Math.abs(firstCoordinate.longitude - lastCoordinate.longitude)*1.1

    this.state = {
      route: {
        name: '',
        coordinates: coordinates,
        properties: []
      },
      routePropertiesDefs: [],
      loading: false,
      region: {
        latitude: (firstCoordinate.latitude + lastCoordinate.latitude)/2,
        longitude: (firstCoordinate.longitude + lastCoordinate.longitude)/2,
        latitudeDelta: latDelta,
        longitudeDelta: lngDelta
      }
    };
  }

  componentDidMount() {
    firebase.config().getValue(Config.BIKIAPP_AGENT).then( value => {
      const json = JSON.parse(value.val());
      const routePropertiesDefs: RoutePropertyDef[] = json.route_properties;
      const routeProperties: RouteProperty[] = routePropertiesDefs.map( propDef => {
        return {
          name: propDef.name,
          valor: ''
        };
      });
      let route = this.state.route;
      route.properties = routeProperties;

      this.setState({
        routePropertiesDefs: routePropertiesDefs, 
        route: route
      });
    });
  }

  saveRoute() {
    const { route } = this.state;
    
    this.setState({loading: true});
    createRoute(route).then( res => {
      this.props.saveRoute(route);
      this.setState({loading: false});
      this.props.navigation.goBack();
    }).catch( error => {
      this.setState({errorMessage: error.response.data.Error});
      console.log('Hubo un error aca');
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
      <Button full primary onPress={this.saveRoute.bind(this)}>
        <Text style={{color: 'white'}}>Guardar</Text>
      </Button>
    );
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

  routePropDidChange(name: string, value: string) {
    const route = this.state.route;
    const prop: RouteProperty | undefined = route.properties.find( prop => {
      return prop.name === name;
    });

    if (prop) {
      prop.valor = value;
      this.setState({route: route});
    }
  }

  renderRouteProperties() {

    const { route } = this.state;

    return route.properties.map( (prop, index) => {
      return ( 
        <Item floatingLabel key={index}>
            <Label>{prop.name}</Label>
            <Input onChangeText={ text => {
                this.routePropDidChange(prop.name, text)
              }} 
            />
        </Item> 
      );
    });
  }

  render() {
    return (
      <Container>
        <Content padder>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            region={this.state.region}
          >
            <Polyline 
              strokeColor='#000' 
              coordinates={this.state.route.coordinates}
              strokeWidth={6}
              fillColor="rgba(255,0,0,0.5)" 
            />
          </MapView>
          <Form>
            <H1>Guarda la ruta</H1>
            <Text>Guard y comparte la ruta para que tu y otros miembros de la comunidad puedan buscarla</Text>
            {this.renderError()}
            <Item floatingLabel>
                <Label>Nombre</Label>
                <Input onChangeText={ text => {
                    let route = this.state.route;
                    route.name = text;
                    this.setState({route: route});
                  }} 
                />
            </Item> 
            { this.renderRouteProperties() }
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

const mapStateToProps = (state: any) => ({
  
})

const mapDispatchToProps = {
  saveRoute
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: '100%',
    height: 200
  },
  mainButton: {
    color: 'white'
  },
  fill: {
    ...StyleSheet.absoluteFillObject
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(SaveRoute)
