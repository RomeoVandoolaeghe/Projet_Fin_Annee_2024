import React from 'react';
import Navbar1 from '../../components/Navbar1/Navbar1';
import FormBox from '../../components/FormBox/FormBox.jsx';
import './Login.css';

const Login = () => {
  return (
    <div className="wrapper">
      <Navbar1 />
      <FormBox />
    </div>
  );
};

export default Login;
