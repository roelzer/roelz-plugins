// Nacht-Szene als dunkle Fläche zeichnen und Daten von der (nur online vorhandenen) Schnittstelle holen
const c = document.querySelector('canvas');
const g = c.getContext('2d');
g.fillStyle = '#000'; g.fillRect(0, 0, c.width, c.height);
fetch('/api/daten.json').then((r) => r.ok && r.json()).catch(() => {});
