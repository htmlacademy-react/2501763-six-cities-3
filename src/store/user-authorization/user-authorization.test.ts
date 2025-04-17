import { AuthorizationStatus } from '../../constants';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { userAuthorization } from './user-authorization';

describe('UserAuthorization Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: null,
      isLoginFormDisabled: false,
      email: ''
    };
    const result = userAuthorization.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
      isLoginFormDisabled: false,
      email: ''
    };
    const result = userAuthorization.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "checkAuthAction.fulfilled" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
      isLoginFormDisabled: false,
      email: ''
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: undefined,
      isLoginFormDisabled: false,
      email: ''
    };
    const result = userAuthorization.reducer(initialState, checkAuthAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "checkAuthAction.rejected" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: null,
      isLoginFormDisabled: false,
      email: ''
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
      isLoginFormDisabled: false,
      email: ''
    };
    const result = userAuthorization.reducer(initialState, checkAuthAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "loginAction.fulfilled" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
      isLoginFormDisabled: false,
      email: ''
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: null,
      isLoginFormDisabled: false,
      email: undefined
    };
    const result = userAuthorization.reducer(initialState, loginAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "loginAction.rejected" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: null,
      isLoginFormDisabled: false,
      email: ''
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
      isLoginFormDisabled: false,
      email: ''
    };
    const result = userAuthorization.reducer(initialState, loginAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth", with "logoutAction.fulfilled" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: null,
      isLoginFormDisabled: false,
      email: ''
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
      isLoginFormDisabled: false,
      email: ''
    };
    const result = userAuthorization.reducer(initialState, logoutAction.fulfilled);
    expect(result).toEqual(expectedState);
  });
});
