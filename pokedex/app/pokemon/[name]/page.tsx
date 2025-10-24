// app/pokemon/[name]/page.tsx
//    Página dinámica del detalle de cada Pokémon.
//
//    Este archivo representa una ruta dinámica en Next.js (App Router):
//    - La carpeta [name] indica que el segmento es variable (ejemplo: /pokemon/pikachu).
//    - Cada vez que se accede a /pokemon/ALGUN_NOMBRE, se renderiza esta página en el servidor.
//    - Al ser un "Server Component" (no tiene "use client"), puede usar `async` y `await`
//      directamente, sin hooks como useEffect o useState.

import axios from "axios";          // Cliente HTTP para hacer fetch más expresivo
import Link from "next/link";       // Componente de navegación sin recarga (SPA)
import { notFound } from "next/navigation"; // Función para mostrar la página 404 si no existe el recurso

//  Definición del componente de página
// Next.js le pasa un objeto `params` con los parámetros dinámicos de la URL.
// En este caso, "params" es una promesa ({ name: string }).
export default async function PokemonDetailPage({ params,}: {params: Promise<{ name: string }>;}) {
  // 1ro se espera la resolución de la promesa con los parámetros de la URL.
  //    Por ejemplo: si se visita /pokemon/pikachu, params = { name: "pikachu" }.
  const { name } = await params;

  try {
    // 2do se realiza una una petición HTTP al endpoint de la PokeAPI.
    //    encodeURIComponent asegura que el nombre sea válido en la URL.
    //    `.toLowerCase()` evita errores si el nombre viene con mayúsculas.
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name.toLowerCase())}`
    );

    // 3️ro se estructura la respuesta de la API en una estructura de datos con los campos necesarios.
    const data = res.data as {
      name: string; // nombre del Pokémon
      sprites: { front_default: string | null }; // imagen principal (sprite por defecto)
      types: { type: { name: string } }[]; // tipos (agua, fuego, etc.)
    };

    // Renderizado del detalle del Pokémon (HTML generado en el servidor)
    //    Todo el contenido se devuelve como JSX y Next.js lo convierte en HTML.
    return (
      // Article: contenedor principal del detalle
      <article style={{ textAlign: "center" }}>
        {/* Título principal con estilos inline */}
        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            marginBottom: 12,
            textTransform: "capitalize", // pone la primera letra en mayúscula
          }}
        >
          {data.name}
        </h1>

        {/* Imagen principal (sprite del Pokémon) */}
        {/* Se usa un renderizado condicional:
            - Si existe una URL de imagen, la muestra.
            - Si no, se muestra un texto de aviso. */}
        {data.sprites.front_default ? (
          <img
            src={data.sprites.front_default}
            alt={data.name}
            width={160}
            height={160}
            style={{ display: "block", margin: "0 auto 12px" }}
          />
        ) : (
          <p style={{ color: "#9ca3af" }}>Sin imagen disponible</p>
        )}

        {/* Tipos del Pokémon (pueden ser múltiples) */}
        <p style={{ fontSize: 18 }}>
          Tipos:{" "}
          <span style={{ color: "#60a5fa" }}>
            {data.types.map((t) => t.type.name).join(", ")}
          </span>
        </p>

        {/* Enlace para volver a la lista principal */}
        {/* Usa <Link> de Next.js, que hace navegación sin recargar la página completa */}
        <Link
          href="/"
          style={{
            display: "inline-block",
            marginTop: 16,
            background: "#2563eb",
            color: "white",
            padding: "8px 12px",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          ← Volver a la lista
        </Link>
      </article>
    );
  } catch (err: any) {
    // Manejo de errores si falla el fetch a la PokeAPI
    //    Si la PokeAPI devuelve 404 (no existe el Pokémon),
    //    se muestra la página especial "not-found.tsx" del proyecto.
    if (err?.response?.status === 404) notFound();

    // Si es otro tipo de error (red, servidor, etc.), se propaga.
    throw err;
  }
}
