import { useState } from "react";
import style from "../styles/searchBar.module.css";
import { connect } from 'react-redux';
import { searchCountry, setPage } from '../Redux/actions';

const mapDispatchToProps = {
  onSearch: searchCountry,
  onSetPage: setPage
};

export const SearchBar = connect(null, mapDispatchToProps)(({ onSearch, onSetPage }) => {
  const [searchCountryInput, setSearchCountryInput] = useState('');

  const handleInputChange = (event) => {
    setSearchCountryInput(event.target.value);
  };

  const handleSubmit = (event) => {

    event.preventDefault();
    onSetPage(1); // Restablecer la página a 1 antes de realizar la búsqueda
    onSearch(searchCountryInput).then((response) => {
    }).catch((error) => {
      console.error(error);
    });

  };

  return (
    <form onSubmit={handleSubmit} className={style["search-container"]}>
      <input
        type="text"
        placeholder=""
        value={searchCountryInput}
        onChange={handleInputChange}
        className={style["search-input"]}
      />
      <button type="submit" className={style["search-button"]}>Search</button> 
    </form>
  );
});

// import { useState } from "react";
// import style from "../styles/searchBar.module.css";
// import { connect } from 'react-redux';
// import { searchCountry, setPage } from '../Redux/actions';

// // Importamos las acciones searchCountry y setPage de actions.js y las asignamos a las propiedades onSearch y onSetPage en mapDispatchToProps
// const mapDispatchToProps = {
//   onSearch: searchCountry,
//   onSetPage: setPage
// };

// // Exportamos la versión conectada del componente SearchBar
// export const SearchBar = connect(null, mapDispatchToProps)(({ onSearch, onSetPage }) => {
//   // Define el estado local searchCountryInput y setSearchCountryInput para actualizar el valor del input del usuario
//   const [searchCountryInput, setSearchCountryInput] = useState('');

//   // Manejo el cambio en el valor de entrada del usuario y actualizamos el estado local
//   const handleInputChange = (event) => {
//     setSearchCountryInput(event.target.value);
//   };

//   // Maneja el envío del formulario y llama a la acción onSearch definida en mapDispatchToProps con la entrada de búsqueda del usuario
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Seteamos la página a 1 antes de realizar la búsqueda
//     onSetPage(1);
//     onSearch(searchCountryInput).then((response) => {
//     }).catch((error) => {
//       console.error(error);
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit} className={style["search-container"]}>
//       <input
//         type="text"
//         placeholder=""
//         value={searchCountryInput}
//         onChange={handleInputChange}
//         className={style["search-input"]}
//       />
//       <button type="submit" className={style["search-button"]}>Search</button> 
//     </form>
//   );
// });