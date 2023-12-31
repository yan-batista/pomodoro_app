import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ConfigProps } from "../types/pomodoro_config.t";
import LoadingBar from "./Loading";
import startTimerAudio from "../assets/startTimer.mp3";
import pauseTimerAudio from "../assets/pauseTimer.mp3";
import timesUpAudio from "../assets/timesUp.mp3";

interface TimerProps {
  config: ConfigProps;
  selected: string;
  isMuted: boolean;
  MuteOrUnmuteTimer: (event: React.MouseEvent<HTMLDivElement>) => void;
}

type NumericConfigProps = Pick<ConfigProps, "pomodoro" | "short_break" | "long_break">;

const Timer: React.FC<TimerProps> = ({ config, selected, isMuted, MuteOrUnmuteTimer }: TimerProps) => {
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(true);
  const [minutes, setMinutes] = useState(config.pomodoro.toString());
  const [seconds, setSeconds] = useState("00");
  const [target, setTarget] = useState<Date | null>(null);
  const [percentagePassed, setPercentagePassed] = useState(0);
  const isMinSmallScreen = useMediaQuery({ minWidth: 640 });

  const startTimerSound = new Audio(startTimerAudio);
  const pauseTimerSound = new Audio(pauseTimerAudio);
  const timesUpSound = new Audio(timesUpAudio);

  useEffect(() => {
    resetTimer(config[selected as keyof NumericConfigProps].toString());
  }, [config, selected]);

  useEffect(() => {
    const timer = () => {
      if (!isTimerPaused && target !== null) {
        const now = new Date();
        const difference = target.getTime() - now.getTime();

        const totalDuration = config[selected as keyof NumericConfigProps] * 60 * 1000;
        const passedTime = totalDuration - difference;
        let percentage = (passedTime / totalDuration) * 100;
        setPercentagePassed(Math.min(percentage, 100));

        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        setMinutes(m.toString().padStart(2, "0"));

        const s = Math.floor((difference % (1000 * 60)) / 1000);
        setSeconds(s.toString().padStart(2, "0"));

        if (m <= 0 && s <= 0) {
          setIsTimeOver(true);
          if (!isMuted) timesUpSound.play();
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
      if (!isMuted) startTimerSound.play();
    } else {
      setIsTimerPaused(true);
      if (!isMuted) pauseTimerSound.play();
    }
  }

  function resetTimer(minutes: string) {
    setIsTimerPaused(true);
    setIsTimeOver(false);
    setMinutes(minutes);
    setSeconds("00");
    setTarget(null);
    setPercentagePassed(0);
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
        className="shadow-[-50px_-50px_150px_-80px_rgba(109,124,255,0.4)] clock_gradient_border bg-gradient-to-br from-darker_blue to-light_blue w-[18rem] h-[18rem] sm:w-[24rem] sm:h-[24rem] rounded-full relative flex flex-row justify-center items-center"
        onClick={startOrPauseTimer}
      >
        <div className="clock_container w-[16rem] h-[16rem] sm:w-[22rem] sm:h-[22rem] bg-dark_blue rounded-full flex flex-row justify-center items-center">
          <LoadingBar
            percentage={percentagePassed}
            circleWidth={isMinSmallScreen ? 400 : 250}
            radius={isMinSmallScreen ? 165 : 115}
            color={config.color}
            strokeWidth={isMinSmallScreen ? "15px" : "10px"}
          />

          <div className="flex flex-col justify-center items-center">
            <div onClick={MuteOrUnmuteTimer} className="z-10">
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
            {isTimeOver && (
              <h1 className="text-2xl text-text font-normal my-6 sm:my-8 select-none">{displayMessage()}</h1>
            )}
            {!isTimeOver && (
              <h1 className="text-6xl sm:text-8xl text-text font-normal my-6 sm:my-8 select-none">{`${minutes}:${seconds}`}</h1>
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
