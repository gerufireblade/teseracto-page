import { useEffect, useRef } from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import gsap from "gsap";
import logo from './assets/logo.svg';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const colors = [
    "#FF4D80",
    "#FF3E41",
    "#DF367C",
    "#883955",
    "#4C3549",
    "#88498F",
    "#423E3B",
  ];

  let panelNum = 3;

  const createPanel = (index: number) => {
    const section = document.createElement("section");
    const h1 = document.createElement("h1");
    section.appendChild(h1);
    h1.textContent = `Panel ${index}`;

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    section.style.backgroundColor = randomColor;
    section.classList.add(`panel-${index}`);
    section.style.height = "100px";
    section.style.display = "flex";
    section.style.alignItems = "center";
    section.style.justifyContent = "center";

    containerRef.current?.appendChild(section);
  };

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const progress = Number(self.progress.toFixed(2));
        if (progress >= 0.9 && self.direction === 1) {
          createPanel(panelNum++);
          ScrollTrigger.refresh();
        }
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div className="app-container">
      <Header />
      <section className="first-section">
        <div className="main-content-wrapper">
          <div className="left-part">
            <p>Soluciones tecnológicas</p>
            <p>Software a medida</p>
            <p>Diseño web</p>
            <button>
              <p>Cuéntanos de tu proyecto</p>
            </button>
          </div>
          <div className="right-part">
            <img src={logo} alt="icon" />
          </div>
        </div>
      </section>
      {[...Array(5)].map((_, index) => (
        <section key={index} className="section-block">
          <h1>Scroll down to hide the header</h1>
        </section>
      ))}
      <main className="container" ref={containerRef}>
        <section className="panel-1">
          <h1>Panel 1</h1>
        </section>

        <section className="panel-2">
          <h1>Panel 2</h1>
        </section>
      </main>
    </div>
  );
}

export default App;
