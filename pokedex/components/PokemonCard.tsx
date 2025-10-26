"use client";

import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";



export default function PokemonCard({ name }: { name: string }) {

  const {data,isLoading,isError} = useQuery ({
    queryKey: ['pokemonSprite', name],
    queryFn: async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!res.ok) throw new Error("Error al obtener el sprite del pokemon");
      const json = await res.json();
      return json.sprites.other["official-artwork"].front_default as string;
    }
  });


  return (
    <Link
      href={`/pokemon/${name}`}
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
      {/* Marco blanco con la imagen */}
      <div className="relative w-32 h-32 bg-white rounded-xl flex items-center justify-center overflow-hidden border-4 border-gray-200 shadow-inner mb-3">
        {isLoading ? (
          <p className="text-gray-500 text-sm font-medium">Cargando...</p>
        ) : isError ? (
          <p className="text-red-500 text-sm font-medium">Error</p>
        ) : data ? (
          <Image
            src={data}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 200px"
            className="object-contain p-2"
            unoptimized
          />
        ) : (
          <p className="text-gray-400 text-sm font-medium">Sin imagen</p>
        )}
      </div>


      {/* Nombre del Pokémon */}
      <h2 className="capitalize font-bold text-lg tracking-wide drop-shadow-md">
        {name}
      </h2>
    </Link>
  );
}
