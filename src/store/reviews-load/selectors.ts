import { NameSpace } from '../../constants';
import { State } from '../../types/state';
import { Review } from '../../types/review';

export const getSortedReviews = (state: Pick<State, NameSpace.ReviewsData>): Review[] => state[NameSpace.ReviewsData].reviews;

export const getDisabledReviewStatus = (state: Pick<State, NameSpace.ReviewsData>): boolean => state[NameSpace.ReviewsData].isReviewFormDisabled;
