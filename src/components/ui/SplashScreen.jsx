
import T from "@/components/i18n/T";
import { site } from "@/data/site";

// কোনো JavaScript লাগে না। কখন দেখাবে তা layout-এর head script ঠিক করে।
export default function SplashScreen() {
  return (
    <div className="splash-overlay" aria-hidden="true">
      <div className="splash-grid" />
      <div className="splash-glow splash-glow-a" />
      <div className="splash-glow splash-glow-b" />

      <div className="splash-photo">
        <span className="splash-spark splash-spark-1" />
        <span className="splash-spark splash-spark-2" />
        <span className="splash-spark splash-spark-3" />
        <span className="splash-orbit" />
        <span className="splash-ring" />
        <div className="splash-photo-inner">
          <img src="/images/jihad.png" alt="" />
        </div>
      </div>

      <div className="splash-name">
        {site.name.split("").map((ch, i) => (
          <span
            key={i}
            className="splash-letter"
            style={{ animationDelay: `${0.5 + i * 0.05}s, ${1.6 + i * 0.05}s` }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </div>

      <T as="p" className="splash-role" en={site.designation} bn={site.designation_bn} />

      <div className="splash-track">
        <span className="splash-bar" />
      </div>

      <div className="splash-flash" />
    </div>
  );
}