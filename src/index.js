import '../node_modules/boxicons/css/boxicons.min.css';
import './style.css';

// modules
import { handleModal, closeModal } from './displayItem.js';

const modal = document.querySelector('.modal');

const main = document.querySelector('.main');

window.addEventListener('DOMContentLoaded', () => {
  // render all meals

  // listen to events
  main.addEventListener('click', (e) => {
    if (e.target.className.includes('modal-btn')) {
      handleModal(e);
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target.className.includes('bx-x')) {
      closeModal();
    }
  });
});
