/**
 * Lloyd Avatar — GEICO-gecko-style cartoon character.
 * Friendly guy with sunglasses, polo shirt, big smile.
 * Based on real Lloyd: approachable, casual, beach/weather vibes.
 */

type Props = {
  size?: number;
  className?: string;
  withWeather?: boolean; // show cloud + sun behind him
};

export default function LloydAvatar({
  size = 120,
  className = "",
  withWeather = false,
}: Props) {
  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      {withWeather && (
        <>
          {/* Sun behind */}
          <svg
            className="absolute -top-2 -right-2 animate-spin-slow"
            width={size * 0.4}
            height={size * 0.4}
            viewBox="0 0 40 40"
          >
            <circle cx="20" cy="20" r="10" fill="#FBBF24" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <line
                key={angle}
                x1="20"
                y1="20"
                x2={20 + 16 * Math.cos((angle * Math.PI) / 180)}
                y2={20 + 16 * Math.sin((angle * Math.PI) / 180)}
                stroke="#FBBF24"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            ))}
          </svg>
          {/* Cloud behind */}
          <svg
            className="absolute -top-1 -left-3 animate-float"
            width={size * 0.45}
            height={size * 0.3}
            viewBox="0 0 60 35"
          >
            <ellipse cx="20" cy="22" rx="16" ry="11" fill="white" opacity="0.9" />
            <ellipse cx="35" cy="18" rx="14" ry="13" fill="white" opacity="0.9" />
            <ellipse cx="46" cy="23" rx="12" ry="10" fill="white" opacity="0.9" />
          </svg>
        </>
      )}

      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        {/* Background circle */}
        <circle cx="60" cy="60" r="58" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="3" />

        {/* Body / polo shirt */}
        <path
          d="M30 95 C30 78 45 68 60 68 C75 68 90 78 90 95 L90 120 L30 120 Z"
          fill="#1E293B"
        />
        {/* Polo collar */}
        <path
          d="M50 70 L55 76 L60 71 L65 76 L70 70"
          stroke="#334155"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Neck */}
        <rect x="53" y="60" width="14" height="12" rx="4" fill="#F5D0A9" />

        {/* Head */}
        <ellipse cx="60" cy="42" rx="26" ry="28" fill="#F5D0A9" />

        {/* Hair (short, dark) */}
        <path
          d="M34 38 C34 22 45 14 60 14 C75 14 86 22 86 38 C86 32 78 24 60 24 C42 24 34 32 34 38 Z"
          fill="#4A3728"
        />

        {/* Ears */}
        <ellipse cx="34" cy="44" rx="5" ry="7" fill="#F5D0A9" />
        <ellipse cx="86" cy="44" rx="5" ry="7" fill="#F5D0A9" />

        {/* Sunglasses */}
        <rect x="40" y="36" rx="4" ry="4" width="16" height="12" fill="#1E293B" />
        <rect x="64" y="36" rx="4" ry="4" width="16" height="12" fill="#1E293B" />
        <line x1="56" y1="42" x2="64" y2="42" stroke="#1E293B" strokeWidth="2.5" />
        <line x1="40" y1="40" x2="34" y2="38" stroke="#1E293B" strokeWidth="2" />
        <line x1="80" y1="40" x2="86" y2="38" stroke="#1E293B" strokeWidth="2" />
        {/* Lens shine */}
        <rect x="43" y="38" rx="1" width="4" height="3" fill="white" opacity="0.3" />
        <rect x="67" y="38" rx="1" width="4" height="3" fill="white" opacity="0.3" />

        {/* Big friendly smile */}
        <path
          d="M46 54 Q60 66 74 54"
          stroke="#8B5E3C"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Teeth showing */}
        <path
          d="M50 55 Q60 62 70 55"
          fill="white"
        />

        {/* Nose */}
        <path
          d="M58 48 Q60 52 62 48"
          stroke="#D4A574"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Subtle stubble dots */}
        {[
          [48, 58], [52, 60], [56, 61], [64, 61], [68, 60], [72, 58],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="0.7" fill="#C4A882" opacity="0.4" />
        ))}
      </svg>
    </div>
  );
}
