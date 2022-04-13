import '../node_modules/boxicons/css/boxicons.min.css';
import './style.css';
import Icon from '../images/logo.svg';
import { handleModal, closeModal, handleForm, displayMeal } from './displayItem.js';

const logo = document.querySelector('.logo');
const myIcon = new Image();
myIcon.src = Icon;
logo.appendChild(myIcon);

const modal = document.querySelector('.modal');
const main = document.querySelector('.main');
const form = document.querySelector('form');

window.addEventListener('DOMContentLoaded', () => {
  // render all meals
  displayMeal();
  // listen to events
  main.addEventListener('click', (e) => {
    if (e.target.className.includes('modal-btn')) {
      handleModal(e);
    }
  });

  // close modal
  modal.addEventListener('click', (e) => {
    if (e.target.className.includes('bx-x')) {
      closeModal();
    }
  });

  // create comment
  form.addEventListener('submit', (e) => {
    handleForm(e);
  });
});
