//ELEMENTOS PRINCIPALES DE LA PAGINA
const body = document.body;

//------URLs DE ENLACE Y CONSULTA------
const urlDatos = 'https://www.raulserranoweb.es/tienda/rest.php';
const urlImg = 'https://www.raulserranoweb.es/tienda/imagenes_art';


//------TITULO DE LA PAGINA------
const titulo = document.createElement('h1');
titulo.classList.add('titulo');
titulo.innerText = "Ejercicio 2 Mario Casado Berenguer";
body.append(titulo);


//------DESPLEGABLE CON CATEGORIAS------
const select= document.createElement('select');

const opTodas = document.createElement('option'); 
opTodas.textContent='Todas'; 
opTodas.value='Todas'; 

const opGravel = document.createElement('option'); 
opGravel.textContent='Gravel'; 
opGravel.value='Gravel'; 

const opCarretera = document.createElement('option'); 
opCarretera.textContent='Carretera'; 
opCarretera.value='Carretera'; 

const opMTB = document.createElement('option'); 
opMTB.textContent='MTB'; 
opMTB.value='MTB';

select.append(opTodas, opCarretera, opGravel, opMTB); 
body.append(select);


//------CONTENEDOR PRINCIPAL------
const main = document.createElement("main");
body.append(main);


//------OBTENCION DE DATOS------
    //Consulta inical con todos los datos disponibles
    fetch(urlDatos)
            .then(respuesta => respuesta.json())
            .then(datos => mostrarDatos(datos))
            .catch(e => alert(e.message));

    // Añadimos el evento al select para filtrar por categoría
    select.addEventListener('change', () => {  //Change detecta los cambios, no como click
        // Obtenemos el valor seleccionado
        const categoriaSeleccionada = select.value;
        
        // Modificamos la URL según la categoría seleccionada
        let urlFiltrada = urlDatos;  // Si selecciona "Todas", la URL no cambia
        if (categoriaSeleccionada !== 'Todas') {
            urlFiltrada = urlDatos + "?cat=" + categoriaSeleccionada;  // Añadimos el parámetro cat
        }
        fetch(urlFiltrada)
            .then(respuesta => respuesta.json())
            .then(datos => mostrarDatos(datos))
            .catch(e => alert(e.message));
    });

//------FUNCIONES------
function mostrarDatos(datos){
    main.innerHTML='';  //Vaciamos el contenido del main para alojar la nueva estructura

    datos.forEach(bici => {
        const articulo = document.createElement('article');
        articulo.classList.add('articulo');

        const imagen = document.createElement('img');
        imagen.src = urlImg + "/" + bici.cod;

        const nombre = document.createElement('p');
        nombre.innerHTML = "<strong>Nombre:</strong> " + bici.nom;

        const descripcion = document.createElement('p');
        descripcion.innerHTML = "<strong>Descripción:</strong> " + bici.des;

        const categoria = document.createElement('p');
        categoria.innerHTML = "<strong>Categoría:</strong> " + bici.cat;

        articulo.append(imagen, nombre, descripcion, categoria);
        main.appendChild(articulo);
    });
}




