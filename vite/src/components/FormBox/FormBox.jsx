import React from 'react';
import './FormBox.css';

const FormBox = () => {
  return (
    <div className="form-box">
      <div className="login-container" id="login">
        <div className="top">
          <span>Don't have an account? <a href="#" onClick={() => window.register()}>Sign Up</a></span>
          <header>Login</header>
        </div>
        <div className="input-box">
          <input type="text" className="input-field" placeholder="Username or Email" />
          <span className="material-symbols-outlined">mail</span>
        </div>
        <div className="input-box">
          <input type="password" className="input-field" placeholder="Password" />
          <span className="material-symbols-outlined">lock</span>
        </div>
        <div className="input-box">
          <input type="submit" className="submit" value="Sign In" />
        </div>
        <div className="two-call">
          <div className="one">
            <input type="checkbox" id="register-check" />
            <label htmlFor="register-check">Remember Me</label>
          </div>
          <div className="two">
            <label><a href="#">Forgot password?</a></label>
          </div>
        </div>
      </div>
      <div className="register-container" id="register">
        <div className="top">
          <span>Have an account? <a href="#" onClick={() => window.login()}>Login</a></span>
          <header>Sign Up</header>
        </div>
        <div className="two-forms">
          <div className="input-box">
            <input type="text" className="input-field" placeholder="Firstname" />
            <span className="material-symbols-outlined">person</span>
          </div>
          <div className="input-box">
            <input type="text" className="input-field" placeholder="Lastname" />
            <span className="material-symbols-outlined">person</span>
          </div>
        </div>
        <div className="input-box">
          <input type="text" className="input-field" placeholder="Email" />
          <span className="material-symbols-outlined">mail</span>
        </div>
        <div className="input-box">
          <input type="password" className="input-field" placeholder="Password" />
          <span className="material-symbols-outlined">lock</span>
        </div>
        <div className="input-box">
          <input type="submit" className="submit" value="Sign Up" />
        </div>
        <div className="two-call">
          <div className="one">
            <input type="checkbox" id="login-check" />
            <label htmlFor="login-check">Remember Me</label>
          </div>
          <div className="two">
            <label><a href="#">Terms & Conditions</a></label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormBox;
