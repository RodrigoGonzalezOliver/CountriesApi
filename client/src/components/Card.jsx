import style from "../styles/card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
    console.log(props);
    return (
      <div className={style.card}>
        <img src={props.flag} alt={`Bandera de ${props.name}`} className={style.img} />
        <p className={style.name}>Name: {props.name}</p>
        <p className={style.continent}>Continent: {props.continent}</p>
        <Link to={`/detail/${props.id}`} className={style.link}>View detail</Link>
        
      </div>
    );
  };
  
export default Card;