import { NextResponse } from "next/server";
import { db } from "@/app/lib/database";

export async function GET() {
    try{
        const favorites=await db.getAll();
        return NextResponse.json(favorites,{status:200});
    } catch(error){
        return NextResponse.json(
            {error:"Error al obtener los Pokémon favoritos"},
            {status:500}
        );
    }
}
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validar que venga el id
    if (!body.id && body.id !== 0) {
      return NextResponse.json(
        { error: "Falta el campo obligatorio: id" },
        { status: 400 }
      );
    }

    // Validar tipo y que sea número positivo
    if (typeof body.id !== "number" || body.id <= 0) {
      return NextResponse.json(
        { error: "El id debe ser un número mayor a 0" },
        { status: 400 }
      );
    }
    try {
      const newFavorite = await db.add(body.id);
      return NextResponse.json(newFavorite, { status: 201 }); // Creado correctamente
    } catch (err: any) {
      if (err.message.includes("ya está en favoritos")) {
        return NextResponse.json(
          { error: "El Pokémon ya está en favoritos" },
          { status: 409 } // Conflicto
        );
      }
      throw err;
    }

  } catch (error) {
    return NextResponse.json(
      { error: "Error al agregar el Pokémon a favoritos" },
      { status: 500 }
    );
  }
}
