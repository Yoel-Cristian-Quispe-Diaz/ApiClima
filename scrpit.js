const resultado = document.querySelector('.resultado');
const formulario = document.querySelector('.obtener-clima');
const nombreCiudad = document.querySelector('#ciudad');

formulario.addEventListener('submit', (e) => {
    e.preventDefault(); 
    llamarAPI(nombreCiudad.value);
});

function llamarAPI(ciudad){
    const claveApi = '41d1d7f5c2475b3a16167b30bc4f265c';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${claveApi}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            if (datos.cod === '404') {
                mostrarError('Ciudad no encontrada...Intente nuevamente, o pruebe sin espacios');
            } else {
                limpiarHTML();
                console.log(datos);
                mostrarClima(datos);
            }
        })
        .catch(error => console.error('Error en la API:', error));
}

function mostrarClima(datos){
    document.getElementById("cont").style.display = "block";
    const {name, main: {temp, temp_min, temp_max}, weather: [detalles], sys:{country}} = datos;

    const grados = kelvinACentigrados(temp);
    const min = kelvinACentigrados(temp_min);
    const max = kelvinACentigrados(temp_max);

    const contenido = document.createElement('div');    
    contenido.innerHTML = `
        <h5>Clima en ${name}</h5>
        <h6>Pais: ${country} </h6>
        <img src="https://openweathermap.org/img/wn/${detalles.icon}@2x.png" alt="icon">
        <h2>${grados}°C</h2>
        <p>Max: ${max}°C</p>
        <p>Min: ${min}°C</p>
    `;

    resultado.appendChild(contenido);


}

function mostrarError(mensaje){
    const alerta = document.createElement('p');
    alerta.classList.add('mensaje-alerta');
    alerta.textContent = mensaje;
    formulario.appendChild(alerta);

    setTimeout(() => alerta.remove(), 3000);
}

// Función para convertir Kelvin a Celsius
function kelvinACentigrados(temp){
    return parseInt(temp - 273.15); 
    
   
}





// Función para limpiar resultados anteriores
function limpiarHTML(){
    resultado.innerHTML = '';
}
