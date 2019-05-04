import React, { Component } from 'react'
import { View, StyleSheet, Geolocation, GeolocationReturnType } from 'react-native'
import { connect } from 'react-redux'
import MapView, { PROVIDER_GOOGLE, EventUserLocation, LatLng, Polyline, Polygon } from 'react-native-maps'
import { Container, Text, Button } from 'native-base';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

interface MapsHomeProps { 
  navigation: NavigationScreenProp<NavigationState>
}

interface MapsHomeState {
  isRecording: boolean;
  coordinates: LatLng[];
}

export class MapsHome extends Component<MapsHomeProps, MapsHomeState> {

  static navigationOptions = {
    title: 'Mapa'
  }

  map: MapView | null = null;
  state: MapsHomeState = {
    isRecording: false,
    coordinates: []
  }

  componentDidMount() {
    this.watchCurrentLocation();
  }

  componentWillUnmount() {
    navigator.geolocation.stopObserving();
  }

  watchCurrentLocation() {

    navigator.geolocation.watchPosition((position: GeolocationReturnType) => {

      const coords: LatLng = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }

      if (this.map) {
        this.map!.animateCamera({
          center: coords,
          zoom: 17
        });
      }

      if ( this.state.isRecording ) {
        this.setState({ coordinates: this.state.coordinates.concat([coords])});
      }
    });
  }

  startRecording() {
    this.setState({ isRecording: true, coordinates: []});
  }

  stopRecording() {
    this.setState({ isRecording: false });
    this.props.navigation.navigate('SaveRoute', { coordinates: this.state.coordinates });
  }

  recordButton() {
    if ( this.state.isRecording ) {
      return (
        <Button block style={styles.mainButton} danger onPress={this.stopRecording.bind(this)}>
          <Text>Parar de grabar</Text>
        </Button>
      );
    }

    return (
      <Button block style={styles.mainButton} success onPress={this.startRecording.bind(this)}>
        <Text>Empezar a grabar ruta</Text>
      </Button>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={ref => {
            this.map = ref;
          }}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          showsMyLocationButton
        >
          <Polyline 
            strokeColor='#000' 
            coordinates={this.state.coordinates}
            strokeWidth={6}
            fillColor="rgba(255,0,0,0.5)" 
          />
        </MapView>
        { this.recordButton() }
      </View>
    )
  }
}

const mapStateToProps = (state: any) => ({
  
})

const mapDispatchToProps = {
  
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  mainButton: {
    position: 'absolute',
    bottom: 10,
    width: '90%',
    marginRight: '5%',
    marginLeft: '5%'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapsHome)
