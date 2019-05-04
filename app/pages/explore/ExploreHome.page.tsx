import React, { Component } from 'react'
import { View, StyleSheet, ListRenderItemInfo, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { User } from '../../redux/user/types';
import { NavigationScreenProp, NavigationState, FlatList } from 'react-navigation';
import { Container, Content, Item, Input, Card, CardItem, Body, Text, Header } from 'native-base';
import { Route } from '../../redux/routes/types';
import { fetchRoutes } from '../../utils/api/RoutesApi';

interface ExploreHomeProps {
  currentUser?: User;
  navigation: NavigationScreenProp<NavigationState>; 
}

interface ExploreHomeState {
  routes: Route[];
  loading: boolean;
}

export class ExploreHome extends Component<ExploreHomeProps, ExploreHomeState> {

  static navigationOptions = {
      title: 'Explora '
  }

  state: ExploreHomeState = {
    routes: [],
    loading: false
  }

  componentDidMount() {
    const { currentUser } = this.props;
    if ( currentUser == undefined ) {
      this.props.navigation.navigate('LoginRegister');
    } else {
      this.setState({loading: true});
      fetchRoutes().then( (routes: Route[]) => {
        this.setState({routes: routes, loading: false});
      });
    }
  }

  renderRouteItem = ( { item }: ListRenderItemInfo<Route> ) => {

    const props = item.properties.map( (prop, index) => {
      return (<Text key={index}>{prop.name}: {prop.valor}</Text>);
    });

    return (
      <Card>
        <CardItem header>
          <Text>{item.name}</Text>
        </CardItem>
        <CardItem>
          <Body>
            {props}
          </Body>
        </CardItem>
        <CardItem footer button >
          <Text>Ver ruta</Text>
        </CardItem>
      </Card>
    );
  }

  renderSearchHeader() {
    return (
      <Item rounded>
        <Input placeholder='Buscar rutas'/>
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
            data={this.state.routes}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => `${index}`}
            renderItem={ this.renderRouteItem.bind(this) }
          >
          </FlatList>
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


export default connect(mapStateToProps, mapDispatchToProps)(ExploreHome)
