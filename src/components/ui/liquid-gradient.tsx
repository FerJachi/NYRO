import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface LiquidGradientProps {
  className?: string
  opacity?: number
  speed?: number
  mouseReactive?: boolean
}

export default function LiquidGradient({
  className = '',
  opacity = 1,
  speed = 0.4,
  mouseReactive = true,
}: LiquidGradientProps) {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = canvasRef.current
    if (!container) return

    const scene  = new THREE.Scene()
    const camera = new THREE.Camera()

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const vertexShader = /* glsl */`
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    const fragmentShader = /* glsl */`
      precision highp float;
      uniform vec2  resolution;
      uniform float time;
      uniform vec2  mouse;

      vec3 colorA = vec3(0.003, 0.490, 0.420);
      vec3 colorB = vec3(0.008, 0.280, 0.240);
      vec3 colorC = vec3(0.050, 0.650, 0.580);
      vec3 colorD = vec3(0.000, 0.020, 0.018);

      float noise(vec2 p) {
        return sin(p.x * 3.0) * sin(p.y * 3.0);
      }

      float smoothNoise(vec2 p) {
        vec2 lv = fract(p);
        vec2 id = floor(p);
        lv = lv * lv * (3.0 - 2.0 * lv);
        float bl = noise(id);
        float br = noise(id + vec2(1.0, 0.0));
        float tl = noise(id + vec2(0.0, 1.0));
        float tr = noise(id + vec2(1.0, 1.0));
        float b = mix(bl, br, lv.x);
        float t = mix(tl, tr, lv.x);
        return mix(b, t, lv.y);
      }

      float fbm(vec2 p) {
        float f   = 0.0;
        float amp = 0.5;
        for (int i = 0; i < 5; i++) {
          f   += amp * smoothNoise(p);
          p   *= 2.1;
          amp *= 0.45;
        }
        return f;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        vec2 m  = mouse * 0.15;
        float t = time * 0.18;

        vec2 q = vec2(
          fbm(uv + vec2(0.0, 0.0) + t * 0.4 + m),
          fbm(uv + vec2(5.2, 1.3) + t * 0.3)
        );

        vec2 r = vec2(
          fbm(uv + 3.5 * q + vec2(1.7, 9.2) + t * 0.25 + m * 0.5),
          fbm(uv + 3.5 * q + vec2(8.3, 2.8) + t * 0.2)
        );

        float f = fbm(uv + 3.0 * r + t * 0.1);

        vec3 color = mix(colorD, colorB, clamp(f * f * 3.0, 0.0, 1.0));
        color = mix(color, colorA, clamp(length(q) * 1.2, 0.0, 1.0));
        color = mix(color, colorC, clamp(r.x * r.x * 0.8, 0.0, 1.0));

        float alpha = clamp(f * 1.0 + 0.05, 0.0, 0.65);

        gl_FragColor = vec4(color, alpha);
      }
    `

    const geometry = new THREE.PlaneGeometry(2, 2)
    const uniforms = {
      time:       { value: 0 },
      resolution: { value: new THREE.Vector2() },
      mouse:      { value: new THREE.Vector2(0, 0) },
    }

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
    })

    scene.add(new THREE.Mesh(geometry, material))

    let animationId = 0
    let active      = true
    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0
    const clock = new THREE.Clock()

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseReactive) return
      targetX = (e.clientX / window.innerWidth  - 0.5) * 2
      targetY = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const handleResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h)
      uniforms.resolution.value.set(
        renderer.domElement.width,
        renderer.domElement.height
      )
    }

    const tick = () => {
      if (!active) return
      animationId = requestAnimationFrame(tick)
      mouseX += (targetX - mouseX) * 0.05
      mouseY += (targetY - mouseY) * 0.05
      uniforms.time.value  = clock.getElapsedTime() * speed
      uniforms.mouse.value.set(mouseX, mouseY)
      renderer.render(scene, camera)
    }

    // IntersectionObserver — pause when off-screen to save GPU
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          active = true
          clock.start()
          tick()
        } else {
          active = false
          cancelAnimationFrame(animationId)
        }
      },
      { threshold: 0.05 }
    )

    handleResize()
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize',    handleResize,    { passive: true })
    io.observe(container)

    return () => {
      active = false
      cancelAnimationFrame(animationId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize',    handleResize)
      io.disconnect()
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [speed, mouseReactive])

  return (
    <div
      ref={canvasRef}
      className={className}
      style={{ opacity }}
    />
  )
}
