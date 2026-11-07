

// Splash-এর সব style HTML-এর head-এ থাকবে, তাই globals.css লোড হওয়ার অপেক্ষা নেই।
const css = `
.splash-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #ffffff;
  pointer-events: none;
  animation: splash-iris 1s cubic-bezier(0.76, 0, 0.24, 1) 2.7s forwards;
}
html.dark .splash-overlay { background: #0b0f1a; }
html.splash-skip .splash-overlay { display: none !important; }
html.lang-en .lang-bn, html.lang-bn .lang-en { display: none !important; }

/* Reduced motion পছন্দ করা user-দের জন্য splash দেখাবে না */
@media (prefers-reduced-motion: reduce) {
  .splash-overlay { display: none !important; }
}

/* ---------- Background ---------- */
.splash-grid {
  position: absolute;
  inset: 0;
  opacity: 0.35;
  background-image:
    linear-gradient(to right, rgba(148,163,184,0.15) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(148,163,184,0.15) 1px, transparent 1px);
  background-size: 44px 44px;
  -webkit-mask-image: radial-gradient(ellipse at center, black, transparent 70%);
          mask-image: radial-gradient(ellipse at center, black, transparent 70%);
  animation: grid-in 1.2s ease both;
}
.splash-glow {
  position: absolute;
  width: 30rem;
  height: 30rem;
  border-radius: 9999px;
  animation: glow-drift 9s ease-in-out infinite alternate;
}
.splash-glow-a { top: -8rem; left: -10rem; background: radial-gradient(circle, rgba(129,140,248,0.3) 0%, transparent 70%); }
.splash-glow-b { bottom: -8rem; right: -10rem; background: radial-gradient(circle, rgba(217,70,239,0.2) 0%, transparent 70%); }

/* ---------- Photo ---------- */
.splash-photo {
  position: relative;
  width: 11rem;
  height: 11rem;
  animation:
    photo-reveal 0.9s cubic-bezier(0.2, 1.2, 0.3, 1) 0.15s both,
    photo-burst 0.8s cubic-bezier(0.5, 0, 0.8, 0.4) 2.4s forwards;
}
@media (min-width: 768px) {
  .splash-photo { width: 13rem; height: 13rem; }
}

.splash-photo-inner {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 9999px;
  background: #e2e8f0;
}
html.dark .splash-photo-inner { background: #111827; }
.splash-photo-inner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
}
/* ছবির ভেতর দিয়ে নিচে নামা scanner */
.splash-photo-inner::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: -40%;
  height: 40%;
  background: linear-gradient(to bottom, transparent, rgba(129,140,248,0.4), transparent);
  animation: scan 2.4s linear 1s infinite;
}

.splash-ring {
  position: absolute;
  inset: -3px;
  border-radius: 9999px;
  background: conic-gradient(from 0deg, #4f46e5, #d946ef, #22d3ee, #4f46e5);
  animation: spin-slow 4s linear infinite;
}

.splash-orbit {
  position: absolute;
  inset: -2.5rem;
  border-radius: 9999px;
  border: 1px dashed rgba(129,140,248,0.45);
  animation: spin-rev 16s linear infinite;
}
.splash-orbit::after {
  content: "";
  position: absolute;
  top: -6px;
  left: 50%;
  width: 12px;
  height: 12px;
  margin-left: -6px;
  border-radius: 9999px;
  background: #d946ef;
  box-shadow: 0 0 12px 3px rgba(217,70,239,0.5);
}

/* তিনটি আলোর বিন্দু, প্রতিটি আলাদা দূরত্বে ও গতিতে */
.splash-spark {
  position: absolute;
  inset: -4.5rem;
  border-radius: 9999px;
  animation: spin-slow 7s linear infinite;
}
.splash-spark::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  width: 6px;
  height: 6px;
  margin-left: -3px;
  border-radius: 9999px;
  background: #22d3ee;
  box-shadow: 0 0 10px 2px rgba(34,211,238,0.6);
}
.splash-spark-2 { inset: -6.5rem; animation-duration: 11s; animation-direction: reverse; }
.splash-spark-2::before { background: #818cf8; box-shadow: 0 0 10px 2px rgba(129,140,248,0.6); }
.splash-spark-3 { inset: -3rem; animation-duration: 5s; }
.splash-spark-3::before { width: 4px; height: 4px; margin-left: -2px; background: #f0abfc; box-shadow: 0 0 8px 2px rgba(240,171,252,0.6); }

/* ---------- Name ---------- */
.splash-name {
  margin-top: 2.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 1.875rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}
@media (min-width: 768px) {
  .splash-name { font-size: 2.25rem; }
}
.splash-letter {
  display: inline-block;
  background: linear-gradient(100deg, #4f46e5 25%, #d946ef 45%, #0f172a 50%, #22d3ee 55%, #4f46e5 75%);
  background-size: 250% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation:
    letter-in 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both,
    shimmer 2.4s linear 1.6s 1 both;
}
html.dark .splash-letter {
  background-image: linear-gradient(100deg, #818cf8 25%, #e879f9 45%, #ffffff 50%, #22d3ee 55%, #818cf8 75%);
}

.splash-role {
  margin-top: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #64748b;
  animation: fade-in 0.5s ease 1.2s both;
}
html.dark .splash-role { color: #94a3b8; }

/* ---------- Progress ---------- */
.splash-track {
  margin-top: 2.5rem;
  width: 16rem;
  height: 3px;
  border-radius: 9999px;
  background: #e2e8f0;
  overflow: hidden;
}
html.dark .splash-track { background: #1f2937; }
.splash-bar {
  position: relative;
  display: block;
  height: 100%;
  width: 0;
  border-radius: 9999px;
  background: linear-gradient(90deg, #4f46e5, #d946ef, #22d3ee);
  animation: splash-progress 2s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards;
}
.splash-bar::after {
  content: "";
  position: absolute;
  right: 0;
  top: -2px;
  width: 10px;
  height: 7px;
  border-radius: 9999px;
  background: #ffffff;
  box-shadow: 0 0 12px 4px rgba(217,70,239,0.8);
}

/* ---------- Exit flash ---------- */
.splash-flash {
  position: absolute;
  inset: 0;
  opacity: 0;
  background: radial-gradient(circle at 50% 50%, rgba(217,70,239,0.35), rgba(79,70,229,0.15) 35%, transparent 65%);
  animation: splash-flash 0.6s ease 2.45s both;
}

/* ---------- Keyframes ---------- */
@keyframes spin-slow { to { transform: rotate(360deg); } }
@keyframes spin-rev { to { transform: rotate(-360deg); } }
@keyframes grid-in { from { opacity: 0; transform: scale(1.15); } to { opacity: 0.35; transform: none; } }
@keyframes glow-drift { from { transform: translate(0, 0); } to { transform: translate(60px, 40px); } }
@keyframes photo-reveal {
  from { opacity: 0; transform: scale(0.4) rotate(-12deg); filter: blur(10px); }
  to { opacity: 1; transform: none; filter: blur(0); }
}
@keyframes photo-burst {
  to { transform: scale(1.9); opacity: 0; filter: blur(8px); }
}
@keyframes scan { to { top: 100%; } }
@keyframes letter-in {
  from { opacity: 0; transform: translateY(18px); filter: blur(8px); }
  to { opacity: 1; transform: none; filter: blur(0); }
}
@keyframes shimmer {
  from { background-position: 120% 0; }
  to { background-position: -20% 0; }
}
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes splash-progress { to { width: 100%; } }
@keyframes splash-flash {
  0% { opacity: 0; }
  35% { opacity: 1; }
  100% { opacity: 0; }
}
/* মাঝখান থেকে গোল ছিদ্র খুলে site দেখাবে */
@keyframes splash-iris {
  from { clip-path: circle(150% at 50% 50%); }
  to { clip-path: circle(0% at 50% 50%); visibility: hidden; }
}
`;

export default function SplashStyles() {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}