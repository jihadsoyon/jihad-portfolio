// Splash-এর সব style HTML-এর head-এ থাকবে, তাই globals.css লোড হওয়ার অপেক্ষা নেই।
// রং সরাসরি লেখা আছে, যাতে dark mode-এও সাদা flash না আসে।
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
  animation: splash-out 0.7s cubic-bezier(0.76, 0, 0.24, 1) 2.4s forwards;
}
html.dark .splash-overlay { background: #0b0f1a; }
html.splash-skip .splash-overlay { display: none !important; }
html.lang-en .lang-bn, html.lang-bn .lang-en { display: none !important; }

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
}

.splash-glow {
  position: absolute;
  width: 30rem;
  height: 30rem;
  border-radius: 9999px;
}
.splash-glow-a { top: -8rem; left: -10rem; background: radial-gradient(circle, rgba(129,140,248,0.3) 0%, transparent 70%); }
.splash-glow-b { bottom: -8rem; right: -10rem; background: radial-gradient(circle, rgba(217,70,239,0.2) 0%, transparent 70%); }

.splash-photo {
  position: relative;
  width: 11rem;
  height: 11rem;
  animation: splash-pop 0.8s cubic-bezier(0.2, 1.3, 0.4, 1) both;
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
  background: linear-gradient(90deg, #4f46e5, #d946ef);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: letter-in 0.5s ease both;
}
html.dark .splash-letter { background: linear-gradient(90deg, #818cf8, #d946ef); -webkit-background-clip: text; background-clip: text; }

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
  display: block;
  height: 100%;
  width: 0;
  border-radius: 9999px;
  background: linear-gradient(90deg, #4f46e5, #d946ef, #22d3ee);
  animation: splash-progress 2s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards;
}

@keyframes spin-slow { to { transform: rotate(360deg); } }
@keyframes spin-rev { to { transform: rotate(-360deg); } }
@keyframes splash-pop { from { opacity: 0; transform: scale(0.6); } to { opacity: 1; transform: scale(1); } }
@keyframes letter-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes splash-progress { to { width: 100%; } }
@keyframes splash-out {
  from { clip-path: inset(0 0 0 0); }
  to { clip-path: inset(0 0 100% 0); visibility: hidden; }
}
`;

export default function SplashStyles() {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}