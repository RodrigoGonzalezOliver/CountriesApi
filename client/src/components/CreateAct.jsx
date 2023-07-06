import { useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { validate } from "./Validate";
import {createActivity} from "../Redux/actions"
import style from "../styles/createAct.module.css"
import { useNavigate } from "react-router-dom";


const CreateAct = () => {

const postData = useSelector((state)=> state.postActivities);
const dispatch = useDispatch();
const navigate = useNavigate();


  // hago un useState que contiene los datos de la actividad que se va a crear
 const [data, setData] = useState({name: "", difficulty: 0, duration: 0, season: ["Verano","Otoño","Invierno","Primavera"], countries: [], choosenSeason: []});


  
  const handleChange = (e) => {
    console.log(data.countries)
    setData({
      ...data,
     [e.target.name] : e.target.value,   // Se define una función handleChange que actualiza el estado "data"

  });
  }


const handleSelect = (e) => {
  const selectedSeason = e.target.value;
  if (!data.choosenSeason.includes(selectedSeason)) {
    setData({
      ...data,
      choosenSeason: [...data.choosenSeason, selectedSeason] // Si la estaciin seleccionada no esta incluida en el array "choosenSeason" de "data", se agrega a este array
    });
  }
}

//  Utilizo useSelector()para obtener el array de países del store
const country = useSelector((state) => state.country);
  
 


  const handleCountries = (e) => {
    let dataFromSelect = e.target.value.split(",");     // Divido la opcion seleccionada en dos partes utilizandosplit, iso del pais y name
    console.log(dataFromSelect[1])
     if (!data.countries.includes(dataFromSelect[1])) { // Si el nombre del pais no esta incluido en el array "countries" de "data", se agrega a este array
       setData({
        ...data,
        countries: [...data.countries, dataFromSelect[1]]
     });
     }
  };

   
  
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createActivity(data))
    alert("Activity Created")
    setTimeout(function() {
      window.location.reload();
    }, 2000);
  }



  return (
    <div className={style.body}>
    <form onSubmit={handleSubmit} className={style.form}>
      <h2 className={style.tittle}>Create Activity:</h2>

      <h3 className={style.subtitulos}>Activity Name:</h3>
      <div>
        <input className={style.input}
         placeholder=""
          name="name"
          onChange={handleChange}
          value={data.name}
        />
        {validate(data).name ? <p className={style.pokay}>Okay</p> : <p className={style.pbad}>Put Name. Only letters(13max)</p>}
      </div>

      <h1 className={style.subtitulos}>Difficulty:</h1>
      <div>
        <input className={style.input}
         placeholder=""
          name="difficulty"
          onChange={handleChange}
          value={data.difficulty}
        />
        {validate(data).difficulty ? <p className={style.pokay}>Okay</p> : <p className={style.pbad}>Put difficulty. 1(very easy), 2(easy), 3(medium), 4(hard), 5(very hard)</p>}
      </div>

      <h1 className={style.subtitulos}>Duration:</h1>
      <div>
        <input  className={style.input}
           placeholder=""
          name="duration"
          onChange={handleChange}
          value={data.duration}
        />
        {validate(data).duration ? <p className={style.pokay}>Okay</p> : <p className={style.pbad}>Put duration in hours(24hours/format)</p>}
      </div>

      <h1 className={style.subtitulos}>Season:</h1>
      <div>
        <select onChange={handleSelect}>
          <option readOnly disabled selected>Seasons</option>
          {data.season.map((s, index) => (
            <option value={s} key={index}>
              {s}
            </option>
          ))}
        </select>
        <input className={style.input}
          placeholder=""
          value={data.choosenSeason}
          readOnly
        />
      </div>


      <h1 className={style.subtitulos}>Countries:</h1>
      <div>
        <select onChange={handleCountries}>
          <option readOnly disabled selected>Countries</option>
          {country.map((d) => (
            <option value={[d.name, d.id]} key={d.id}>
              {d.name}
            </option>
          ))}
        </select>
        <input value={data.countries} className={style.input} readOnly />
        {console.log(validate(data).country)}
        {validate(data).allokay ? (
         <div>
          <button type= "submit" className={style.btn}>CREATE</button>
          </div>
        ) : null}
      </div>
    </form>
    </div>
  );
 
};

export default CreateAct;