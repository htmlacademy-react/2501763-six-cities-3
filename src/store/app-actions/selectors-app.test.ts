import { NameSpace } from '../../constants';
import { getActiveOfferId, getSort } from './selectors';

describe('AppActions selectors', () => {
  const fakeSort = 'hig to low';
  const state = {
    [NameSpace.AppActions]: {
      sort: fakeSort,
      activeOfferId: '132213asdad',
      error: null,
    }
  };
  it('should return sort name from state', () => {
    const { sort } = state[NameSpace.AppActions];
    const result = getSort(state);
    expect(result).toBe(sort);
  });
  it('should return active id from state', () => {
    const { activeOfferId } = state[NameSpace.AppActions];
    const result = getActiveOfferId(state);
    expect(result).toBe(activeOfferId);
  });
});
