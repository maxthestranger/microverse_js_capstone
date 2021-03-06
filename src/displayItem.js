import { getMeal, getAllMeals } from './meals.js';
import { getComment, createComment } from './comments.js';
import { createLike, getLike } from './likes.js';
import Like from '../images/like1.svg';

const $MEAL_URL = 'https://www.themealdb.com/api/json/v1/1';
const $COMMENT_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/AOZoRz5A07eJZQABcENB';

const modal = document.querySelector('.modal');
const body = document.querySelector('body');

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
  if (data.length) {
    com.innerHTML = `
        <div class="my-2 fs-20">Comments (${data.length})</div>
          <ul class="comment">
            ${data
    .map(
      (comment) => `<li>
                <em>${comment.creation_date}:</em>
                <span>${comment.username}</span> <i>--></i> ${comment.comment}
              </li>`,
    )
    .join('')}
          </ul>
        `;
  } else {
    com.innerHTML = 'No comments yet!';
  }
  commentDiv.innerHTML = '';
  commentDiv.appendChild(com);
});

// display Modal
export const handleModal = (e) => {
  const mealId = e.target.dataset.id;

  renderMeal(mealId, $MEAL_URL);
  renderComment($COMMENT_URL, mealId);

  body.classList.add('show');
  modal.dataset.id = mealId;
};

export const closeModal = () => {
  body.classList.remove('show');
};

// create comment
export const handleForm = (e) => {
  e.preventDefault();
  const form = e.target;
  const mealId = modal.dataset.id;
  const obj = {
    itemId: mealId,
    username: form.elements.username.value,
    comment: form.elements.comment.value,
  };

  if (obj.username !== '' && obj.comment !== '') {
    createComment(obj, $COMMENT_URL).then((data) => {
      if (data.status === 201) {
        renderComment($COMMENT_URL, mealId);
      }
    });
    form.elements.username.value = '';
    form.elements.comment.value = '';
  }
};

export const displayMeal = () => {
  getAllMeals($MEAL_URL).then((data) => {
    const mealsNumber = document.querySelector('.meals-number');
    mealsNumber.innerHTML = `${data.length} Meal(s) found!`;
    const container = document.querySelector('.meal-container');
    data.forEach((meal) => {
      const div = document.createElement('div');
      div.classList.add('meal');
      getLike($COMMENT_URL).then((data) => {
        let count = 0;
        data.forEach((d) => {
          if (d.item_id === meal.idMeal) {
            count = d.likes;
          }
        });

        div.innerHTML = `
        <img src="${meal.strMealThumb}" alt="mealPicture>
        <h3 class="meal-title">${meal.strMeal}</h3>
        <button class="btn meal-btn modal-btn" data-id=${meal.idMeal}>comment</button>
        <p class="likeNumber"> <em>${count}</em> like(s)!</p>`;
        container.appendChild(div);

        const myLike = new Image();
        myLike.src = Like;
        myLike.classList.add('likeBtn');
        myLike.setAttribute('data-id', meal.idMeal);
        div.appendChild(myLike);
      });
    });
  });
};

export const handleLikes = (e) => {
  createLike(e.target.dataset.id, $COMMENT_URL);
  const em = e.target.parentNode.querySelector('.likeNumber em');
  const counter = Number(em.innerText) + 1;

  em.innerText = counter;
};
