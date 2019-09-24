import {createSelector, Selector} from 'reselect';
import {RequestState} from '@reducers/requestStatusReducer';

export type RequestStatus = [boolean, any];

export const makeRequestStatusSelector = <S>(
  stateSelector: Selector<S, RequestState>,
) => {
  return createSelector<any, RequestState, RequestStatus>(
    stateSelector,
    state => [state.inRequest || false, state.error || null],
  );
};

export default makeRequestStatusSelector;
