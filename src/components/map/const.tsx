import {City} from '../../types/offer';

export const EMPTY_LOCATION: City = {
  name: '',
  location: {
    latitude: 0,
    longitude: 0,
    zoom: 0
  }
};

export enum UrlMarker {
  DEFAULT = '/public/img/pin.svg',
  CURRENT = '/public/img/pin-active.svg',
}
