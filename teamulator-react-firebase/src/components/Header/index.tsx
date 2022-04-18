import React from 'react';

// Images
import Logo from '../../assets/images/Logo_solajump1.png'
// Utils
//import { useTranslation } from 'react-i18next';

// Style
import './styles.scss';




function Header() {
 // const { t } = useTranslation();

  return <div className="header d-flex justify-content-between">
    <div className="logo">
      <div className="logo-section">
        <a href="/">
          <img src={Logo} alt="" />
        </a>
      </div>
    </div>
  </div>
}

export default Header;