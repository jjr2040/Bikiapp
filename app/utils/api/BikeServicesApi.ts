import { BikeService } from './../../redux/bike-services/types';
import axios from 'axios'
import Config from 'react-native-config'

const client = axios.create({
  baseURL: 'https://bikiservices.herokuapp.com/services/',
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
        name: obj.Name,
        price: obj.Price
      }
    });

    return services
  });
}

export function createBikeService(service: BikeService){

  const body = {
    phone: service.phone,
    address: service.address,
    description: service.description,
    type: service.type,
    name: service.name,
    price: service.price
  }

  return client.post('', body);
}