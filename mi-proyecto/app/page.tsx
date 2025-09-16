import Titulo from "@/components/Titulo";
import Parrafo from "@/components/Parrafo";
import BotonLike from "@/components/BotonLike";
import Imagen from "@/components/Imagen";

export default function Home() {
  return (
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
