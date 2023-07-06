import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCountryById } from "../Redux/actions"
import style from "../styles/detail.module.css"
import { Link } from 'react-router-dom';

const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();// Se utiliza el hook useParams para obtener el id del pais que se quiere mostrar.
    console.log(id)
    const country = useSelector((state) => state.detail);// obtenengo la informacion del pais desde el estado global
  
    useEffect(() => { //useEffect para realizar una accion cuando se monta o se actualiza el componente.
      dispatch(getCountryById(id));  
    }, [dispatch, id]); // Especifico que la accion se debe realizar cuando el id o el dispatch cambien.

    return (
      <div className={style.detail}>
      <div key={country.id} className={style.container}>
      <Link to = "/home" className = {style.backButton}>back</Link>
        <img src={country.flag} alt={country.flag} className={style.flag} />
        <div className={style.info}>
          <h1 className={style.name}>{country.name} </h1>
          <h3 className={style.h3}>ID: {country.id}</h3>
          <h3 className={style.h3}>Continent: {country.continent}</h3>
          <h3 className={style.h3}>Capital: {country.capital}</h3>
          <h3 className={style.h3}>Subregion: {country.subregion}</h3>
          <h3 className={style.h3}>Area: {country.area} km2</h3>
          <h3 className={style.h3}>Poblation: {country.poblation}</h3>
        </div>
      </div>
      </div>
    );
};

export default Detail;