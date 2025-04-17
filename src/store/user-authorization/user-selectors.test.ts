import { AuthorizationStatus, NameSpace } from '../../constants';
import { UserAuth } from '../../types/state';
import { getAuthCheckedStatus, getAuthorizationStatus } from './selectors';


describe('UserProcess selectors', () => {
  it('should return authorization status from state', () => {
    const authorizationStatus = AuthorizationStatus.Auth;
    const state: UserAuth = {
      authorizationStatus,
      user: null,
      isLoginFormDisabled: false,
      email: '',
    };
    const result = getAuthorizationStatus({ [NameSpace.User]: state });
    expect(result).toBe(authorizationStatus);
  });
  it('should return "true" because auth status is "Auth"', () => {
    const authorizationStatus = AuthorizationStatus.Auth;
    const state: UserAuth = {
      authorizationStatus,
      user: null,
      isLoginFormDisabled: false,
      email: '',
    };
    const result = getAuthCheckedStatus({ [NameSpace.User]: state });
    expect(result).toBe(true);
  });
  it('should return "false" because auth status is "Unknown"', () => {
    const authorizationStatus = AuthorizationStatus.Unknown;
    const state: UserAuth = {
      authorizationStatus,
      user: null,
      isLoginFormDisabled: false,
      email: '',
    };
    const result = getAuthCheckedStatus({ [NameSpace.User]: state });
    expect(result).toBe(false);
  });
});
