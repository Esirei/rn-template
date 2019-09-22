interface RequestState<R> {
  [key: string]: R | any;
  inRequest: boolean;
  error: null | any;
}

interface RequestReducer<R> {
  (state: RequestState<R>, action: any): RequestState<R>;
}

interface PayloadMergeFn<R> {
  (response: R, prev: R): R;
}

export const requestStatusReducer = <R>(
  name: string,
  value: R,
  mergeFn?: PayloadMergeFn<R>,
): RequestReducer<RequestState<R>> => {
  if (!name && !mergeFn) {
    throw 'A name, mergeFn, or name and mergeFn must be defined';
  }

  const initialState = {
    [name]: value,
    inRequest: false,
    error: null,
  };

  return (state = initialState, action) => {
    const {type, payload, error} = action;
    const matches = /.*_(REQUEST|SUCCESS|FAILURE)/.exec(type);
    if (matches) {
      const [, requestState] = matches;
      switch (requestState) {
        case 'REQUEST':
          return {...state, inRequest: true, error: null};
        case 'SUCCESS':
          return {
            ...state,
            inRequest: false,
            ...response(state, payload, name, mergeFn),
          };
        case 'FAILURE':
          return {...state, inRequest: false, error};
        default:
          return state;
      }
    }
    return state;
  };
};

const response = (state, payload, name, mergeFn) => {
  return name
    ? {[name]: mergeFn ? mergeFn(payload, state[name]) : payload}
    : mergeFn(payload, state);
};

export default requestStatusReducer;
