import { BikeService } from './../../redux/bike-services/types';
import axios from 'axios'
import Config from 'react-native-config'

const client = axios.create({
  baseURL: 'https://bikiservices.herokuapp.com/services',
  timeout: 6000,
  headers: {
    'bikiapp-agent': Config.BIKIAPP_AGENT
  }
});

export function fetchBikeServices(): Promise<BikeService[]> {
  return client.get('').then( res => {
    const json = res.data;

    const services: BikeService[] = json.map( (obj: any) => {
      return {
        id: obj.id,
        phone: obj.Phone,
        address: obj.Address,
        description: obj.Description,
        type: obj.Type,
        name: obj.Name
      }
    });

    return services
  });
}