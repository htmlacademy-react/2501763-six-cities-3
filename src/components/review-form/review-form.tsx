import { useState, FormEvent, ChangeEvent, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postReviewAction } from '../../store/api-actions';
import { MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH, DEFAULT_RATING } from '../../constants';
import { getDisabledReviewStatus } from '../../store/reviews-load/selectors';
import { getDataOffer } from '../../store/offers-load/selectors';

export default function ReviewForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const formRef = useRef<HTMLFormElement | null>(null);
  const offer = useAppSelector(getDataOffer);
  const disabled = useAppSelector(getDisabledReviewStatus);

  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  const handleRatingButtonClick = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (offer && comment.length >= MIN_COMMENT_LENGTH && comment.length <= MAX_COMMENT_LENGTH && rating > DEFAULT_RATING) {
      setIsSubmitting(true);

      dispatch(postReviewAction({
        pageId: offer.id,
        comment: comment,
        rating: rating,
      })).unwrap().then(() => {
        if (formRef.current) {
          formRef.current.reset();
        }
        setComment('');
        setRating(0);
        setIsSubmitting(false);
      }).catch(() => {
        setIsSubmitting(false);
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
    <form data-testid="form-review" ref={formRef} onSubmit={handleSubmit} className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {ratings.map((ratingItem) => (
          <div key={ratingItem.value} className="rating-item">
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={ratingItem.value}
              id={`${ratingItem.value}-stars`}
              type="radio"
              disabled={isSubmitting}
              data-testid="input-star"
              onChange={handleRatingButtonClick}
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
        data-testid="comment-text"
        disabled={disabled || isSubmitting}
        onChange={handleReviewChange}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={''}
        minLength={MIN_COMMENT_LENGTH}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">{MIN_COMMENT_LENGTH} characters but no more than {MAX_COMMENT_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitting || !(comment.length >= MIN_COMMENT_LENGTH && comment.length <= MAX_COMMENT_LENGTH && rating > DEFAULT_RATING)}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
