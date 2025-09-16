"use client"; // indica que el componente debe renderizarse en el cliente (no en el servidor).
// Es necesario porque el botón es interactivo y usa hooks como useState.

import { useState } from "react"; // Se importa useState de React, que permite manejar estado dentro del componente.

// Definición del componente BotonLike
export default function BotonLike() {
  const [likes, setLikes] = useState(0);  // Se define una variable de estado llamada "likes" (inicialmente en 0) y su función modificadora "setLikes".
  return (
    // Botón que, al hacer clic, incrementa el contador de "likes" en 1.
    // Se aplican clases de Tailwind CSS para darle estilo al botón (padding, borde, color de borde, borde redondeado y que al pasar el mouse por arriba cambie a color gris oscuro)
    <button 
      onClick={() => setLikes(likes + 1)} 
       className="px-3 py-2 border border-gray-400 rounded-lg hover:bg-gray-700"
    >
      👍 {likes} {/* El contenido del botón es el emoji y el contador */}
    </button>
  );
}
