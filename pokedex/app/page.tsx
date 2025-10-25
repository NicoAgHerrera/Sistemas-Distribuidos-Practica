import PokemonList from "@/components/PokemonList";

export default function HomePage() {
  return (
    <main className="bg-white min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6 tracking-widest drop-shadow">
        Lista de Pokemones
      </h1>
      <PokemonList cantidad={30} />
    </main>
  );
}
