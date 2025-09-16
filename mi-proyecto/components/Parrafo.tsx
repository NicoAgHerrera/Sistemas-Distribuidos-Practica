// Definición de los props que recibe el componente Parrafo
// children: contenido que se mostrará dentro del párrafo
// className: (opcional) clases CSS extra para personalizar estilos
type Props = { children: React.ReactNode; className?: string };

export default function Parrafo({ children, className = "" }: Props) {
  return (
    // Se renderiza un párrafo <p> con clases de Tailwind para estilo de texto (interlineado, color de texto, margen inferior)
    <p className={`leading-relaxed text-gray-300 mb-3 ${className}`}>
      {children}
    </p>
  );
}
