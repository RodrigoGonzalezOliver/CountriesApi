import { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getCountries } from "./Redux/actions.js";
import Detail from "./components/Detail.jsx";
import LandingPage from "./components/LandingPage.jsx";
import About from "./components/About.jsx";
import NavBar from "./components/NavBar.jsx";
import Home from "./components/Home.jsx";
import CreateAct from "./components/CreateAct.jsx";
import axios from 'axios';
//import './App.css'

function App() {
  const dispatch = useDispatch();
  const location = useLocation(); // Hook de react-router-dom para obtener la ubicación actual
  const [showNavbar, setShowNavbar] = useState(true); // Estado local para controlar si se muestra o no la barra de navegación

  useEffect(() => {
    dispatch(getCountries()); // Llamo a getCountries de Redux usando dispatch.
  }, []);

  const countries = useSelector((state) => state.country); // Obtiene el estado de los países de Redux usando useSelector hook de Redux.


  useEffect(() => {
    if (location.pathname === "/") { // Compara la ubicación actual con la ruta de la página de aterrizaje "/"
      setShowNavbar(false); // Si la ubicación es la de la página /, oculta la barra de navegación
    } else {
      setShowNavbar(true); // Si la ubicación es distinta a la de la página /, muestra la barra de navegación
    }
  }, [location]);



  function onSearch(searchCountry, dispatch) {
    
       axios.get(`http://localhost:3001/countries?name=${searchCountry}`)
      .then((response) => {
        if (response && response.data && response.data.name) {    // Verificamos si se obtuvo una respuesta valida y si el nombre del pais se encuentra en la respuesta
          dispatch(searchCountry(response.data.name));
        }
     })
      .catch((error) => {
      console.error(error);
     });
  }
  


  return (
    <div className="App">
      {showNavbar && <NavBar onSearch={onSearch} />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home countries={countries} />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/activities" element={<CreateAct />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;