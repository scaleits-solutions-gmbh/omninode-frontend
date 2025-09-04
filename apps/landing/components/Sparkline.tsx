type Props = {
  values?: number[];
  width?: number;
  height?: number;
};

export function Sparkline({ values = [2, 5, 3, 6, 4, 7, 5, 8], width = 280, height = 80 }: Props) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const dx = width / (values.length - 1);
  const points = values
    .map((v, i) => {
      const x = i * dx;
      const y = height - ((v - min) / (max - min || 1)) * height;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polyline points={points} fill="none" stroke="var(--color-primary)" strokeWidth="2" />
      <polyline
        points={`0,${height} ${points} ${width},${height}`}
        fill="url(#gradient)"
        stroke="none"
      />
    </svg>
  );
}


