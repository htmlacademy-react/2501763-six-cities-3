import { appActions, sortOffers, hoverOffer } from './app-actions';
import { INITIAL_SORT } from '../../constants';

describe('AppAction Slice', () => {

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      sort: INITIAL_SORT,
      activeOfferId: '',
      error: null
    };
    const result = appActions.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      sort: INITIAL_SORT,
      activeOfferId: '',
      error: null
    };
    const result = appActions.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return action sort', () => {
    const initialState = {
      sort: INITIAL_SORT,
      activeOfferId: '',
      error: null
    };
    const actionSort = 'low to high';

    const expectedState = {
      sort: actionSort,
      activeOfferId: '',
      error: null
    };
    const result = appActions.reducer(initialState, sortOffers(actionSort));
    expect(result).toEqual(expectedState);
  });
  it('should return action active id', () => {
    const initialState = {
      sort: INITIAL_SORT,
      activeOfferId: '',
      error: null
    };
    const actionOfferId = 'qwertreq123';

    const expectedState = {
      sort: INITIAL_SORT,
      activeOfferId: actionOfferId,
      error: null
    };
    const result = appActions.reducer(initialState, hoverOffer(actionOfferId));
    expect(result).toEqual(expectedState);
  });

});
