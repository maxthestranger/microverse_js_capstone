import './style.css';
import Icon from '../images/logo.svg';

const logo = document.querySelector('.logo');
const myIcon = new Image();
myIcon.src = Icon;
logo.appendChild(myIcon);