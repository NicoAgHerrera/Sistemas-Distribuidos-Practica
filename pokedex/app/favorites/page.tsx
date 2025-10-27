"use client";

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useFavorites } from "@/app/hooks/useFavorites";
import PokemonCard from "@/components/PokemonCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Página principal envuelta con QueryClient
export default function FavoritesPage() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesContent />
    </QueryClientProvider>
  );
}

// Contenido real de la página
function FavoritesContent() {
  const { data: favorites, isLoading, isError } = useFavorites();

  if (isLoading) {
    return (
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(160px,1fr))] w-full max-w-6xl">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="p-4">
            <Skeleton height={180} borderRadius={12} />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-400">Error al cargar favoritos.</p>;
  }

  if (!favorites || favorites.length === 0) {
    return (
      <p className="text-center text-gray-300 text-lg">
        No tienes ningún Pokémon en favoritos 😢
      </p>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="text-3xl font-extrabold text-center text-yellow-300 mb-6">
        ⭐ Tus Pokémon Favoritos
      </h2>

      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
        {favorites.map((fav) => (
          <PokemonCard key={fav.id} id={fav.id} isFavorite={true} />
        ))}
      </div>
    </div>
  );
}
