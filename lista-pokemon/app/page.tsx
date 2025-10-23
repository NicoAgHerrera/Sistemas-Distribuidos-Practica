import PokemonList from "@/Components/ListaPokemon";

// Componente principal de la página
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-10">
      {/* min-h-screen → ocupa toda la altura de la pantalla */}
      {/* bg-gray-900 → fondo gris oscuro */}
      {/* text-white → texto blanco */}
      {/* p-10 → padding general */}

      <PokemonList cant={20} /> 
      {/* Se muestra el componente PokemonList */}
      {/* Se define en 20 la prop "cant" para indicar cuántos Pokémon mostrar */}
    </main>
  );
}
