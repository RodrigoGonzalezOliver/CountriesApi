import React from 'react';
import { Link } from 'react-router-dom';
import style from "../styles/landingPage.module.css"

const LandingPage = () => {
  return (
    <div className={style.landing}>
      <h1 className={style.h1}>Welcome to the countries api</h1>
      <h2 className={style.p}>The best website to find information about your favorite countries</h2>
    <div className={style.div}>
    <Link to="/home">
    <button className={style.button}>Explore</button>
    </Link>
   </div>
   </div>
  );
};

export default LandingPage;