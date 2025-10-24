// app/layout.tsx
// Este archivo define el layout global que envuelve TODAS las páginas.
//    Aquí se coloca el header (navbar), el footer y el body principal.
//    Se mantiene montado durante la navegación (no se vuelve a renderizar),
//    lo que preserva su estado y mejora el rendimiento.

import Link from "next/link"; // Se importa Link para navegación cliente (SPA)
import "./globals.css"; // Importamos los estilos globales (incluye Tailwind)

// RootLayout define la estructura global del HTML de toda la aplicación
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Estructura general del documento HTML
    <html lang="es">
      {/* 
        El body contiene toda la estructura visible de la app.
        - bg-gray-900 → fondo gris oscuro
        - text-white → texto blanco por defecto
        - flex flex-col min-h-screen → hace que el footer se mantenga al final
      */}
      <body className="bg-gray-900 text-white font-sans flex flex-col min-h-screen">
        
        {/* HEADER → Parte superior con la navegación */}
        <header className="p-4 bg-gray-800 border-b-2 border-gray-600 shadow-md">
          {/* 
            El header incluye una barra de navegación centrada.
            border-b-2 agrega una línea divisoria más visible.
          */}
          <nav className="flex gap-4 justify-center">
            {/* Link → Navegación sin recarga completa */}
            <Link
              href="/"
              className="hover:underline text-blue-400 flex items-center gap-2 text-lg font-semibold"
            >
              🏠 Lista de Pokémon
            </Link>
          </nav>
        </header>

        {/* MAIN → Contenedor principal donde se renderizan las páginas hijas */}
        {/* 
            max-w-6xl → limita el ancho del contenido
            mx-auto → centra horizontalmente
            flex-grow → ocupa el espacio disponible entre header y footer
        */}
        <main className="flex-grow max-w-6xl mx-auto w-full p-8">
          {children}
        </main>

        {/* FOOTER → Parte inferior con texto fijo */}
        {/* 
          border-t-2 → línea divisoria superior visible
          text-gray-400 → color de texto gris claro
        */}
        <footer className="bg-gray-800 border-t-2 border-gray-600 text-center p-4 text-gray-400">
          <p>
            Hecho con Next.js utilizando PokeAPI
          </p>
        </footer>
      </body>
    </html>
  );
}
