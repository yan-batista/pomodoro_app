import { useEffect, useState } from "react";
import "./styles/global.css";

import TimerSelector from "./Components/TimerSelector";
import Modal from "./Components/Modal";
import { ConfigProps } from "./types/pomodoro_config.t";

function App() {
  const [selected, setSelected] = useState<string>("pomodoro");
  const [config, setConfig] = useState<ConfigProps>({
    pomodoro: 25,
    short: 5,
    long: 15,
    font: "kumbh",
    color: "red",
  });
  //const [partyTime, setPartyTime] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(true);
  const [minutes, setMinutes] = useState(config.pomodoro.toString());
  const [seconds, setSeconds] = useState("00");
  const [target, setTarget] = useState<Date | null>(null);

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

        /* if (m <= 0 && s <= 0) {
          setPartyTime(true);
        } */
      }
    };

    timer();

    const interval = setInterval(timer, 1000);

    return () => clearInterval(interval);
  }, [isTimerPaused, target]);

  function StartOrPauseTimer() {
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

  function onClickChangeSelected(event: React.MouseEvent<HTMLParagraphElement>) {
    setSelected(event.currentTarget.innerHTML.toLowerCase());
  }

  function onClickChangeConfig(config: ConfigProps) {
    setConfig(config);
  }

  function OpenModal() {
    let modal = document.querySelector("#config_modal");
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    }
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

  return (
    <main className={`w-screen h-screen bg-blue flex flex-row justify-center items-start p-10 font-${config.font}`}>
      <div className="flex flex-col items-center gap-12">
        <h1 className="text-[32px] text-text">pomodoro</h1>

        <TimerSelector onClickHandler={onClickChangeSelected} selected={selected} color={config.color} />

        <div className="clock cursor-pointer" onClick={StartOrPauseTimer}>
          <div className="clock_gradient_border bg-gradient-to-br from-darker_blue to-light_blue w-[27rem] h-[27rem] rounded-full relative flex flex-row justify-center items-center">
            <div className="clock_container w-[25rem] h-[25rem] bg-dark_blue rounded-full flex flex-row justify-center items-center">
              <div
                className={`clock_timer_bar border-[12px] border-accent_${config.color} rounded-full w-[25rem] h-[25rem] flex flex-col justify-center items-center`}
              >
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
                <h1 className="text-8xl text-text font-normal my-8 select-none">{`${minutes}:${seconds}`}</h1>
                <p className="uppercase text-text font-normal tracking-[15px] select-none">{timerAction()}</p>
              </div>
            </div>
          </div>
        </div>

        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer"
          onClick={OpenModal}
        >
          <g opacity="0.5">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24.0378 15.365L26.9654 17.682C27.229 17.899 27.3054 18.2771 27.1318 18.578L24.3568 23.429C24.1834 23.73 23.8226 23.849 23.5104 23.73L20.0555 22.323C19.341 22.883 18.557 23.345 17.7106 23.702L17.1903 27.412C17.1348 27.741 16.8504 28 16.5035 28H10.9535C10.6066 28 10.3221 27.741 10.2666 27.412L9.74633 23.702C8.89997 23.345 8.11604 22.8761 7.40145 22.323L3.94654 23.73C3.63435 23.856 3.27364 23.73 3.10018 23.429L0.325132 18.578C0.151671 18.27 0.228028 17.892 0.491634 17.682L3.41927 15.365C3.36379 14.917 3.32216 14.462 3.32216 14C3.32216 13.538 3.36379 13.083 3.41927 12.635L0.491634 10.318C0.228028 10.101 0.151671 9.72302 0.325132 9.42199L3.10025 4.57099C3.27364 4.26996 3.63442 4.15098 3.94661 4.26996L7.40152 5.67697C8.11604 5.11699 8.90003 4.65499 9.74639 4.29799L10.2667 0.588001C10.3222 0.259022 10.6067 0 10.9535 0H16.5036C16.8504 0 17.1348 0.259022 17.1973 0.588001L17.7177 4.29799C18.564 4.65499 19.3479 5.12394 20.0625 5.67697L23.5174 4.26996C23.8296 4.14396 24.1903 4.26996 24.3638 4.57099L27.1389 9.42199C27.3123 9.72997 27.236 10.108 26.9724 10.318L24.0378 12.635C24.0932 13.083 24.1349 13.538 24.1349 14C24.1349 14.462 24.0932 14.917 24.0378 15.365ZM8.8722 14C8.8722 16.709 11.0437 18.9 13.7285 18.9C16.4134 18.9 18.5848 16.7091 18.5848 14.0001C18.5848 11.2911 16.4134 9.10004 13.7285 9.10004C11.0437 9.10004 8.8722 11.291 8.8722 14Z"
              fill="#D7E0FF"
            ></path>
          </g>
        </svg>
      </div>

      {/* MODAL DE CONFIGURAÇÕES */}
      <Modal config={config} onClickChangeConfig={onClickChangeConfig} />
    </main>
  );
}

export default App;
