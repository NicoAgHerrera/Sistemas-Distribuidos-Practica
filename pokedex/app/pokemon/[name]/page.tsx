// app/pokemon/[name]/page.tsx
// Página dinámica SSR con barras de estadísticas y debilidades

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function PokemonDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  // 🔹 Obtenemos datos del Pokémon
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
    cache: "no-store",
  });
  if (!res.ok) notFound();
  const data = await res.json();

  // 🔹 Obtenemos tipos y debilidades
  const types = data.types.map((t: any) => t.type.name);
  const typeData = await Promise.all(
    types.map(async (t: string) => {
      const res = await fetch(`https://pokeapi.co/api/v2/type/${t}`);
      return res.ok ? res.json() : null;
    })
  );

  const weaknesses = Array.from(
    new Set(
      typeData
        .flatMap((td) => td?.damage_relations?.double_damage_from?.map((d: any) => d.name) || [])
        .filter(Boolean)
    )
  );

  // 🔹 Imagen oficial
  const imageUrl =
    data.sprites.other?.["official-artwork"]?.front_default ??
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;

  return (
    <article className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-2xl border-4 border-red-600 max-w-5xl mx-auto mt-10">
      {/* Imagen y nombre */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <Image
          src={imageUrl}
          alt={data.name}
          width={220}
          height={220}
          className="drop-shadow-lg"
          priority
        />
        <h1 className="text-4xl font-extrabold text-gray-800 capitalize">{data.name}</h1>
      </div>

      {/* Tipos */}
      <div className="flex gap-3 mb-6">
        {types.map((t: string) => (
          <span
            key={t}
            className="px-4 py-2 rounded-full font-semibold text-white capitalize shadow-md"
            style={{ backgroundColor: typeColor(t) }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Barras de estadísticas con escala real */}
      <section className="w-full bg-gray-100 p-6 rounded-2xl shadow-inner mb-8">
        <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">Puntos de base</h2>
        <div className="space-y-3">
          {data.stats.map((s: any) => {
            // Definimos máximos reales
            const maxValues: Record<string, number> = {
              hp: 255,
              attack: 181,
              defense: 230,
              "special-attack": 180,
              "special-defense": 230,
              speed: 200,
            };

            const statName = s.stat.name;
            const base = s.base_stat;
            const max = maxValues[statName] ?? 200; // fallback
            const percentage = Math.min((base / max) * 100, 100);

            return (
              <div key={statName}>
                <div className="flex justify-between mb-1 text-sm font-semibold text-gray-700 capitalize">
                  <span>{statName.replace("-", " ")}</span>
                  <span>{base}</span>
                </div>
                <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-red-500 to-red-700 transition-all duration-700"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* Debilidades */}
      <section className="w-full bg-gray-50 p-6 rounded-2xl shadow-inner">
        <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">Debilidades</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {weaknesses.map((w) => (
            <span
              key={w}
              className="px-3 py-1 rounded-full text-white font-medium capitalize"
              style={{ backgroundColor: typeColor(w) }}
            >
              {w}
            </span>
          ))}
        </div>
      </section>

      {/* Botón volver */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 mt-8 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full font-semibold shadow-md transition-transform hover:scale-105"
      >
        <Image
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
          alt="Pokéball"
          width={24}
          height={24}
        />
        Volver a la lista
      </Link>
    </article>
  );
}

// 🎨 Función auxiliar para asignar color a cada tipo de Pokémon
function typeColor(type: string) {
  const colors: Record<string, string> = {
    fire: "#F08030",
    water: "#6890F0",
    grass: "#78C850",
    electric: "#F8D030",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
    normal: "#A8A878",
  };
  return colors[type] ?? "#999";
}
