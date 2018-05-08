import './css/style.css';
import app from './js/animation.js';

function component() {
  var element = document.createElement('div');
  element.setAttribute("id", "mgacontainer");

  element.classList.add('backgr1');
  
  var animelem = app(1);

  return element;
}

document.body.appendChild(component());