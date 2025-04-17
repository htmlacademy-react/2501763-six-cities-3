import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import CitiesList from './cities-list';
import { CITY_LOCATIONS } from '../utils';


describe('Component: CitiesList', () => {
  it('should render correct', () => {
    const citiesListContainerTestId = 'cities-container';
    const cityValueTestId = 'city';

    render(withHistory(<CitiesList />));
    const citiesListContainer = screen.getByTestId(citiesListContainerTestId);
    const citiesValues = screen.getAllByTestId(cityValueTestId);

    expect(citiesListContainer).toBeInTheDocument();
    expect(citiesValues.length).toBe(CITY_LOCATIONS.length);
  });
});
