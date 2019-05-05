import { Route } from './../../redux/routes/types';
import axios from 'axios'
import Config from 'react-native-config'

const routesClient = axios.create({
  baseURL: 'https://46idh6p87i.execute-api.us-east-1.amazonaws.com/dev/routes',
  timeout: 6000,
  headers: {
    'bikiapp-agent': Config.BIKIAPP_AGENT
  }
});

const searchClient = axios.create({
  baseURL: 'https://bikyline-search.herokuapp.com/routes',
  timeout: 6000,
  headers: {
    'bikiapp-agent': Config.BIKIAPP_AGENT
  }
});

export function createRoute(route: Route) {
  return routesClient.post('', route);
}

export function fetchRoutes(): Promise<Route[]> {
  return searchClient.get('').then( res => {
    return res.data
  });
}