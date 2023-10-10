interface LoadingBarProps {
  circleWidth: number;
  percentage: number;
  radius: number;
  color: string;
  strokeWidth: string;
}

const LoadingBar: React.FC<LoadingBarProps> = ({
  circleWidth,
  percentage,
  radius,
  color,
  strokeWidth,
}: LoadingBarProps) => {
  const dashArray = radius * Math.PI * 2;
  const dashOffset = (dashArray * percentage) / 100;
  const strokeColorVariants = {
    red: "stroke-accent_red",
    cyan: "stroke-accent_cyan",
    purple: "stroke-accent_purple",
  };

  return (
    <div className="absolute">
      <svg width={circleWidth} height={circleWidth} viewBox={`0 0 ${circleWidth} ${circleWidth}`}>
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth={strokeWidth}
          r={radius}
          className={`fill-none ${strokeColorVariants[color as keyof typeof strokeColorVariants]}`}
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
