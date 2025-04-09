import {useState, FormEvent, ChangeEvent, useRef} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from '../hooks';
import {postReviewAction} from '../store/api-actions';
//import {setComment, setRating} from '../store/action';
import {MIN_COMMENT_LENGTH, DEFAULT_RATING} from '../constants';


export default function ReviewForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  //const isSubmittingReview = useAppSelector((state) => state.isSubmittingReview);

  const [hoveredRating, setHoveredRating] = useState(0);
  const formRef = useRef<HTMLFormElement | null>(null);
  const params = useParams();
  const activeOfferId = params.id;
  const [disabled, setDisabled] = useState(false);

  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  const handleRatingButtonClick = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (comment !== null && rating !== null && activeOfferId !== undefined && formRef !== null) {
      setDisabled(true);
      dispatch(postReviewAction({
        pageId: activeOfferId,
        comment: comment,
        rating: rating,
        formRef: formRef.current
      })).unwrap().then(()=>{
        setComment('');
        setRating(0);
        setDisabled(false);
      });
    }
  };

  const ratings = [
    { value: 5, title: 'perfect' },
    { value: 4, title: 'good' },
    { value: 3, title: 'not bad' },
    { value: 2, title: 'badly' },
    { value: 1, title: 'terribly' },
  ];

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {ratings.map((ratingItem) => (
          <div key={ratingItem.value} className="rating-item">
            <input
              onChange={handleRatingButtonClick}
              className="form__rating-input visually-hidden"
              name="rating"
              value={ratingItem.value}
              id={`${ratingItem.value}-stars`}
              type="radio"
            />
            <label
              htmlFor={`${ratingItem.value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={ratingItem.title}
              onMouseEnter={() => setHoveredRating(ratingItem.value)}
              onMouseLeave={() => setHoveredRating(0)}
            >
              <svg
                className="form__star-image"
                width={37}
                height={33}
                style={{ fill: (ratingItem.value <= (hoveredRating || rating)) ? '#ff9000' : '#c7c7c7' }}
              >
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </div>
        ))}
      </div>
      <textarea
        disabled={disabled}
        onChange={handleReviewChange}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={''}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">{MIN_COMMENT_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={comment.length < MIN_COMMENT_LENGTH || rating === DEFAULT_RATING || disabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
