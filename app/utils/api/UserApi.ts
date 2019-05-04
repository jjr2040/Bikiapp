import { User } from './../../redux/user/types';
import axios from 'axios'
import Config from 'react-native-config'

const client = axios.create({
  baseURL: 'https://46idh6p87i.execute-api.us-east-1.amazonaws.com/dev/auth/',
  timeout: 6000,
  headers: {
    'bikiapp-agent': Config.BIKIAPP_AGENT
  }
});

export function registerUser(user: User) {
  return client.post('register', user);
}

export function loginUser(email: string, password: string) {
  return client.post('login', { 
    email: email,
    password: password
  });
}

export function verifyUser(email: string, code: string) {
  return client.post('verify', {
    email: email,
    code: code
  });
}