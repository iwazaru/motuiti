import React from 'react';

import SearchFrom from './SearchForm';

import './Header.css';

export default function Header(props) {
  return (
    <div className="Header">
      <div className="title">
        <a href="https://motuiti.iwzr.fr">motuiti</a>
      </div>
      <SearchFrom {...props} />
    </div>
  );
}
