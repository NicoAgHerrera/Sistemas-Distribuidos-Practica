import { NextResponse } from "next/server";
import { db } from "@/app/lib/database";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ← obligatorio en Next.js 15

  const numericId = parseInt(id);

  if (isNaN(numericId) || numericId <= 0) {
    return NextResponse.json(
      { error: "El ID debe ser un número válido" },
      { status: 400 }
    );
  }

  try {
    const deleted = await db.delete(numericId);

    if (!deleted) {
      return NextResponse.json(
        { error: "Pokémon no encontrado en favoritos" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Pokémon eliminado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error al eliminar el Pokémon" },
      { status: 500 }
    );
  }
}
