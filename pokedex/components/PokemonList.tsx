// components/PokemonList.tsx
"use client";
//   Indica que este componente se ejecuta en el navegador.
//   Es necesario para usar hooks como useState y useEffect.

import { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";

// Se define el tipo de dato que devuelve la API
type Pokemon = { name: string; url: string };

export default function PokemonList({ cantidad }: { cantidad: number }) {
  // Estados locales
  const [pokemons, setPokemons] = useState<Pokemon[]>([]); // Lista de pokémones
  const [loading, setLoading] = useState(true); // Indicador de carga
  const [error, setError] = useState<string | null>(null); // Posible error

  // Efecto: se ejecuta una sola vez al montar el componente
  useEffect(() => {
    let cancel = false; // Previene setState si el componente se desmonta

    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${cantidad}&offset=0`) // Petición a la API
      .then((res) => {
        if (cancel) return;
        setPokemons(res.data.results); // se guarda el resutlado resultado en la lista de pokemones del estado
        setLoading(false); // Terminó la carga, con lo cual se corta el skelleton
      })
      .catch(() => {
        if (cancel) return;
        setError("No se pudo cargar la lista");
        setLoading(false);
      });

    // Función de limpieza: se ejecuta al desmontar el componente
    // Establece la variable cancel para evitar actualizar el estado una vez desmontado el componente
    // A diferencia de la actividad anterior, es necesaria porque puede cambiarse de pagina antes de completar el fetch.
    // Si se intenta actualizar el estado de un componente desmontado, se genera un error en la consola
    return () => {
      cancel = true;
    };
  }, []);

    // Si todavía está cargando la información (loading === true),
    // se muestra un "skeleton" (una cuadrícula de cajas grises simulando el contenido).
    // Observacion: se realiza el skelleton en la componente de lista, porque se realiza un fetch en el cliente y no en el servidor... por lo tanto no se puede usar el loading.tsx
    if (loading) {
    return (
        // Contenedor principal del skeleton
        // - Se usa grid para distribuir las cajas de forma ordenada.
        // - "auto-fill" crea tantas columnas como quepan.
        // - "minmax(160px, 1fr)" hace que cada caja tenga ancho mínimo de 160px y máximo de 1 fracción del espacio disponible.
        <div
        style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: 12, // separación entre las cajas
        }}
        >

        {/* Se crea un array  de elementos "vacíos" para simular tarjetas cargandose */}
        {Array.from({ length: cantidad }).map((_, i) => (
            // Cada caja representa una tarjeta vacía
            // - color de fondo oscuro (#111827)
            // - altura 72px
            // - bordes redondeados
            // - animación "pulse" para dar efecto de carga
            // - opacidad variable (entre .6 y 1)
            <div
            key={i}
            style={{
                background: "#111827",
                height: 72,
                borderRadius: 12,
                animation: "pulse 1.2s infinite", //indica que se debe ejecutar una animacion llamada "pulse" cada 1.2 segundos de forma infinita
                opacity: 0.6,
            }}
            />
        ))}

        {/* Definición de la animación "pulse" (efecto de respiración) */}
        {/* Esto es CSS incrustado (inline), dentro de <style> */}
        <style>
            {`
            @keyframes pulse {
                0%   { opacity: .6 }   /* empieza más tenue */
                50%  { opacity: 1 }    /* se aclara */
                100% { opacity: .6 }   /* vuelve a atenuarse */
            }
            `}
        </style>
        </div>
    );
    }


  // Si hubo un error en la carga (se trata de manera local, sino se deberia lanzar una excepción error y crear un app/error.tsx)
  if (error) {
    return <p style={{ color: "#fca5a5" }}>{error}</p>;
  }

  // Renderiza la lista real de Pokémon en formato grid
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px,1fr))",
        gap: 12,
      }}
    >
      {pokemons.map((p) => (
        <PokemonCard key={p.name} name={p.name} />
      ))}
    </div>
  );
}
