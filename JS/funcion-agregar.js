// Funcion para poner mi auto en alquiler
function agregarAuto (){

    container.innerHTML = '';
    containerAlquiler.innerHTML = '';

    const formularioAlquilar = document.createElement('form');
    formularioAlquilar.className = 'formulario-alquilar';

    const ingresarMarca = document.createElement('p');
    ingresarMarca.id = 'texto-agregarAuto';
    ingresarMarca.innerText = 'Marca del auto';
    
    const agregarMarca = document.createElement('input');
    agregarMarca.id = 'input-alquilar';
    agregarMarca.className = 'agregar-marca';
    agregarMarca.placeholder = 'Ej: Volkswagen';
    agregarMarca.required = true;


    const ingresarModelo = document.createElement('p');
    ingresarModelo.id = 'texto-agregarAuto';
    ingresarModelo.innerText = 'Modelo del vehiculo';
    
    const agregarModelo = document.createElement('input');
    agregarModelo.id = 'input-alquilar';
    agregarModelo.className = 'agregar-modelo';
    agregarModelo.placeholder = 'Ej: Polo';
    
    
    const ingresarDominio = document.createElement('p');
    ingresarDominio.id = 'texto-agregarAuto';
    ingresarDominio.innerText = 'Dominio del auto';

    const agregarDominio = document.createElement('input');
    agregarDominio.id = 'input-alquilar';
    agregarDominio.className = 'agregar-foto';
    agregarDominio.placeholder = 'Ej: ABC123';
    agregarDominio.required = true;

    const ingresarPrecio = document.createElement('p');
    ingresarPrecio.id = 'texto-agregarAuto';
    ingresarPrecio.innerText = 'Ingrese el precio por dia';

    const agregarPrecio = document.createElement('input');
    agregarPrecio.id = 'input-alquilar';
    agregarPrecio.type = "number";
    agregarPrecio.placeholder = 'Ej: $1500';

    const ingresarFoto = document.createElement('p');
    ingresarFoto.id = 'texto-agregarAuto';
    ingresarFoto.innerText = 'URL de la foto del auto';

    const agregarFoto = document.createElement('input');
    agregarFoto.id = 'input-alquilar';
    agregarFoto.className = 'agregar-foto';
    agregarFoto.placeholder = 'Ej: http://www.uploadfoto.com/..';
    
    
    const botonSubmit = document.createElement('button');
    botonSubmit.className = 'boton-alquilar';
    botonSubmit.innerText = 'Agregar auto';
    botonSubmit.type = 'submit';
   
    
    formularioAlquilar.appendChild(ingresarMarca);
    formularioAlquilar.appendChild(agregarMarca);

    formularioAlquilar.appendChild(ingresarModelo);
    formularioAlquilar.appendChild(agregarModelo);

    formularioAlquilar.appendChild(ingresarDominio);
    formularioAlquilar.appendChild(agregarDominio);

    formularioAlquilar.appendChild(ingresarPrecio);
    formularioAlquilar.appendChild(agregarPrecio);

    formularioAlquilar.appendChild(ingresarFoto);
    formularioAlquilar.appendChild(agregarFoto);

    formularioAlquilar.appendChild(botonSubmit);
    container.appendChild(formularioAlquilar);

    botonSubmit.onclick = (e) => {
        e.preventDefault();

        
        const marcaAuto = agregarMarca.value.trim();
        const modeloAuto = agregarModelo.value.trim();
        const dominioAuto = agregarDominio.value.trim();
        const precioAuto = agregarPrecio.value.trim();
        const fotoAuto = agregarFoto.value.trim();

        if (agregarMarca.value === "" || agregarModelo.value === "" || agregarDominio.value === "" || agregarPrecio.value === "" || agregarFoto.value === ""){
            Swal.fire({
                title: "Error",
                text: "Debes completar todos los campos",
                icon: "error"
              });
        }
        else{

        const id = listadoAutos.length + 1;
        const autoNuevo = new AutosEnAlquiler(id, marcaAuto, modeloAuto, dominioAuto, precioAuto, fotoAuto, true);
        listadoAutos.push(autoNuevo);
        localStorage.setItem('autos', JSON.stringify(listadoAutos));

        Swal.fire({
            title: "Vehiculo añadido con exito",
            text: "Gracias por elegirnos!",
            icon: "success"
          });
        container.innerHTML="";
        
    };
}
}