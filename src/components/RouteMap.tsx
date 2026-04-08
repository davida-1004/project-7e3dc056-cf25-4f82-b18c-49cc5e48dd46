interface RoutePoint {
  city: string;
  country: string;
  lat: number;
  lng: number;
  order: number;
}

interface RouteMapProps {
  points: RoutePoint[];
}

const RouteMap = ({ points }: RouteMapProps) => {
  if (points.length === 0) {
    return null;
  }

  const latitudes = points.map((point) => point.lat);
  const longitudes = points.map((point) => point.lng);
  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);
  const minLng = Math.min(...longitudes);
  const maxLng = Math.max(...longitudes);

  const normalize = (value: number, min: number, max: number, padding: number) => {
    if (min === max) return 50;
    return padding + ((value - min) / (max - min)) * (100 - padding * 2);
  };

  const plotted = points.map((point) => ({
    ...point,
    x: normalize(point.lng, minLng, maxLng, 12),
    y: 100 - normalize(point.lat, minLat, maxLat, 14),
  }));

  const polyline = plotted.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <div className="rounded-3xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">도시 이동 루트</h3>
          <p className="text-sm text-muted-foreground">선택한 도시 순서대로 핀과 경로를 표시했어요.</p>
        </div>
        <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {points.length}개 도시
        </div>
      </div>

      <div className="rounded-2xl bg-[linear-gradient(180deg,#fff7e8_0%,#f4efe5_100%)] p-3">
        <svg viewBox="0 0 100 100" className="h-52 w-full overflow-visible">
          <defs>
            <linearGradient id="routeStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e39b2d" />
              <stop offset="100%" stopColor="#d45b39" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="100" height="100" rx="8" fill="rgba(255,255,255,0.45)" />
          <polyline
            points={polyline}
            fill="none"
            stroke="url(#routeStroke)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1 0"
          />
          {plotted.map((point) => (
            <g key={`${point.city}-${point.order}`}>
              <circle cx={point.x} cy={point.y} r="4.8" fill="#fff" stroke="#d45b39" strokeWidth="1.8" />
              <circle cx={point.x} cy={point.y} r="2.1" fill="#d45b39" />
              <text x={point.x} y={point.y - 7} textAnchor="middle" fontSize="4.5" fontWeight="700" fill="#4b3425">
                {point.order}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {points.map((point) => (
          <a
            key={`${point.city}-${point.order}`}
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${point.city} ${point.country}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm text-foreground transition-colors hover:border-primary/40"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {point.order}
            </span>
            <span>{point.city}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default RouteMap;
