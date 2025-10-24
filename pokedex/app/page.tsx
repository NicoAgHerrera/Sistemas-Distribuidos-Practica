// app/page.tsx
// Página principal que muestra la lista de Pokémon.
//    Es un SERVER COMPONENT (por defecto), pero incluye un CLIENT COMPONENT dentro.

import PokemonList from "@/components/PokemonList";

export default function HomePage() {
  return (
    <main>
      <h1 style={{ fontSize: 28, marginBottom: 16 }}>Pokédex</h1>
      <PokemonList cantidad={30} /> {/* Se renderiza el componente cliente */}
    </main>
  );
}
