// get specific meal
export const getMeal = async (mealId, url) => {
  let data = null;
  await fetch(`${url}/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((d) => {
      data = d.meals;
    });
  return data[0];
};

export const getAllMeals = async (url) => {
  await fetch(`${url}/filter.php?i=chicken_breast`).then((res) => res.json());
};
