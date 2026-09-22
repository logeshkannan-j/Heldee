import { useEffect, useRef } from "react";

/**
 * A single, continuous animated background that sits behind the entire
 * site (fixed, full-viewport) instead of per-section color blocks. It's a
 * drifting particle network in the brand's blue/cyan tones, drawn on two
 * canvas layers moving at different speeds to fake depth/parallax — no 3D
 * library needed, cheap enough to run continuously.
 *
 * - Pauses when the tab isn't visible (saves battery / CPU).
 * - Respects prefers-reduced-motion by rendering one static frame.
 * - Particles drift on their own and ease slightly toward the cursor,
 *   so it feels alive without being distracting or blocking text.
 */
export default function AnimatedBackground() {
  const backRef = useRef<HTMLCanvasElement | null>(null);
  const frontRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const back = backRef.current;
    const front = frontRef.current;
    if (!back || !front) return;

    const backCtx = back.getContext("2d");
    const frontCtx = front.getContext("2d");
    if (!backCtx || !frontCtx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const mouse = { x: width / 2, y: height / 2, active: false };

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      for (const c of [back, front]) {
        if (!c) continue;
        c.width = width * dpr;
        c.height = height * dpr;
        c.style.width = `${width}px`;
        c.style.height = `${height}px`;
      }
      backCtx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      frontCtx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    function onMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }
    window.addEventListener("mousemove", onMove);

    // Two depth layers: back = more particles, smaller, slower, dimmer.
    // front = fewer particles, bigger, faster, brighter, reacts more to cursor.
    type P = { x: number; y: number; vx: number; vy: number; r: number; hue: number };

    function makeLayer(count: number, minR: number, maxR: number): P[] {
      const arr: P[] = [];
      for (let i = 0; i < count; i++) {
        arr.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          r: minR + Math.random() * (maxR - minR),
          hue: Math.random() > 0.88 ? 24 : 190, // mostly cyan, occasional orange accent
        });
      }
      return arr;
    }

    const backParticles = makeLayer(46, 0.8, 1.8);
    const frontParticles = makeLayer(26, 1.4, 2.6);

    function step(
      ctx: CanvasRenderingContext2D,
      particles: P[],
      linkDist: number,
      parallax: number,
      pull: number
    ) {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (mouse.active && pull > 0) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 260) {
            p.x += (dx / dist) * pull;
            p.y += (dy / dist) * pull;
          }
        }

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
      }

      // connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            const opacity = (1 - dist / linkDist) * 0.16;
            ctx.strokeStyle = `hsla(190, 85%, 60%, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // particles themselves
      for (const p of particles) {
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        grad.addColorStop(0, `hsla(${p.hue}, 90%, 65%, 0.9)`);
        grad.addColorStop(1, `hsla(${p.hue}, 90%, 65%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(${p.hue}, 90%, 75%, 0.8)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      void parallax; // layer separation is handled via CSS transform on scroll, see below
    }

    let raf = 0;
    let visible = true;

    function render() {
      step(backCtx!, backParticles, 130, 0.4, 0.25);
      step(frontCtx!, frontParticles, 150, 1, 0.6);
      if (visible) raf = requestAnimationFrame(render);
    }

    function handleVisibility() {
      visible = document.visibilityState === "visible";
      if (visible) raf = requestAnimationFrame(render);
      else cancelAnimationFrame(raf);
    }
    document.addEventListener("visibilitychange", handleVisibility);

    // Subtle scroll parallax + depth scale: back layer drifts slower and
    // barely scales, front layer drifts/scales more — reads like the camera
    // is slowly moving through the scene as you scroll.
    function onScroll() {
      const y = window.scrollY;
      const scaleBack = 1 + Math.min(y, 2000) * 0.00004;
      const scaleFront = 1 + Math.min(y, 2000) * 0.00009;
      if (back) back.style.transform = `translate3d(0, ${y * 0.02}px, 0) scale(${scaleBack})`;
      if (front) front.style.transform = `translate3d(0, ${y * 0.05}px, 0) scale(${scaleFront})`;
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    if (prefersReducedMotion) {
      // Draw a single static frame instead of animating continuously.
      step(backCtx!, backParticles, 130, 0.4, 0);
      step(frontCtx!, frontParticles, 150, 1, 0);
    } else {
      raf = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background" aria-hidden="true">
      {/* Base tone: a single calm, consistent gradient the whole site sits on */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% -10%, hsl(212 62% 22%) 0%, hsl(var(--background)) 55%)",
        }}
      />
      <canvas ref={backRef} className="absolute inset-0 opacity-60 blur-[0.5px]" />
      <canvas ref={frontRef} className="absolute inset-0" />
    </div>
  );
}
