'use client';
import {useFormState} from 'react-dom';
import ImagePicker from '@/components/meals/image-picker';
import classes from './page.module.css';
import MealsFormSubmit from '@/components/meals/meals-form-submit';
import { postMovie } from '@/lib/action';

export default function PostMopiePage() {
  const [state, formAction] = useFormState(postMovie, {message: null})

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite movie</span>
        </h1>
        <p>Or any other movie you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="title">Title</label>
              <input type="text" id="title" name="title" required />
            </p>
            <p>
              <label htmlFor="mpaa_rating">MPAA Rating</label>
              <input type="text" id="mpaa_rating" name="mpaa_rating" required />
            </p>
          </div>
          <p>
            <label htmlFor="runtime">Runtime</label>
            <input type="number" id="runtime" name="runtime" required />
          </p>
          <p>
            <label htmlFor="release_date">Release Date</label>
            <input type="date" id="release_date" name="release_date" required />
          </p>
          <p>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows="10"
              required
            ></textarea>
          </p>
          {/* <ImagePicker label='Your image' name='image'/> */}
          {/* {state.message && <p>{state.message}</p>} */}
          <p className={classes.actions}>
            <button>
                Submit
            </button>
          </p>
        </form>
      </main>
    </>
  );
}