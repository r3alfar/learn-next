'use server'

import { redirect } from "next/navigation"
import { saveMeal } from "./meals"
import { revalidatePath } from "next/cache";

import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const localEndpoint = "http://localhost:8800"

function isInvalidText(text) {
  return !text || text.trim() === '';
}

export async function shareMeal(prevState ,formData){

  const meal = {
    creator: formData.get('name'),
    creator_email: formData.get('email'),
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image')
  }

  if(
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image || meal.image.size === 0
  ){
    return {
      message: 'Invalid input.'
    }
  }

  await saveMeal(meal);
  revalidatePath('/meals')
  redirect('/meals');
}


export async function postMovie(prevState, formData){
  let dateUnix = Math.floor(new Date(formData.get('release_date')).getTime() / 1000);
  const movie = {
    id: uuidv4(),
    title: formData.get('title'),
    release_date: dateUnix,
    runtime: parseInt(formData.get('runtime'),10),
    mpaa_rating: formData.get('mpaa_rating'),
    description: formData.get('description'),
    image: ""
  }

  console.log("Begin post movies with data: ", JSON.stringify(movie, null,2))
  await axios.post(localEndpoint+"/addmovie", movie, {headers: {'Content-Type': 'application/json'}})
}