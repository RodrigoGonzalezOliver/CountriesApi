import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, orderCountries, filterPopulation, filterContinent, filterActCountry, fetchActivities, restoreOriginalCountries, setPage } from "../Redux/actions";
import Card from "./Card";
import Style from "../styles/home.module.css";
import Paginate from "./Paginate";

 const Home = ({ countries }) => {
   const { numPage } = useSelector((state) => state);
   const dispatch = useDispatch();
   const activities = useSelector((state) => state.activities);
   const [selectedFilter, setSelectedFilter] = useState("");
   const [search, setSearch] = useState("");

   let init = (numPage - 1) * 10;
   let end = numPage * 10;
   let cantPage = Math.floor(countries.length / 10);
      useEffect(() => {
     dispatch(fetchActivities());
   }, [dispatch]);

   const handleDeleteSearch = () => {
     setSearch("");
     dispatch(getCountries());
   };

   const handleSelect = (e) => {
    const { value } = e.target;
    setSelectedFilter(value);
    if (value === "Activities") {
      handleDeleteSearch();
    } else {
      dispatch(filterActCountry(value));
    }
  };

   const handleOrder = (e) => {
     const { value } = e.target;
     dispatch(orderCountries(value));
   };

   const populationF = (e) => {
     const { value } = e.target;
     dispatch(filterPopulation(value));
   };

   const handleFilterContinent = (e) => {
     const continent = e.target.value;
     if (continent === "ALL") {
       dispatch(restoreOriginalCountries());
       dispatch(setPage(1))
     } else {
       dispatch(setPage(1))
       dispatch(filterContinent(e));
     }
   };

   return (
     <div className={Style.container}>
             <div className={Style.filters}>
         <select
           className={Style.selector}
           onChange={handleOrder}
           name="order"
           defaultValue={"DEFAULT"}
         >
           <option value="DEFAULT" disabled>
             Select order
           </option>
           <option value="ascendent">Ascendent</option>
           <option value="descendent">Descendent</option>
         </select>
         <select
           className={Style.selector}
           onChange={populationF}
           name="pop"
           defaultValue={"DEFAULT"}
         >
           <option value="DEFAULT" disabled>
             Population
           </option>
           <option value="ascendent">High</option>
           <option value="descendent">Low</option>
         </select>
       
      
       <select
         className={Style.selector}
         onChange={handleFilterContinent}
         name="filter"
         defaultValue={"DEFAULT"}
       >
         <option value="ALL">All Continents</option>
         <option value="Asia">Asia</option>
         <option value="Antarctica">Antarctica</option>
         <option value="Africa">Africa</option>
         <option value="North America">North America</option>
         <option value="South America">South America</option>
         <option value="Europe">Europe</option>
         <option value="Oceania">Oceania</option>
       </select>

       <select
         className={Style.selector}
         onChange={handleSelect}
         value={selectedFilter}
       >
         <option value="Activities">Activities</option>
         {activities.map((activity) => (
           <option key={activity.id} value={activity.name}>
             {activity.name}
           </option>
         ))}
       </select>
       </div>
       <div className={Style.countries}>
         {countries.slice(init, end).map((country) => {
           return (
             <Card
               flag={country.flag}
               name={country.name}
               continent={country.continent}
               key={country.id}
               id={country.id}
             />
           );
         })}
       </div>
       <div className={Style.jhon}>
         <Paginate cantPage={cantPage} />
       </div>
     </div>
   );
 };

 export default Home;


// import Card from "./Card";
// import Style from "../styles/home.module.css";
// import Paginate from "./Paginate";
// import { useSelector } from "react-redux";

// const Home = ({ countries }) => {
//   const { numPage } = useSelector((state) => state);

//   let init = (numPage - 1) * 10;
//   let end = numPage * 10;
//   let cantPage = Math.floor(countries.length / 10);

//   return (
//     <div className={Style.container}>
//       <div className={Style.countries}>
//         {countries.slice(init, end).map((country) => {
//           return (
//             <Card
//               flag={country.flag}
//               name={country.name}
//               continent={country.continent}
//               key={country.id}
//               id={country.id}
//             />
//           );
//         })}
//       </div>
//       <div className={Style.jhon}>
//         <Paginate cantPage={cantPage} />
//       </div>
//     </div>
//   );
// };

// export default Home;