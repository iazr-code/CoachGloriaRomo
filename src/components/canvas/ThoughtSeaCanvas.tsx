import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* ------------------------------------------------------------------ *
 *  «Un mar de pensamientos en calma» — ThoughtSeaCanvas
 *  Fluid shader a pantalla completa tras toda la UI.
 *
 *  Rendimiento (CRÍTICO):
 *   · frameloop="demand"  → R3F solo pinta cuando alguien llama a invalidate()
 *   · Ticker propio limitado a TARGET_FPS (45 fps) dispara invalidate()
 *   · Pausa total con document.hidden (pestaña inactiva)
 *   · IntersectionObserver pausa cuando el contenedor sale de pantalla
 *   · prefers-reduced-motion congela el fluido (un único render estático)
 *   · dpr={[1, 1.75]} limita la densidad de píxeles en pantallas retina
 * ------------------------------------------------------------------ */

const TARGET_FPS = 45
const FRAME_INTERVAL = 1000 / TARGET_FPS

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Ondulación sutil de la superficie: refuerza la sensación de fluido vivo.
    float wave =
      sin(pos.x * 2.4 + uTime * 0.35) * 0.018 +
      cos(pos.y * 2.0 - uTime * 0.28) * 0.014;
    pos.z += wave;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uPointer;     // normalizado (-1 .. 1)
  uniform vec2 uResolution;  // píxeles del canvas
  varying vec2 vUv;

  // #070B19 · #0A1128 · #D91B5C · #6366F1
  const vec3 C_DEEP    = vec3(0.0275, 0.0431, 0.0980);
  const vec3 C_MID     = vec3(0.0392, 0.0667, 0.1569);
  const vec3 C_MAGENTA = vec3(0.8510, 0.1059, 0.3608);
  const vec3 C_INDIGO  = vec3(0.3882, 0.4000, 0.9451);

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    mat2 rot = mat2(0.80, 0.60, -0.60, 0.80);
    for (int i = 0; i < 5; i++) {
      v += amp * vnoise(p);
      p = rot * p * 2.02;
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = (vUv - 0.5) * vec2(aspect, 1.0) * 1.7;

    float t = uTime * 0.045;

    // Zona de influencia del puntero (calma que reacciona a la mirada).
    vec2 ptr = vec2(uPointer.x * aspect, uPointer.y) * 0.85;
    float dPointer = length(p - ptr);
    float infl = smoothstep(1.15, 0.0, dPointer);

    // Domain warping: dos capas de FBM que se arrastran entre sí.
    vec2 q = vec2(
      fbm(p + vec2(0.0, t)),
      fbm(p + vec2(5.2, 1.3) - t * 0.8)
    );
    vec2 r = vec2(
      fbm(p + 2.4 * q + vec2(1.7, 9.2) + t * 0.7),
      fbm(p + 2.4 * q + vec2(8.3, 2.8) - t * 0.5)
    );
    float f = fbm(p + 2.0 * r);

    vec3 col = mix(C_DEEP, C_MID, clamp(f * 1.35, 0.0, 1.0));

    // Vet as de magenta e índigo: sutiles, más vivas junto al puntero.
    float veinM = pow(clamp(r.x, 0.0, 1.0), 4.0);
    float veinI = pow(clamp(q.y, 0.0, 1.0), 3.0);

    col += C_MAGENTA * veinM * (0.30 + 0.80 * infl) * 0.55;
    col += C_INDIGO  * veinI * (0.16 + 0.38 * infl) * 0.50;
    col += C_MAGENTA * infl * 0.055;

    // Viñeta para que el texto respire en los bordes.
    float vig = smoothstep(1.55, 0.35, length(p));
    col *= mix(0.70, 1.0, vig);

    // Grano temporal fino: evita banding en los degradados oscuros.
    float grain = hash21(gl_FragCoord.xy + fract(uTime) * 97.0);
    col += (grain - 0.5) * 0.018;

    gl_FragColor = vec4(col, 1.0);
  }
`

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/** Limita el render a TARGET_FPS y lo detiene con la pestaña en background. */
function RenderTicker({ active }: { active: boolean }) {
  const invalidate = useThree((state) => state.invalidate)

  useEffect(() => {
    if (!active) return

    let raf = 0
    let last = 0

    const loop = (time: number) => {
      raf = requestAnimationFrame(loop)
      if (document.hidden) return
      if (time - last >= FRAME_INTERVAL) {
        last = time
        invalidate()
      }
    }

    raf = requestAnimationFrame(loop)
    // Pintado inicial inmediato al reactivarse.
    invalidate()

    return () => cancelAnimationFrame(raf)
  }, [active, invalidate])

  return null
}

function ThoughtSea({ active }: { active: boolean }) {
  const size = useThree((state) => state.size)
  const viewport = useThree((state) => state.viewport)
  const meshRef = useRef<THREE.Mesh>(null)
  const pointerTarget = useRef(new THREE.Vector2(0, 0))

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    [],
  )

  // Resolución efectiva del canvas (para mantener el aspecto en el shader).
  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height)
    invalidateMesh()
  }, [size.width, size.height, uniforms])

  // El canvas usa pointer-events: none, así que escuchamos el puntero en window.
  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const x = (event.clientX / Math.max(window.innerWidth, 1)) * 2 - 1
      const y = -((event.clientY / Math.max(window.innerHeight, 1)) * 2 - 1)
      pointerTarget.current.set(x, y)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [])

  function invalidateMesh() {
    // Fuerza un primer frame correcto tras redimensionar.
    if (!active) return
  }

  // El plano se escala para cubrir el viewport con margen (sin bordes al hacer scroll).
  const scale = useMemo<[number, number]>(
    () => [viewport.width * 1.25, viewport.height * 1.25],
    [viewport.width, viewport.height],
  )

  useFrame((_, delta) => {
    // Avance temporal estable aunque lleguen deltas largos tras una pausa.
    uniforms.uTime.value += Math.min(delta, 0.05)
    uniforms.uPointer.value.lerp(pointerTarget.current, 0.06)
  })

  return (
    <mesh ref={meshRef} scale={[scale[0], scale[1], 1]}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        uniforms={uniforms}
        depthWrite={false}
        transparent={false}
      />
    </mesh>
  )
}

export default function ThoughtSeaCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)
  const [tabVisible, setTabVisible] = useState(true)
  const [reducedMotion] = useState(() => prefersReducedMotion())

  // Pausa el consumo de GPU cuando la pestaña no está activa.
  useEffect(() => {
    const onVisibility = () => setTabVisible(!document.hidden)
    onVisibility()
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  // Pausa el ticker si el contenedor sale del viewport (defensa adicional).
  useEffect(() => {
    const node = containerRef.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? true),
      { threshold: 0 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // Si el usuario prefiere movimiento reducido, se pinta un solo frame estático.
  useEffect(() => {
    if (!reducedMotion) return
    setTabVisible(false)
  }, [reducedMotion])

  const animate = inView && tabVisible && !reducedMotion

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
    >
      <Canvas
        frameloop="demand"
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 1], fov: 60, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <ThoughtSea active={animate} />
        <RenderTicker active={animate} />
      </Canvas>
    </div>
  )
}
