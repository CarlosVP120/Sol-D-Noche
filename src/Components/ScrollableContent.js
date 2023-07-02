import React, { useState, useEffect } from "react";

const ScrollableContent = () => {
  const [showScrollbar, setShowScrollbar] = useState(true);

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      clearTimeout(scrollTimeout);

      // Oculta el scrollbar después de 1 segundo de inactividad
      scrollTimeout = setTimeout(() => {
        setShowScrollbar(false);
      }, 1000);

      // Muestra el scrollbar inmediatamente
      setShowScrollbar(true);
    };

    document
      .querySelector(".scrollable-content")
      .addEventListener("scroll", handleScroll);

    return () => {
      document
        .querySelector(".scrollable-content")
        .removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`scrollable-content ${showScrollbar ? "show-scrollbar" : ""}`}
    >
      {/* Contenido scrollable */}
    </div>
  );
};

export default ScrollableContent;
