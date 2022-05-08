import React from "react";
import { Link } from "react-router-dom";
import i18next from "../../i18n/config"
import { useTranslation} from 'react-i18next';
import "./Home.css"

const Home = () => {

    const { t } = useTranslation();

    function handleClick(lang) {
        i18next.changeLanguage(lang)
    }

  return (
    <>
      <div className="container-spe">
        <header className="header-container">
          <div className="header-flag header-flag-size">
            <h1 style={{color: "black", fontFamily: ""}} >group performance</h1>
          </div>
          <nav>
            <ul className="header-navigation">
              <li>
                <a href="#">{t('nav.TeamLeader')}</a>
              </li>
              <li>
                <a href="#">{t('nav.Speaking')}</a>
              </li>
              <li>
                <a href="#">{t('nav.AboutUs')}</a>
              </li>
              <li>
                <a href="../html-julie/teamulator-form.html">contact</a>
              </li>
              <li className="flag-languages">

                <div className="mx-3" style={{cursor: "pointer"}} onClick={()=>{
                    handleClick('fr')
                    console.log("on clik fr activ");
                    }}>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/teamulator-ce878.appspot.com/o/assets%2Fflagfrench.jpg?alt=media&token=e664e133-c773-413c-a6ea-7161289dd7e3"
                    alt="flagfrench"
                    className="nav-language"
                  />
                </div>

                <div className="mx-3" style={{cursor: "pointer"}} onClick={()=>
                    
                    {
                        console.log("on clik en activ");
                        handleClick('en')}}>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/teamulator-ce878.appspot.com/o/assets%2FflagUSA.jpg?alt=media&token=51d00689-3464-4e72-9af1-005d33478535"
                    alt="flagusa"
                    className="nav-language"
                  />
                </div>

                <div className="mx-3" style={{cursor: "pointer"}} onClick={()=>
                    
                    {
                        console.log("on clik he activ");
                        handleClick('he')}}>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/teamulator-ce878.appspot.com/o/assets%2Fflagisrael.jpg?alt=media&token=15b85682-e022-450d-80bc-949b71904e96"
                    alt="flagIsraël"
                    className="nav-language"
                  />
                </div>

              </li>
            </ul>
          </nav>
          <main className="main-container">
            <div className="main-img-container">
              <h2>
                <span>TEAM</span>
                <em className="main-em">ULATOR™</em>
                <p>{t('header.logo.sub-title')}</p>
              </h2>
              <button className="main-btn-shape">
                    {t('header.button')}
              </button>
            </div>
          </main>
        </header>
      </div>
    </>
  );
};

export default Home;
