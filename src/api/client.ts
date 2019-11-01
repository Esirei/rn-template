import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

type RequestConfig = AxiosRequestConfig | Promise<AxiosRequestConfig>;
type ResponseConfig = AxiosResponse | Promise<AxiosResponse>;

export default class Client {
  private httpClient: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.httpClient = axios.create(config);
    // Returns the data object of responses
    this.interceptors().response.use(response => {
      console.log('Api response', response);
      return response.data;
    });
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

  interceptors = () => this.httpClient.interceptors;

  requestInterceptor = (interceptor: (config: AxiosRequestConfig) => RequestConfig) => {
    this.httpClient.interceptors.request.use(interceptor);
    return this;
  };

  responseInterceptor = (interceptor: (response: AxiosResponse) => ResponseConfig) => {
    this.httpClient.interceptors.response.use(interceptor);
    return this;
  };

  // AxiosResponse data is returned using the interceptor in the constructor, hence <R, R> is used to override AxiosResponse type here.
  request = <R = any>(config: AxiosRequestConfig) => this.httpClient.request<R, R>(config);

  delete = <R = any>(url: string, params?: any) => this.httpClient.delete<R, R>(url, { params });

  get = <R = any>(url: string, params?: any) => this.httpClient.get<R, R>(url, { params });

  patch = <R = any>(url: string, data?: any) => this.httpClient.patch<R, R>(url, data);

  post = <R = any>(url: string, data?: any) => this.httpClient.post<R, R>(url, data);

  put = <R = any>(url: string, data?: any) => this.httpClient.put<R, R>(url, data);
}
