import { MemoryHistory, createMemoryHistory } from 'history';
import { AuthorizationStatus, AppRoute } from '../../constants';
import { withHistory } from '../../utils/mock-component';
import { Route, Routes } from 'react-router-dom';
import LoginPrivateRoute from './login-private-route';
import { render, screen } from '@testing-library/react';

describe('Component: PrivateRoute', () => {
  let mockHistory: MemoryHistory;
  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });
  beforeEach(() => {
    mockHistory.push(AppRoute.Login);
  });
  it('should render component for login route, when user not authorized', () => {
    const expectedText = 'login route';
    const notExpectedText = 'main route';
    const preparedComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Main} element={<span>{notExpectedText}</span>} />
        <Route path={AppRoute.Login} element={
          <LoginPrivateRoute status={AuthorizationStatus.NoAuth}>
            <span>{expectedText}</span>
          </LoginPrivateRoute>
        }
        />
      </Routes>,
      mockHistory
    );
    render(preparedComponent);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
  it('should render component for main route, when user authorized', () => {
    const expectedText = 'main route';
    const notExpectedText = 'login route';
    const preparedComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Main} element={<span>{expectedText}</span>} />
        <Route path={AppRoute.Login} element={
          <LoginPrivateRoute status={AuthorizationStatus.Auth}>
            <span>{notExpectedText}</span>
          </LoginPrivateRoute>
        }
        />
      </Routes>,
      mockHistory
    );
    render(preparedComponent);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
