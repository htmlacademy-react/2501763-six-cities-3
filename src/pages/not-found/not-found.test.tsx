import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import NotFound from './not-found';

describe('Component: NotFound', () => {
  it('should render correctly', () => {
    const expectedHeaderText = '404 - Page Not Found';
    const expectedLinkText = 'Вернуться на главную';

    render(withHistory(<NotFound />));

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
