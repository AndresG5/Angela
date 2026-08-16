interface BlueDoorProps {
  /** 0 = cerrada, 1 = completamente abierta */
  openAmount?: number;
  /** 0 = sin luz detrás, 1 = luz al máximo */
  glow?: number;
  width?: number;
  /** Pequeño balanceo continuo cuando está cerrada */
  idle?: boolean;
  className?: string;
}

/**
 * La puerta azul: marco tallado oscuro, panel azul con perilla dorada,
 * que gira sobre su bisagra en 3D real (perspective + rotateY) y revela
 * una luz creciente detrás conforme se abre.
 */
export function BlueDoor({
  openAmount = 0,
  glow = 0,
  width = 120,
  idle = false,
  className = "",
}: BlueDoorProps) {
  const height = width * 1.55;
  const inset = width * 0.09;

  return (
    <div
      className={`relative ${idle ? "animate-[door-sway_4.5s_ease-in-out_infinite]" : ""} ${className}`}
      style={{ width, height, perspective: width * 5 }}
    >
      {/* Marco tallado */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: `${width * 0.5}px ${width * 0.5}px ${width * 0.08}px ${width * 0.08}px`,
          background: "linear-gradient(160deg, #241209 0%, #4a2e1a 45%, #1a0d05 100%)",
          boxShadow: `inset 0 0 0 ${Math.max(2, width * 0.025)}px rgba(0,0,0,0.45), 0 ${width * 0.05}px ${width * 0.15}px rgba(0,0,0,0.55)`,
        }}
      >
        {/* Filigrana sutil en el marco */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            borderRadius: "inherit",
            background:
              "repeating-linear-gradient(45deg, rgba(217,180,120,0.12) 0px, rgba(217,180,120,0.12) 1px, transparent 1px, transparent 8px)",
          }}
        />
      </div>

      {/* Hueco de la puerta (recorta lo que se ve dentro del marco) */}
      <div
        className="absolute overflow-hidden"
        style={{
          top: inset,
          left: inset,
          right: inset,
          bottom: inset,
          borderRadius: `${width * 0.42}px ${width * 0.42}px ${width * 0.04}px ${width * 0.04}px`,
        }}
      >
        {/* Luz del otro lado, crece con "glow" */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle at 50% 62%, rgba(240,171,252,${glow * 0.95}) 0%, rgba(168,85,247,${glow * 0.65}) 45%, #0b0714 85%)`,
            opacity: glow > 0 ? 1 : 0,
          }}
        />
        <div className="absolute inset-0" style={{ background: "#150d24" }} />

        {/* Panel azul: gira sobre la bisagra izquierda */}
        <div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "left center",
            transform: `rotateY(${-openAmount * 108}deg)`,
            transition: "transform 1.1s cubic-bezier(0.22, 0.9, 0.24, 1)",
            background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 45%, #1e2f6e 100%)",
            boxShadow: `inset 0 0 0 ${Math.max(2, width * 0.03)}px rgba(0,0,0,0.3)`,
          }}
        >
          {/* Panel tallado interior */}
          <div
            className="absolute rounded-md"
            style={{
              inset: "13%",
              border: "1.5px solid rgba(0,0,0,0.28)",
              boxShadow: "inset 0 0 8px rgba(255,255,255,0.10), inset 0 0 2px rgba(0,0,0,0.3)",
            }}
          />
          {/* Reflejo sutil */}
          <div
            className="absolute inset-0 opacity-40"
            style={{ background: "linear-gradient(120deg, rgba(255,255,255,0.18), transparent 40%)" }}
          />
          {/* Perilla dorada */}
          <div
            className="absolute rounded-full"
            style={{
              width: width * 0.1,
              height: width * 0.1,
              right: "13%",
              top: "51%",
              background: "radial-gradient(circle at 35% 32%, #fde68a 0%, #d97706 60%, #92400e 100%)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.6)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
