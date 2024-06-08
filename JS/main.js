// SIMULADOR DE RENT A CAR

// Class constructora
class AutosEnAlquiler{
    constructor(id, marca, modelo, dominio, precio, foto, disponible){
        this.id = id
        this.marca = marca
        this.modelo = modelo
        this.dominio = dominio
        this.precio = precio
        this.foto = foto
        this.disponible = disponible
    };
}

const listadoAutos = [];

// Función para cargar los autos con fetch
function cargarAutos() {
    if (listadoAutos.length === 0) {
        fetch('./autos.json')
            .then(response => response.json())
            .then(data => {
                data.forEach(auto => {
                    listadoAutos.push(new AutosEnAlquiler(auto.id, auto.marca, auto.modelo, auto.dominio, auto.precio, auto.foto, auto.disponible));
                });
                solicitarAuto(listadoAutos); 
            })
            .catch(error => console.error('Error cargando los autos:', error));
    } else {
        solicitarAuto(listadoAutos);
    }
}

function autosStorage (){
    const autosGuardados = JSON.parse(localStorage.getItem('autos'));
    if (autosGuardados){
     listadoAutos.length = 0;
    for (const autosDelArray of autosGuardados){
    listadoAutos.push(autosDelArray);
    }
    }
 }

 autosStorage();

 

//Funcion crear las tarjetas y para mostrar los autos para alquilar
function solicitarAuto(listadoAutos) {

    container.innerHTML = '';
    containerAlquiler.innerHTML = '';

    listadoAutos.forEach(el => {

        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta';

        const marcaYmodelo = document.createElement('p');
        marcaYmodelo.innerText = `${el.marca} ${el.modelo}`;
        marcaYmodelo.className = 'marca';

        const precioPorDia = document.createElement('p');
        precioPorDia.className = 'precioPorDia'
        precioPorDia.innerText = `$${el.precio} /día`;

        const disponibilidad = document.createElement('p');
        disponibilidad.className = 'disponibilidad';
        el.disponible ? disponibilidad.innerText = "Disponible" : disponibilidad.innerText = "No disponible";

        const imagen = document.createElement('img');
        imagen.src = el.foto;
        imagen.className = 'foto';

        const botonAlquilar = document.createElement('button');
        botonAlquilar.innerText = "Alquilar";
        botonAlquilar.className = 'boton-alquilar';

        tarjeta.appendChild(imagen);
        tarjeta.appendChild(marcaYmodelo);
        tarjeta.appendChild(precioPorDia);
        tarjeta.appendChild(disponibilidad);
        tarjeta.appendChild(botonAlquilar);

        container.appendChild(tarjeta);

        botonAlquilar.onclick = () => {
            const autoId = el.id;
            const autoElegido = listadoAutos.find(el => el.id === autoId);

            if (!autoElegido.disponible) {
                Swal.fire({
                    title: "Auto no disponible",
                    text: "Vuelva a elegir otro",
                    icon: "error"
                  });

            } else {
                confirmarAuto(autoElegido);
            }
        };
    });

}


function confirmarAuto(autoElegido){
    container.innerHTML = '';
  
  const diasDeAlquiler = document.createElement('form');
  diasDeAlquiler.id = 'dias-alquiler';

  const ingresarCantidadDias = document.createElement('p');
  ingresarCantidadDias.innerText = 'Cantidad de dias a alquilar el auto'; 
  
  const cantidadDias = document.createElement('input');
  cantidadDias.className = 'cantidad-dias';
  cantidadDias.type = "number";
  cantidadDias.min = "1";

  const botonConfirmarAlquiler = document.createElement('button');
  botonConfirmarAlquiler.innerText = 'Continuar';
  
  diasDeAlquiler.appendChild(ingresarCantidadDias);
  diasDeAlquiler.appendChild(cantidadDias);
  diasDeAlquiler.appendChild(botonConfirmarAlquiler);
  container.appendChild(diasDeAlquiler);

  botonConfirmarAlquiler.onclick = (event) => {
    event.preventDefault();

  if(cantidadDias.value === "" || cantidadDias.value <= 0 ){
    Swal.fire({
        title: "Error",
        text: "El auto debe ser alquilado como mínimo por un dia",
        icon: "error"
      });
}
else{ 
    const containerAlquiler = document.getElementById('containerAlquiler')

    const contenedorPrecio = document.createElement('div');
    contenedorPrecio.className = 'contenedor-precio';

     let precioFinal = cantidadDias.value * autoElegido.precio;

     const leyendaPrecioFinal = document.createElement('p');
     leyendaPrecioFinal.innerText = `Ud. seleccionó el ${autoElegido.marca} ${autoElegido.modelo}`;
     leyendaPrecioFinal.className = 'leyendaPrecioFinal';

     const fotoPrecioFinal = document.createElement('img');
     fotoPrecioFinal.src = autoElegido.foto;
     fotoPrecioFinal.className = 'fotoPrecioFinal';

     const dominioElegido = document.createElement('p');
     dominioElegido.innerText = `Dominio: ${autoElegido.dominio} \n (Necesario para la devolucion del vehiculo)`;
     dominioElegido.className = 'dominioElegido';

     const textoValorDia = document.createElement('p');
     textoValorDia.innerText = `Valor por dia: $${autoElegido.precio}`;
     textoValorDia.className = 'textoValorDia';

     const totalDias = document.createElement('p');
     totalDias.innerText = `Dias de alquiler: ${cantidadDias.value}`;
     totalDias.className = 'totalDias'

     const mostrarPrecioFinal = document.createElement('p');
     mostrarPrecioFinal.innerText = `Total a pagar: $${precioFinal}`;
     mostrarPrecioFinal.className = 'mostrarPrecioFinal';

     container.innerHTML = '';

     const botonConfirmacionFinal = document.createElement('button');
     botonConfirmacionFinal.innerText = 'Confirmar';
     botonConfirmacionFinal.className = 'boton-confirmacion';

     botonConfirmacionFinal.onclick = () => {
        Swal.fire({
            title: "¡Transacción exitosa!",
            text: "Disfrutá de tu vehículo",
            icon: "success"
          });

     setTimeout(() => {   
     autoElegido.disponible = false;
     contenedorPrecio.innerHTML='';
     containerAlquiler.innerHTML='';
     },2000)
    }

     contenedorPrecio.appendChild(leyendaPrecioFinal);
     contenedorPrecio.appendChild(dominioElegido);
     contenedorPrecio.appendChild(fotoPrecioFinal);
     contenedorPrecio.appendChild(textoValorDia);
     contenedorPrecio.appendChild(totalDias);
     contenedorPrecio.appendChild(mostrarPrecioFinal);
     contenedorPrecio.appendChild(botonConfirmacionFinal);
     containerAlquiler.appendChild(contenedorPrecio);
  }
  
  };
}

// DOM
const container = document.getElementById('container');

//Botones de inicio
const botoneraInicio = document.getElementById('botonera-index');

const botonSolicitar = document.createElement('button');
botonSolicitar.innerText = 'Solicitar auto';
botonSolicitar.className = 'boton-solicitar';
botonSolicitar.id = 'boton-index';

botonSolicitar.onclick = () => cargarAutos(listadoAutos);

const botonDevolver = document.createElement('button');
botonDevolver.innerText = 'Devolver auto';
botonDevolver.className = 'boton-devolver';
botonDevolver.id = 'boton-index';

botonDevolver.onclick = () => devolverAuto();

const botonAgregar = document.createElement('button');
botonAgregar.innerText = 'Alquilar mi auto';
botonAgregar.className = 'boton-agregar';
botonAgregar.id = 'boton-index';

botonAgregar.onclick = () => agregarAuto();

botoneraInicio.appendChild(botonSolicitar);
botoneraInicio.appendChild(botonDevolver);
botoneraInicio.appendChild(botonAgregar);