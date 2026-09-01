import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

/**
 * Escena que aparece justo después de cruzar la Puerta Secreta: Vincent
 * entrega la carta que preparó Andrés. La imagen cubre toda la pantalla
 * (como una escena de cine) y Angela tiene que tocar el sobre que trae
 * en la mano —no un botón aparte— para pasar a la carta.
 *
 * Se renderiza con un portal directo a document.body: así "fixed" mide
 * siempre contra la ventana real (viewport), sin importar si algún
 * contenedor padre tiene un transform/animación activa que lo encoja
 * (eso era lo que dejaba franjas negras alrededor en computadora).
 *
 * ── Sobre el tamaño de la pantalla en celular ──
 * En vez de dibujar el contenedor con "100vw / 100dvh" (CSS) y luego
 * calcular el punto del sobre con "window.innerWidth/innerHeight" (JS)
 * por separado, ahora se mide el tamaño UNA sola vez con JS
 * (usando visualViewport cuando existe, que es lo más preciso en
 * celular) y ESE mismo número se usa tanto para dibujar el contenedor
 * como para calcular dónde cae el sobre. Antes, si esos dos números no
 * coincidían exactamente (algo común en celular cuando la barra de
 * direcciones del navegador aparece/desaparece), la imagen se recortaba
 * distinto a como se calculaba el punto del sobre, y por eso a veces
 * había que tocar varias veces antes de que funcionara.
 */

// Dimensiones reales del archivo de imagen
const NATURAL_W = 864;
const NATURAL_H = 1221;

// Zona del sobre dentro de la imagen original, como fracción del ancho
// y alto (0 a 1). Si algún día cambias la imagen, solo hay que ajustar
// estos 4 números para que el punto siga cayendo sobre el sobre nuevo.
const ENVELOPE_BOX = { fx1: 0.14, fy1: 0.55, fx2: 0.53, fy2: 0.71 };

interface Hotspot {
  left: number;
  top: number;
  width: number;
  height: number;
}

function getViewportSize() {
  const vv = typeof window !== "undefined" ? window.visualViewport : undefined;
  return {
    width: vv?.width ?? window.innerWidth,
    height: vv?.height ?? window.innerHeight,
  };
}

export function VincentDelivery({ onOpenLetter }: { onOpenLetter: () => void }) {
  const navigate = useNavigate();
  const [viewport, setViewport] = useState(() => getViewportSize());
  const [hotspot, setHotspot] = useState<Hotspot | null>(null);

  useEffect(() => {
    function recompute() {
      const { width: cw, height: ch } = getViewportSize();
      if (!cw || !ch) return;

      setViewport({ width: cw, height: ch });

      // Misma matemática que "object-fit: cover" con posición centrada:
      // la imagen se escala para cubrir el contenedor completo y el
      // sobrante se recorta parejo de los dos lados.
      const scale = Math.max(cw / NATURAL_W, ch / NATURAL_H);
      const displayedW = NATURAL_W * scale;
      const displayedH = NATURAL_H * scale;
      const offsetX = (cw - displayedW) / 2;
      const offsetY = (ch - displayedH) / 2;

      setHotspot({
        left: offsetX + ENVELOPE_BOX.fx1 * displayedW,
        top: offsetY + ENVELOPE_BOX.fy1 * displayedH,
        width: (ENVELOPE_BOX.fx2 - ENVELOPE_BOX.fx1) * displayedW,
        height: (ENVELOPE_BOX.fy2 - ENVELOPE_BOX.fy1) * displayedH,
      });
    }

    recompute();
    window.addEventListener("resize", recompute);
    window.addEventListener("orientationchange", recompute);
    window.visualViewport?.addEventListener("resize", recompute);
    return () => {
      window.removeEventListener("resize", recompute);
      window.removeEventListener("orientationchange", recompute);
      window.visualViewport?.removeEventListener("resize", recompute);
    };
  }, []);

  const scene = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="overflow-hidden bg-black"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: viewport.width,
        height: viewport.height,
        zIndex: 2147483000,
      }}
    >
      {/* Imagen a pantalla completa, como una escena de cine */}
      <img
        src="/images/vincent/vincent_carta.jpg"
        alt="Vincent con la carta"
        className="absolute inset-0 w-full h-full object-cover object-center"
        draggable={false}
      />

      {/* Degradado para que el texto se lea bien sobre la imagen */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,9,20,0.85) 0%, rgba(5,9,20,0.1) 16%, transparent 45%, transparent 68%, rgba(5,9,20,0.4) 100%)",
        }}
      />

      {/* Volver al menú: esta escena tapa todo, así que necesita su
          propia flecha de regreso (la de Letter.tsx queda por debajo,
          tapada). */}
      <button
        onClick={() => navigate("/menu")}
        className="absolute z-20 p-2.5 rounded-xl text-blue-100 transition-all hover:bg-white/10"
        style={{
          top: "calc(14px + env(safe-area-inset-top, 0px))",
          left: "calc(14px + env(safe-area-inset-left, 0px))",
          background: "rgba(8,14,36,0.55)",
          border: "1px solid rgba(203,203,213,0.3)",
        }}
        aria-label="Volver al menú"
      >
        <ArrowLeft size={20} />
      </button>

      {/* Globo de diálogo — chico y pegado arriba del todo, para no
          taparle la cara a Vincent */}
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute left-1/2 -translate-x-1/2 w-[90%] max-w-xs px-3.5 py-2.5 rounded-2xl"
        style={{
          top: "calc(64px + env(safe-area-inset-top, 0px))",
          background: "linear-gradient(135deg, rgba(20,18,28,0.94) 0%, rgba(45,41,58,0.94) 100%)",
          border: "1.5px solid rgba(203,203,213,0.4)",
          boxShadow: "0 0 16px rgba(148,148,168,0.25), 0 6px 16px rgba(0,0,0,0.45)",
        }}
      >
        <p className="text-gray-100 text-xs italic leading-snug">
          Angela, tardaste tanto que esto ya empezaba a sentirse como
          una reliquia. Andrés me dejó esto para ti, con la condición
          de que llegara a tus manos, así que toma antes de que empiece
          a cobrarme intereses por la espera.
        </p>
      </motion.div>

      {/* Resplandor sutil sobre el sobre, para que se note que ahí pasa
          algo sin poner un botón visible encima */}
      {hotspot && (
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            left: hotspot.left - hotspot.width * 0.2,
            top: hotspot.top - hotspot.height * 0.2,
            width: hotspot.width * 1.4,
            height: hotspot.height * 1.4,
            background: "radial-gradient(circle, rgba(216,178,124,0.4), transparent 70%)",
            filter: "blur(8px)",
          }}
          animate={{ opacity: [0.25, 0.6, 0.25] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Punto sobre el sobre: aquí es donde se toca. Un poco más
          grande que el sobre real (padding invisible) para que en
          celular sea más fácil acertarle al primer toque. */}
      {hotspot && (
        <button
          type="button"
          onClick={onOpenLetter}
          onTouchEnd={(e) => {
            // En algunos navegadores móviles, el evento "click" tarda
            // en llegar o a veces no se dispara a la primera. Al
            // resolver la acción también en touchend, se abre desde
            // el primer toque.
            e.preventDefault();
            onOpenLetter();
          }}
          aria-label="Abrir la carta"
          className="absolute cursor-pointer bg-transparent border-0 p-0"
          style={{
            left: hotspot.left - hotspot.width * 0.15,
            top: hotspot.top - hotspot.height * 0.15,
            width: hotspot.width * 1.3,
            height: hotspot.height * 1.3,
            touchAction: "manipulation",
          }}
        />
      )}
    </motion.div>
  );

  return createPortal(scene, document.body);
}
