import { useState } from "react";
import { ConfigProps } from "../types/pomodoro_config.t";
import Circle from "./Circle";
import colorVariants from "../constants";

interface ModalProps {
  config: ConfigProps;
  onClickChangeConfig: (config: ConfigProps) => void;
}

const Modal: React.FC<ModalProps> = ({ config, onClickChangeConfig }: ModalProps) => {
  const [newConfig, setNewConfig] = useState<ConfigProps>(config);

  function OnChangeInput(event: React.ChangeEvent<HTMLInputElement>, entryName: string) {
    if (event.target.value === "") {
      event.target.value = "0";
    }
    let value = parseInt(event.target.value);
    if (value > 60) value = 60;
    if (value < 0) value = 0;

    event.target.value = value.toString();

    setNewConfig((prevConfig) => ({ ...prevConfig, [entryName]: value }));
  }

  function OnClickFont(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    let newFont = event.currentTarget.querySelector("input");
    if (newFont) {
      setNewConfig((prevConfig) => ({ ...prevConfig, font: newFont!.value }));
    }
  }
  function CheckCircleColor(font: string) {
    return newConfig.font === font ? "blue" : "input_color";
  }
  function CheckCircleTextColor(font: string) {
    return newConfig.font === font ? "text-white" : "text-blue";
  }

  function OnClickColor(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    let newColor = event.currentTarget.querySelector("input");
    if (newColor) {
      setNewConfig((prevConfig) => ({ ...prevConfig, color: newColor!.value }));
    }
  }

  function CloseModal() {
    let modal = document.querySelector("#config_modal");
    if (modal) modal.classList.add("hidden");
  }

  return (
    /* Modal Wrapper */
    <div className="w-screen h-screen hidden flex-row justify-center items-center absolute top-0" id="config_modal">
      {/* Overlay */}
      <div className="w-full h-full bg-black opacity-40 absolute top-0"></div>
      {/* Modal Container */}
      <div className="bg-white w-full h-[650px] sm:w-[530px] sm:h-[500px] absolute top-[5%] sm:top-[17%] rounded-3xl border z-20">
        {/* Modal Header (Settings) */}
        <div className="border-b border-zinc-200 flex flex-row justify-between items-center px-8 py-6">
          <p className="text-[28px] text-blue">Settings</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="cursor-pointer text-dark_text"
            onClick={CloseModal}
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </div>
        {/* Time */}
        <div className="modal-time mx-9 py-6 border-b border-zinc-200">
          <p className="uppercase text-blue tracking-[5px] text-sm text-center sm:text-start">Time (Minutes)</p>
          <div className="selection-row flex flex-col sm:flex-row items-start sm:items-center">
            <div className="selection text-xs font-bold mt-4 w-full flex flex-row justify-between items-center sm:items-start sm:flex-col">
              <p className="text-light_text">pomodoro</p>
              <input
                type="number"
                id="pomodoro-input"
                name="pomodoro-input"
                defaultValue={newConfig.pomodoro}
                onChange={(e) => OnChangeInput(e, "pomodoro")}
                className="bg-input_color max-w-[140px] h-[40px] rounded-xl p-4 text-sm mt-2 outline-none"
              />
            </div>

            <div className="selection text-xs font-bold mt-1 sm:mt-4 w-full flex flex-row justify-between items-center sm:items-start sm:flex-col">
              <p className="text-light_text">short break</p>
              <input
                type="number"
                id="short_break-input"
                name="short_break-input"
                defaultValue={newConfig.short_break}
                onChange={(e) => OnChangeInput(e, "short_break")}
                className="bg-input_color max-w-[140px] h-[40px] rounded-xl p-4 text-sm mt-2 outline-none"
              />
            </div>

            <div className="selection text-xs font-bold mt-1 sm:mt-4 w-full flex flex-row justify-between items-center sm:items-start sm:flex-col">
              <p className="text-light_text">long break</p>
              <input
                type="number"
                id="long_break-input"
                name="long_break-input"
                defaultValue={newConfig.long_break}
                onChange={(e) => OnChangeInput(e, "long_break")}
                className="bg-input_color max-w-[140px] h-[40px] rounded-xl p-4 text-sm mt-2 outline-none"
              />
            </div>
          </div>
        </div>
        {/* Font */}
        <div className="flex flex-col sm:flex-row justify-between items-center mx-9 py-6 border-b border-zinc-200">
          <p className="text-sm uppercase tracking-[5px]">Font</p>
          <div className="flex flex-row justify-start items-center gap-4 mt-4 sm:mt-0">
            <Circle
              color={CheckCircleColor("kumbh")}
              name="font"
              value="kumbh"
              className="hover:bg-blue hover:text-white"
              onClick={OnClickFont}
            >
              <p className={`${CheckCircleTextColor("kumbh")} group-hover:text-white font-kumbh`}>Aa</p>
            </Circle>
            <Circle
              color={CheckCircleColor("roboto_slab")}
              name="font"
              value="roboto_slab"
              className={`hover:bg-blue `}
              onClick={OnClickFont}
            >
              <p className={`${CheckCircleTextColor("roboto_slab")} group-hover:text-white font-roboto_slab`}>Aa</p>
            </Circle>
            <Circle
              color={CheckCircleColor("space_mono")}
              name="font"
              value="space_mono"
              className="hover:bg-blue"
              onClick={OnClickFont}
            >
              <p className={`${CheckCircleTextColor("space_mono")} group-hover:text-white font-space_mono`}>Aa</p>
            </Circle>
          </div>
        </div>
        {/* Color */}
        <div className="flex flex-col sm:flex-row justify-between items-center mx-9 py-6">
          <p className="text-sm uppercase tracking-[5px]">Color</p>
          <div className="flex flex-row justify-start items-center gap-4 mt-4">
            <Circle color="red" onClick={OnClickColor} name="color" value="red">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`${newConfig.color === "red" ? "" : "hidden"} group-hover:block`}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </Circle>

            <Circle color="cyan" onClick={OnClickColor} name="color" value="cyan">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`${newConfig.color === "cyan" ? "" : "hidden"} group-hover:block`}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </Circle>

            <Circle color="purple" onClick={OnClickColor} name="color" value="purple">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`${newConfig.color === "purple" ? "" : "hidden"} group-hover:block`}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </Circle>
          </div>
        </div>
        <button
          className={`${
            colorVariants[newConfig.color as keyof typeof colorVariants]
          } text-white rounded-full px-12 py-4 absolute -bottom-7 left-[50%] -translate-x-[50%] hover:scale-110 duration-200`}
          onClick={() => {
            onClickChangeConfig(newConfig);
            CloseModal();
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Modal;
