// components/PokemonCard.tsx
// Este componente muestra una tarjeta individual para cada Pokémon dentro de la lista. 
// Se usa en conjunto con Link para navegar al detalle.

import Link from "next/link";

export default function PokemonCard({ name }: { name: string }) {
  // Cada tarjeta es un enlace hacia la ruta dinámica /pokemon/[name]
  return (
    <Link
      href={`/pokemon/${name}`} // Enlace a la página de detalle del Pokémon.
      style={{
        background: "#1f2937",
        borderRadius: 12,
        padding: "16px",
        textAlign: "center",
        textTransform: "capitalize",
        color: "white",
        textDecoration: "none",
        transition: "transform .15s ease",
      }}
      //Pequeña animación al pasar el mouse por encima, incrementando y volviendo al tamaño original de la tarjeta apuntada
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
    >
      {name} {/* Muestra el nombre del Pokémon sobre la tarjeta*/}
    </Link>
  );
}
