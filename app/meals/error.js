'use client';
function MealError({error}) {
  return (
    <main className="error">
      <h1>An Error Occured</h1>
      <p>Failed to fetch meal data</p>
    </main>
  )
}

export default MealError