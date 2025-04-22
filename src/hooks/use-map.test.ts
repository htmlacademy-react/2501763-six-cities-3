import { renderHook } from '@testing-library/react';
import useMap from './use-map';
import { makeFakeCity } from '../utils/mocks';
import { useRef } from 'react';

describe('Hook: useMap', () => {
  it('should render correctly', () => {
    const fakeCity = makeFakeCity();
    const fakeMap = document.createElement('div');
    const { result } = renderHook(() => useMap(useRef(fakeMap), fakeCity));
    const map = result.current;
    if (map) {
      expect(map.options).toEqual({
        'center': {
          'lat': fakeCity.location.latitude,
          'lng': fakeCity.location.longitude,
        },
        'zoom': fakeCity.location.zoom,
      });
    }
    expect(typeof map).toBe('object');
  });
});
