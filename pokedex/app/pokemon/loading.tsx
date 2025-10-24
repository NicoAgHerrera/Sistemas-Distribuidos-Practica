// app/pokemon/loading.tsx
// Este archivo especial se usa para mostrar un mensaje o interfaz temporal mientras el servidor está esperando el resultado del await en [name]/page.tsx.
//  Next.js lo muestra automáticamente en ese período.
//Observacion: a diferencia del skelleton de la lista, aca el fetch se realiza en el servidor, por lo que automaticamente Next.js al detectar el await en el servidor, se muestra este loading.tsx

export default function PokemonSegmentLoading() {
  return (
    <p style={{ color: "#9ca3af", textAlign: "center" }}>
      Cargando detalle...
    </p>
  );
}
