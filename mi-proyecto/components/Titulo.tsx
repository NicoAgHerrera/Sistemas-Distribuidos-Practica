type Props = { texto: string; className?: string }; 
export default function Titulo({ texto, className = "" }: Props) {
  return (
    <h1 className={`text-3xl md:text-5xl font-extrabold tracking-tight mb-4 ${className}`}>
      {texto}
    </h1>
  );
}
