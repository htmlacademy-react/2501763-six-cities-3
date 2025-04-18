import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import Logo from './logo';


describe('Component: Logo', () => {
  it('should render correctly', () => {
    const expectedAltText = '6 cities logo';
    const preparedComponent = withHistory(<Logo />);
    render(preparedComponent);

    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
  });
});
