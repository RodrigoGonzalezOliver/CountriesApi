import axios from "axios";
export const GET_DATA = 'GET_DATA';
export const GET_ID = 'GET_ID';
export const SEARCH_COUNTRY = 'SEARCH_COUNTRY';
export const NEXT_PAGE = "NEXT_PAGE";
export const PREV_PAGE = "PREV_PAGE";
export const FILTER = "FILTER";
export const ORDER = "ORDER";
export const POPULATION = "POPULATION";
export const RESTORE_ORIGINAL_COUNTRIES = "RESTORE_ORIGINAL_COUNTRIES";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const FETCH_ACTIVITIES = "FETCH_ACTIVITIES";
export const FILTERACT = "FILTERACT";
export const SET_PAGE = "SET_PAGE";


export const getCountries = () => {
    
    return async function(dispatch){
    const response = await axios.get("http://localhost:3001/countries");
     
  try{
    console.log(response.data)
    dispatch({type: GET_DATA,payload:response.data});
  }
  catch(err)
  {
    console.log(err.message);
  }}
}



export const getCountryById = (id) => {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/countries/${id}`);

    try {
      dispatch({ type: GET_ID, payload: response.data });
    } catch (err) {
      console.log(err.message);
    }
  };
};


export const searchCountry = (name) => {
  let test = name.toLowerCase();
  test = test.charAt(0).toUpperCase()+test.substring(1);
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/countries/name/${test}`);
      dispatch({ type: SEARCH_COUNTRY, payload: response.data });
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const nextPage = () => {
  return {
    type: NEXT_PAGE,
  }
}

export const prevPage = () => {
  return {
    type: PREV_PAGE,
  }
}

export const setPage = (page) => {
  return {
    type: SET_PAGE,
    payload: page
  }
}


/// filtercountries -> continent
export const filterCountries = (continent) => {
  return {
    type: FILTER,
    payload: continent
  }
}

export const restoreOriginalCountries = () => {
  return {
    type: RESTORE_ORIGINAL_COUNTRIES
  }
}

// filterContinent, Restaurar todos los continentes
export const filterContinent = (e) => {
  const continent = e.target.value;
  if (continent === "ALL") {
    return restoreOriginalCountries();
  } else {
    return filterCountries(continent);
  }
}

// order descendentemente los países por orden alfabético y por cantidad de población.
export const orderCountries = (order) => {
  return {
    type: ORDER,
    payload: order
  }
}


/// order filter X population
export const filterPopulation = (population) => {
  return {
    type: POPULATION,
    payload: population
  }
}

export const createActivity = (activity) => {
  return async function (dispatch) {
    try {
      const response = await axios.post("http://localhost:3001/activities", activity);
      const responseData = response.data;
      console.log(responseData);
      dispatch({ type: CREATE_ACTIVITY, payload: responseData });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const fetchActivities = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/activities");
      const activities = response.data;
      console.log(activities);
      dispatch({ type: FETCH_ACTIVITIES, payload: activities });
    } catch (error) {
      console.error(error);
    }
  };
};


export const filterActCountry = (activity) => {
  return {type: FILTERACT, payload: activity}}


//////////////////////ACTIVITIES//////////////////////////
/*export const createActivity =  (activity) => {
  return async function (dispatch) {
  const response = await fetch('http://localhost:3001/activities', {method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(activity)
    });
    const responsJson = await response.json();


      try{
        console.log(responsJson)
        dispatch({type:CREATE_ACTIVITY,payload:responsJson});
      }
      catch(err)
      {
        console.log(err.message);
      }}
}
  

//FILTER activities

export const fetchActivities = () => {
  return async (dispatch) => {
    
    try {
      const response = await fetch("http://localhost:3001/activities");
      const activities = await response.json();
      console.log(activities)
      dispatch({ type: FETCH_ACTIVITIES,  payload: activities });
    } catch (error) {
      console.error(error);
    }
  };
};
*/
