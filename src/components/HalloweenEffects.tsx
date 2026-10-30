import { HALLOWEEN } from '@/lib/seasonal';

// Purely decorative Halloween layer: corner cobwebs, a spider that drops in
// and climbs away, bats crossing the sky and a tiny spider strolling along
// the bottom edge. Everything is pointer-events:none and aria-hidden, so it
// can never block navigation or checkout. Styles live in styles/halloween.css.

const CobwebSvg = ({ className }: { className: string }) => (
  <svg viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
    <g stroke="currentColor" strokeWidth="1">
      {/* spokes */}
      <line x1="0" y1="0" x2="200" y2="0" />
      <line x1="0" y1="0" x2="185" y2="77" />
      <line x1="0" y1="0" x2="141" y2="141" />
      <line x1="0" y1="0" x2="77" y2="185" />
      <line x1="0" y1="0" x2="0" y2="200" />
      {/* sagging rings */}
      <path d="M60 0 Q50.8 10.1 55.4 23 Q43 28.8 42.4 42.4 Q28.8 43 23 55.4 Q10.1 50.8 0 60" />
      <path d="M110 0 Q93.1 18.5 101.6 42.1 Q78.9 52.8 77.8 77.8 Q52.8 78.9 42.1 101.6 Q18.5 93.1 0 110" />
      <path d="M160 0 Q135.4 27 147.8 61.3 Q114.8 76.7 113.1 113.1 Q76.7 114.8 61.3 147.8 Q27 135.4 0 160" />
    </g>
  </svg>
);

const SpiderSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 40 44" fill="none" className={className} aria-hidden="true">
    <g className="hw-spider-body">
      {/* legs */}
      <g stroke="hsl(266 25% 16%)" strokeWidth="1.6" strokeLinecap="round" fill="none">
        <path d="M14 20 Q5 14 3 6" />
        <path d="M13 25 Q3 23 1 15" />
        <path d="M13 29 Q4 32 3 40" />
        <path d="M15 32 Q9 38 10 44" />
        <path d="M26 20 Q35 14 37 6" />
        <path d="M27 25 Q37 23 39 15" />
        <path d="M27 29 Q36 32 37 40" />
        <path d="M25 32 Q31 38 30 44" />
      </g>
      {/* head + abdomen */}
      <circle cx="20" cy="14" r="5" fill="hsl(266 25% 14%)" />
      <ellipse cx="20" cy="28" rx="8" ry="10" fill="hsl(266 28% 12%)" />
      <ellipse cx="20" cy="25" rx="3.4" ry="4.2" fill="hsl(26 92% 54% / 0.35)" />
      {/* eyes */}
      <circle cx="18" cy="13" r="1" fill="hsl(32 97% 64%)" />
      <circle cx="22" cy="13" r="1" fill="hsl(32 97% 64%)" />
    </g>
  </svg>
);

const BatSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 22" fill="currentColor" className={className} aria-hidden="true">
    {/* left wing */}
    <path
      className="hw-wing hw-wing--l"
      d="M22 10 C18 4 12 2 4 3 C8 6 9 9 8 12 C12 10 15 11 17 14 C19 12 21 11 22 10 Z"
    />
    {/* right wing */}
    <path
      className="hw-wing hw-wing--r"
      d="M26 10 C30 4 36 2 44 3 C40 6 39 9 40 12 C36 10 33 11 31 14 C29 12 27 11 26 10 Z"
    />
    {/* body + ears */}
    <ellipse cx="24" cy="11" rx="3.4" ry="5" />
    <path d="M21.6 7 L20.6 3.4 L23 5.6 Z" />
    <path d="M26.4 7 L27.4 3.4 L25 5.6 Z" />
  </svg>
);

const HalloweenEffects = () => {
  if (!HALLOWEEN.active) return null;

  return (
    <div className="hw-layer" aria-hidden="true">
      <CobwebSvg className="hw-web hw-web--left" />
      <CobwebSvg className="hw-web hw-web--right" />

      <div className="hw-spider-drop">
        <span className="hw-thread" />
        <SpiderSvg />
      </div>

      <BatSvg className="hw-bat hw-bat--1" />
      <BatSvg className="hw-bat hw-bat--2" />
      <BatSvg className="hw-bat hw-bat--3" />

      <div className="hw-crawler">
        <SpiderSvg />
      </div>
    </div>
  );
};

export default HalloweenEffects;
