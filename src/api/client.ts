import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

type RequestConfig = AxiosRequestConfig | Promise<AxiosRequestConfig>;
type ResponseConfig = AxiosResponse | Promise<AxiosResponse>;

export default class Client {
  private httpClient: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.httpClient = axios.create(config);
    console.log('Http client created!');
  }

  setDefaultConfig = (config: AxiosRequestConfig) => {
    this.httpClient.defaults = { ...this.httpClient.defaults, ...config };
    return this;
  };

  clearConfig = () => {
    this.httpClient.defaults = {};
    return this;
  };

  requestInterceptor = (interceptor: (config: AxiosRequestConfig) => RequestConfig) => {
    this.httpClient.interceptors.request.use(interceptor);
    return this;
  };

  responseInterceptor = (interceptor: (response: AxiosResponse) => ResponseConfig) => {
    this.httpClient.interceptors.response.use(interceptor);
    return this;
  };

  delete = (url: string, params?: any) => this.httpClient.delete(url, { params });

  get = (url: string, params?: any) => this.httpClient.get(url, { params });

  patch = (url: string, data?: any) => this.httpClient.patch(url, data);

  post = (url: string, data?: any) => this.httpClient.post(url, data);

  put = (url: string, data?: any) => this.httpClient.put(url, data);
}
