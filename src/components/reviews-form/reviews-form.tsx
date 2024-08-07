import { useState, Fragment} from 'react';
import { Rating } from '../../const';
import { getRatingKeyValue } from '../../utils';


function ReviewsForm(): JSX.Element {
  const [review, setReview] = useState({
    rating: 0,
    text: '',
  });

  const handleRatingChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setReview({
      ...review,
      rating: Number(evt.target.value),
    });
  };

  const handleTextChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview({
      ...review,
      text: evt.target.value
    });
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Object.entries(Rating).map(([key, value]) => (
          <Fragment key={key}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              onChange={handleRatingChange}
            />
            <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={getRatingKeyValue(key)}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleTextChange}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                    To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}
export default ReviewsForm;
