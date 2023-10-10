import { ReactNode, ButtonHTMLAttributes } from "react";

interface CircleProps extends ButtonHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  color: string;
  className?: string;
  name: string;
  value: string;
}

const colorVariants = {
  red: "bg-accent_red",
  cyan: "bg-accent_cyan",
  purple: "bg-accent_purple",
  blue: "bg-blue",
  input_color: "bg-input_color",
};

const Circle = ({ children, color, className = "", name, value, ...props }: CircleProps) => {
  return (
    <div
      className={`${
        colorVariants[color as keyof typeof colorVariants]
      } ${className} group flex flex-row justify-center items-center rounded-full w-10 h-10 p-2 text-center cursor-pointer select-none hover:scale-110 hover:opacity-90 duration-200`}
      {...props}
    >
      {children}
      <input type="radio" id={`${name}_${value}`} name={name} value={value} className="hidden" />
    </div>
  );
};

export default Circle;
