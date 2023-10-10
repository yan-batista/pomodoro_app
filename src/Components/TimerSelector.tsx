interface Props {
  onClickHandler: (event: React.MouseEvent<HTMLParagraphElement>) => void;
  selected: string;
  color: string;
}

const colorVariants = {
  red: "bg-accent_red",
  cyan: "bg-accent_cyan",
  purple: "bg-accent_purple",
  blue: "bg-blue",
  input_color: "bg-input_color",
};

const TimerSelector: React.FC<Props> = ({ onClickHandler, selected, color }: Props) => {
  return (
    <div className="flex flex-row justify-around items-center bg-dark_blue p-2 rounded-full sm:gap-12 relative w-fit">
      <p
        className={`cursor-pointer text-[12px] sm:text-sm p-4 select-none ${
          selected === "pomodoro"
            ? `${colorVariants[color as keyof typeof colorVariants]} rounded-full text-blue`
            : "text-dark_text"
        }`}
        onClick={onClickHandler}
      >
        pomodoro
      </p>
      <p
        className={`cursor-pointer text-[12px] sm:text-sm p-4 select-none whitespace-nowrap ${
          selected === "short_break"
            ? `${colorVariants[color as keyof typeof colorVariants]} rounded-full text-blue`
            : "text-dark_text"
        }`}
        onClick={onClickHandler}
      >
        short break
      </p>
      <p
        className={`cursor-pointer text-[12px] sm:text-sm p-4 select-none whitespace-nowrap ${
          selected === "long_break"
            ? `${colorVariants[color as keyof typeof colorVariants]} rounded-full text-blue`
            : "text-dark_text"
        }`}
        onClick={onClickHandler}
      >
        long break
      </p>
    </div>
  );
};

export default TimerSelector;
