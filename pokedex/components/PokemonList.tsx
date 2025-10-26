"use client";

import { useState, useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import PokemonCard from "./PokemonCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Pokemon = {name: string};


function PokemonListContent({ cantidad }: { cantidad: number }) {
  const [offset, setOffset] = useState(0);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  // 🔹 Pedir una página a la API
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["pokemons", offset],
    queryFn: async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${cantidad}&offset=${offset}`);
      if (!res.ok) throw new Error("Error al obtener pokemones");
      const json = await res.json();
      return json.results as Pokemon[];
    }
  });

  // 🔸 Cuando llegan datos nuevos, concatenarlos
  useEffect(() => {
    if (data && data.length > 0) {
      setPokemons(pokemons.concat(data));
    }
  }, [data]); //cuando data cambia se hace un append al estado de pokemons

  // 🕓 Skeleton inicial
  if (isLoading && pokemons.length === 0) {
    return (
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(160px,1fr))] w-full max-w-6xl">
        {Array.from({ length: cantidad }).map((_, i) => (
          <div key={i} className="p-4">
            <Skeleton
              height={180}
              borderRadius={12}
              baseColor="#e2e8f0"
              highlightColor="#f8fafc"
            />
          </div>
        ))}
      </div>
    );
  }

  if (isError) return <p className="text-red-500">Error cargando pokemones.</p>;

  return (
    <>
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(160px,1fr))] w-full max-w-6xl">
        {pokemons.map((p) => (
          <PokemonCard key={p.name} name={p.name} />
        ))}

        {/* Skeleton temporal mientras se cargan más, que se muestra despues de la lista ya existente */}
        {isFetching &&
          Array.from({ length: Math.min(6, cantidad) }).map((_, i) => (
            <div key={`sk-${i}`} className="p-4">
              <Skeleton height={180} borderRadius={12} />
            </div>
          ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => setOffset((prev) => prev + cantidad)}
          disabled={isFetching} // evitar múltiples clicks, ya que desabilita cuando al pulsar el boton se comienza a buscar
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-transform hover:scale-105 disabled:opacity-60"
        >
          {isFetching ? "Cargando..." : "Cargar más"} 
        </button>
      </div>
    </>
  );
}



// 🔹 Envuelve con su propio QueryClientProvider
export default function PokemonList({ cantidad }: { cantidad: number }) {
  const [queryClient] = useState(() => new QueryClient()); // Crear solo una vez
  return (
    <QueryClientProvider client={queryClient}>
      <PokemonListContent cantidad={cantidad} />
    </QueryClientProvider>
  );
}
