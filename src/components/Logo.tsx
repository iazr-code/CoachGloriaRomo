/**
 * Logo de marca — Gloria Marina Romo Pantoja.
 * Marca circular con degradado magenta → índigo, monograma "G"
 * y una onda que evoca el "mar de pensamientos en calma".
 */

export function LogoMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
      className={`${className} shrink-0`}
    >
      <defs>
        <linearGradient id="gmr-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#D91B5C" />
          <stop offset="1" stopColor="#6366F1" />
        </linearGradient>
      </defs>
      <circle
        cx="32"
        cy="32"
        r="27"
        fill="rgba(5,8,20,0.75)"
        stroke="url(#gmr-grad)"
        strokeWidth="3"
      />
      <text
        x="32"
        y="41"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="32"
        fontStyle="italic"
        fill="#F8FAFC"
      >
        G
      </text>
      <path
        d="M13 48 q6 -5 12 0 t12 0 t12 0"
        fill="none"
        stroke="url(#gmr-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

interface LogoProps {
  className?: string
  /** Muestra el apellido completo (por defecto solo el nombre corto). */
  fullName?: boolean
  markClassName?: string
}

/** Marca + wordmark tipográfico. No incluye el enlace: lo aporta el contenedor. */
export default function Logo({
  className = '',
  fullName = false,
  markClassName,
}: LogoProps) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className={markClassName ?? 'h-8 w-8'} />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-lg font-semibold tracking-tight text-ink md:text-xl">
          Gloria Marina Romo
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-ink-muted">
          {fullName ? 'Pantoja · Coach Ontológica' : 'Coach Ontológica'}
        </span>
      </span>
    </span>
  )
}
