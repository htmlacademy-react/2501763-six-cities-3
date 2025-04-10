import {NameSpace} from '../../constants';
import {State} from '../../types/state';

export const getActiveOfferId = (state: State): string => state[NameSpace.AppActions].activeOfferId;

export const getCity = (state: State): string => state[NameSpace.AppActions].city;

export const getError = (state: State): string|null => state[NameSpace.AppActions].error;
