import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { extractActionsTypes } from '../../utils/mocks';
import { Sorts } from '../utils';
import Sort from './sort';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import { AuthorizationStatus } from '../../constants';
import { sortOffers } from '../../store/app-actions/app-actions';

describe('Component: Sort', () => {
  it('should render correct', () => {
    const sortFormId = 'sort-form';
    const sortTypeId = 'sort-type';

    const withHistoryComponent = withHistory(<Sort />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
        isLoginFormDisabled: false,
      }
    }));

    const preparedComponent = withStoreComponent;
    render(preparedComponent);
    const sortForm = screen.getByTestId(sortFormId);
    const sortTypes = screen.getAllByTestId(sortTypeId);

    expect(sortForm).toBeInTheDocument();
    expect(sortTypes.length).toBe(Object.values(Sorts).length);
  });

  it('should dispatch sortOffers', async () => {
    const sortTypeId = 'sort-type';

    const { withStoreComponent, mockStore } = withStore(withHistory(<Sort />), makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
        isLoginFormDisabled: false,
      }
    }));

    render(withStoreComponent);

    const sortTypes = screen.getAllByTestId(sortTypeId);
    const sortTypeItem = sortTypes[0];

    await userEvent.click(sortTypeItem);
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      sortOffers.type
    ]);
  });
  it('should set new class for sortTypesList', async () => {
    const sortArrowId = 'sort-arrow';
    const typesContainerId = 'type-items-container';

    const { withStoreComponent } = withStore(withHistory(<Sort />), makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
        isLoginFormDisabled: false,
      }
    }));

    render(withStoreComponent);
    const typesContainer = screen.getByTestId(typesContainerId);
    const sortArrow = screen.getByTestId(sortArrowId);
    await userEvent.click(sortArrow);

    expect(typesContainer).toHaveClass('places__options places__options--custom places__options--opened');
  });
});
