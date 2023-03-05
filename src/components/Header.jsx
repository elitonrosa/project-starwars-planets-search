import React from 'react';

import logo from '../assets/svg/logo.svg';
import '../styles/Header.module.sass';

function Header() {
  return (
    <header>
      <img src={ logo } alt="Logo Star Wars" />
    </header>
  );
}

export default Header;
