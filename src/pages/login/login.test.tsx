import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../utils/mock-component';
import { AuthorizationStatus } from '../../constants';
import { makeFakeStore } from '../../utils/mocks';
import Login from './login';

describe('Component: Login', () => {
  it('should render correctly', () => {
    const loginText = 'Email';
    const passwordText = 'Password';
    const withHistoryComponent = withHistory(<Login />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
        isLoginFormDisabled: false,
        email: ''
      }
    }));

    const preparedComponent = withStoreComponent;
    render(preparedComponent);

    expect(screen.getByPlaceholderText(loginText)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(passwordText)).toBeInTheDocument();
  });
  it('should render correctly when user enter login and password', async () => {

    const loginElementTestId = 'loginElement';
    const passwordElementTestId = 'passwordElement';
    const expectedLoginValue = 'keks';
    const expectedPasswordValue = '123456';

    const withHistoryComponent = withHistory(<Login />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
        isLoginFormDisabled: false,
        email: ''
      }
    }));

    const preparedComponent = withStoreComponent;

    render(preparedComponent);

    await userEvent.type(
      screen.getByTestId(loginElementTestId),
      expectedLoginValue,
    );
    await userEvent.type(
      screen.getByTestId(passwordElementTestId),
      expectedPasswordValue,
    );

    expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });
});
