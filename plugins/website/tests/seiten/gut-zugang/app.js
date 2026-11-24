// Einblendung, die anspringt: Beobachter auf dem Element selbst, bei reduzierter Bewegung gleich sichtbar
const ziele = document.querySelectorAll(".einblenden");
if (matchMedia("(prefers-reduced-motion: reduce)").matches) ziele.forEach((z) => z.classList.add("ein"));
else {
  const io = new IntersectionObserver((e) => e.forEach((x) => { if (x.isIntersecting) { x.target.classList.add("ein"); io.unobserve(x.target); } }), { threshold: 0.1 });
  ziele.forEach((z) => io.observe(z));
}
