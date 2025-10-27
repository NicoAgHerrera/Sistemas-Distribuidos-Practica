export const favoritesService = {
  // Obtener todos los favoritos
  getAll: async (): Promise<{ id: number }[]> => {
    const res = await fetch("/api/favorites");

    // Si algo salió mal
    if (!res.ok) {
      throw new Error("Error al obtener la lista de favoritos");
    }

    // Devuelve el JSON (un array de objetos con id)
    return res.json();
  },

  // Agregar un Pokémon a favoritos
  add: async (id: number): Promise<{ id: number }> => {
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Error al agregar favorito");
    }

    return res.json();
  },

  // Eliminar un Pokémon de favoritos
  remove: async (id: number): Promise<void> => {
    const res = await fetch(`/api/favorites/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Error al eliminar favorito");
    }
  },
};
