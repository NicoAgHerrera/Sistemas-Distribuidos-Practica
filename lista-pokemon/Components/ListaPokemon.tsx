"use client"; 
// El componente debe ejecutarse del lado del CLIENTE (en el navegador),
// porque va a usar hooks (useState, useEffect) y manejar interacciones del usuario (onClick).
// Sin esto, Next.js intentaría renderizarlo en el servidor, donde los hooks no funcionan.

import { useState, useEffect } from "react"; 
// Se importan los hooks que React nos da para manejar estado (useState) y efectos secundarios (useEffect).

import axios from "axios"; 
// Se importa Axios, librería que simplifica las llamadas HTTP (GET, POST, etc.), que se usará para consultar la API de PokéAPI.

import PokemonItem from "@/Components/ItemPokemon"; 
// Se importa componente hijo que representará cada Pokémon individual.
// Cada ítem mostrará su nombre y llevará su propio contador local de clicks.


type Props = {
  cant: number; // cantidad de pokémon a mostrar
};


export default function ListaPokemon({ cant }: Props) {
  // Componente funcional principal.
  // En React, cada componente es una función que devuelve una porción de interfaz JSX.

  const [pokemons, setPokemons] = useState<any[]>([]);
  // Estado "pokemons": almacena la lista de Pokémon que obtendremos desde la API.
  //    useState devuelve un array con dos elementos:
  //        [valor actual, función para actualizar ese valor].
  //    Inicialmente es un array vacío, y luego se llenará con los datos del fetch.

  const [totalClicks, setTotalClicks] = useState(0);
  // Estado "totalClicks": lleva la cuenta total de cuántas veces se clickeó cualquier Pokémon.
  // Cada vez que un hijo (PokemonItem) se clickee, este valor se incrementará en 1.

  // useEffect controla los "efectos secundarios" → operaciones que ocurren fuera del renderizado puro,
  //    como llamadas a APIs, timers o suscripciones a eventos.
  // En este caso, se utiliza para llamar a la PokéAPI una sola vez al montar el componente.
  useEffect(() => {
    // Con Axios se realiza una solicitud GET a la API de PokéAPI.
    axios.get("https://pokeapi.co/api/v2/pokemon?limit= $(cant)") // Se utiliza la prop "cant" para definir cuántos pokémon traer.
      .then((response) => {
        // Si la solicitud fue exitosa, "response.data.results" trae un array de objetos cada uno con un nombre y una URL.
        setPokemons(response.data.results); 
        // Se guardan esos datos en el estado "pokemons".
      })
      .catch((error) => console.error("Error al obtener pokemons:", error));
      // Si hay algún error (por ejemplo, sin conexión), se muestra en consola.

  }, []); 
  // El array de dependencias está vacío → esto hace que useEffect se ejecute solo UNA VEZ cuando el componente se "monta" (aparece por primera vez en pantalla).
  // Si no estuviera vacío, React podría volver a ejecutar este efecto varias veces.

  // Esta función será pasada a los componentes hijos (PokemonItem) para que, cada vez que uno sea clickeado, se sume al contador total.
  const handleItemClick = () => setTotalClicks(totalClicks + 1);

  // JSX que define la interfaz visible del componente:
  return (
    <div className="p-6 text-white">
      {/* Contenedor principal con padding y texto blanco (usando Tailwind CSS). */}

      <h1 className="text-2xl font-bold mb-4">Listado de Pokémons</h1>
      {/* Título principal de la componente. */}

      <p className="mb-4">
        Total de clics en pokémon: <strong>{totalClicks}</strong>
      </p>
      {/* Parrafo que muestra el total acumulado de clics. 
          Cada vez que se haga click en un Pokémon, el itemPokemon llamará a handleItemClick, y de esa forma 
          React volverá a renderizar esta parte mostrando el nuevo valor actualizado. */}

      <ul className="grid grid-cols-2 gap-3">
        {/* Estructura en forma de grilla (2 columnas) para mostrar la lista de pokémon. */}
        
        {pokemons.map((pokemon, index) => (
          // .map() recorre el array "pokemons" y devuelve un nuevo array de componentes JSX.
          // Cada vuelta crea un <PokemonItem /> con los datos del pokémon actual.

          <PokemonItem
            key={index} // KEY única para que React pueda identificar a cada elemento en el DOM (podria usarse pokemon.name si se prefiere).
            // Esta key no se pasa como prop al hijo, es solo para uso interno de React.

            name={pokemon.name} // Prop "name": el nombre del Pokémon, tomado del objeto de la API.
            onClick={handleItemClick} // Prop "onClick": función que el hijo llamará cuando sea clickeado para incrementar el contador total.
          />
        ))}
      </ul>
    </div>
  );
}