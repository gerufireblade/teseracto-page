import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-regular-svg-icons";

export function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const lastScroll = useRef(0);
  const isHidden = useRef(false);
  const anim = useRef<GSAPTween | null>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const onScroll = () => {
      const currentScroll = window.scrollY;
      const direction = currentScroll > lastScroll.current ? "down" : "up";

      if (direction === "down" && !isHidden.current && currentScroll > 50) {
        anim.current?.kill();
        anim.current = gsap.to(header, {
          y: -header.offsetHeight - 10,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
        });
        isHidden.current = true;
      }

      if (direction === "up" && isHidden.current) {
        anim.current?.kill();
        anim.current = gsap.to(header, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        });
        isHidden.current = false;
      }

      lastScroll.current = currentScroll;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={styles.headerWrapper}>
        <div className={styles.headerIcon}>
          <FontAwesomeIcon icon={faHouse} size="2x" />
        </div>
        <div className={styles.headerItems}>
          <span>Servicios</span>
          <span>Portafolio</span>
          <span>Conócenos</span>
          <span>Contacto</span>
        </div>
      </div>
    </header>
  );
}