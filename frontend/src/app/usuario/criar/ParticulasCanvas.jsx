"use client";

export default function ParticulasCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Criar partículas
    const particles = [];
    const numParticles = 60;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        radius: 2,
      });
    }

    // Função de animação
    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Desenha partículas
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        // Rebote nas bordas
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.fill();

        // Conecta com outras partículas próximas
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = "rgba(255,255,255,0.2)";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    // Ajustar tamanho na tela
    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: "none", // não interfere nos cliques
      }}
    />
  );
}
