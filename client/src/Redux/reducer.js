import { GET_DATA, GET_ID, SEARCH_COUNTRY, NEXT_PAGE, PREV_PAGE, FILTER, ORDER, POPULATION, RESTORE_ORIGINAL_COUNTRIES, FILTERACT, FETCH_ACTIVITIES, SET_PAGE, CREATE_ACTIVITY} from "./actions";


//DEFINIMOS ESTADO INICIAL DE LA APP
const initialState = { 
    numPage: 1, 
    country:[],
    filteredCountry: [], 
    detail: [],
    originalCountries: [],     
    activities: [], 
    filterOriginalSearch: [],
    postActivities: [],
};

// Defino el reducer que se encarga de actualizar el estado de la aplicación
const reducer = (state = initialState, action) => {
    switch(action.type)
    {
        default:
        return state;  // Si la acción no coincide con ninguna de las opciones, se devuelve el estado actual
        case GET_DATA:
           return{
                ...state,
                country : action.payload,
                originalCountries: action.payload,    // Se actualiza el estado de los paises
            }
        case GET_ID:
            return{
                ...state,
                detail:action.payload       // Se actualiza el estado de los detalles de un país
            }
      
        case SEARCH_COUNTRY:
            return {
                ...state,
                filterOriginalSearch: action.payload,
                country: action.payload,   // Se actualiza el estado de los países con los países buscados
            };
        case NEXT_PAGE:
            return {
                ...state,
                numPage: state.numPage + 1   // Se aumenta el número de página
            }

        case PREV_PAGE:
            return {
                ...state,
                numPage: state.numPage - 1 // Se disminuye el número de página
            }
        case SET_PAGE:
            return {
                ...state,
                numPage: 1 // Setea pagina en 1
            }
            
        case FILTER:
            const originalCountries = state.originalCountry || state.country 
            const newFilter = originalCountries.filter((c) => c.continent === action.payload)
                return {
                  ...state,
                  country: newFilter,    // Se actualiza el estado de los países con los países filtrados
                  originalCountry: originalCountries,
                }

        case RESTORE_ORIGINAL_COUNTRIES:
                return {
                    ...state,
                    country: [...state.originalCountry] || [...state.country],    // Se restaura el estado de los países originales
                    originalCountry: null,
                    };

        case ORDER:
                const newOrder = state.country.sort((a, b) => {
                const firstLetterA = a.name.charAt(0).toUpperCase();
                const firstLetterB = b.name.charAt(0).toUpperCase();
                    
                    return firstLetterA.localeCompare(firstLetterB);
                    });
                    
                    if (action.payload === "descendent") {
                        newOrder.reverse();
                    }
                    
                    return {
                        ...state,
                        order: newOrder,
                    };

  
            case POPULATION:

            let newP = [];
        
            if( action.payload ==="ascendent" )
            {
                newP = state.country.sort((a, b) => {
                    // Si la acción es ascendent, se ordena de forma ascendente, de lo contrario, se ordena de forma descendente
                    if(a.poblation < b.poblation) {
                        return 1;                       
                    }
                    if(a.poblation > b.poblation) {
                        return -1;
                    }
                    return 0;
        
                });
            }
            else
            {   newP = state.country.sort((a, b) => {   // Utilizo el método "sort()" del array "state.country" para ordenar los objetos según su propiedad "poblation"
                    if(a.poblation < b.poblation) { 
                        return -1;
                    }
                    if(a.poblation > b.poblation) {
                        return  1;
                    }
                    // Si ambos valores son iguales, la función devuelve 0, lo que indica que el orden no importa
                    return 0;
        
                });
            }
            // Se devuelve el nuevo estado con la lista de países ordenada según la población
            return {
                ...state,
                poblation: [...newP],
            };

            case CREATE_ACTIVITY:
                return {
                ...state,
                postActivities: action.payload
            };
            
            case FETCH_ACTIVITIES:
                return {...state, 
                activities: action.payload} // Actualizamos el estado con las actividades 
        
        
            case FILTERACT:
                const filteredCountries = state.originalCountries.filter((c) =>{
                 if(c.Activities.find((a) => a.name === action.payload))
                 return c;}
                 );
                  
                return {
                    ...state,
                    filteredCountry: filteredCountries,
                    country: [...filteredCountries],
                };}
        
    }

    
export default reducer;