import {Review} from '../types/review';
import ReviewItem from '../components/review';

type OfferProps = {
  reviews: Review[];
}

export default function ReviewList({reviews}:OfferProps): JSX.Element {
  return(
    <ul className="reviews__list">
      { reviews.map((item)=>(<ReviewItem review={item} key={item.id}/>))}
    </ul>
  );
}
