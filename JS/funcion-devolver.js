// Funcion par devolver el auto

function devolverAuto(){

  container.innerHTML = '';
  containerAlquiler.innerHTML = '';
  
  const formularioDevolver = document.createElement('form');
  formularioDevolver.className = 'formulario-devolver';

  
  const textoDominio = document.createElement('p');
  textoDominio.innerText = 'Dominio del vehiculo a devolver'
  textoDominio. className = 'texto-dominio'
  
  
  const ingresarDominio = document.createElement('input');
  ingresarDominio.className = 'agregar-dominio';
  ingresarDominio.placeholder = 'Ej: ABC123';
  
  
  const botonDevolucion = document.createElement('button');
  botonDevolucion.innerText = 'Devolver vehiculo';
  botonDevolucion.className = 'boton-devolucion';
  

  container.appendChild(formularioDevolver);
  formularioDevolver.appendChild(textoDominio);
  formularioDevolver.appendChild(ingresarDominio);
  formularioDevolver.appendChild(botonDevolucion);
 

  botonDevolucion.onclick = () => {
      const autoAdevolver = ingresarDominio.value;
      const autoDevuelto = listadoAutos.find(el => el.dominio === autoAdevolver);
      if (!autoDevuelto) {
        Swal.fire({
            title: "Error!",
            text: "No se encontró ningún vehículo con ese dominio",
            icon: "error"
          });
          devolverAuto();      
        } else if (autoDevuelto.disponible) {
            Swal.fire({
                title: "Auto ya devuelto",
                text: "Vuelva a ingresar el dominio",
                icon: "error"
              });
              devolverAuto();
    
          } else {
              Swal.fire({
                title: "Devolucion exitosa",
                text: "¡Gracias por elegirnos!",
                icon: "success"
              });
              container.innerHTML="";
              autoDevuelto.disponible = true;
          }
  }
}