interface Props {
  onClickHandler: (event: React.MouseEvent<HTMLParagraphElement>) => void;
  selected: string;
}

const TimerSelector: React.FC<Props> = ({ onClickHandler, selected }: Props) => {
  return (
    <div className="flex flex-row justify-center items-center bg-dark_blue p-2 rounded-full gap-12">
      <p
        className={`cursor-pointer text-sm text-dark_text p-4 select-none ${
          selected === "pomodoro" ? "bg-accent_red rounded-full text-black" : ""
        }`}
        onClick={onClickHandler}
      >
        pomodoro
      </p>
      <p
        className={`cursor-pointer text-sm text-dark_text p-4 select-none ${
          selected === "short break" ? "bg-accent_red rounded-full text-black" : ""
        }`}
        onClick={onClickHandler}
      >
        short break
      </p>
      <p
        className={`cursor-pointer text-sm text-dark_text p-4 select-none ${
          selected === "long break" ? "bg-accent_red rounded-full text-black" : ""
        }`}
        onClick={onClickHandler}
      >
        long break
      </p>
    </div>
  );
};

export default TimerSelector;

/** style for selected
 * bg-accent_red rounded-full text-black
 */
