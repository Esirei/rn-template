import {Platform} from 'react-native';
import Client from './client';
import {store} from '../store';
import {tokenSelector} from '@selectors/sessionSelector';

// Modify file as needed. (❁´◡`❁)

// Adds token to request if available in store.
const authRequestInterceptor = config => {
  const token = tokenSelector(store.getState());
  if (token) {
    console.log(`User token is ${token}`);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// Removes all the unnecessary information and returns just the data object.
const dataResponseInterceptor = response => {
  console.log('Response interceptor', response);
  return response.data;
};

const clientConfig = {
  baseURL: 'https://reqres.in/api/',
  headers: {'User-Agent': Platform.OS === 'ios' ? 'iOS' : 'Android'},
};

const client = new Client(clientConfig)
  .requestInterceptor(authRequestInterceptor)
  .responseInterceptor(dataResponseInterceptor);

export default client;
