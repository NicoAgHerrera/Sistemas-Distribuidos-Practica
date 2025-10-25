import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col font-sans text-white bg-red-900 bg-[radial-gradient(circle_at_center,_#a31212_1px,_#7a0a0a_1px)] [background-size:16px_16px]">
        
        {/* 🔺 CABECERA CON CURVA Y POKEBOLA */}
        <header className="relative bg-gradient-to-b from-red-700 to-red-900 border-b-4 border-red-600 shadow-lg">
          {/* Curva decorativa superior */}
          <div className="absolute inset-x-0 bottom-0 h-8 bg-red-900 clip-pokedex-top"></div>

          <nav className="relative z-10 flex justify-center items-center p-6">
            {/* Botón Pokébola como Link */}
            <Link
              href="/"
              className="group relative w-16 h-16 rounded-full bg-white border-4 border-black flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              aria-label="Volver al inicio"
            >
              {/* Línea divisoria de la Pokébola */}
              <div className="absolute inset-x-0 h-1 bg-black top-1/2 -translate-y-1/2"></div>
              {/* Círculo central */}
              <div className="absolute w-6 h-6 bg-white border-4 border-black rounded-full group-hover:bg-gray-200"></div>
            </Link>

            {/* Título Pokédex */}
            <h1 className="ml-6 text-3xl font-extrabold tracking-wider text-yellow-300 drop-shadow-lg">
              Pokédex
            </h1>
          </nav>
        </header>

        {/* 🔳 CUERPO PRINCIPAL */}
        <main className="flex-grow mx-auto w-full max-w-5xl bg-gray-900/95 mt-8 mb-8 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.7)] border-2 border-red-500 p-8">
          {children}
        </main>

        {/* 🔻 PIE DE PÁGINA CON CURVA */}
        <footer className="relative bg-gradient-to-t from-red-700 to-red-900 border-t-4 border-red-600 shadow-inner text-center text-gray-200 py-4">
          <div className="absolute inset-x-0 top-0 h-8 bg-red-900 clip-pokedex-bottom"></div>
          <p className="relative z-10 text-sm">Hecho con Next.js usando PokeAPI</p>
        </footer>
      </body>
    </html>
  );
}
