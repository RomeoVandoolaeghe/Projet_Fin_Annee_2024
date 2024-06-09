import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

function Button({ title, className, to }) {
    return (
        <Link to={to} className={`button ${className}`}>
            {title}
        </Link>
    );
}

export default Button;
