export const request = (name: string) => `${name}_REQUEST`;
export const success = (name: string) => `${name}_SUCCESS`;
export const failure = (name: string) => `${name}_FAILURE`;

interface SuccessAction<T> {
  payload: T;
  type: string;
}

interface ErrorAction<T> {
  error: T;
  type: string;
}

interface SuccessActionCreator<T> {
  (payload: T): SuccessAction<T>;
}

interface ErrorActionCreator<T> {
  (error: T): ErrorAction<T>;
}

export const actionRequest = (name: string): (() => { type: string }) => {
  return () => ({
    type: request(name),
  });
};

export const actionSuccess = <T>(name: string): SuccessActionCreator<T> => {
  return payload => ({
    type: success(name),
    payload,
  });
};

export const actionFailure = <T>(name: string): ErrorActionCreator<T> => {
  return error => ({
    type: failure(name),
    error,
  });
};

// Examples
// const userRequest = actionRequest('USER');
// const userSuccess = actionSuccess<number>('USER');
// const userFailure = actionFailure<{message: string}>('USER');
