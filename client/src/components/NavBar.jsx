import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountries,searchCountry } from "../Redux/actions";
import { Link } from "react-router-dom";
import styles from "../styles/navBar.module.css";
import { SearchBar } from "./SearchBar";

const NavBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleDeleteSearch = () => {
    setSearch("");
    dispatch(getCountries());
  };

  const handleSearch = (name) => {
    dispatch(searchCountry(name));
  };

  return (
    <nav className={styles.navbar}>
      <h3>Countries APP</h3>
      <SearchBar onSearch={handleSearch} className={styles.searchBar} />
      <button className={styles.button} onClick={handleDeleteSearch}>
        DELETE SEARCH
      </button>

      <ul className={styles.navbarMenu}>
        <li className={styles.navbarItem}>
          <Link to="/home" className={styles.h1}>
            HOME
          </Link>
        </li>

        <li className={styles.navbarItem}>
          <Link to="/activities" className={styles.h1}>
            CREATE ACTIVITY
          </Link>
        </li>
        <li className={styles.navbarItem}>
          <Link to="/about" className={styles.h1}>
            ABOUT
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;


// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import {
//   getCountries,
//   searchCountry,
//   filterPopulation,
//   fetchActivities,
//   orderCountries,
//   filterActCountry,
//   filterContinent,
//   restoreOriginalCountries, // Agregado
// } from "../Redux/actions";
// import { Link } from "react-router-dom";
// import styles from "../styles/navBar.module.css";
// import { SearchBar } from "./SearchBar";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";

// const NavBar = () => {
//   const dispatch = useDispatch();
//   const [search, setSearch] = useState("");
//   const [selectedFilter, setSelectedFilter] = useState("");

//   const activities = useSelector((state) => state.activities);

//   useEffect(() => {
//     dispatch(fetchActivities());
//   }, [dispatch]);

//   const handleDeleteSearch = () => {
//     setSearch("");
//     dispatch(getCountries());
//   };

//   const handleSearch = (name) => {
//     dispatch(searchCountry(name));
//   };

//   const handleSelect = (e) => {
//     const { value } = e.target;
//     setSelectedFilter(value);
//     if (value === "Activities") {
//       handleDeleteSearch();
//     } else {
//       dispatch(filterActCountry(value));
//     }
//   };

//   const handleOrder = (e) => {
//     const { value } = e.target;
//     dispatch(orderCountries(value));
//   };

//   const populationF = (e) => {
//     const { value } = e.target;
//     dispatch(filterPopulation(value));
//   };

//   const handleFilterContinent = (e) => {
//     const continent = e.target.value;
//     if (continent === "ALL") {
//       dispatch(restoreOriginalCountries());
//     } else {
//       dispatch(filterContinent(e));
//     }
//   };

//   return (
//     <nav className={styles.navbar}>
//       <h3>Countries APP</h3>
//       <SearchBar onSearch={handleSearch} className={styles.searchBar} />
//       <button className={styles.button} onClick={handleDeleteSearch}>
//         DELETE SEARCH
//       </button>
//       <div className={styles.filters}>
//         <select
//           className={styles.selector1}
//           onChange={handleOrder}
//           name="order"
//           defaultValue={"DEFAULT"}
//         >
//           <option value="DEFAULT" disabled>
//             Select order
//           </option>
//           <option value="ascendent">Ascendent</option>
//           <option value="descendent">Descendent</option>
//         </select>
//         <select
//           className={styles.selector1}
//           onChange={populationF}
//           name="pop"
//           defaultValue={"DEFAULT"}
//         >
//           <option value="DEFAULT" disabled>
//             Population
//           </option>
//           <option value="ascendent">High</option>
//           <option value="descendent">Low</option>
//         </select>
//       </div>

//       <select
//         className={styles.selector2}
//         onChange={handleFilterContinent}
//         name="filter"
//         defaultValue={"DEFAULT"}
//       >
//         <option value="ALL">All Continents</option>
//         <option value="Asia">Asia</option>
//         <option value="Antarctica">Antarctica</option>
//         <option value="Africa">Africa</option>
//         <option value="North America">North America</option>
//         <option value="South America">South America</option>
//         <option value="Europe">Europe</option>
//         <option value="Oceania">Oceania</option>
//       </select>

//       <select
//         className={styles.selector2}
//         onChange={handleSelect}
//         value={selectedFilter}
//       >
//         <option value="Activities">Activities</option>
//         {activities.map((activity) => (
//           <option key={activity.id} value={activity.name}>
//             {activity.name}
//           </option>
//         ))}
//       </select>

//       <ul className={styles.navbarMenu}>
//         <li className={styles.navbarItem}>
//           <Link to="/home" className={styles.h1}>
//             HOME
//           </Link>
//         </li>

//         <li className={styles.navbarItem}>
//           <Link to="/activities" className={styles.h1}>
//             CREATE ACTIVITY
//           </Link>
//         </li>
//         <li className={styles.navbarItem}>
//           <Link to="/about" className={styles.h1}>
//             ABOUT
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default NavBar;

/*import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/navBar.module.css";
import { SearchBar } from "./SearchBar";
import { useDispatch } from "react-redux";
import { searchCountry, restoreOriginalCountries } from "../Redux/actions";

const NavBar = () => {
  const dispatch = useDispatch();

  const handleSearch = (name) => {
    dispatch(searchCountry(name));
  };

  const handleDeleteSearch = () => {
    dispatch(restoreOriginalCountries());
  };

  return (
    <nav className={styles.navbar}>
      <h3>Countries APP</h3>
      <SearchBar onSearch={handleSearch} className={styles.searchBar} />
      <button className={styles.button} onClick={handleDeleteSearch}>
        DELETE SEARCH
      </button>
      <ul className={styles.navbarMenu}>
        <li className={styles.navbarItem}>
          <Link to="/home" className={styles.h1}>
            HOME
          </Link>
        </li>
        <li className={styles.navbarItem}>
          <Link to="/activities" className={styles.h1}>
            CREATE ACTIVITY
          </Link>
        </li>
        <li className={styles.navbarItem}>
          <Link to="/about" className={styles.h1}>
            ABOUT
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;*/