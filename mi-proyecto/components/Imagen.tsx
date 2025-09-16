import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  ancho: number;
  alto: number;
  href?: string;          
  className?: string;
};

export default function Imagen({ src, alt, ancho, alto, href, className = "" }: Props) {
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
    <div className="w-full flex justify-center my-6">
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block">
          {img}
        </a>
      ) : (
        img
      )}
    </div>
  );
}
