import {NameSpace} from '../../constants';
import {State} from '../../types/state';
import {Review} from '../../types/review';

export const getReviews = (state: State): Review[] => state[NameSpace.ReviewsData].reviews;

export const getDisabledReviewStatus = (state: State): boolean => state[NameSpace.ReviewsData].isReviewFormDasabled;
