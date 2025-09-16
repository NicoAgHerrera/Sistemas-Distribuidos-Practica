// Definición de los props que recibe el componente Titulo
// texto: el contenido que se mostrará dentro del título
// className: (opcional) clases CSS extra para personalizar estilos
type Props = { texto: string; className?: string }; 
export default function Titulo({ texto, className = "" }: Props) {
  return (
    // Se renderiza un título <h1> con estilos de Tailwind (tamaño de fuente, agrandamiento en pantallas mas grandes, grosor de fuente, margen inferior)
    <h1 className={`text-3xl md:text-5xl font-extrabold tracking-tight mb-4 ${className}`}>
      {texto}
    </h1>
  );
}
