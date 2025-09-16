// Importa el componente Image optimizado de Next.js
// Este componente reemplaza al <img> de HTML estándar y agrega optimizaciones (probe el img tambien pero queria usar la importacion)
import Image from "next/image";

// Definición de los tipos de props que recibirá este componente.
// TypeScript garantiza que cuando alguien use <Imagen />, deba pasarle estos parámetros:
type Props = {
  src: string;   // Ruta de la imagen (obligatoria)
  alt: string;   // Texto alternativo por si la imagen no se ve
  ancho: number; // Ancho de la imagen en píxeles (obligatorio)
  alto: number;  // Alto de la imagen en píxeles (obligatorio)
  href?: string;  // (opcional) Enlace que se abre cuando se toca la imagen
  className?: string;    // (opcional) Clases CSS extra (Tailwind) para personalizar estilos
};

// Definición del componente Imagen
// Recibe las props y decide si mostrar solo una imagen o una imagen dentro de un <a> (enlace).
export default function Imagen({ src, alt, ancho, alto, href, className = "" }: Props) {
  // Se crea un JSX que contiene la imagen con sus props aplicadas
  const img = (
    <Image
      src={src}
      alt={alt}
      width={ancho}
      height={alto}
      className={`rounded-xl shadow-lg ${className}`}
    />
  );
  
  return (
    // El contenedor usa Tailwind para centrar la imagen horizontalmente con flexbox (ancho completo, activa flexbox para linear, justifica en el centro y aplica un margen vertical (arriba y abajo))
    <div className="w-full flex justify-center my-6">
      {href ? ( // Si se pasa "href", la imagen se envuelve en un <a> para que sea clickeable.
        <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block">
          {img}
        </a>
      ) : ( //// Si no hay "href", se muestra la imagen directamente
        img
      )}
    </div>
  );
}
