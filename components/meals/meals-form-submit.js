'use client';

import {useFormStatus} from 'react-dom';

export default function MealsFormSubmit() {
  const {pending} = useFormStatus();
  //can construct all props to object variable 

  return (
    <button disabled={pending}>
      {pending ? 'Submitting...' : 'Share Meal'}
    </button>
  )
}