"use client"; 
// Este componente también necesita ejecutarse del lado del CLIENTE, porque usará hooks (useState) y manejará eventos (onClick).

import { useState } from "react"; 
// Importamos useState, ya que cada Pokémon tendrá su propio contador interno.

type Props = {
  name: string; // Nombre del Pokémon (viene del padre).
  onClick: () => void; // Función del padre para incrementar el contador total.
};

export default function ItemPokemon({ name, onClick }: Props) {
  // Desestructuramos las props: recibimos el "name" del Pokémon y la función "onClick" del padre.

  const [clicks, setClicks] = useState(0);
  // Estado local "clicks": cuenta cuántas veces se presionó este Pokémon específico.
  //    Cada Pokémon tiene su propio estado independiente.

  //Función que se ejecuta al hacer click en este Pokémon.
  const handleClick = () => { 
    setClicks(clicks + 1); // Incrementa el contador local de este Pokémon.
    onClick(); // Llama a la función del padre → incrementa el contador total.
  };

  return (
    <li>
      {/* Cada Pokémon se muestra dentro de una etiqueta de lista (<li>), que React agrupa dentro del <ul> del padre. */}


      <button onClick={handleClick} className="w-full p-3 bg-gray-700 rounded-lg hover:bg-gray-600">
        {/* Botón con estilos de Tailwind CSS. onClick ejecuta la función handleClick cuando se hace clic. */}

        <p className="capitalize font-semibold">{name}</p>
        {/* Muestra el nombre del Pokémon (por ejemplo, “bulbasaur”). 
            "capitalize" pone la primera letra en mayúscula. */}

        <p className="text-sm text-gray-300">Clics: {clicks}</p>
        {/* Muestra el contador local de clics, que aumenta con cada interacción. */}
      </button>
    </li>
  );
}
