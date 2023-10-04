import { ReactNode, ButtonHTMLAttributes } from "react";

interface CircleProps extends ButtonHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  color: string;
  className?: string;
}

const Circle = ({ children, color, className, ...props }: CircleProps) => {
  return (
    <div
      className={`bg-${color} ${className}  group flex flex-row justify-center items-center rounded-full w-10 h-10 p-2 text-center cursor-pointer select-none hover:scale-110 hover:opacity-90 duration-200`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Circle;
