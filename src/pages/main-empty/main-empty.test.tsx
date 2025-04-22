import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import MainEmpty from './main-empty';
import Header from '../../components/header/header';

describe('Component: MainEmpty', () => {
  it('should render correctly', () => {
    vi.mock('../../components/header/header');
    const expectedText = 'No places to stay available';
    const { withStoreComponent } = withStore(<MainEmpty />, {});
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(Header).toBeCalled();
  });
});
