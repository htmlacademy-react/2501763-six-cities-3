import {useState, FormEvent, ChangeEvent, useRef} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../hooks';
import {postReviewAction} from '../store/api-actions';
import {setComment, setRating} from '../store/action';

export default function ReviewForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const comment = useAppSelector((state) => state.comment);
  const rating = useAppSelector((state) => state.rating);

  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setComment(evt.target.value));
  };

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleRatingButtonClick = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(setRating(Number(evt.target.value)));
  };
  const params = useParams();
  const activeOfferId = params.id;

  const [disabled, setDisabled] = useState(false);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (comment !== null && rating !== null && activeOfferId !== undefined && formRef !== null) {
      setDisabled(true);
      dispatch(postReviewAction({
        pageId: activeOfferId,
        comment: comment,
        rating: rating,
        formRef: formRef.current
      })).then(()=>{
        setDisabled(false);
      });
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
                Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <input
          onChange = {handleRatingButtonClick}
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={5}
          id="5-stars"
          type="radio"
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          onChange = {handleRatingButtonClick}
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={4}
          id="4-stars"
          type="radio"
        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          title="good"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          onChange = {handleRatingButtonClick}
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={3}
          id="3-stars"
          type="radio"
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          title="not bad"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          onChange = {handleRatingButtonClick}
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={2}
          id="2-stars"
          type="radio"
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          title="badly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          onChange = {handleRatingButtonClick}
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={1}
          id="1-star"
          type="radio"
        />
        <label
          htmlFor="1-star"
          className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
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
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={comment.length < 50 || rating === 0}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
