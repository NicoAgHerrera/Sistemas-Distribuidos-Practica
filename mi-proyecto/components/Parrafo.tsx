type Props = { children: React.ReactNode; className?: string };

export default function Parrafo({ children, className = "" }: Props) {
  return (
    <p className={`leading-relaxed text-gray-300 mb-3 ${className}`}>
      {children}
    </p>
  );
}
