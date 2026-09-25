import Lenis from 'lenis'

let lenis: Lenis | null = null

/**
 * Inicializa el smooth scrolling global (Lenis) y expone el scroll hacia
 * anclas internas (#agendar, #metodologia, ...) sincronizado con el ticker
 * de requestAnimationFrame del navegador.
 */
export function initSmoothScroll(): () => void {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    // Sin animación de desplazamiento si el usuario lo pide.
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }

  lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.6,
  })

  let raf = 0
  const loop = (time: number) => {
    lenis?.raf(time)
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)

  // Intercepta enlaces ancla internos para un scroll suave coherente.
  const onClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null
    const anchor = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null
    if (!anchor) return
    const id = anchor.getAttribute('href')
    if (!id || id.length < 2) return
    event.preventDefault()
    scrollToId(id)
  }

  document.addEventListener('click', onClick)

  return () => {
    document.removeEventListener('click', onClick)
    cancelAnimationFrame(raf)
    lenis?.destroy()
    lenis = null
  }
}

/** Desplazamiento suave hacia una ancla con offset para la navbar flotante. */
export function scrollToId(selector: string, offset = -90): void {
  const el = document.querySelector(selector)
  if (!el) return

  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { offset, duration: 1.2 })
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
