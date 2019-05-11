import React, { Component } from 'react'
import { View, ListRenderItemInfo, ActivityIndicator, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { User } from '../../redux/user/types';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { Container, Content, Card, CardItem, Body, Text, Item, Input } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';
import { BikeService } from '../../redux/bike-services/types';
import { fetchBikeServices } from '../../utils/api/BikeServicesApi';

interface ServiceListProps {
  currentUser?: User;
  navigation: NavigationScreenProp<NavigationState>
}

interface ServiceListState {
  services: BikeService[];
  loading: boolean;
}

export class ServiceList extends Component<ServiceListProps, ServiceListState> {

  static navigationOptions = {
    title: 'Servicios'
  }

  state: ServiceListState = {
    services: [],
    loading: false
  }

  componentDidMount() {
    
    const { currentUser } = this.props;
    if ( currentUser == undefined ) {
      this.props.navigation.navigate('LoginRegister');
    } else {
      this.setState({loading: true});
      fetchBikeServices().then( (services: BikeService[]) => {
        this.setState({services: services, loading: false});
      });
    }
  }

  renderServiceItem = ( { item }: ListRenderItemInfo<BikeService> ) => {

    return (
      <Card>
        <CardItem header>
          <Text>{item.name}</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>{item.description}</Text>
          </Body>
        </CardItem>
        <CardItem footer button >
          <Text>Ver servicio</Text>
        </CardItem>
      </Card>
    );
  }

  renderSearchHeader() {
    return (
      <Item rounded>
        <Input placeholder='Buscar servicios'/>
      </Item>
    );
  }

  render() {
    return (
      <Container>
        <Content padder>
          { this.renderSearchHeader() }
          { 
            this.state.loading && 
            <View style={styles.loadingContainer}>
              <ActivityIndicator size={'small'}/>
            </View>
          }
          <FlatList
            data={this.state.services}
            keyExtractor={(item, index) => item.id }
            renderItem={ this.renderServiceItem.bind(this) }
          ></FlatList>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  currentUser: state.user.currentUser
})

const mapDispatchToProps = {
  
}

const styles = StyleSheet.create({
  content: {
    padding: 10
  },
  loadingContainer: {
    flex: 1,
    paddingTop: 200,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ServiceList)
