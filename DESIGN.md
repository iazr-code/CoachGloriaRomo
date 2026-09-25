# DESIGN.md — Contrato Visual
### Landing Page Inmersiva · Coach Ontológica **Gloria Marina Romo**
> Este documento es la **fuente de verdad del diseño**. Ningún componente puede definir
> colores, tipografías, radios o sombras fuera de los tokens declarados aquí.

---

## 0. Dirección de arte (Narrativa)

| Eje | Decisión |
|---|---|
| Metáfora central | **«Un mar de pensamientos en calma»** — fluido orgánico WebGL que respira en el fondo |
| Tono emocional | Fluidez, introspección, calma, autoridad intelectual cálida |
| Movimiento | Lento, orgánico, sin rebotes agresivos. Todo *se desliza*, nada *salta* |
| Superficie | Cristal traslúcido sobre abismo azul medianoche (glassmorphism) |
| Acento único | Magenta vibrante (identidad de la coach) — **prohibido secundario con el mismo peso** |
| Anti-patrón | ❌ Plantillas corporativas, ❌ gradientes azul-violeta genéricos, ❌ cards planas grises |

---

## 1. Paleta de Colores (tokens exactos)

### 1.1 Fondos
| Token | Hex | Uso |
|---|---|---|
| `midnight.950` | **`#050814`** | Background base del `<body>` (fondo primario) |
| `midnight.900` | **`#0A1128`** | Relieve del gradiente radial, secciones alternas |
| Shader deep | **`#070B19`** | Base GLSL del fluido (color más profundo) |
| Shader mid | `#0A1128` | Segundo stop de mezcla GLSL |
| `midnight.800` | `#0E1730` | Bordes internos / hairlines |

Gradiente de página:
```css
background:
  radial-gradient(1200px 800px at 15% -10%, rgba(99,102,241,0.14), transparent 60%),
  radial-gradient(1000px 700px at 85% 10%, rgba(217,27,92,0.12), transparent 55%),
  linear-gradient(180deg, #050814 0%, #0A1128 55%, #050814 100%);
```

### 1.2 Acentos
| Token | Hex | Rol | Regla de uso |
|---|---|---|---|
| `brand.magenta` | **`#D91B5C`** | **Accent Primary** — CTAs, foco, énfasis | Máx. 1 CTA sólido visible por sección |
| `brand.pink` | **`#EC4899`** | Gradiente del CTA + glow | Solo dentro del magenta (degradado `from-[#D91B5C] to-[#EC4899]`) |
| `brand.indigo` | **`#6366F1`** | **Accent Secondary** — transiciones shader, bordes etéreos | Nunca en texto de cuerpo; sí en glows y hairlines |
| `brand.gold` | `#F5C518` | Confeti exclusivamente | Solo en el evento `onEventScheduled` |

Glow de interacción:
```
shadow-pink-500/25   →  botones primarios
shadow-[0_0_40px_-12px_rgba(217,27,92,0.55)]  →  hover de CTA
```

### 1.3 Texto
| Token | Hex | Uso |
|---|---|---|
| `ink` (primary) | **`#F8FAFC`** | Titulares y texto principal (blanco cálido) |
| `ink.muted` | **`#94A3B8`** | Subtítulos, descripciones, notas legales |

---

## 2. Tipografía (tokens exactos)

### 2.1 Display / Titulares — **Cormorant Garamond** (Google Fonts)
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
```

| Rol | Clase Tailwind | Tamaño / Tracking |
|---|---|---|
| H1 Hero | `font-serif font-semibold leading-[1.04] tracking-[-0.02em]` | `text-[clamp(2.75rem,7vw,5.75rem)]` |
| H2 Sección | `font-serif font-semibold leading-[1.1] tracking-[-0.015em]` | `text-[clamp(2.1rem,4.4vw,3.6rem)]` |
| Cita / Destacado | `font-serif italic` | `text-[clamp(1.4rem,2.4vw,2rem)]` |

> La **itálica serif** se reserva para frases con carga emocional (una por sección como máximo).

### 2.2 Cuerpo / UI — **Plus Jakarta Sans**
| Rol | Clase | Tamaño |
|---|---|---|
| Subtítulo Hero | `font-sans font-light text-ink/75` | `text-lg md:text-xl leading-relaxed` |
| Cuerpo | `font-sans font-normal text-ink/70` | `text-[15px] md:text-base leading-[1.7]` |
| Eyebrow / Badge | `font-sans text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em]` | — |
| Botón | `font-sans font-semibold text-sm tracking-[0.02em]` | — |

---

## 3. Superficie Glassmorphism (única variante canónica)

```css
/* GLASS — tarjetas, navbar, paneles */
background: rgba(255,255,255,0.07);
backdrop-filter: blur(24px);   /* blur-xl */
border: 1px solid rgba(255,255,255,0.15);
box-shadow: 0 25px 60px -20px rgba(0,0,0,0.65);
```
Clase Tailwind reutilizable (`@layer components` en `src/index.css`):
```css
.glass { @apply bg-white/[0.07] backdrop-blur-xl border border-white/15 shadow-glass-xl; }
```

| Variante | Tokens extra | Dónde |
|---|---|---|
| `glass` (base) | los de arriba | Cards Bento, panel Calendly, modal |
| `glass-nav` | `bg-slate-950/60 backdrop-blur-md border border-white/15 rounded-full` | Navbar flotante |
| `glass-cta` | `bg-white/[0.06] hover:bg-white/[0.1] border border-white/20` | Botón secundario |
| Borde reactivo | `hover:border-pink-500/40 transition-colors duration-500` | Cards al hover |

**Regla:** ninguna superficie opaca al 100 % puede existir sobre el fondo WebGL.

---

## 4. Espaciado y Layout

| Token | Valor |
|---|---|
| Ritmo base | `8px` (Tailwind `space-y-*` / `gap-*`) |
| Sección vertical | `py-24 md:py-32 lg:py-40` |
| Ancho de contenido | `max-w-6xl` (`72rem`) para navegación y texto |
| Ancho hero text | `max-w-4xl` centrado |
| Grid Bento | `grid md:grid-cols-3 gap-4 md:gap-5` — **asimétrico** (1 card `md:col-span-2`, 1 card `md:row-span-2`) |
| Padding de card | `p-6 md:p-8` |
| Radius canónico | `rounded-2xl` (cards) · `rounded-full` (nav, badges, CTAs) · `rounded-3xl` (modal) |
| Navbar offset | `sticky top-4 z-40 mx-auto max-w-6xl px-4` |
| FAB | `fixed bottom-6 right-6 z-50` |

Breakpoints operativos: `sm 640 / md 768 / lg 1024 / xl 1280`.

---

## 5. Sistema de Movimiento

| Intención | Herramienta | Especificación |
|---|---|---|
| Scroll global | **Lenis** | `duration 1.1`, `smoothWheel: true`, anclas con `lenis.scrollTo('#id', { offset: -80 })` |
| Entradas de sección | **Framer Motion** | `whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 32 }} viewport={{ once: true, margin: '-15%' }}` `duration .8 ease [0.22,1,0.36,1]` |
| Stagger de cards | `transition={{ delay: i * 0.08 }}` | — |
| Fondo WebGL | Shader continuo a **~45 fps** controlado por `invalidate()` | `frameloop="demand"`, pausa con `visibilitychange` |
| Micro-interacción CTA | `whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}` | — |
| Indicador «En vivo» | `animate-ping` + `animate-livePulse` | esmeralda `#10B981` |
| Confeti | `canvas-confetti` | colores `['#D91B5C','#EC4899','#6366F1','#F5C518','#FDE68A']`, spread 70, scalar .9 |

`prefers-reduced-motion: reduce` ⇒ se congela el ticker del shader y se desactivan bucles.

---

## 6. Contrato del Hero WebGL (`ThoughtSeaCanvas`)

- `<Canvas>` **fijo a pantalla completa** detrás de todo: `fixed inset-0 -z-10 pointer-events-none`.
- `dpr={[1, 1.75]}` · `frameloop="demand"` · `gl={{ antialias: true, alpha: true }}`.
- Geometría: `planeGeometry` escalada para cubrir el viewport según `fov` y `size`.
- Shader GLSL propio (`uniforms: uTime, uPointer, uResolution`):
  - Mezcla `#070B19` ↔ `#0A1128` mediante FBM domain-warped.
  - **Vetas de magenta `#D91B5C`** y **brillo índigo `#6366F1`** modulados por una máscara radial
    centrada en las coordenadas del puntero (`uPointer`, interpolado con `lerp` 0.06).
  - Vignette + grano (`hash(gl_FragCoord.xy + uTime)`) para evitar banding.
- **Rendimiento:** un ticker `requestAnimationFrame` propio llama a `invalidate()` como máximo
  cada `1000/45 ms`; se detiene en `document.visibilitychange` (pestaña oculta) y respeta
  `prefers-reduced-motion`. No existe `useFrame` libre sin `invalidate`.

---

## 7. Componentes y responsabilidades

| Archivo | Responsabilidad |
|---|---|
| `src/components/Navbar.tsx` | Nav flotante glass, enlaces suaves, CTA magenta → `#agendar` |
| `src/components/Hero.tsx` | Badge, H1 serif, subtítulo, 2 CTAs (magenta + WhatsApp glass) |
| `src/components/MethodologyBento.tsx` | Bento 4 pilares, íconos Lucide, `whileInView` |
| `src/components/TestimonialsLive.tsx` | Supabase realtime + semilla fallback + `AnimatePresence` |
| `src/components/CalendlySection.tsx` | `InlineWidget` + `useCalendlyEventListener` → confeti + modal |
| `src/components/WhatsAppFAB.tsx` | FAB circular con ping + tooltip |
| `src/components/canvas/ThoughtSeaCanvas.tsx` | Motor WebGL del mar de pensamientos |
| `src/lib/supabase.ts` | Cliente resiliente (null si faltan envs) |
| `src/lib/lenis.ts` | Smooth scroll global + `scrollToId` |
| `src/data/seedTestimonials.ts` | Testimonios semilla de respaldo |

---

## 8. Accesibilidad & Calidad

- Contraste texto `#F8FAFC` sobre `#050814` ≈ **18.9:1** ✅ · `#94A3B8` sobre `#050814` ≈ **7.4:1** ✅
- Focus visible: `focus-visible:ring-2 focus-visible:ring-brand-pink focus-visible:ring-offset-2`
- Todo `<a>` interactivo tiene nombre accesible; FAB incluye `aria-label`.
- Landmarks: `<header> <main> <section aria-labelledby> <footer>`.
- Touch targets ≥ 44×44 px en CTA y FAB.
