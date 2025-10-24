// app/pokemon/[name]/page.tsx
import axios from "axios";
import Link from "next/link";
import Image from "next/image"; // 🔹 Import necesario
import { notFound } from "next/navigation";

export default async function PokemonDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  try {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name.toLowerCase())}`
    );

    const data = res.data as {
      id: number;
      name: string;
      sprites: {
        other?: { ["official-artwork"]?: { front_default: string | null } };
      };
      types: { type: { name: string } }[];
    };

    const imageUrl =
      data.sprites.other?.["official-artwork"]?.front_default ??
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;

    return (
      <article style={{ textAlign: "center" }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            marginBottom: 12,
            textTransform: "capitalize",
          }}
        >
          {data.name}
        </h1>

        {/* ✅ Reemplazamos <img> por <Image> */}
        <Image
          src={imageUrl}
          alt={data.name}
          width={200}
          height={200}
          style={{
            display: "block",
            margin: "0 auto 12px",
            borderRadius: 12,
            backgroundColor: "#1f2937",
            padding: 8,
          }}
          unoptimized={false} // opcional: dejar que Next optimice la imagen
          priority // hace que cargue más rápido la imagen principal
        />

        <p style={{ fontSize: 18 }}>
          Tipos:{" "}
          <span style={{ color: "#60a5fa" }}>
            {data.types.map((t) => t.type.name).join(", ")}
          </span>
        </p>

        <Link
          href="/"
          style={{
            display: "inline-block",
            marginTop: 16,
            background: "#2563eb",
            color: "white",
            padding: "8px 12px",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          ← Volver a la lista
        </Link>
      </article>
    );
  } catch (err: any) {
    if (err?.response?.status === 404) notFound();
    throw err;
  }
}
