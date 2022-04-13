import { getMeal } from './meals.js';
import { getComment, createComment } from './comments.js';

const $MEAL_URL = 'https://www.themealdb.com/api/json/v1/1';
const $COMMENT_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/AOZoRz5A07eJZQABcENB';

const modal = document.querySelector('.modal');

// render Meal
const renderMeal = (id, url) => getMeal(id, url).then((meal) => {
  const mealDiv = document.querySelector('.meals');
  const flex = document.createElement('div');
  flex.classList.add('flex');

  flex.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div>
            <h2 class="modal-title my-2">${meal.strMeal}</h2>
            <table>
            <tbody>
                <tr>
                    <td>Category: ${meal.strCategory}</td>
                    <td>Tags: ${meal.strTags}</td>
                </tr>
                <tr>
                    <td>Origin: ${meal.strArea}</td>
                    <td>
                        Youtube:
                        <a
                        href="${meal.strYoutube}"
                        target="_blank"
                        rel="noopener noreferrer"
                        ><i class="bx bx-link-external"></i> Youtube</a
                        >
                    </td>
                </tr>
            </tbody>
            </table>
        </div>
        `;
  mealDiv.innerHTML = '';
  mealDiv.appendChild(flex);
});

// render comments
const renderComment = (url, id) => getComment(url, id).then((data) => {
  const commentDiv = document.querySelector('.comments');
  const com = document.createElement('div');
  com.innerHTML = `
        <div class="my-2 fs-20">Comments (${data.length})</div>
          <ul class="comment">
            ${data.map(
    (comment) => `<li>
                <em>${comment.creation_date}:</em>
                <span>${comment.username}</span> <i>--></i> ${comment.comment}
              </li>`,
  )}
          </ul>
        `;
  commentDiv.innerHTML = '';
  commentDiv.appendChild(com);
});

// display Modal
export const handleModal = (e) => {
  const mealId = e.target.dataset.id;

  renderMeal(mealId, $MEAL_URL);
  renderComment($COMMENT_URL, mealId);

  modal.classList.add('show');
  modal.dataset.id = mealId;
};

export const closeModal = () => {
  modal.classList.remove('show');
};

// create comment
export const handleForm = (e) => {
  const form = e.target;
  e.preventDefault();
  const obj = {
    itemId: modal.dataset.id,
    username: form.elements.username.value,
    comment: form.elements.comment.value,
  };

  createComment(obj, $COMMENT_URL);

  form.elements.username.value = '';
  form.elements.comment.value = '';
};
