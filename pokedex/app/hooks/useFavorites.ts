"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { favoritesService } from "@/app/services/favorites.service";

// Obtener lista de favoritos
export function useFavorites() {
  return useQuery({
    queryKey: ["favorites"], // Clave única de caché
    queryFn: favoritesService.getAll, // Llama al servicio para traer los datos
  });
}

// Agregar un favorito
export function useAddFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: favoritesService.add, // Ejecuta el servicio add(id)
    onSuccess: () => {
      // Invalida la caché de favoritos para refrescar la lista
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}

// Eliminar un favorito
export function useRemoveFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: favoritesService.remove, // Ejecuta el servicio remove(id)
    onSuccess: () => {
      // Refresca la lista de favoritos
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}
