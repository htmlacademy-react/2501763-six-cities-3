import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../utils/mock-component';
import { AuthorizationStatus, APIRoute } from '../../constants';
import { makeFakeStore, makeFakeOfferPage } from '../../utils/mocks';
import ReviewForm from './review-form';
import { postReviewAction, fetchReviewsAction } from '../../store/api-actions';
import { NewComment } from '../../types/review';
import { extractActionsTypes } from '../../utils/mocks';
import { INITIAL_SORT } from '../../constants';

describe('Component: ReviewForm', () => {

  it('should render correctly', async () => {
    const STARS_COUNT = 5;
    const inputStarId = 'input-star';
    const commentPlaceholder = 'Tell how was your stay, what you like and what can be improved';

    const withHistoryComponent = withHistory(<ReviewForm />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
        isLoginFormDisabled: false,
      }
    }));

    const preparedComponent = withStoreComponent;
    render(preparedComponent);

    const starInputs = screen.getAllByTestId(inputStarId);

    await userEvent.click(starInputs[0]);
    expect(starInputs[0]).toBeChecked();

    expect(screen.getByPlaceholderText(commentPlaceholder)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Submit');
    expect(screen.getByRole('button')).toBeDisabled();
    expect(starInputs.length).toBe(STARS_COUNT);

  });
  it('should render correctly when user enter comment', async () => {
    const inputStarId = 'input-star';
    const textAreaId = 'comment-text';
    const expectedcommentValue = 'keks';
    const expectedInputStarValue = '5';

    const withHistoryComponent = withHistory(<ReviewForm />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
        isLoginFormDisabled: false,
      }
    }));

    const preparedComponent = withStoreComponent;

    render(preparedComponent);
    const starInputs = screen.getAllByTestId(inputStarId);

    await userEvent.type(
      screen.getByTestId(textAreaId),
      expectedcommentValue,
    );
    await userEvent.click(starInputs[0]);

    expect(screen.getByDisplayValue(expectedInputStarValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedcommentValue)).toBeInTheDocument();
  });
  it('should dispatch postReviewAction', async () => {
    const fakeOffer = makeFakeOfferPage();
    const inputStarId = 'input-star';
    const textAreaId = 'comment-text';

    const fakeNewCommet: NewComment = {
      pageId: 'ghghytyty',
      comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam',
      rating: 5,
    };

    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(<ReviewForm />, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
        isLoginFormDisabled: false,
      },
      offers: {
        offers: [],
        sortOffers: INITIAL_SORT,
        isFiltersOpen: false,
        isOffersLoading: false,
        offerCard: undefined,
        offer: fakeOffer,
        aroundOffers: [],
        favoriteOffers: [],
        isOfferLoading: false,
        isFavoriteLoading: false,
        favoriteStatus: false,
      },
      reviews: {
        reviews: [],
        isReviewFormDisabled: false
      }
    }));
    mockAxiosAdapter.onGet(`${APIRoute.Comments}/${fakeOffer.id}`).reply(200, []);
    mockAxiosAdapter.onPost(`${APIRoute.Comments}/${fakeOffer.id}`).reply(201);

    render(withStoreComponent);
    const starInputs = screen.getAllByTestId(inputStarId);

    await userEvent.type(
      screen.getByTestId(textAreaId),
      fakeNewCommet.comment,
    );
    await userEvent.click(starInputs[0]);

    expect(screen.getByRole('button')).not.toBeDisabled();

    await userEvent.click(screen.getByRole('button'));

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      postReviewAction.pending.type,
      fetchReviewsAction.pending.type,
      postReviewAction.fulfilled.type,
      fetchReviewsAction.fulfilled.type,
    ]);
  });
});
