const axios= require ('axios');

async function get_usuarios(cantidad){
    try {
        let respuesta= await axios.get('https://jsonplaceholder.typicode.com/users')
        return respuesta.data.slice(0,cantidad); //convierte la respuesta en un array y toma solo la cantidad de usuarios solicitada
    } catch (error) {
        console.error('Error al recibir informacion de usuarios:', error);
        return null;
        }
}

async function get_cantidad_publicaciones(id_usuario){
    try {
        let response= await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id_usuario}`); //solicita las publicaciones del usuario
        return response.data.length; //devuelve la cantidad de publicaciones del usuario
    } catch (error) {
        console.error(`Error al recibir informacion publicaciones del usuario ${id_usuario}:`, error);
        return null;
        };
}

async function ejecucion_secuencial(respuesta){
    try {
        let cant_publicaciones
        for (let i=0; i<respuesta.length; i++){ //Por cada usuario solicitado...
            cant_publicaciones= await get_cantidad_publicaciones(respuesta[i].id) //Se consulta al servidor la cantidad de publicaciones del usuario i mediante su id (según la respuesta obtenida del servidor al solicitar datos de usuarios)
            console.log(`Usuario ${i+1}: ${respuesta[i].name} tiene ${cant_publicaciones}  publicaciones.`); // Una vez obtenida la cantidad de publicaciones se muestra por consola
        //Obsercacion: el await asegura que se espere a la ejecucion de la funcion asincronica para poder continuar... lo que frena al for en cada iteracion esperando por la respuesta y por lo tanto se tiene una ejecución secuencial
        }
    } catch (error) {
        console.error(`Error ejecucion secuencial:`, error);
        return null;
        };
}

async function ejecucion_paralela(respuesta){
    try {
        const promesas = respuesta.map(u => get_cantidad_publicaciones(u.id)); //Con map se recorre el arreglo de usuarios y por cada usuario crea una promesa que se agrega a un nuevo arreglo (promesas) que contiene todas las promesas generadas
        //Observacion: al no usar await las llamadas a la funcion asincronica se realizan sin esperar a que se resuelvan, por lo tanto se tienen varias ejecuciones en paralelo
        let publicaciones= await Promise.all(promesas) //Se espera a que todas las promesas del arreglo se resuelvan, lo cual devuelve un arreglo con cada uno de sus resultados (cantidad de publicaciones por usuario)
        publicaciones.forEach((cant, i) => {// Una vez resueltas todas las promesas se muestran los resultados por consola
            console.log(`Usuario ${i+1}: ${respuesta[i].name} tiene ${cant} publicaciones.`);
        });
    } catch (error) {
        console.error(`Error ejecucion paralela:`, error);
        return null;
        };
}

let cantidad_usuarios = 10; //Definir la cantidad de usuarios a consultar. Observación: cuanto más se agregan más visible es la diferencia de tiempos entre ambas ejecuciones
get_usuarios(cantidad_usuarios) //Obtener la información de los usuarios una sola vez para ambas ejecuciones
    .then((respuesta) => { //Cuando se cumple la promesa de obtener los usuarios
        console.log ('--- Ejecución Secuencial ---')
        console.time("TiempoSecuencial"); //Iniciar el conteo de tiempo de ejecución secuencial
        return ejecucion_secuencial(respuesta).then(() => respuesta);  // El then con la funcion flecha permite pasar la respuesta al siguiente then cuando se cumple la promesa (de esa forma la función secuencial no tiene porque devolver nada)
        //Observacion: la concatenación de then se realiza mediante el return de promesas cuyos resultados son pasados al siguiente then
    })
    .then((respuesta) => {
        console.log (`--- Ejecución Secuencial Finalizada---`)
        console.timeEnd("TiempoSecuencial") //Finaliza el conteo de tiempo de ejecución secuencial y lo muestra por consola
        console.log ('--- Ejecución Paralela ---')
        console.time("TiempoParalelo"); //Iniciar el conteo de tiempo de ejecución paralelo
        return ejecucion_paralela(respuesta);    
    })
    .then(() => { //cuando se cumple la promesa de la ejecución paralela
        console.log (`--- Ejecución Paralela Finalizada---`)
        console.timeEnd("TiempoParalelo") //Finaliza el conteo de tiempo de ejecución paralelo y lo muestra por consola
    })
    .catch((error) => {
        console.error('Error al recibir informacion de usuarios:', error);
    });
