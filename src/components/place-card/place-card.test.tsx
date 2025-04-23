import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../utils/mock-component';
import PlaceCard from './place-card';
import { makeFakeOfferCard, makeFakeStore } from '../../utils/mocks';
import { AuthorizationStatus } from '../../constants';

describe('Component: PlaceCard', () => {
  it('should render correct', () => {
    const fakeOffer = makeFakeOfferCard();
    const bookmarkButtonTextTestId = 'bookmark';


    const withHistoryComponent = withHistory(<PlaceCard offer={fakeOffer} />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
        isLoginFormDisabled: false,
        email: ''
      }
    }));

    const preparedComponent = withStoreComponent;
    render(preparedComponent);
    if (fakeOffer.isPremium) {
      expect(screen.getByText('Premium'));
    }

    const bookmarkSpan = screen.getByTestId(bookmarkButtonTextTestId);

    expect(screen.getAllByRole('link'));
    expect(screen.getByAltText('Place image'));
    expect(screen.getByText(fakeOffer.title));
    expect(screen.getByText(fakeOffer.type));
    expect(screen.getByRole('button')).toContainElement(bookmarkSpan);
  });

  it('should click bookmark 1 time', async () => {
    const fakeOffer = makeFakeOfferCard();
    const mockHandleClick = vi.fn();

    render(
      <button
        onClick={mockHandleClick}
        className={fakeOffer.isFavorite ?
          'place-card__bookmark-button button place-card__bookmark-button--active' : 'place-card__bookmark-button button'}
        type="button"
      >
        <svg
          className="place-card__bookmark-icon"
          width={18}
          height={19}
        >
          <use xlinkHref="#icon-bookmark" />
        </svg>
        <span className="visually-hidden" data-testid="bookmark">To bookmarks</span>
      </button>
    );
    if (fakeOffer.isFavorite) {
      expect(screen.getByRole('button')).toHaveClass('place-card__bookmark-button button place-card__bookmark-button--active');
    }
    await userEvent.click(screen.getByRole('button'));
    expect(mockHandleClick).toBeCalledTimes(1);
  });
});
