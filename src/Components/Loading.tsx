interface LoadingBarProps {
  circleWidth: number;
  percentage: number;
  color: string;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ circleWidth, percentage, color }: LoadingBarProps) => {
  const radius = 180;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = (dashArray * percentage) / 100;

  return (
    <div className="absolute">
      <svg width={circleWidth} height={circleWidth} viewBox={`0 0 ${circleWidth} ${circleWidth}`}>
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="15px"
          r={radius}
          className={`fill-none stroke-accent_${color}`}
          style={{
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
          transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
        />
      </svg>
    </div>
  );
};

export default LoadingBar;
