import {City} from '../../types/offer';

const EMPTY_LOCATION:City = {
  name: '',
  location: {
    latitude: 0,
    longitude: 0,
    zoom: 0
  }
};

const URL_MARKER_DEFAULT = '/public/img/pin.svg';
const URL_MARKER_CURRENT = '/public/img/pin-active.svg';

export {URL_MARKER_DEFAULT, URL_MARKER_CURRENT, EMPTY_LOCATION};
