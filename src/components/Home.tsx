import { useEffect, useRef, useState } from "react";
import "../assets/Home.css";
import Search from "./Search";
function Home(): JSX.Element {
  const textoRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const textoElement = textoRef.current;
    let posicion = 0;
    const incremento = 0.18;
    const limiteSuperior = 125;
    const limiteInferior = -100;

    function animacion(): void {
      posicion += incremento;
      if (textoElement) {
        textoElement.style.transform = `translateX(${posicion}%)`;

        if (posicion > limiteSuperior) {
          posicion = limiteInferior;
        }

        if (posicion + textoElement.offsetWidth <= 0) {
          posicion = textoElement.offsetWidth;
          setIsVisible(false);
        } else if (!isVisible) {
          setIsVisible(true);
        }
      }

      requestAnimationFrame(animacion);
    }

    requestAnimationFrame(animacion);
  }, [isVisible]);

  return (
    <div className="fondo">
      <div id="texto-container">
        {isVisible && (
          <div id="texto" ref={textoRef}>
            Transforma tus diseños en obras de arte con nuestros recursos
            digitales a sólo $1 dólar✨
          </div>
        )}
      </div>
      <main className="contenedor">
        <div className="d-flex flex-column align-items-center subirlo">
          <img
            className="img-logo"
            src="../../public/img/logo.png"
            alt="Logo"
          />

          <Search withForm="col-6" />
        </div>
      </main>
    </div>
  );
}

export default Home;
