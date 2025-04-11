import {NameSpace, AuthorizationStatus} from '../../constants';
import {State, User} from '../../types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;

export const getUser = (state: State): User | null => state[NameSpace.User].user;

export const getEmail = (state: State): string => state[NameSpace.User].email;

export const getDisabledStatus = (state: State): boolean => state[NameSpace.User].isLoginFormDasabled;

export const getAuthCheckedStatus = (state: State): boolean => state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;
