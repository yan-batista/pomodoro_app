interface Props {
  onClickHandler: (event: React.MouseEvent<HTMLParagraphElement>) => void;
  selected: string;
  color: string;
}

const TimerSelector: React.FC<Props> = ({ onClickHandler, selected, color }: Props) => {
  return (
    <div className="flex flex-row justify-around items-center bg-dark_blue p-2 rounded-full sm:gap-12 relative w-fit">
      <p
        className={`cursor-pointer text-[12px] sm:text-sm p-4 select-none ${
          selected === "pomodoro" ? `bg-accent_${color} rounded-full text-blue` : "text-dark_text"
        }`}
        onClick={onClickHandler}
      >
        pomodoro
      </p>
      <p
        className={`cursor-pointer text-[12px] sm:text-sm p-4 select-none whitespace-nowrap ${
          selected === "short_break" ? `bg-accent_${color} rounded-full text-blue` : "text-dark_text"
        }`}
        onClick={onClickHandler}
      >
        short break
      </p>
      <p
        className={`cursor-pointer text-[12px] sm:text-sm p-4 select-none whitespace-nowrap ${
          selected === "long_break" ? `bg-accent_${color} rounded-full text-blue` : "text-dark_text"
        }`}
        onClick={onClickHandler}
      >
        long break
      </p>
    </div>
  );
};

export default TimerSelector;
