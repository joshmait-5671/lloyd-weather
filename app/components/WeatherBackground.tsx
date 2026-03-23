/**
 * Animated weather background — drifting clouds, subtle sun rays.
 * Pure CSS animations, no JS libraries.
 */

export default function WeatherBackground() {
  return (
    <div className="weather-bg absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Sun glow in top-right */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-radial from-amber-300/30 to-transparent" />

      {/* Floating clouds */}
      <Cloud className="cloud-1 absolute top-[10%] -left-[10%] opacity-20" scale={1.2} />
      <Cloud className="cloud-2 absolute top-[30%] -right-[15%] opacity-15" scale={0.9} />
      <Cloud className="cloud-3 absolute top-[60%] -left-[20%] opacity-10" scale={1.5} />
      <Cloud className="cloud-4 absolute top-[5%] left-[40%] opacity-10" scale={0.7} />
    </div>
  );
}

function Cloud({ className = "", scale = 1 }: { className?: string; scale?: number }) {
  return (
    <svg
      className={className}
      width={140 * scale}
      height={60 * scale}
      viewBox="0 0 140 60"
      fill="white"
    >
      <ellipse cx="40" cy="38" rx="30" ry="18" />
      <ellipse cx="70" cy="28" rx="28" ry="22" />
      <ellipse cx="95" cy="35" rx="25" ry="17" />
      <ellipse cx="55" cy="42" rx="35" ry="16" />
    </svg>
  );
}
