export const validate = (data) =>{
    const regexActivity = /^[a-zA-Z\s]*$/;
    const regexCheckNumber = /[1-9]+$/;


    // Objeto que almacena el estado de validacion de cada campo.
    var obj ={
        name: false,
        duration: false,
        difficulty: false,
        allokay: false,
        country: false,
        choosenSeason: false,
    }

    // Valida que el nombre de la actividad cumpla con la expresion regular, tenga una longitud mayor a cero y menor a doce caracteres.
    if(regexActivity.test(data.name) && data.name.length > 0 && data.name.length < 12)
    obj.name = true; 

    // Valida que la dificultad de la actividad sea un nomero mayor a cero y menor o igual a 3.
    if(regexCheckNumber.test(data.difficulty) && data.difficulty > 0 && data.difficulty <= 5)
    obj.difficulty = true;

    // Valida que la duracion de la actividad sea un número mayor a cero y menor o igual a 24.
    if(regexCheckNumber.test(data.duration) && data.duration > 0 && data.duration <= 24)
    obj.duration = true;


   // Valida que se haya seleccionado al menos un pais para la actividad.
    if (data.countries.length > 0) {
        obj.country = true;
      } else {
        obj.country = false;
      }

    // Valida que se haya seleccionado al menos una temporada para la actividad.
      if (data.choosenSeason.length > 0) {
        obj.choosenSeason = true;
      } else {
        obj.choosenSeason = false;
      }


      // Verifica que todos los campos requeridos hayan pasado la validacion.
      if (obj.name && obj.difficulty && obj.duration && obj.country && obj.choosenSeason)
      obj.allokay = true;
    else
      obj.allokay = false;


    // Retorna el objeto con el estado de validacion de cada campo.
    return obj;
}