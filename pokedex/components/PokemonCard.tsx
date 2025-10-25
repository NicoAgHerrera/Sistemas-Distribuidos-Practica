"use client";

import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PokemonCard({ name }: { name: string }) {
  const [sprite, setSprite] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => {
        setSprite(
          res.data.sprites.other?.["official-artwork"]?.front_default ??
            res.data.sprites.front_default
        );
      })
      .catch(() => setSprite(null));
  }, []);

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
      <div
        className="
          relative w-32 h-32 
          bg-white rounded-xl 
          flex items-center justify-center 
          overflow-hidden border-4 border-gray-200
          shadow-inner mb-3
        "
      >
        {sprite ? (
          <Image
            src={sprite}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 200px"
            className="object-contain p-2"
            unoptimized
          />
        ) : ( "")}
      </div>

      {/* Nombre del Pokémon */}
      <h2 className="capitalize font-bold text-lg tracking-wide drop-shadow-md">
        {name}
      </h2>
    </Link>
  );
}
