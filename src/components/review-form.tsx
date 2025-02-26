import {useState, ChangeEvent} from 'react';

export default function ReviewForm(): JSX.Element {
  const [review, setReview] = useState('');
  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(evt.target.value);
  };

  const [rating, setRating] = useState(0);
  const handleRatingButtonClick = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  };

  const [hoveredRating, setHoveredRating] = useState(0); // Для хранения состояния наведения

  const ratings = [
    { value: 5, title: 'perfect' },
    { value: 4, title: 'good' },
    { value: 3, title: 'not bad' },
    { value: 2, title: 'badly' },
    { value: 1, title: 'terribly' },
  ];

  return (
    <form className="reviews__form form" action="#" method="post">
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
              onMouseEnter={() => setHoveredRating(ratingItem.value)} // Устанавливаем рейтинг при наведении
              onMouseLeave={() => setHoveredRating(0)} // Сбрасываем рейтинг при уходе курсора
            >
              <svg
                className="form__star-image"
                width={37}
                height={33}
                style={{ fill: (ratingItem.value <= (hoveredRating || rating)) ? '#ff9000' : '#c7c7c7' }} // Меняем цвет в зависимости от состояния
              >
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </div>
        ))}
      </div>
      <textarea
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
          disabled={review.length < 50 || rating === 0}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
