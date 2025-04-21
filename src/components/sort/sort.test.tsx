import { render, screen } from '@testing-library/react';
import Sort from './sort';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';

describe('Component: Sort', () => {
  it('should render correctly', () => {
    const expectedTestId = 'sort';
    const { withStoreComponent } = withStore(<Sort />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
