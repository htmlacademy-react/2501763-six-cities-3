import { NameSpace } from '../../constants';
import { getActiveOfferId } from './selectors';

describe('AppActions selectors', () => {
  const state = {
    [NameSpace.AppActions]: {
      activeOfferId: '132213asdad',
      error: null,
    }
  };

  it('should return active id from state', () => {
    const { activeOfferId } = state[NameSpace.AppActions];
    const result = getActiveOfferId(state);
    expect(result).toBe(activeOfferId);
  });
});
