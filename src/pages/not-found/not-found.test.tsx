import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import NotFound from './not-found';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const expectedHeaderText = 'Page is not Found';
    const expectedLinkText = 'На главную';

    render(withHistory(<NotFound />));

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
