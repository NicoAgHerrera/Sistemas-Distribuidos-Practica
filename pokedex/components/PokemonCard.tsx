"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useAddFavorite, useRemoveFavorite } from "@/app/hooks/useFavorites";

interface PokemonCardProps {
  id: number;
  isFavorite: boolean;
}

export default function PokemonCard({ id, isFavorite }: PokemonCardProps) {
  // Obtener sprite del Pokémon
  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemonSprite", id],
    queryFn: async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!res.ok) throw new Error("Error al obtener el sprite del Pokemon");
      const json = await res.json();
      return {image: json.sprites.other["official-artwork"].front_default as string , name: json.name as string};
    },
  });

  // Mutaciones de favoritos
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

  //Funcion para cuando se presiona el boton de favorito (sea ya favorito o no)
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que el clic en el botón abra el link
    e.preventDefault(); // Evita que el link se active
    if (isFavorite) removeFavorite.mutate(id);
    else addFavorite.mutate(id);
  };

  //constante que determina si algun proceso de favorito esta en curso
  const isProcessing = addFavorite.isPending || removeFavorite.isPending;
  //constante que determina si hubo error en alguna de las dos mutaciones
  const hasError = addFavorite.isError || removeFavorite.isError;
  //constante que se guarda el mensaje de error de la mutacion que fallo
  const errorMessage =
    (addFavorite.error as Error)?.message ||
    (removeFavorite.error as Error)?.message ||
    "";

  return (
    <Link
      href={`/pokemon/${id}`} 
      className="
        bg-red-600 hover:bg-red-700 
        border-4 border-red-800 
        rounded-2xl p-4 
        flex flex-col items-center justify-between 
        text-center text-white 
        transition-transform duration-200 
        hover:scale-105 shadow-xl
      "
    >
      {/* Imagen */}
      <div className="relative w-32 h-32 bg-white rounded-xl flex items-center justify-center overflow-hidden border-4 border-gray-200 shadow-inner mb-3">
        {isLoading ? (
          <p className="text-gray-500 text-sm font-medium">Cargando...</p>
        ) : isError ? (
          <p className="text-red-500 text-sm font-medium">Error</p>
        ) : data ? (
          <Image
            src={data.image}
            alt={data.name}
            fill
            sizes="(max-width: 768px) 100vw, 200px"
            className="object-contain p-2"
          />
        ) : (
          <p className="text-gray-400 text-sm font-medium">Sin imagen</p>
        )}
      </div>

      {/* Nombre */}
      <h2 className="capitalize font-bold text-lg tracking-wide drop-shadow-md mb-2">
        {data?.name || "..."}
      </h2>

      {/* Botón de favorito */}
      <button
        onClick={handleToggleFavorite}
        disabled={isProcessing||isLoading}
        className={`mt-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
          isFavorite
            ? "bg-yellow-400 text-black hover:bg-yellow-500"
            : "bg-gray-200 text-black hover:bg-yellow-300"
        }`}
      >
        {isProcessing
          ? "Procesando..."
          : isFavorite
          ? "⭐ Quitar"
          : "☆ Agregar"}
      </button>

      {/* Error */}
      {hasError && <p className="text-red-400 text-sm mt-2">{errorMessage}</p>}
    </Link>
  );
}
