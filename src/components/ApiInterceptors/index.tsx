import { memo, useEffect } from 'react';
import { useStore } from 'react-redux';
import api from '@api';
import { AppState } from '@types';
import { tokenSelector } from '@selectors/sessionSelector';
import { logout, setTokens } from '@actions/sessionActions';

const ApiInterceptors = () => {
  console.log('ApiInterceptors started...');
  const store = useStore<AppState>();

  const interceptors = () => api.interceptors();

  // Returns the data object of responses
  useEffect(() => {
    interceptors().response.use(value => {
      console.log('Api response', value);
      return value.data;
    });
  }, []);

  // Response error actions
  useEffect(() => {
    let didTokenRefresh = false;

    const requestToken = config => {
      console.warn('Token refresh...');
      didTokenRefresh = true;
      const refresh_token = store.getState().session.refreshToken || '';
      return api
        .post('refresh-token', { refresh_token })
        .then(response => {
          store.dispatch(setTokens(response));
          return api.request(config).then(value => {
            didTokenRefresh = false;
            return value;
          });
        })
        .catch(reason => {
          store.dispatch(logout());
          return reason;
        });
    };

    const id = interceptors().response.use(
      value => value,
      error => {
        const { config, data, status } = error.response || {}; // Network error will make response undefined
        console.error('Api error!', data, error.toJSON());
        if (status === 401) {
          if (!didTokenRefresh) {
            return requestToken(config);
          } else {
            store.dispatch(logout());
          }
        }
        didTokenRefresh = false;
        // Toast can be shown here...
        return Promise.reject(data || error);
      },
    );

    return () => {
      interceptors().response.eject(id);
    };
  }, [store]);

  // Adds token to request. NOTE: Directly using store as it's stable and component doesn't have be re-rendered to get the latest value.
  useEffect(() => {
    const id = interceptors().request.use(value => {
      const token = tokenSelector(store.getState());
      if (token) {
        console.log(`User token is ${token}`);
        value.headers.Authorization = `Bearer ${token}`;
      }
      return value;
    });

    return () => {
      interceptors().request.eject(id);
      console.log('Api token interceptor ejected!', id);
    };
  }, [store]);

  return null;
};

export default memo(ApiInterceptors);
