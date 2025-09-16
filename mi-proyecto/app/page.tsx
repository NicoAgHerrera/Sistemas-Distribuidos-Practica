//Importación de los componentes a utilizar en la página
//Cada uno definido en la carpeta components
import Titulo from "@/components/Titulo"; // Componente que muestra un título en pantalla
import Parrafo from "@/components/Parrafo";   // Componente que muestra texto en párrafos
import BotonLike from "@/components/BotonLike"; // Botón interactivo que cuenta "likes"
import Imagen from "@/components/Imagen";  // Componente que muestra una imagen 


// Componente principal de la página raíz ("/").
// Next.js renderiza este componente cuando el usuario visita la ruta "/".
export default function Home() {// Se exporta la función Home como el componente principal de esta página.
  return (
    //El contenido de la pagina se estructura en un main con un estilo dado por Tailwind (espaciado, fuente, color, altura mínima, etc.)
    //Dentro de main se utizan los diferentes componentes que dan vida a la pagina, pasandoles por parametro los props que necesitan
    <main className="p-5 font-sans bg-gray-900 text-white min-h-screen"> 
      <Titulo texto="Página de prueba" />
      
      <Parrafo>
        Esta página es parte de una práctica para aprender a usar Next. 
      </Parrafo>

      <Imagen src="/foto1.jpg" alt="Una foto de prueba" ancho={400} alto={300} />
      

      <Parrafo>
        Estoy probando cómo se combinan los componentes y cómo se ven en pantalla.
      </Parrafo>
      
      <Imagen src="/foto2.png" alt="Una foto de prueba" ancho={100} alto={100} href= "https://www.youtube.com/watch?v=xvFZjo5PgG0&list=RDxvFZjo5PgG0&start_radio=1" />
      
      <h2>Prueba botón interactivo:</h2>
      <BotonLike />

      <footer style={{ marginTop: "40px", borderTop: "1px solid #ddd", paddingTop: "20px" }}>
        <Parrafo>Página de prueba - Sistemas Distribuidos - FI UNMDP</Parrafo>
      </footer>
    </main>
  );
}
