import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import FavoriteEmpty from './favorites-empty';
import Header from '../../components/header/header';

describe('Component: FavoriteEmpty', () => {
  it('should render correctly', () => {
    vi.mock('../../components/header/header');
    const expectedHeaderText = 'Save properties to narrow down search or plan your future trips.';
    const { withStoreComponent } = withStore(<FavoriteEmpty />, {});
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(Header).toBeCalled();
  });
});
