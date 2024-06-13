import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

window.myMenuFin = function() {
  var i = document.getElementById("navMenu");
  if (i.className === "nav-menu") {
    i.className += " responsive";
  } else {
    i.className = "nav-menu";
  }
};

window.login = function() {
  var a = document.getElementById("loginBtn");
  var b = document.getElementById("registerBtn");
  var c = document.getElementById("login");
  var d = document.getElementById("register");
  c.style.left = "4px";
  d.style.left = "-520px";
  a.className += " white-btn";
  b.className = "btn";
  c.style.opacity = 1;
  d.style.opacity = 0;
};

window.register = function() {
  var a = document.getElementById("loginBtn");
  var b = document.getElementById("registerBtn");
  var c = document.getElementById("login");
  var d = document.getElementById("register");
  c.style.left = "-510px";
  d.style.left = "5px";
  b.className += " white-btn";
  a.className = "btn";
  c.style.opacity = 0;
  d.style.opacity = 1;
};




