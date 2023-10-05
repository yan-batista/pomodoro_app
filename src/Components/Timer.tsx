import { useEffect, useState } from "react";
import { ConfigProps } from "../types/pomodoro_config.t";

interface TimerProps {
  config: ConfigProps;
  selected: string;
}

const Timer: React.FC<TimerProps> = ({ config, selected }: TimerProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(true);
  const [minutes, setMinutes] = useState(config.pomodoro.toString());
  const [seconds, setSeconds] = useState("00");
  const [target, setTarget] = useState<Date | null>(null);

  useEffect(() => {
    resetTimer(config[selected as keyof typeof config].toString());
  }, [config, selected]);

  useEffect(() => {
    if (!isTimerPaused && target === null) {
      const today = new Date();
      today.setMinutes(today.getMinutes() + config.pomodoro);
      setTarget(today);
    }

    const timer = () => {
      if (!isTimerPaused && target !== null) {
        const now = new Date();
        const difference = target.getTime() - now.getTime();

        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        setMinutes(m.toString().padStart(2, "0"));

        const s = Math.floor((difference % (1000 * 60)) / 1000);
        setSeconds(s.toString().padStart(2, "0"));

        if (m <= 0 && s <= 0) {
          setIsTimeOver(true);
        }
      }
    };

    timer();

    const interval = setInterval(timer, 1000);

    return () => clearInterval(interval);
  }, [isTimerPaused, target]);
  function startOrPauseTimer() {
    if (isTimerPaused) {
      const remainingTimeInSeconds = parseInt(minutes) * 60 + parseInt(seconds);
      const today = new Date();
      today.setSeconds(today.getSeconds() + remainingTimeInSeconds);
      setTarget(today);
      setIsTimerPaused(false);
    } else {
      setIsTimerPaused(true);
    }
  }

  function resetTimer(minutes: string) {
    setIsTimerPaused(true);
    setIsTimeOver(false);
    setMinutes(minutes);
    setSeconds("00");
    setTarget(null);
  }

  function MuteOrUnmuteTimer() {
    setIsMuted((prevState) => !prevState);
  }

  const timerAction = (): string => {
    if (target === null) {
      return "start";
    } else if (isTimerPaused) {
      return "resume";
    } else {
      return "pause";
    }
  };

  const displayMessage = (): string => {
    let message = "time for a break!";
    if (selected === "short_break" || selected === "long_break") {
      message = "back to work!";
    }
    return message;
  };

  return (
    <div className="clock cursor-pointer relative z-0">
      <div
        className="shadow-[-50px_-50px_150px_-80px_rgba(109,124,255,0.4)] clock_gradient_border bg-gradient-to-br from-darker_blue to-light_blue w-[28rem] h-[28rem] rounded-full relative flex flex-row justify-center items-center"
        onClick={startOrPauseTimer}
      >
        <div className="clock_container w-[25rem] h-[25rem] bg-dark_blue rounded-full flex flex-row justify-center items-center">
          <div
            className={`clock_timer_bar border-[12px] border-accent_${config.color} rounded-full w-[24rem] h-[24rem] flex flex-col justify-center items-center`}
          >
            <div onClick={MuteOrUnmuteTimer}>
              {isMuted ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="w-7 h-7 text-dark_text hover:text-text transition-colors duration-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                    clipRule="evenodd"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="w-7 h-7 text-dark_text hover:text-text transition-colors duration-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  ></path>
                </svg>
              )}
            </div>
            {/* <h1 className="text-8xl text-text font-normal my-8 select-none">
              {isTimeOver ? displayMessage() : `${minutes}:${seconds}`}
            </h1> */}
            {isTimeOver && <h1 className="text-4xl text-text font-normal my-8 select-none">{displayMessage()}</h1>}
            {!isTimeOver && (
              <h1 className="text-8xl text-text font-normal my-8 select-none">{`${minutes}:${seconds}`}</h1>
            )}
            <p className="uppercase text-text font-normal tracking-[15px] select-none">
              {!isTimeOver && timerAction()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
