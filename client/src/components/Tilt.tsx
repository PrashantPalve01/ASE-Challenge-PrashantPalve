import { CSSProperties, ReactNode, useCallback, useRef } from "react";

type TiltProps = {
  children: ReactNode;
  maxTiltDeg?: number;
  glare?: boolean;
  className?: string;
};

export default function Tilt({
  children,
  maxTiltDeg = 6,
  glare = true,
  className,
}: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = (x / rect.width) * 2 - 1; // -1..1
      const py = (y / rect.height) * 2 - 1; // -1..1
      const rx = -(py * maxTiltDeg);
      const ry = px * maxTiltDeg;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      if (glare) {
        const glareEl = el.querySelector<HTMLElement>("[data-tilt-glare]");
        if (glareEl) {
          const angle = Math.atan2(py, px) * (180 / Math.PI) + 180;
          const intensity = Math.hypot(px, py);
          glareEl.style.background = `conic-gradient(from ${angle}deg, rgba(255,255,255,${Math.min(
            0.18,
            intensity / 2
          )}) 0deg, transparent 120deg)`;
        }
      }
    },
    [maxTiltDeg, glare]
  );

  const reset = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    const glareEl = el.querySelector<HTMLElement>("[data-tilt-glare]");
    if (glareEl) glareEl.style.background = "transparent";
  }, []);

  return (
    <div
      className={className}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onMouseUp={reset}
      onTouchStart={reset}
    >
      <div
        ref={ref}
        style={{ "--tw-shadow": "0 10px 25px -10px rgba(0,0,0,0.15)" } as CSSProperties}
        className="transform-gpu transition-transform duration-150 will-change-transform"
      >
        <div className="relative">
          {glare && (
            <div
              data-tilt-glare
              className="pointer-events-none absolute inset-0 rounded-xl"
              style={{ mixBlendMode: "soft-light" }}
            />
          )}
          {children}
        </div>
      </div>
    </div>
  );
}


