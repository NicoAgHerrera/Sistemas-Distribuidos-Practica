// app/pokemon/[name]/loading.tsx
export default function PokemonDetailLoading() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] gap-6 text-center">
      <div className="w-24 h-24 border-[10px] border-red-600 border-b-transparent rounded-full animate-spin"></div>
      <p className="text-lg font-semibold text-gray-700">Cargando estadísticas...</p>
    </div>
  );
}
