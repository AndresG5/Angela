export function TwistedTree({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 180"
      fill="none"
      className={className}
      style={{ filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.3))" }}
    >
      {/* Tronco torcido */}
      <path
        d="M60 180 Q45 150 55 130 Q50 110 60 90 Q55 70 58 50 Q62 30 60 10"
        stroke="#4a4458"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      {/* Ramas asimétricas */}
      <path
        d="M58 50 Q40 45 25 40"
        stroke="#4a4458"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M60 70 Q75 65 90 55"
        stroke="#4a4458"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M55 90 Q35 85 20 75"
        stroke="#4a4458"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M60 30 Q80 28 95 20"
        stroke="#4a4458"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Moon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      className={className}
      style={{ filter: "drop-shadow(0 0 20px rgba(168, 85, 247, 0.4))" }}
    >
      <circle cx="40" cy="40" r="35" fill="#a855f7" opacity="0.9" />
      <circle cx="45" cy="35" r="30" fill="#1e1b4b" />
      {/* Cráteres */}
      <circle cx="32" cy="28" r="4" fill="#a855f7" opacity="0.3" />
      <circle cx="42" cy="42" r="6" fill="#a855f7" opacity="0.2" />
      <circle cx="38" cy="52" r="3" fill="#a855f7" opacity="0.3" />
    </svg>
  );
}

export function FloatingStars({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className}>
      <path
        d="M30 40 L32 45 L37 47 L32 49 L30 54 L28 49 L23 47 L28 45 Z"
        fill="#a855f7"
        opacity="0.6"
      />
      <path
        d="M160 30 L162 35 L167 37 L162 39 L160 44 L158 39 L153 37 L158 35 Z"
        fill="#60a5fa"
        opacity="0.7"
      />
      <path
        d="M180 80 L181 83 L184 84 L181 85 L180 88 L179 85 L176 84 L179 83 Z"
        fill="#a855f7"
        opacity="0.5"
      />
      <path
        d="M50 160 L52 165 L57 167 L52 169 L50 174 L48 169 L43 167 L48 165 Z"
        fill="#60a5fa"
        opacity="0.6"
      />
    </svg>
  );
}

export function CurvedSpiral({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className}>
      <path
        d="M50 50 Q60 40 70 40 Q80 40 85 50 Q85 60 80 65 Q70 72 60 70 Q48 68 45 60 Q43 50 48 42"
        stroke="#6366f1"
        strokeWidth="3"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M50 50 Q55 45 62 45 Q68 45 72 50 Q72 56 68 60 Q62 64 56 62 Q50 60 48 55"
        stroke="#a855f7"
        strokeWidth="2.5"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}
