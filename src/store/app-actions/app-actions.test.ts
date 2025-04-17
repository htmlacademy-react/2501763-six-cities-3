import { appActions, hoverOffer } from './app-actions';

describe('AppAction Slice', () => {

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      activeOfferId: '',
      error: null
    };
    const result = appActions.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      activeOfferId: '',
      error: null
    };
    const result = appActions.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return action active id', () => {
    const initialState = {
      activeOfferId: '',
      error: null
    };
    const actionOfferId = 'qwertreq123';

    const expectedState = {
      activeOfferId: actionOfferId,
      error: null
    };
    const result = appActions.reducer(initialState, hoverOffer(actionOfferId));
    expect(result).toEqual(expectedState);
  });

});
